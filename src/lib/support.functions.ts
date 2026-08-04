import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ESCALATE_TOKEN, SUPPORT_SYSTEM_PROMPT } from "@/lib/support-kb";

const InquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  inquiryType: z.string().trim().max(120).default("general"),
  message: z.string().trim().min(1).max(4000),
  source: z.enum(["contact_form", "ai_chat"]).default("contact_form"),
  transcript: z.string().trim().max(8000).optional().or(z.literal("")),
});

/** Saves a customer inquiry and notifies the business inbox. */
export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      organization: data.organization || null,
      inquiry_type: data.inquiryType || "general",
      message: data.message,
      source: data.source,
      transcript: data.transcript || null,
    });

    if (error) {
      console.error("[inquiry] insert failed", error);
      throw new Error("We could not record your inquiry. Please try again.");
    }

    return { ok: true as const, notifyEmail: process.env["SUPPORT_INBOX_EMAIL"] ?? null };
  });

const AskSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .min(1)
    .max(24),
});

/** Answers a customer question from the support knowledge base. */
export const askSupport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AskSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Support assistant is not configured.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [{ role: "system", content: SUPPORT_SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (res.status === 429) {
      return { reply: "Our assistant is busy right now — please try again in a moment, or send us a message and we'll reply by email.", escalate: true };
    }
    if (res.status === 402) {
      return { reply: "Our assistant is temporarily unavailable. Leave your question below and our team will reply by email.", escalate: true };
    }
    if (!res.ok) {
      const body = await res.text();
      console.error("[support] gateway error", res.status, body);
      return { reply: "Something went wrong on our side. Leave your question below and our team will reply by email.", escalate: true };
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = json.choices?.[0]?.message?.content?.trim() ?? "";
    const escalate = raw.includes(ESCALATE_TOKEN);
    const reply = raw.replace(ESCALATE_TOKEN, "").trim() ||
      "I'm not sure about that one — our team can help. Leave your details below.";

    return { reply, escalate };
  });

const CodeSchema = z.object({ code: z.string().min(1).max(200) });

function checkCode(code: string) {
  const expected = process.env["ADMIN_INBOX_CODE"];
  if (!expected || code !== expected) throw new Error("Invalid access code.");
}

/** Lists customer inquiries for the private admin inbox. */
export const listInquiries = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => CodeSchema.parse(input))
  .handler(async ({ data }) => {
    checkCode(data.code);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("contact_inquiries")
      .select("id, name, email, organization, inquiry_type, message, source, transcript, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("[inquiry] list failed", error);
      throw new Error("Could not load the inbox.");
    }
    return { inquiries: rows ?? [], notifyEmail: process.env["SUPPORT_INBOX_EMAIL"] ?? null };
  });

const StatusSchema = CodeSchema.extend({
  id: z.string().uuid(),
  status: z.enum(["new", "read", "replied"]),
});

/** Updates the status of one inquiry. */
export const setInquiryStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => StatusSchema.parse(input))
  .handler(async ({ data }) => {
    checkCode(data.code);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_inquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) {
      console.error("[inquiry] status update failed", error);
      throw new Error("Could not update this inquiry.");
    }
    return { ok: true as const };
  });

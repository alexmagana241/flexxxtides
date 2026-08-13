import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Mail, CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askSupport, submitInquiry } from "@/lib/support.functions";
import { QUICK_QUESTIONS } from "@/lib/support-kb";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the BH support assistant. I can help with shipping, order status, refunds, pack sizes, kits and documentation. What can I help you with?",
};

export function SupportChat() {
  const ask = useServerFn(askSupport);
  const send = useServerFn(submitInquiry);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, showForm, sent]);

  useEffect(() => {
    if (open && !showForm) inputRef.current?.focus();
  }, [open, showForm, busy]);

  async function submit(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const res = await ask({
        data: { messages: next.filter((m) => m !== GREETING).map((m) => ({ role: m.role, content: m.content })) },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
      if (res.escalate) setShowForm(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry — I couldn't reach our assistant. Leave your details and our team will email you back." },
      ]);
      setShowForm(true);
    } finally {
      setBusy(false);
    }
  }

  async function escalate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const transcript = messages.map((m) => `${m.role === "user" ? "Customer" : "Assistant"}: ${m.content}`).join("\n\n");
      const lastQuestion = [...messages].reverse().find((m) => m.role === "user")?.content ?? "Question from the AI chat widget.";
      await send({
        data: {
          name: name.trim(),
          email: email.trim(),
          inquiryType: "AI chat escalation",
          message: lastQuestion,
          source: "ai_chat",
          transcript,
        },
      });
      setSent(true);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open support chat"
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:opacity-90 transition"
        >
          <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">Support</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-2 bottom-2 z-50 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[380px]">
          <div className="flex max-h-[80vh] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-semibold">BH Support</p>
                <p className="text-[11px] text-muted-foreground">Automated answers · research use only</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close support chat" className="h-8 w-8 grid place-items-center rounded-md hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground whitespace-pre-wrap"
                        : "max-w-[95%] text-sm text-foreground whitespace-pre-wrap"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {busy && <p className="animate-pulse text-sm text-muted-foreground">Thinking…</p>}

              {messages.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => void submit(q)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {showForm && !sent && (
                <form onSubmit={escalate} className="rounded-lg border border-primary/40 bg-primary/5 p-3 space-y-2">
                  <p className="flex items-center gap-2 text-xs font-medium text-primary">
                    <Mail className="h-3.5 w-3.5" /> Send this to our team
                  </p>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    maxLength={120}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    maxLength={255}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <button
                    disabled={busy}
                    className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                  >
                    Send to the team
                  </button>
                </form>
              )}

              {sent && (
                <p className="flex items-start gap-2 rounded-lg border border-primary/40 bg-primary/5 p-3 text-xs text-primary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  Thanks — your question and this conversation were sent to our team. We'll reply to {email}.
                </p>
              )}

              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit(input);
              }}
              className="flex items-end gap-2 border-t border-border p-3"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void submit(input);
                  }
                }}
                placeholder="Ask about shipping, orders, kits…"
                maxLength={2000}
                className="max-h-28 flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="h-9 w-9 shrink-0 grid place-items-center rounded-md bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

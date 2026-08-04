import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Inbox, Lock, RefreshCw } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BRAND } from "@/lib/compliance";
import { listInquiries, setInquiryStatus } from "@/lib/support.functions";

export const Route = createFileRoute("/admin-inbox")({
  head: () => ({
    meta: [
      { title: "Customer Inbox — BIOHACKERS" },
      { name: "description", content: "Internal inbox of customer inquiries submitted through the website." },
      { property: "og:title", content: "Customer Inbox — BIOHACKERS" },
      { property: "og:description", content: "Internal customer inquiry inbox." },
      { property: "og:url", content: `${BRAND.domain}/admin-inbox` },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/admin-inbox` }],
  }),
  component: AdminInbox,
});

type Inquiry = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  inquiry_type: string;
  message: string;
  source: string;
  transcript: string | null;
  status: string;
  created_at: string;
};

function AdminInbox() {
  const load = useServerFn(listInquiries);
  const mark = useServerFn(setInquiryStatus);

  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [notifyEmail, setNotifyEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh(accessCode: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await load({ data: { code: accessCode } });
      setRows(res.inquiries as Inquiry[]);
      setNotifyEmail(res.notifyEmail);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the inbox.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Internal only</p>
        <h1 className="text-4xl font-bold tracking-tight">Customer inbox</h1>
        <p className="text-sm text-muted-foreground">
          Every contact-form submission and AI-chat escalation is stored here
          {notifyEmail ? <> and routed to <span className="text-foreground">{notifyEmail}</span></> : null}.
        </p>

        {!unlocked ? (
          <form
            onSubmit={(e) => { e.preventDefault(); void refresh(code); }}
            className="max-w-sm rounded-xl border border-border bg-card p-6 space-y-3"
          >
            <label className="flex items-center gap-2 text-sm font-medium">
              <Lock className="h-4 w-4 text-primary" /> Access code
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
              {busy ? "Checking…" : "Open inbox"}
            </button>
          </form>
        ) : (
          <>
            <button
              onClick={() => void refresh(code)}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>

            {rows.length === 0 ? (
              <p className="flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                <Inbox className="h-4 w-4" /> No inquiries yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {rows.map((r) => (
                  <li key={r.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border px-2 py-0.5 uppercase tracking-wider">
                        {r.source === "ai_chat" ? "AI chat" : "Contact form"}
                      </span>
                      <span className="rounded-full border border-primary/40 px-2 py-0.5 text-primary uppercase tracking-wider">{r.status}</span>
                      <span>{new Date(r.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold">
                      {r.name} · <a className="text-primary hover:underline" href={`mailto:${r.email}?subject=Re: your BIOHACKERS inquiry`}>{r.email}</a>
                      {r.organization ? <span className="text-muted-foreground"> · {r.organization}</span> : null}
                    </p>
                    <p className="text-xs text-muted-foreground">{r.inquiry_type}</p>
                    <p className="mt-3 whitespace-pre-wrap text-sm">{r.message}</p>
                    {r.transcript && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-xs text-muted-foreground">Chat transcript</summary>
                        <pre className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-xs">{r.transcript}</pre>
                      </details>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(["read", "replied", "new"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={async () => {
                            await mark({ data: { code, id: r.id, status: s } });
                            void refresh(code);
                          }}
                          className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
                        >
                          Mark {s}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

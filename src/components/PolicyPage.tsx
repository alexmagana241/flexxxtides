import type { ReactNode } from "react";
import { Layout } from "./Layout";
import { ResearchUseNotice } from "./ResearchUseNotice";

export function PolicyPage({ eyebrow, title, children }: { eyebrow?: string; title: string; children: ReactNode }) {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          {eyebrow && <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">{eyebrow}</p>}
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{title}</h1>
          <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 prose prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:font-semibold [&_h2]:text-lg [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:font-semibold [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </Layout>
  );
}

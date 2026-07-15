import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — BIOHACKERS Research Materials" },
      { name: "description", content: "Answers to common questions about BIOHACKERS laboratory reference materials, documentation, eligibility, ordering review, and shipping restrictions." },
      { property: "og:title", content: "FAQ — BIOHACKERS Research Materials" },
      { property: "og:description", content: "Frequently asked questions about BIOHACKERS research-materials ordering and documentation." },
      { property: "og:url", content: `${BRAND.domain}/faq` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/faq` }],
  }),
  component: FAQ,
});

const sections = [
  {
    title: "About BIOHACKERS materials",
    items: [
      { q: "What does BIOHACKERS supply?", a: "Characterized peptide reference standards and related research materials in lyophilized powder form, intended exclusively for laboratory, analytical, and non-clinical research." },
      { q: "Are these products medicines?", a: "No. BIOHACKERS materials are not drugs, foods, dietary supplements, cosmetics, medical devices, or veterinary products. They are laboratory research materials and are not offered or represented as suitable for use in or on humans or animals." },
      { q: "Do you offer clinical, dosing, administration, or reconstitution-for-use guidance?", a: "No. BIOHACKERS does not provide medical, veterinary, diagnostic, therapeutic, or personal-use guidance of any kind." },
    ],
  },
  {
    title: "Ordering and eligibility",
    items: [
      { q: "Who can purchase?", a: "Purchases are limited to qualified research organizations. Buyers must complete an eligibility verification and affirm intended laboratory use." },
      { q: "Are orders reviewed?", a: "Yes. Orders are subject to administrative review and may be held, rejected, cancelled, or refunded when they appear inconsistent with legitimate laboratory research or otherwise conflict with BIOHACKERS policies or applicable law." },
      { q: "Is online purchasing currently available?", a: "Online purchasing is currently unavailable pending completion of legal review and payment-processor approval. The catalog is browsable in the meantime." },
    ],
  },
  {
    title: "Documentation and shipping",
    items: [
      { q: "Is a Certificate of Analysis included?", a: "A Certificate of Analysis is available for each supplied lot. Please request the lot-specific CoA when placing a purchase inquiry." },
      { q: "Is a Safety Data Sheet available?", a: "Yes. SDS documents are provided on request for laboratory handling and disposal reference." },
      { q: "Are there shipping restrictions?", a: "Certain products or destinations may be restricted by law, carrier policy, payment-processor policy, or company policy. See the Restricted Products & Jurisdictions Policy." },
    ],
  },
];

function FAQ() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Support</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Frequently asked questions</h1>
          <p className="mt-3 text-muted-foreground">Ordering, documentation, and research-materials logistics.</p>
          <div className="mt-6 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-2xl font-bold tracking-tight mb-4">{s.title}</h2>
            <div className="space-y-3">
              {s.items.map((it) => (
                <details key={it.q} className="group rounded-lg border border-border bg-card p-5">
                  <summary className="cursor-pointer font-medium flex items-center justify-between">
                    {it.q}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">Have a research-organization question?</p>
          <Link to="/contact" className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Contact BIOHACKERS
          </Link>
        </div>
      </div>
    </Layout>
  );
}

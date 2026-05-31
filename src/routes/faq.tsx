import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ Center — Flex Peptide Research" },
      { name: "description", content: "Answers to common educational questions about peptides, reconstitution, storage, and research-use disclaimers." },
      { property: "og:title", content: "FAQ Center — Flex Peptide Research" },
      { property: "og:description", content: "Common educational peptide research questions." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

const sections = [
  {
    title: "Getting started",
    items: [
      {
        q: "What are peptides?",
        a: "Peptides are short chains of amino acids, typically fewer than 50 residues. They occur naturally in biology as signaling molecules and are widely studied in research literature for their roles in cell communication, tissue function, and metabolic pathways.",
      },
      {
        q: "How are research peptides different from proteins?",
        a: "The line is one of length and folding. Proteins are longer chains that fold into stable three-dimensional structures; peptides are shorter and often act through transient receptor or surface interactions.",
      },
      {
        q: "What is a lyophilized peptide?",
        a: "Lyophilization (freeze-drying) removes water to leave a stable powder that can be shipped and stored at higher temperatures. Researchers reconstitute the powder with bacteriostatic water before use in experiments.",
      },
    ],
  },
  {
    title: "Reconstitution & storage",
    items: [
      {
        q: "How are peptides reconstituted?",
        a: "By drawing bacteriostatic water into a syringe and adding it slowly to the vial wall, then gently swirling — never shaking. See the Reconstitution Center for an educational walkthrough.",
      },
      {
        q: "Storage recommendations?",
        a: "Lyophilized vials are commonly stored frozen or refrigerated; reconstituted solutions are typically refrigerated and used within several weeks. Always follow the storage guidance on the specific vial label and the published literature for that compound.",
      },
      {
        q: "Why bacteriostatic water and not regular sterile water?",
        a: "The benzyl alcohol in BAC water inhibits bacterial growth, which matters for multi-use research vials that are accessed repeatedly.",
      },
    ],
  },
  {
    title: "Research use",
    items: [
      {
        q: "Are these peptides approved medications?",
        a: "Most research peptides discussed on this site are not approved medications. Some, like Tesamorelin, have approved formulations for specific clinical indications; this site does not provide clinical or medical guidance. All content here is educational.",
      },
      {
        q: "Can I use this information to dose myself or others?",
        a: "No. Flex Peptide Research is an educational resource. Nothing on this site is intended as medical advice, a prescription, or a recommendation for human or animal administration.",
      },
      {
        q: "Why don't you sell peptides?",
        a: "Because we are an educational project, not a vendor. We focus on clear writing and accurate research summaries.",
      },
    ],
  },
];

function FAQ() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold tracking-tight">FAQ Center</h1>
          <p className="mt-3 text-muted-foreground">Educational answers to the questions we see most often.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
          <p className="text-sm text-muted-foreground">Still have a question?</p>
          <Link to="/contact" className="mt-3 inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Contact our educational support
          </Link>
        </div>

        <Disclaimer />
      </div>
    </Layout>
  );
}

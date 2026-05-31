import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Atom, Dna, HeartPulse, Sparkles, Weight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Research Learning Center — Flex Peptide Research" },
      { name: "description", content: "Educational articles covering peptide science basics, growth hormone secretagogues, recovery peptides, copper peptides, and weight management peptides." },
      { property: "og:title", content: "Research Learning Center" },
      { property: "og:description", content: "Educational articles on peptide science categories." },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
  component: Learning,
});

const articles = [
  {
    icon: Atom,
    title: "Peptide Science Basics",
    body: "Peptides are short amino acid chains that function as the language of cellular signaling. This primer covers the difference between peptides and proteins, why sequence and modification matter, and how researchers think about half-life, receptor selectivity, and pharmacokinetics in vitro and in published clinical literature.",
  },
  {
    icon: Sparkles,
    title: "Growth Hormone Secretagogues",
    body: "GHRH analogs (like Tesamorelin and CJC-1295) and ghrelin-receptor agonists (like Ipamorelin) are studied for their role in pulsatile growth hormone release. Each class engages a different upstream signaling node, which is why research often pairs them to compare combined pharmacology.",
  },
  {
    icon: HeartPulse,
    title: "Recovery & Repair Peptides",
    body: "BPC-157 and TB-500 are the most widely discussed compounds in this category. Both have an extensive preclinical literature focused on tissue models, angiogenic signaling, and cellular migration. Human clinical data remain limited and ongoing.",
  },
  {
    icon: Dna,
    title: "Copper Peptides",
    body: "GHK-Cu is the canonical example: a tripeptide that binds copper(II) with high affinity. Research literature has explored its role in extracellular matrix biology, fibroblast signaling, and antioxidant gene expression for over four decades.",
  },
  {
    icon: Weight,
    title: "Weight Management Peptides",
    body: "Incretin-based research is one of the most active areas of metabolic science. Single-, dual-, and triple-agonist compounds (such as the investigational Retatrutide) are studied for their combined effects on GLP-1, GIP, and glucagon receptor pathways.",
  },
];

function Learning() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs uppercase tracking-wider text-primary">Learning Center</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Research Learning Center</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Short educational articles that explain how researchers think about each peptide category —
            written for clarity, not for sale.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {articles.map(({ icon: Icon, title, body }) => (
          <article key={title} className="rounded-xl border border-border bg-card p-6 md:p-8 card-hover">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{body}</p>
          </article>
        ))}

        <div className="rounded-xl border border-border p-6 bg-card text-center">
          <h3 className="font-semibold">Ready to browse compounds?</h3>
          <Link to="/catalog" className="mt-3 inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Open the catalog <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <Disclaimer />
      </div>
    </Layout>
  );
}

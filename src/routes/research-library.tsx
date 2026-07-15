import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FileText, FlaskConical, HardHat, Recycle, ShieldCheck, TestTube } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/research-library")({
  head: () => ({
    meta: [
      { title: "Research Library — BIOHACKERS" },
      { name: "description", content: "Laboratory-focused reference articles on Certificate of Analysis interpretation, Safety Data Sheets, storage, PPE, disposal, and scientific literature evaluation." },
      { property: "og:title", content: "Research Library — BIOHACKERS" },
      { property: "og:description", content: "Laboratory-focused reference articles for research professionals." },
      { property: "og:url", content: `${BRAND.domain}/research-library` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/research-library` }],
  }),
  component: Library,
});

const articles = [
  { icon: FileText, title: "Reading a Certificate of Analysis", body: "How to interpret identity, purity, water content, residual solvents, and lot-specific data typically reported on a peptide reference-standard CoA." },
  { icon: TestTube, title: "Analytical methods overview", body: "Common analytical techniques used to characterize peptide reference materials, including RP-HPLC, LC-MS, amino-acid analysis, and Karl Fischer titration." },
  { icon: ShieldCheck, title: "Interpreting a Safety Data Sheet", body: "Section-by-section walkthrough of GHS-format SDS documents for laboratory chemicals: hazards, first-aid, handling, and disposal information." },
  { icon: HardHat, title: "Personal protective equipment", body: "General laboratory PPE principles for handling powdered reference standards: gloves, eye protection, lab coat, and engineering controls such as fume hoods and biosafety cabinets." },
  { icon: FlaskConical, title: "Storage and stability principles", body: "Temperature, humidity, light, and container considerations when storing lyophilized peptide reference materials for analytical work." },
  { icon: Recycle, title: "Laboratory waste and disposal", body: "General principles for segregating, labeling, and disposing of laboratory chemical waste in accordance with institutional and jurisdictional requirements." },
  { icon: BookOpen, title: "Evaluating scientific literature", body: "How to read a peer-reviewed paper critically — study design, sample size, controls, and the difference between preclinical and clinical evidence." },
];

function Library() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Research Library</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Laboratory reference articles</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            General laboratory-practice topics for research professionals. This library does not
            contain administration instructions, dosing calculations, personal-use guidance, or
            any content directing use in or on humans or animals.
          </p>
          <div className="mt-6 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 grid gap-4 md:grid-cols-2">
        {articles.map(({ icon: Icon, title, body }) => (
          <article key={title} className="rounded-xl border border-border bg-card p-6 card-hover">
            <span className="h-9 w-9 rounded-md bg-primary/10 text-primary grid place-items-center">
              <Icon className="h-4 w-4" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">Looking for compound data instead?</p>
          <Link to="/catalog" className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Open the catalog
          </Link>
        </div>
      </div>
    </Layout>
  );
}

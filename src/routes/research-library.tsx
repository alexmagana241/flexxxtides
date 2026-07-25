import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, FlaskConical, HardHat, Recycle, ShieldCheck, TestTube } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND } from "@/lib/compliance";
import { articles } from "@/data/library";

const iconMap = {
  FileText, TestTube, ShieldCheck, HardHat, FlaskConical, Recycle, BookOpen,
} as const;

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

function Library() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Research Library</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Laboratory reference articles</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            General laboratory-practice topics for research professionals. Nothing in this
            library contains administration instructions, dosing calculations, personal-use
            guidance, or any content directing use in or on humans or animals.
          </p>
          <div className="mt-6 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 grid gap-4 md:grid-cols-2">
        {articles.map((a) => {
          const Icon = iconMap[a.icon];
          return (
            <Link
              key={a.slug}
              to="/research/$topic"
              params={{ topic: a.slug }}
              className="group rounded-xl border border-border bg-card p-6 card-hover flex flex-col"
            >
              <span className="h-9 w-9 rounded-md bg-primary/10 text-primary grid place-items-center">
                <Icon className="h-4 w-4" />
              </span>
              <h2 className="mt-4 text-lg font-semibold group-hover:text-primary transition">{a.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                Read article <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          );
        })}
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

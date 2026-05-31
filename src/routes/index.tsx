import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FlaskConical, Microscope, Shield, Sparkles, BeakerIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";
import { peptides } from "@/data/peptides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flex Peptide Research — Educational Peptide Information" },
      { name: "description", content: "Organized educational information on peptide research compounds, reconstitution math, and the science behind compounds like GHK-Cu, BPC-157, Tesamorelin, Retatrutide and more." },
      { property: "og:title", content: "Flex Peptide Research" },
      { property: "og:description", content: "Educational peptide research, reconstitution guides, and science explainers." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = peptides.slice(0, 4);
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-hero">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> Educational research library
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Understand the science of <span className="text-primary">peptide research.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            A clean, organized educational library covering peptide mechanisms, reconstitution
            mathematics, and the published research literature — written for clarity, not for sale.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition">
              Explore the Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/learning" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted transition">
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Organized Knowledge", body: "Plain-language summaries of mechanism, research history, and FAQs for each peptide." },
            { icon: Microscope, title: "Research-Grounded", body: "References the published literature; clearly separates established findings from investigational work." },
            { icon: Shield, title: "Educational Only", body: "No sales, no claims. Just a clear library for students, researchers, and the curious." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 card-hover">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured compounds */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Compounds</h2>
            <p className="text-muted-foreground mt-2">A snapshot of widely studied research peptides.</p>
          </div>
          <Link to="/catalog" className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/peptides/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border bg-card overflow-hidden card-hover"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={`Research vial labeled ${p.name}`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="h-9 w-9 grid place-items-center rounded-lg bg-primary/10 text-primary">
                    <BeakerIcon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{p.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary">
                  Read overview <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 md:p-14 text-center">
          <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
          <div className="relative">
            <FlaskConical className="h-8 w-8 text-primary mx-auto" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Learn the math, not the marketing.</h2>
            <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
              Our Reconstitution Center walks through bacteriostatic water, syringe ticks, and example
              calculations — built for clarity.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/reconstitution" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow">
                Open Reconstitution Center <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/faq" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-muted">
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Disclaimer />
        </div>
      </section>
    </Layout>
  );
}

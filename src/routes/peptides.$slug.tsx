import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BeakerIcon, BookText, FlaskConical, HelpCircle, Microscope, Workflow } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";
import { getPeptide, peptides, type Peptide } from "@/data/peptides";

export const Route = createFileRoute("/peptides/$slug")({
  loader: ({ params }): { peptide: Peptide } => {
    const peptide = getPeptide(params.slug);
    if (!peptide) throw notFound();
    return { peptide };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.peptide;
    const title = p ? `${p.name} — Research Overview | Flex Peptide Research` : "Peptide Research";
    const desc = p?.tagline ?? "Educational peptide research information.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
      links: p ? [{ rel: "canonical", href: `/peptides/${p.slug}` }] : [],
    };
  },
  component: PeptidePage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Peptide not found</h1>
        <Link to="/catalog" className="mt-6 inline-block text-primary hover:underline">← Back to catalog</Link>
      </div>
    </Layout>
  ),
});

function PeptidePage() {
  const { peptide: p } = Route.useLoaderData();

  return (
    <Layout>
      <article>
        <section className="bg-hero border-b border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
            <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Back to catalog
            </Link>
            <div className="mt-4 flex items-start gap-4">
              <span className="h-14 w-14 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <BeakerIcon className="h-7 w-7 text-primary-foreground" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-primary">{p.category}</p>
                <h1 className="text-4xl font-bold tracking-tight">{p.name}</h1>
                {p.fullName && <p className="text-muted-foreground mt-1">{p.fullName}</p>}
              </div>
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{p.tagline}</p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <Section icon={BookText} title="Overview">{p.overview}</Section>
          <Section icon={Microscope} title="Research Background">{p.research}</Section>
          <Section icon={Workflow} title="Mechanism of Action">{p.mechanism}</Section>

          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" /> Common Research Applications
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.applications.map((a: string) => (
                <li key={a} className="rounded-lg border border-border bg-card p-4 text-sm">{a}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reconstitution Example</h2>
            <p className="text-sm text-muted-foreground mt-1">Example math only. See the <Link to="/reconstitution" className="text-primary hover:underline">Reconstitution Center</Link> for the full educational walkthrough.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Stat label="Vial size" value={p.reconstitution.vialSize} />
              <Stat label="BAC water" value={p.reconstitution.bacWater} />
              <Stat label="Concentration" value={p.reconstitution.perTick} />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{p.reconstitution.notes}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> FAQ
            </h2>
            <div className="mt-4 space-y-3">
              {p.faq.map((f: { q: string; a: string }) => (
                <details key={f.q} className="group rounded-lg border border-border bg-card p-4">
                  <summary className="cursor-pointer text-sm font-medium flex items-center justify-between">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <Disclaimer />

          <div className="border-t border-border pt-8">
            <h3 className="text-sm font-semibold mb-4">Continue exploring</h3>
            <div className="flex flex-wrap gap-2">
              {peptides.filter((x) => x.slug !== p.slug).slice(0, 4).map((x) => (
                <Link key={x.slug} to="/peptides/$slug" params={{ slug: x.slug }}
                  className="px-3 py-2 text-xs rounded-md border border-border bg-card hover:bg-muted">
                  {x.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof BookText; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" /> {title}
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

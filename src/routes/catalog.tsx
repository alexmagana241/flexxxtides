import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, BeakerIcon, Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";
import { peptides, categories } from "@/data/peptides";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Peptide Catalog — Flex Peptide Research" },
      { name: "description", content: "Browse and search an organized educational catalog of peptide research compounds, filtered by category." },
      { property: "og:title", content: "Peptide Catalog — Flex Peptide Research" },
      { property: "og:description", content: "Searchable educational catalog of peptide research compounds." },
    ],
    links: [{ rel: "canonical", href: "/catalog" }],
  }),
  component: Catalog,
});

function Catalog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    return peptides.filter((p) => {
      const matchQ = q.trim() === "" ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.tagline.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase());
      const matchC = cat === "All" || p.category === cat;
      return matchQ && matchC;
    });
  }, [q, cat]);

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Peptide Catalog</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Search across the educational library. All entries are research-information only.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search peptides by name, category, or keyword..."
                className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-2 rounded-md text-xs border transition ${
                    cat === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No peptides match your search.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to="/peptides/$slug"
                params={{ slug: p.slug }}
                className="group rounded-xl border border-border bg-card overflow-hidden card-hover flex flex-col"
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
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="h-9 w-9 grid place-items-center rounded-lg bg-primary/10 text-primary">
                      <BeakerIcon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold group-hover:text-primary transition">{p.name}</h2>
                  {p.fullName && <p className="text-xs text-muted-foreground">{p.fullName}</p>}
                  <p className="mt-3 text-sm text-muted-foreground flex-1">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.availableDoses.map((d) => (
                      <span key={d} className="text-[10px] font-medium px-2 py-1 rounded-md border border-border bg-background text-foreground">
                        {d}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-primary">
                    View research overview <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}

          </div>
        )}
        <div className="mt-12">
          <Disclaimer />
        </div>
      </section>
    </Layout>
  );
}

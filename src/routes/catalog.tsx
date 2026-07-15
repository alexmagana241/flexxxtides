import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Search, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { items, categories } from "@/data/peptides";
import { BRAND, readEligibility } from "@/lib/compliance";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — BIOHACKERS Research Materials" },
      { name: "description", content: "Searchable catalog of BIOHACKERS peptide reference standards for laboratory, analytical, and non-clinical research. Not for human or veterinary use." },
      { property: "og:title", content: "Catalog — BIOHACKERS Research Materials" },
      { property: "og:description", content: "Peptide reference standards for laboratory research." },
      { property: "og:url", content: `${BRAND.domain}/catalog` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/catalog` }],
  }),
  component: Catalog,
});

function Catalog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerified(!!readEligibility());
  }, []);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const s = q.trim().toLowerCase();
      const matchQ =
        s === "" ||
        p.name.toLowerCase().includes(s) ||
        p.catalogNumber.toLowerCase().includes(s) ||
        (p.casNumber?.toLowerCase().includes(s) ?? false) ||
        p.molecularFormula.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s);
      const matchC = cat === "All" || p.category === cat;
      return matchQ && matchC;
    });
  }, [q, cat]);

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Research materials</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Catalog</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Characterized peptide reference standards supplied to qualified research organizations.
          </p>
          <div className="mt-5 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by catalog #, name, CAS, formula, or category…"
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
        {!verified && (
          <div className="mb-8 rounded-lg border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <Lock className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Pricing and ordering are gated.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete research-eligibility verification to request quotes and view pack pricing.
              </p>
            </div>
            <Link to="/eligibility" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Verify eligibility <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No catalog items match your search.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to="/peptides/$slug"
                params={{ slug: p.slug }}
                className="group rounded-xl border border-border bg-card p-5 card-hover flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.catalogNumber}</p>
                    <h2 className="mt-1 text-lg font-semibold group-hover:text-primary transition">{p.name}</h2>
                    {p.fullName && <p className="text-xs text-muted-foreground mt-0.5">{p.fullName}</p>}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">{p.category}</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Formula</dt>
                    <dd className="font-mono">{p.molecularFormula}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">MW</dt>
                    <dd>{p.molecularWeight}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Purity</dt>
                    <dd>{p.statedPurity.replace(" (documented on Certificate of Analysis)", "")}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Form</dt>
                    <dd>Lyophilized</dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.packSizes.map((d) => (
                    <span key={d} className="text-[10px] font-medium px-2 py-1 rounded-md border border-border bg-background text-foreground">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <ResearchUseNotice variant="chip" />
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  View specification <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

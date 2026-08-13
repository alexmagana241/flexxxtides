import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, FileText, Minus, Plus, ShieldAlert, ShoppingCart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { Vial } from "@/components/Vial";
import { KIT_DISCOUNT, KIT_VIALS, kitListPrice, kitPrice, useCart } from "@/components/CartProvider";
import { getItem, items, type CatalogItem } from "@/data/peptides";
import { BRAND, formatPrice } from "@/lib/compliance";


export const Route = createFileRoute("/peptides/$slug")({
  loader: ({ params }): { item: CatalogItem } => {
    const item = getItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.item;
    const title = p
      ? `${p.name} — ${p.catalogNumber} | BH Research Materials`
      : "Catalog item";
    const desc = p
      ? `${p.name} laboratory reference standard. Molecular formula ${p.molecularFormula}, MW ${p.molecularWeight}. For research use only. Not for human or veterinary use.`
      : "Research reference standard.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `${BRAND.domain}/peptides/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `${BRAND.domain}/peptides/${params.slug}` }],
    };
  },
  component: PeptidePage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Catalog item not found</h1>
        <Link to="/catalog" className="mt-6 inline-block text-primary hover:underline">← Back to catalog</Link>
      </div>
    </Layout>
  ),
});

function PeptidePage() {
  const { item: p } = Route.useLoaderData();
  const { add } = useCart();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [buyKit, setBuyKit] = useState(false);
  const pack = p.packs[sizeIdx] ?? p.packs[0];
  const displayName = p.name.replace(/\s*\(.*\)$/, "");

  return (
    <Layout>
      <article>
        <section className="bg-hero border-b border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
            <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Back to catalog
            </Link>
            <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr] items-start">
              <div className="rounded-xl border border-border bg-card p-4 grid place-items-center">
                <Vial packSize={pack?.size} compound={displayName} className="h-56 w-auto" />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">{p.catalogNumber} · {p.category}</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight">{p.name}</h1>
                {p.fullName && <p className="text-muted-foreground mt-1">{p.fullName}</p>}
                <div className="mt-4 max-w-2xl">
                  <ResearchUseNotice variant="callout" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <Section title="Identity & specification">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Row label="Catalog number" value={p.catalogNumber} />
                <Row label="Research category" value={p.category} />
                {p.casNumber && <Row label="CAS" value={p.casNumber} />}
                {p.synonyms && p.synonyms.length > 0 && (
                  <Row label="Synonyms" value={p.synonyms.join(", ")} />
                )}
                <Row label="Molecular formula" value={p.molecularFormula} mono />
                <Row label="Molecular weight" value={p.molecularWeight} />
                {p.sequence && <Row label="Sequence" value={p.sequence} mono />}
                <Row label="Appearance" value={p.appearance ?? p.physicalForm} />
                <Row label="Stated purity" value={p.statedPurity} />
                <Row label="Storage" value={p.storage} />
                {p.solubility && <Row label="Solubility" value={p.solubility} />}
                {p.handling && <Row label="Handling" value={p.handling} />}
                {p.stability && <Row label="Stability" value={p.stability} />}
                {p.recommendedAnalyticalUse && (
                  <Row label="Recommended analytical use" value={p.recommendedAnalyticalUse} />
                )}
              </dl>
            </Section>

            <Section title="Scientific summary">
              <p className="text-muted-foreground leading-relaxed">{p.scientificSummary}</p>
              <p className="mt-4 text-xs text-muted-foreground italic">
                This summary is provided for background reference to laboratory researchers.
                It is not a use recommendation, dosing guidance, or a claim of any therapeutic,
                diagnostic, veterinary, cosmetic, dietary, or consumer effect.
              </p>
            </Section>

            <Section title="Analytical methods">
              <ul className="grid gap-2 sm:grid-cols-2">
                {p.analyticalMethods.map((m: string) => (
                  <li key={m} className="rounded-md border border-border bg-card p-3 text-sm">{m}</li>
                ))}
              </ul>
            </Section>

          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Select strength</p>
              <ul className="mt-3 space-y-2">
                {p.packs.map((pk: { size: string; priceUSD: number }, i: number) => (
                  <li key={pk.size}>
                    <button
                      onClick={() => { setSizeIdx(i); setAdded(false); }}
                      aria-pressed={i === sizeIdx}
                      className={`w-full flex items-center justify-between rounded-md border px-3 py-2.5 text-left transition ${i === sizeIdx ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
                    >
                      <span>
                        <span className="block text-sm font-semibold">{pk.size}</span>
                        <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Lyophilized · single vial</span>
                      </span>
                      <span className="tabular-nums text-base font-bold text-primary">{formatPrice(pk.priceUSD)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] text-muted-foreground">
                Pricing subject to change without notice.
              </p>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Purchase option</p>
                <div className="mt-3 grid gap-2">
                  <button
                    onClick={() => { setBuyKit(false); setAdded(false); }}
                    aria-pressed={!buyKit}
                    className={`rounded-md border px-3 py-2.5 text-left transition ${!buyKit ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
                  >
                    <span className="block text-sm font-semibold">Single vial</span>
                    <span className="block text-xs text-muted-foreground">
                      {pack ? formatPrice(pack.priceUSD) : ""} per vial
                    </span>
                  </button>
                  <button
                    onClick={() => { setBuyKit(true); setAdded(false); }}
                    aria-pressed={buyKit}
                    className={`rounded-md border px-3 py-2.5 text-left transition ${buyKit ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{KIT_VIALS}-vial kit</span>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                        Save {Math.round(KIT_DISCOUNT * 100)}%
                      </span>
                    </span>
                    {pack && (
                      <span className="mt-1 block text-xs text-muted-foreground">
                        <span className="line-through">{formatPrice(kitListPrice(pack.priceUSD))}</span>{" "}
                        <span className="font-semibold text-primary">{formatPrice(kitPrice(pack.priceUSD))}</span>{" "}
                        — you save {formatPrice(kitListPrice(pack.priceUSD) - kitPrice(pack.priceUSD))}
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-4 rounded-md border border-primary/40 bg-primary/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Research use only</p>
                  <p className="mt-1 text-xs text-muted-foreground">Not for human or veterinary use.</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {buyKit ? "Kits" : "Quantity"}
                  </span>
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-9 w-9 grid place-items-center hover:bg-muted">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      aria-label="Quantity"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value.replace(/\D/g, "")) || 1))}
                      className="w-12 bg-transparent text-center text-sm tabular-nums outline-none"
                    />
                    <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="h-9 w-9 grid place-items-center hover:bg-muted">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!pack) return;
                    const unit = buyKit ? kitPrice(pack.priceUSD) : pack.priceUSD;
                    add({ slug: p.slug, name: displayName, size: pack.size, priceUSD: unit, kit: buyKit }, qty);
                    setAdded(true);
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart — {pack ? formatPrice((buyKit ? kitPrice(pack.priceUSD) : pack.priceUSD) * qty) : ""}
                </button>
                {added && (
                  <div className="mt-3 rounded-md border border-primary/40 bg-primary/5 p-3 text-xs">
                    <p className="font-medium text-primary">Added to cart.</p>
                    <div className="mt-2 flex gap-3">
                      <Link to="/cart" className="text-primary hover:underline">View cart</Link>
                      <Link to="/catalog" className="text-muted-foreground hover:text-foreground">Continue shopping</Link>
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-primary" /> Quality control
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {p.analyticalMethods.map((d: string) => (
                  <li key={d} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>


            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex gap-3">
              <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Laboratory Research Material.</strong>{" "}
                Requests inconsistent with legitimate laboratory research may be declined.
                Materials are supplied exclusively for lawful research and analytical purposes.
              </p>
            </div>
          </aside>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 border-t border-border pt-8">
          <h3 className="text-sm font-semibold mb-4">Other catalog items</h3>
          <div className="flex flex-wrap gap-2">
            {items.filter((x) => x.slug !== p.slug).slice(0, 6).map((x) => (
              <Link key={x.slug} to="/peptides/$slug" params={{ slug: x.slug }}
                className="px-3 py-2 text-xs rounded-md border border-border bg-card hover:bg-muted">
                {x.catalogNumber} · {x.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-sm ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

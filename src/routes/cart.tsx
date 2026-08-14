import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { Vial } from "@/components/Vial";
import { KIT_DISCOUNT, lineId, useCart } from "@/components/CartProvider";
import { BRAND, CHECKOUT_POLICY_NOTICE, FREE_PRIORITY_THRESHOLD, MIN_ORDER_SUBTOTAL, formatPrice } from "@/lib/compliance";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — BH Research Materials" },
      { name: "description", content: "Review the research materials in your BH cart before checkout." },
      { property: "og:title", content: "Cart — BH Research Materials" },
      { property: "og:description", content: "Review the research materials in your BH cart." },
      { property: "og:url", content: `${BRAND.domain}/cart` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/cart` }],
  }),
  component: Cart,
});

function Cart() {
  const { lines, subtotal, savings, setQty, remove } = useCart();
  const belowMinimum = subtotal < MIN_ORDER_SUBTOTAL;
  const remaining = Math.max(0, MIN_ORDER_SUBTOTAL - subtotal);

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" /> Cart
          </h1>
          <div className="mt-6 max-w-2xl"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {lines.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Browse the catalog
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
            <ul className="space-y-4">
              {lines.map((l) => (
                <li key={lineId(l)} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row gap-4">
                  <Link to="/peptides/$slug" params={{ slug: l.slug }} className="shrink-0 self-center">
                    <Vial compound={l.name} packSize={l.size} className="h-28 w-auto" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to="/peptides/$slug" params={{ slug: l.slug }} className="font-semibold hover:text-primary">
                      {l.name}
                    </Link>
                    {l.kit && (
                      <span className="ml-2 rounded-full border border-primary/50 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        10-vial kit · 40% off
                      </span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Strength: {l.size}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.kit ? "Kit price" : "Unit price"}: {formatPrice(l.priceUSD)}
                      {l.kit && (
                        <>
                          {" "}
                          <span className="line-through">{formatPrice(Math.round(l.priceUSD / (1 - KIT_DISCOUNT)))}</span>
                        </>
                      )}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button aria-label="Decrease quantity" onClick={() => setQty(lineId(l), l.qty - 1)} className="h-9 w-9 grid place-items-center hover:bg-muted">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <input
                          aria-label={`Quantity for ${l.name} ${l.size}`}
                          value={l.qty}
                          onChange={(e) => setQty(lineId(l), Number(e.target.value.replace(/\D/g, "")) || 0)}
                          className="w-12 bg-transparent text-center text-sm tabular-nums outline-none"
                        />
                        <button aria-label="Increase quantity" onClick={() => setQty(lineId(l), l.qty + 1)} className="h-9 w-9 grid place-items-center hover:bg-muted">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => remove(lineId(l))} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Subtotal</p>
                    <p className="text-lg font-semibold tabular-nums text-primary">{formatPrice(l.priceUSD * l.qty)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 space-y-4">
              <h2 className="font-semibold">Order summary</h2>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {savings > 0 && (
                <div className="flex items-center justify-between text-sm text-primary">
                  <span>Kit savings</span>
                  <span className="font-semibold tabular-nums">−{formatPrice(savings)}</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                {subtotal >= FREE_PRIORITY_THRESHOLD
                  ? "Your order qualifies for free Priority shipping. Next-Day shipping remains a paid option."
                  : `Shipping calculated at checkout. Spend ${formatPrice(FREE_PRIORITY_THRESHOLD - subtotal)} more to qualify for free Priority shipping.`}
              </p>
              <p className="text-[11px] text-muted-foreground">Minimum order subtotal: {formatPrice(MIN_ORDER_SUBTOTAL)}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{CHECKOUT_POLICY_NOTICE}</p>
              {belowMinimum ? (
                <>
                  <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {formatPrice(MIN_ORDER_SUBTOTAL)} minimum order required. Add {formatPrice(remaining)} more to checkout.
                  </p>
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center rounded-md bg-primary/40 px-4 py-3 text-sm font-medium text-primary-foreground cursor-not-allowed"
                  >
                    Proceed to checkout
                  </button>
                </>
              ) : (
                <Link to="/checkout" className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Proceed to checkout
                </Link>
              )}
              <Link to="/catalog" className="w-full inline-flex items-center justify-center rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-muted">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND, LIVE_CHECKOUT_ENABLED, UNAVAILABLE_NOTICE } from "@/lib/compliance";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — BIOHACKERS" },
      { name: "description", content: "BIOHACKERS shopping cart. Online purchasing is currently unavailable pending payment-processor review." },
      { property: "og:url", content: `${BRAND.domain}/cart` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/cart` }],
  }),
  component: Cart,
});

function Cart() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" /> Cart
          </h1>
          <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          {!LIVE_CHECKOUT_ENABLED && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
              {UNAVAILABLE_NOTICE}
            </p>
          )}
          <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Browse the catalog
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">Before checkout</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Confirm you are 21+ and understand these materials are for research only</li>
            <li>Acceptance of the <Link to="/policies/terms-of-sale" className="text-primary hover:underline">Terms of Sale</Link> and <Link to="/policies/research-use" className="text-primary hover:underline">Research-Use Policy</Link></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

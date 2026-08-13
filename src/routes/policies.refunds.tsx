import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/refunds")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — BH Research Materials" },
      { name: "description", content: "BH refund and order-cancellation policy for laboratory research materials." },
      { property: "og:url", content: `${BRAND.domain}/policies/refunds` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/refunds` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Refund & Cancellation Policy">
      <h2>Order cancellations</h2>
      <p>BH may cancel any order that appears inconsistent with legitimate laboratory research, that fails compliance review, or that violates BH policies or applicable law.</p>
      <h2>Damaged or non-conforming shipments</h2>
      <p>Report shipping damage or non-conforming material within seven (7) days of delivery for replacement or refund review.</p>
      <h2>Non-refundable circumstances</h2>
      <p>Refund is not available for materials that have left cold-chain storage, been opened, tampered with, or otherwise rendered unfit for laboratory reference use.</p>
    </PolicyPage>
  ),
});

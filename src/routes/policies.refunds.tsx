import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND, SUPPORT_EMAIL } from "@/lib/compliance";

export const Route = createFileRoute("/policies/refunds")({
  head: () => ({
    meta: [
      { title: "Refund & Replacement Policy — BH Research Materials" },
      {
        name: "description",
        content:
          "BH Research Materials refund, replacement, and cancellation policy, including claim timeframes and how to file a claim.",
      },
      { property: "og:title", content: "Refund & Replacement Policy — BH Research Materials" },
      { property: "og:description", content: "How BH handles replacements, refunds, and cancellations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: `${BRAND.domain}/policies/refunds` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/refunds` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Refund & Replacement Policy">
      <p>
        Due to our rigorous quality-control standards and the nature of our products, we cannot accept ordinary
        returns.
      </p>
      <p>
        In the rare event that your order arrives with missing, incorrect, damaged, or defective items, please
        email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Our customer support team will review the
        issue and work to provide an appropriate resolution.
      </p>

      <h2>Cancellations</h2>
      <ul>
        <li>Cancellations must be requested by email before the order has shipped.</li>
        <li>Once an order has shipped, the order may no longer be cancelled.</li>
        <li>
          For cancellation requests, contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </li>
      </ul>

      <h2>Refund / replacement eligibility</h2>
      <h3>Damaged or defective products</h3>
      <ul>
        <li>If your product arrives damaged or defective, contact us within 7 days of delivery.</li>
        <li>Photographic evidence of the damage or defect may be required.</li>
        <li>
          If the claim is approved, we may provide either a replacement or refund depending on product
          availability and the circumstances of the claim.
        </li>
      </ul>
      <h3>Incorrect item received</h3>
      <ul>
        <li>If you receive an incorrect item, contact us within 7 days of receipt.</li>
        <li>
          We will review the claim and may arrange for the correct replacement or provide a refund if the correct
          item is unavailable.
        </li>
      </ul>
      <h3>Product not as described</h3>
      <ul>
        <li>
          If the product received materially differs from the description provided on the website, contact us
          within 7 days of delivery.
        </li>
        <li>We will review the issue and determine the appropriate resolution.</li>
      </ul>

      <h2>Non-eligible refund / replacement reasons</h2>
      <p>We generally cannot accept returns or provide refunds for:</p>
      <ul>
        <li>Change of mind after shipment.</li>
        <li>Orders placed incorrectly by the customer.</li>
        <li>Products that have been opened or used.</li>
        <li>Claims submitted outside the specified timeframe.</li>
      </ul>

      <h2>How to file a claim</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and include:
      </p>
      <ul>
        <li>Order number</li>
        <li>Photos of the product and issue, if applicable</li>
        <li>Brief description of the problem</li>
      </ul>
      <p>Once the claim has been reviewed, BH will aim to respond within 3 business days.</p>
    </PolicyPage>
  ),
});

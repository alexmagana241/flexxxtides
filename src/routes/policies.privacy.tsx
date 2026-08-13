import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BH Research Materials" },
      { name: "description", content: "BH Privacy Policy covering information collected during research-eligibility verification and order fulfillment." },
      { property: "og:url", content: `${BRAND.domain}/policies/privacy` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/privacy` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Privacy Policy">
      <h2>Information collected</h2>
      <ul>
        <li>Buyer name, organization, institutional email, and field of research collected during eligibility verification.</li>
        <li>Billing and shipping information required to fulfill orders.</li>
        <li>Order records, audit-log events, and correspondence.</li>
      </ul>
      <h2>Use of information</h2>
      <p>Information is used to verify research eligibility, fulfill orders, respond to inquiries, meet legal and regulatory obligations, and prevent misuse.</p>
      <h2>Sharing</h2>
      <p>BH does not sell customer information. Information may be shared with logistics, payment, and compliance partners as required to complete transactions, and with authorities when legally required.</p>
      <h2>Retention</h2>
      <p>Order and eligibility records are retained for the period required by applicable law and by payment-processor and shipping-carrier requirements.</p>
      <h2>Data-subject rights</h2>
      <p>Buyers may request access, correction, or deletion of their personal information subject to applicable law.</p>
    </PolicyPage>
  ),
});

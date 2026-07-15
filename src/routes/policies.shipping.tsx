import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — BIOHACKERS" },
      { name: "description", content: "BIOHACKERS shipping policy for laboratory research materials." },
      { property: "og:url", content: `${BRAND.domain}/policies/shipping` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/shipping` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Shipping Policy">
      <h2>Shipping destinations</h2>
      <p>Orders are shipped only to institutional or business addresses associated with a research organization. Residential addresses may result in cancellation.</p>
      <h2>Handling</h2>
      <p>Lyophilized materials are shipped as dry powder in sealed vials with appropriate packaging. Cold-chain shipping is used where required by the material's storage specification.</p>
      <h2>Restricted destinations</h2>
      <p>Certain jurisdictions or carriers may restrict shipment of specific materials. See the Restricted Products & Jurisdictions Policy.</p>
    </PolicyPage>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/restricted")({
  head: () => ({
    meta: [
      { title: "Restricted Products & Jurisdictions — BIOHACKERS" },
      { name: "description", content: "BIOHACKERS policy on restricted products, quantities, and shipping jurisdictions." },
      { property: "og:url", content: `${BRAND.domain}/policies/restricted` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/restricted` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Restricted Products & Jurisdictions">
      <h2>Restricted products</h2>
      <p>Certain catalog items may be unavailable for sale in specific jurisdictions or through specific payment processors. BIOHACKERS may automatically disable purchasing for any catalog item and display: "Online purchasing is currently unavailable for this catalog item."</p>
      <h2>Restricted quantities</h2>
      <p>BIOHACKERS may limit order quantities per buyer, per organization, or per shipping destination.</p>
      <h2>Restricted jurisdictions</h2>
      <p>Buyers are responsible for verifying that the materials they order can be lawfully received in their jurisdiction and used within the requirements of their institution.</p>
    </PolicyPage>
  ),
});

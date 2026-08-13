import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND, RESEARCH_USE_NOTICE } from "@/lib/compliance";

export const Route = createFileRoute("/policies/research-use")({
  head: () => ({
    meta: [
      { title: "Research-Use Policy — BH Research Materials" },
      { name: "description", content: "BH Research Materials-Use Policy: materials are supplied exclusively for laboratory, analytical, and non-clinical research." },
      { property: "og:url", content: `${BRAND.domain}/policies/research-use` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/research-use` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Research-Use Policy">
      <p><strong>{RESEARCH_USE_NOTICE}</strong></p>
      <h2>Purpose</h2>
      <p>BH supplies characterized reference peptides and related research materials exclusively to research organizations for laboratory, analytical, and non-clinical research applications.</p>
      <h2>Prohibited uses</h2>
      <ul>
        <li>Use in or on humans, including self-administration.</li>
        <li>Use in or on animals for any purpose.</li>
        <li>Compounding, formulation, or repackaging for consumer or patient use.</li>
        <li>Representation as a drug, food, dietary supplement, cosmetic, medical device, or veterinary product.</li>
        <li>Resale to consumers or to any party who does not agree to identical research-only terms.</li>
      </ul>
      <h2>Buyer responsibilities</h2>
      <p>Buyers are responsible for compliance with all applicable laws, institutional policies, biosafety requirements, hazard-communication requirements, and shipping and export regulations in their jurisdiction.</p>
      <h2>Enforcement</h2>
      <p>BH reserves the right to request documentation, reject orders, limit quantities, block accounts, cancel transactions, and report suspected unlawful activity when legally required.</p>
    </PolicyPage>
  ),
});

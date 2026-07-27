import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/terms-of-sale")({
  head: () => ({
    meta: [
      { title: "Terms of Sale — BIOHACKERS" },
      { name: "description", content: "Terms governing the sale of BIOHACKERS laboratory research materials." },
      { property: "og:url", content: `${BRAND.domain}/policies/terms-of-sale` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/terms-of-sale` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Terms of Sale">
      <h2>Scope</h2>
      <p>These terms govern the sale of BIOHACKERS laboratory research materials to qualified research organizations.</p>
      <h2>Eligibility</h2>
      <p>Purchases require a completed research-eligibility verification. BIOHACKERS may refuse or cancel any order at its discretion.</p>
      <h2>Documentation</h2>
      <p>A Certificate of Analysis is available for each supplied lot. Safety Data Sheets are provided on request.</p>
      <h2>Title and risk of loss</h2>
      <p>Title and risk of loss pass to the buyer upon delivery to the institutional shipping address on file.</p>
      <h2>Limitation of liability</h2>
      <p>BIOHACKERS materials are provided without warranty of fitness for any particular purpose beyond the analytical specifications documented on the Certificate of Analysis. Materials are not intended for use in or on humans or animals.</p>
      <h2>Governing law</h2>
    </PolicyPage>
  ),
});

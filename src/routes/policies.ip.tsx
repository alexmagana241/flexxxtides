import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/ip")({
  head: () => ({
    meta: [
      { title: "Intellectual Property Policy — BIOHACKERS" },
      { name: "description", content: "BIOHACKERS Intellectual Property Policy and reporting procedure." },
      { property: "og:url", content: `${BRAND.domain}/policies/ip` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/ip` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Intellectual Property Policy">
      <h2>BIOHACKERS content</h2>
      <p>The BIOHACKERS brand, website, catalog descriptions, and documentation are protected by copyright and trademark. Use of BIOHACKERS marks requires prior written permission.</p>
      <h2>Third-party rights</h2>
      <p>Product names of investigational or approved compounds referenced on this website are used only to identify the reference standard supplied and remain the property of their respective owners.</p>
      <h2>Reporting infringement</h2>
      <p>Send infringement notices via the Contact & Compliance page with sufficient detail to identify the material and the alleged infringement.</p>
    </PolicyPage>
  ),
});

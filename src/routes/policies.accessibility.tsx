import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — BH Research Materials" },
      { name: "description", content: "BH accessibility commitment and contact for accommodations." },
      { property: "og:url", content: `${BRAND.domain}/policies/accessibility` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/accessibility` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Accessibility Statement">
      <h2>Commitment</h2>
      <p>BH is committed to maintaining a website that is usable by research professionals with a wide range of abilities. We aim to conform to WCAG 2.1 AA guidance.</p>
      <h2>Feedback</h2>
      <p>If you encounter a barrier accessing content on this site, please contact BH through the Contact & Compliance page and describe the issue and the page URL.</p>
    </PolicyPage>
  ),
});

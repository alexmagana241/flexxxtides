import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/policies/acceptable-use")({
  head: () => ({
    meta: [
      { title: "Acceptable Use Policy — BH Research Materials" },
      { name: "description", content: "BH Acceptable Use Policy for research materials and website access." },
      { property: "og:url", content: `${BRAND.domain}/policies/acceptable-use` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/acceptable-use` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="Acceptable Use Policy">
      <h2>Use of the website</h2>
      <p>The BH website provides research-materials information to laboratory professionals. Do not use the website to solicit medical, veterinary, diagnostic, or personal-use guidance.</p>
      <h2>Use of the materials</h2>
      <p>Materials are supplied solely for laboratory, analytical, and non-clinical research. See the Research-Use Policy for the full list of prohibited uses.</p>
      <h2>Account activity</h2>
      <p>BH may suspend or terminate accounts that submit false information, attempt to evade compliance controls, or use the website to promote human or veterinary use.</p>
    </PolicyPage>
  ),
});

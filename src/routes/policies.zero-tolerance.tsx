import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND, CHEMICAL_SUPPLIER_STATEMENT } from "@/lib/compliance";

export const Route = createFileRoute("/policies/zero-tolerance")({
  head: () => ({
    meta: [
      { title: "BH Zero-Tolerance Policy — BH Research Materials" },
      {
        name: "description",
        content:
          "BH maintains a zero-tolerance policy regarding misuse of research materials. Products are sold for laboratory, analytical, and research use only.",
      },
      { property: "og:title", content: "BH Zero-Tolerance Policy — BH Research Materials" },
      { property: "og:description", content: "Zero-tolerance policy on prohibited human and veterinary use of BH research materials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: `${BRAND.domain}/policies/zero-tolerance` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/zero-tolerance` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="BH Zero-Tolerance Policy">
      <p>
        BH maintains a zero-tolerance policy regarding the misuse of products offered through BH Research
        Materials. Products are sold for legitimate research, laboratory, or analytical purposes only.
      </p>
      <h2>Prohibited uses</h2>
      <p>Products must not be purchased or used for:</p>
      <ul>
        <li>Human administration</li>
        <li>Human consumption</li>
        <li>Veterinary administration</li>
        <li>Animal consumption</li>
        <li>Therapeutic use</li>
        <li>Diagnostic use</li>
        <li>Self-experimentation</li>
        <li>Unauthorized medical purposes</li>
        <li>Other prohibited uses</li>
      </ul>
      <h2>Enforcement</h2>
      <p>
        BH may refuse, cancel, or restrict service when communications or other information reasonably indicate
        that products are being sought for prohibited purposes. BH does not provide human dosing, injection,
        administration, or similar prohibited-use instructions.
      </p>
      <p>Acceptance of this policy is required during checkout.</p>
      <h2>Chemical supplier status</h2>
      <p>{CHEMICAL_SUPPLIER_STATEMENT}</p>
    </PolicyPage>
  ),
});

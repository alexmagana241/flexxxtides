// Single source of truth for BIOHACKERS research-only compliance strings.
// Do not fork these values into other files.

export const BRAND = {
  name: "BIOHACKERS",
  tagline: "Research materials for laboratory use.",
  domain: "https://flexxxtides.lovable.app",
} as const;

export const RESEARCH_USE_NOTICE =
  "FOR RESEARCH USE ONLY. NOT FOR HUMAN OR VETERINARY USE. NOT FOR CLINICAL, DIAGNOSTIC, THERAPEUTIC, PROPHYLACTIC, FOOD, DRUG, COSMETIC, HOUSEHOLD, OR CONSUMER USE.";

export const FOOTER_NOTICE =
  "BIOHACKERS supplies materials exclusively for legitimate laboratory, analytical, and non-clinical research. Products are not intended for human or veterinary use and are not offered as drugs, foods, dietary supplements, cosmetics, medical devices, or veterinary products. Nothing on this website constitutes medical, veterinary, diagnostic, or treatment advice.";

export const CHECKOUT_CERTIFICATION =
  "By submitting this order, I certify that every item is being purchased exclusively for legitimate laboratory, analytical, or non-clinical research and will not be used in or on humans or animals.";

export const UNAVAILABLE_NOTICE =
  "Online purchasing is currently unavailable for this catalog item.";

// Live checkout is intentionally disabled until legal + payment-processor
// approval is documented. Do not flip this to true from code alone.
export const LIVE_CHECKOUT_ENABLED = false;

export const POLICY_VERSION = "2026-07-15";

export const ELIGIBILITY_AFFIRMATIONS: string[] = [
  "I am purchasing exclusively for legitimate laboratory, analytical, or non-clinical research.",
  "I will not use, administer, ingest, inject, inhale, apply, prescribe, compound, redistribute, or provide these materials for human or veterinary use.",
  "I understand that these materials are not medicines, dietary supplements, cosmetics, foods, or veterinary products.",
  "I understand that no information on this website constitutes medical, veterinary, diagnostic, or treatment advice.",
  "I agree not to resell these products to consumers or represent them as suitable for personal use.",
];

export const POLICY_LINKS: { to: string; label: string }[] = [
  { to: "/policies/research-use", label: "Research-Use Policy" },
  { to: "/policies/terms-of-sale", label: "Terms of Sale" },
  { to: "/policies/privacy", label: "Privacy Policy" },
  { to: "/policies/shipping", label: "Shipping Policy" },
  { to: "/policies/restricted", label: "Restricted Products & Jurisdictions" },
  { to: "/policies/refunds", label: "Refund & Cancellation Policy" },
  { to: "/policies/acceptable-use", label: "Acceptable Use Policy" },
  { to: "/policies/ip", label: "Intellectual Property Policy" },
  { to: "/policies/accessibility", label: "Accessibility Statement" },
];

export type EligibilityRecord = {
  fullName: string;
  organization: string;
  email: string;
  field: string;
  proposedUse: string;
  billingAddress: string;
  shippingAddress: string;
  is18: boolean;
  authorized: boolean;
  affirmations: boolean[];
  policyVersion: string;
  timestamp: string;
};

const KEY = "biohackers_eligibility";

export function readEligibility(): EligibilityRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EligibilityRecord;
    if (parsed.policyVersion !== POLICY_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeEligibility(rec: EligibilityRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(rec));
}

export function clearEligibility() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

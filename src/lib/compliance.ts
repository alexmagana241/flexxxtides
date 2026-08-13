// Single source of truth for BH Research Materials research-only compliance strings.
// Do not fork these values into other files.

export const BRAND = {
  name: "BH Research Materials",
  legalName: "BH",
  tagline: "Research materials for laboratory use.",
  domain: "https://flexxxtides.lovable.app",
  email: "flexxxinc2022@gmail.com",
} as const;

/** Official company email used everywhere on the site. */
export const SUPPORT_EMAIL = "flexxxinc2022@gmail.com";

/** Free Priority shipping threshold (cart subtotal, USD). */
export const FREE_PRIORITY_THRESHOLD = 150;

export const RESEARCH_USE_NOTICE =
  "FOR RESEARCH USE ONLY. NOT FOR HUMAN OR VETERINARY USE. NOT FOR CLINICAL, DIAGNOSTIC, THERAPEUTIC, PROPHYLACTIC, FOOD, DRUG, COSMETIC, HOUSEHOLD, OR CONSUMER USE.";

export const CHEMICAL_SUPPLIER_STATEMENT =
  "BH is a chemical supplier. BH is not a compounding pharmacy or chemical compounding facility as defined under Section 503A of the Federal Food, Drug, and Cosmetic Act. BH is not an outsourcing facility as defined under Section 503B of the Federal Food, Drug, and Cosmetic Act. All products are sold for research, laboratory, or analytical purposes only and are not for human consumption. The products offered on this platform are not formulated, designed, or intended to diagnose, cure, mitigate, treat, or prevent any disease or medical condition.";

export const CHECKOUT_POLICY_NOTICE =
  "At checkout, you are required to acknowledge and agree to both the BH Zero-Tolerance Policy regarding prohibited human and veterinary use and the BH Terms and Conditions as part of your order process. Failure to comply with these guidelines may result in refusal of service.";

export const FOOTER_NOTICE =
  "BH supplies materials exclusively for legitimate laboratory, analytical, and non-clinical research. Products are not intended for human or veterinary use and are not offered as drugs, foods, dietary supplements, cosmetics, medical devices, or veterinary products. Nothing on this website constitutes medical, veterinary, diagnostic, or treatment advice.";

export const CHECKOUT_CERTIFICATION =
  "By submitting this order, I certify that every item is being purchased exclusively for legitimate laboratory, analytical, or non-clinical research and will not be used in or on humans or animals.";

export const UNAVAILABLE_NOTICE = "";

// Online checkout is enabled.
export const LIVE_CHECKOUT_ENABLED = true;

export const POLICY_VERSION = "2026-08-13";

// Two-checkbox confirmation model (age 21+ and research-only acknowledgement).
export const CONFIRMATIONS = {
  age21: "I confirm I am 21 years of age or older.",
  researchOnly:
    "I understand and agree these products are for laboratory research only and are not intended for human consumption or veterinary use.",
} as const;

export const POLICY_LINKS: { to: string; label: string }[] = [
  { to: "/policies/terms-of-sale", label: "BH Terms and Conditions" },
  { to: "/policies/zero-tolerance", label: "BH Zero-Tolerance Policy" },
  { to: "/policies/research-use", label: "Research-Use Policy" },
  { to: "/policies/privacy", label: "Privacy Policy" },
  { to: "/policies/shipping", label: "Shipping Policy" },
  { to: "/policies/restricted", label: "Restricted Products & Jurisdictions" },
  { to: "/policies/refunds", label: "Refund & Replacement Policy" },
  { to: "/policies/acceptable-use", label: "Acceptable Use Policy" },
  { to: "/policies/ip", label: "Intellectual Property Policy" },
  { to: "/policies/accessibility", label: "Accessibility Statement" },
];


export type ConfirmationRecord = {
  age21: boolean;
  researchOnly: boolean;
  policyVersion: string;
  timestamp: string;
};

const KEY = "biohackers_confirmation";

export function readConfirmation(): ConfirmationRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConfirmationRecord;
    if (parsed.policyVersion !== POLICY_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConfirmation(rec: ConfirmationRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(rec));
}

export function clearConfirmation() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

// Back-compat shims — older components imported these names. Purchasing is
// no longer gated; these always resolve as a permissive read/no-op write.
export const ELIGIBILITY_AFFIRMATIONS: string[] = [];
export type EligibilityRecord = ConfirmationRecord;
export const readEligibility = readConfirmation;
export const writeEligibility = writeConfirmation;
export const clearEligibility = clearConfirmation;

export function formatPrice(usd: number): string {
  return Math.round(usd).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

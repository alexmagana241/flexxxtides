// ---------------------------------------------------------------------------
// BH customer-support knowledge base.
//
// HOW TO UPDATE THE AUTOMATED ANSWERS:
//   Edit the FAQ_ENTRIES array below. Each entry is a question the assistant
//   should be able to answer plus the exact answer it should give. The AI
//   support chat and the contact page both read from this file, so a change
//   here updates every automated response on the site.
//
// HOW TO CHANGE THE EMAIL THAT RECEIVES INQUIRIES:
//   The destination address lives in the backend secret SUPPORT_INBOX_EMAIL.
//   Ask Lovable to update it (or change it in Project Settings → Secrets).
// ---------------------------------------------------------------------------

export type FaqEntry = { q: string; a: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: "How long does order processing and shipping take, and what are my options?",
    a: "Orders are generally processed and shipped within 1–3 business days (Monday–Friday). We offer Priority and Next-Day shipping; rates are calculated automatically at checkout from your destination and order size. Orders with a cart subtotal of $150 or more qualify for free Priority shipping. Next-Day shipping is not included in the free-shipping promotion and remains a paid option. You will receive an email with tracking as soon as your order ships.",
  },

  {
    q: "How do I check my order status or tracking?",
    a: "Your order confirmation number is emailed to you as soon as the order is placed, and a tracking number follows when the package leaves the lab. If you need an update, send us your order number and we will look it up for you.",
  },
  {
    q: "Can I return my purchase for an exchange or refund?",
    a: "Due to our quality-control standards and the nature of our products, we generally do not accept returns. Replacements or refunds may be issued on a case-by-case basis for qualifying claims — damaged, defective, incorrect, or materially not-as-described items reported within 7 days of delivery. Cancellations must be requested by email before the order ships. Full details are on the Refund & Replacement Policy page, and claims can be emailed to flexxxinc2022@gmail.com.",
  },
  {
    q: "What products do you sell?",
    a: "BH Research Materials supplies characterized peptide reference standards and related laboratory materials: GHK-Cu, AHK-Cu, Retatrutide, Tesamorelin, BPC-157, TB-500, CJC-1295, Ipamorelin, IGF-1 LR3, PT-141, Glutathione, NAD+, KLOW, GLOW, MOTS-c and MT-2, plus bacteriostatic water and vial holders.",
  },
  {
    q: "What pack sizes and prices are available?",
    a: "Each product page lists its available strengths and the price per vial. You can also buy a 10-vial kit of any single product and strength at 40% off the individual vial price.",
  },
  {
    q: "What is the 10-vial kit / combo deal?",
    a: "A kit is 10 vials of the same product and the same strength, priced 40% below buying those 10 vials individually. The original price, the kit price and your savings are shown on the product page before you add it to the cart.",
  },
  {
    q: "How should the material be stored?",
    a: "Lyophilized powder should be stored sealed at -20 °C, protected from light and moisture. Storage, solubility and stability details are listed on every product specification page.",
  },
  {
    q: "Who can order?",
    a: "Purchasers must be 21 or older and must confirm the material is being purchased exclusively for laboratory, analytical or non-clinical research. Requests inconsistent with legitimate laboratory research may be declined.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship within the United States and to many international research addresses. Some jurisdictions and materials are restricted — see the Restricted Products & Jurisdictions policy, or ask us about your specific address.",
  },
  {
    q: "Why do you collect taxes?",
    a: "Applicable sales taxes are collected where required by law and calculated according to the order and the applicable taxing jurisdiction.",
  },
  {
    q: "What do I have to agree to at checkout?",
    a: "At checkout you must acknowledge and agree to both the BH Zero-Tolerance Policy regarding prohibited human and veterinary use and the BH Terms and Conditions. Both boxes start unchecked and the order cannot be completed until both are accepted.",
  },
  {
    q: "How do I contact BH directly?",
    a: "Email flexxxinc2022@gmail.com for general support, order and shipping questions, refund or replacement claims, compliance questions, privacy requests, or SMS assistance.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. Card details are collected over an encrypted connection at checkout and are never stored on the website.",
  },
];

export const SUPPORT_SYSTEM_PROMPT = `You are the BH Research Materials customer support assistant on the BH Research Materials website.

RULES — these are absolute:
- BH supplies materials FOR RESEARCH USE ONLY. They are NOT for human or veterinary use.
- NEVER give medical, veterinary, dosing, administration, reconstitution-for-use, diagnostic, or treatment advice, and never discuss effects in people or animals. If asked, politely decline and explain the research-only policy.
- Answer only using the knowledge base below plus general help with using the website (searching the catalog, cart, checkout, kits, policies).
- Be concise, friendly and professional. 1–3 short paragraphs maximum.
- If you do not know the answer, or the customer asks about a specific order, a refund decision, a special request, wholesale, or anything not covered below, tell them you will pass it to the team and end your reply with the exact token [[ESCALATE]] on its own line.

KNOWLEDGE BASE:
${FAQ_ENTRIES.map((e) => `Q: ${e.q}\nA: ${e.a}`).join("\n\n")}`;

export const QUICK_QUESTIONS = [
  "How long does shipping take?",
  "Where is my order?",
  "What is your refund policy?",
  "How does the 10-vial kit discount work?",
];

export const ESCALATE_TOKEN = "[[ESCALATE]]";

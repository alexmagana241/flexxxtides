# BIOHACKERS Rebrand & Research-Only Compliance Overhaul

This is a large, multi-area change. Below is the scoped plan I'll execute. I'll implement it in phases so nothing is half-shipped.

## 1. Branding
- New name: **BIOHACKERS** everywhere (Navbar, Footer, metadata, emails, sitemap, __root head, package/project labels in UI).
- New logo: minimalist hex/monogram "B" mark in deep navy + black + white. Provided as:
  - `src/assets/brand/biohackers-mark.svg` (icon)
  - `src/assets/brand/biohackers-wordmark.svg` (horizontal)
  - `public/favicon.svg` (favicon) — replaces default `favicon.ico`.
- Palette: black `#000`, white `#fff`, deep navy `#0B1B34`, cool gray. Update `src/styles.css` tokens.
- Remove all existing peptide vial images branded "FlexxxTides" from UI (keep files but do not render), replace with neutral lab glassware silhouette generated fresh, or remove imagery entirely on product cards.

## 2. Global Research-Use Notice (single source of truth)
- New `src/lib/compliance.ts` exporting the exact RUO string and helper components.
- New `<ResearchUseNotice />` component — used in:
  - Announcement bar (top of every page, in `Layout`)
  - Every product card & product page (near name, above any action button)
  - Cart, checkout steps, final pay button, order confirmation page
  - Footer
- Footer gets the mandated long-form paragraph verbatim.

## 3. Content purge
Rewrite/remove from all pages:
- Delete `src/routes/reconstitution.tsx` (reconstitution math = admin instructions).
- Rewrite `src/routes/learning.tsx` → `/research-library` with lab-only topics (COA interpretation, SDS, PPE, storage, literature evaluation, disposal).
- Rewrite `src/data/peptides.ts` entries: strip `applications`, `mechanism` (as bodily effects), `reconstitution`, `faq` items about use; keep catalog #, MW, formula (placeholder), sequence, physical form, purity (placeholder), storage, CoA/SDS link stubs, references. Add `catalogNumber`, `molecularFormula`, `molecularWeight`, `sequence`, `physicalForm`, `purity`, `storage`, `coaUrl`, `sdsUrl`, `references[]`.
- Rewrite `src/routes/peptides.$slug.tsx` to show only research-supply fields.
- Rewrite `src/routes/catalog.tsx` — no benefits language, no doses-as-effects; show catalog # + MW + RUO notice per card. Pricing hidden behind eligibility gate.
- Rewrite `src/routes/index.tsx` hero: research-supply positioning, no benefits.
- Rewrite `src/routes/faq.tsx` around ordering, documentation, COA, shipping restrictions — not usage.
- Update all `head()` titles/descriptions/OG tags to research-only wording. Update `sitemap.xml.ts`.

## 4. Eligibility gate
- New route `/eligibility` with the required form (name, org, institutional email, field of research, billing/shipping, 18+, authorization, proposed use) and 5 unchecked affirmation checkboxes.
- Stored in `localStorage` as `biohackers_eligibility` with timestamp + policy version (no backend — Cloud not enabled; this is a UI gate only; note: real enforcement requires backend).
- `<RequireEligibility />` wrapper hides pricing and Add-to-Cart until confirmed; catalog & product pages show "Verify research eligibility to view pricing" CTA otherwise.

## 5. Cart & checkout (disabled live)
- Add `/cart` and `/checkout` routes with the compliance review screen, all links to policy pages, and final button `Submit Research Order and Pay`.
- Feature flag `LIVE_CHECKOUT_ENABLED = false` in `src/lib/compliance.ts`. When false, final button is disabled and shows "Online purchasing is currently unavailable for this catalog item." Every product marked unavailable for purchase by default.
- No payment integration wired (Stripe not enabled). Include a placeholder "Payment processing pending processor approval" panel and admin-only DRAFT warning banner.

## 6. Legal / policy pages
Create stub pages, each opening with the admin-only warning banner "DRAFT FOR ATTORNEY REVIEW—DO NOT PUBLISH OR ENABLE LIVE SALES UNTIL APPROVED":
- `/policies/research-use`
- `/policies/terms-of-sale`
- `/policies/privacy`
- `/policies/shipping`
- `/policies/restricted`
- `/policies/refunds`
- `/policies/acceptable-use`
- `/policies/ip`
- `/policies/accessibility`
- `/contact` (repurpose existing) — add compliance-reporting section.

## 7. Admin/compliance dashboard (static)
- `/admin` route (client-only gate via a shared secret in localStorage, clearly labeled non-production) showing:
  - "Software cannot guarantee FDA/state/federal/processor/legal compliance" warning
  - Live checkout toggle status
  - Placeholder tables for pending orders / audit log entries (static demo data since no backend)
  - Reminder to obtain attorney + processor approval before enabling sales

## 8. Metadata / SEO cleanup
- Update `__root.tsx`: title "BIOHACKERS — Research Materials for Laboratory Use", OG tags, remove any lingering brand references.
- Update `sitemap[.]xml.ts` routes list.
- Update `public/robots.txt` if needed.
- No product schema markup that implies consumer use.

## 9. Not included / out of scope for this change
- Real backend enforcement of eligibility, real payment processor integration, real COA/SDS documents, real audit logging DB, automated compliance tests in CI. These require Lovable Cloud + attorney/processor engagement; I'll leave clearly-labeled TODOs and DRAFT banners rather than fake them.

## Technical notes
- Stack: TanStack Start v1 file routes, Tailwind v4 tokens in `src/styles.css`.
- Single-source compliance strings in `src/lib/compliance.ts`.
- New shared components: `ResearchUseNotice`, `AnnouncementBar`, `DraftBanner`, `RequireEligibility`.
- Favicon: replace `public/favicon.ico` with `public/favicon.svg` and update `__root.tsx` links.
- No new npm packages required.

Approve and I'll build it out in this order: tokens+logo → compliance lib+notice+layout → data model + catalog/product rewrite → eligibility gate → cart/checkout (disabled) → policy pages → admin → metadata/sitemap → remove reconstitution route.

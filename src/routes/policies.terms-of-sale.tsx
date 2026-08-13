import { createFileRoute, Link } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { BRAND, CHEMICAL_SUPPLIER_STATEMENT, SUPPORT_EMAIL } from "@/lib/compliance";

export const Route = createFileRoute("/policies/terms-of-sale")({
  head: () => ({
    meta: [
      { title: "BH Terms and Conditions — BH Research Materials" },
      {
        name: "description",
        content:
          "General Terms and Conditions of Use governing the BH Research Materials website, purchases, SMS messaging, disclaimers, and product use.",
      },
      { property: "og:title", content: "BH Terms and Conditions — BH Research Materials" },
      { property: "og:description", content: "Terms and Conditions governing use of the BH Research Materials website and purchases." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: `${BRAND.domain}/policies/terms-of-sale` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/policies/terms-of-sale` }],
  }),
  component: () => (
    <PolicyPage eyebrow="Policy" title="BH Terms and Conditions">
      <h2>General Terms and Conditions of Use Agreement</h2>
      <p>
        These Terms and Conditions govern users of the BH Research Materials website and must be agreed to before
        a purchase can be completed.
      </p>
      <p>
        When completing an order, the purchaser authorizes BH and its applicable payment-processing providers to
        process the payment method supplied for the amount shown at checkout.
      </p>
      <p>Customers are responsible for reviewing their order information before selecting Place Order.</p>

      <h2>Use of our website</h2>
      <ul>
        <li>
          Unless otherwise specified, use of the BH Research Materials website is governed by these Terms and
          Conditions and the <Link to="/policies/privacy">BH Privacy Policy</Link>.
        </li>
        <li>
          Website materials may be displayed, downloaded, or printed for personal, non-commercial informational
          purposes unless otherwise stated.
        </li>
        <li>
          Website content may not be reproduced, distributed, published, licensed, transferred, or commercially
          exploited without authorization from BH where such authorization is legally required.
        </li>
      </ul>

      <h2>Use of information</h2>
      <ul>
        <li>This website provides information for informational, educational, analytical, and laboratory-research purposes.</li>
        <li>
          Information available through BH Research Materials is not medical advice and must not be used as a
          substitute for advice from qualified professionals.
        </li>
        <li>Products offered through BH Research Materials are sold for laboratory research purposes only.</li>
        <li>
          Information provided on this website and products offered through this website are intended for
          legitimate laboratory and research applications.
        </li>
        <li>
          Products are not medicines or approved therapeutic products and are not offered for the prevention,
          treatment, diagnosis, mitigation, or cure of any disease, ailment, or medical condition.
        </li>
      </ul>
      <p>
        <strong>
          ALL ARTICLES AND PRODUCT INFORMATION PROVIDED ON THIS WEBSITE ARE FOR INFORMATIONAL, EDUCATIONAL,
          RESEARCH, OR ANALYTICAL PURPOSES ONLY.
        </strong>
      </p>
      <p>
        Products offered through BH Research Materials are:{" "}
        <strong>NOT FOR HUMAN OR VETERINARY USE OR CONSUMPTION.</strong>
      </p>

      <h2>SMS messaging terms</h2>
      <p>
        By providing a mobile phone number to BH and affirmatively opting into applicable SMS communications, you
        consent to receive SMS/text messages from BH regarding account activity, orders, customer-support
        inquiries, delivery updates, product information, promotional communications where separately authorized,
        and other applicable business communications.
      </p>
      <ul>
        <li>Message frequency may vary.</li>
        <li>Message and data rates may apply.</li>
        <li>Reply STOP to applicable SMS communications to opt out.</li>
        <li>Reply HELP for assistance.</li>
        <li>
          Customers may also contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </li>
        <li>Consent to receive marketing text messages is not a condition of purchase.</li>
        <li>
          By opting into SMS communications, the customer represents that they are authorized to use the mobile
          phone number provided.
        </li>
      </ul>
      <p>
        Mobile information, including phone numbers and SMS consent records, will not be shared with third parties
        or affiliates for their independent marketing or promotional purposes. Information may be shared with
        service providers as necessary to provide messaging services, process transactions, provide customer
        support, or otherwise operate BH in accordance with the BH Privacy Policy.
      </p>

      <h2>Disclaimer</h2>
      <p>
        <strong>YOU MUST BE AT LEAST 21 YEARS OLD TO USE THIS WEBSITE AND PURCHASE PRODUCTS.</strong>
      </p>
      <p>
        Products offered through BH Research Materials are intended for{" "}
        <strong>IN VITRO LABORATORY RESEARCH USE ONLY.</strong> Products are{" "}
        <strong>NOT FOR HUMAN OR VETERINARY USE OR CONSUMPTION OF ANY KIND</strong> and are{" "}
        <strong>NOT INTENDED TO DIAGNOSE, CURE, MITIGATE, TREAT, OR PREVENT DISEASE.</strong>
      </p>
      <ul>
        <li>
          The materials are not intended for use as food additives, drugs, household chemicals, or other
          unauthorized applications.
        </li>
        <li>Products should be handled only by qualified and properly trained research or laboratory personnel.</li>
      </ul>
      <p>Customers are responsible for understanding:</p>
      <ul>
        <li>Appropriate laboratory/research uses of purchased products.</li>
        <li>Applicable government regulations.</li>
        <li>Health and safety hazards associated with handling purchased materials.</li>
        <li>Appropriate laboratory safety controls.</li>
        <li>Proper warnings and handling procedures.</li>
      </ul>
      <p>BH reserves the right to limit or deny sales to customers who do not meet applicable purchasing requirements.</p>

      <h2>Product use</h2>
      <p>
        Products offered by BH Research Materials are intended for legitimate laboratory and in-vitro research
        purposes only. They are not intended for:
      </p>
      <ul>
        <li>Human use</li>
        <li>Human consumption</li>
        <li>Veterinary use</li>
        <li>Animal consumption</li>
        <li>Therapeutic use</li>
        <li>Diagnostic use</li>
        <li>Food use</li>
        <li>Drug use</li>
        <li>Unauthorized cosmetic applications</li>
        <li>Other unauthorized applications</li>
      </ul>
      <ul>
        <li>
          Purchasers are responsible for ensuring that products are handled and used in compliance with applicable
          laws and regulations.
        </li>
        <li>
          Purchasers are responsible for understanding the hazards associated with products and implementing
          appropriate laboratory safety procedures.
        </li>
        <li>
          BH does not provide instructions or recommendations concerning human administration, human dosing,
          injection, or similar prohibited applications.
        </li>
        <li>
          Communications indicating an intention to use products in a prohibited manner may result in refusal or
          cancellation of service.
        </li>
      </ul>

      <h2>Qualified purchasers</h2>
      <p>
        Purchasers represent that products are being acquired for legitimate research or laboratory purposes and
        that they possess the appropriate qualifications, affiliations, facilities, or authorization required for
        the applicable research activity. Applicable affiliations may include:
      </p>
      <ul>
        <li>Laboratories</li>
        <li>Research institutions</li>
        <li>Universities</li>
        <li>Research facilities</li>
        <li>Other qualified research organizations</li>
      </ul>
      <p>
        BH reserves the right to request additional information and to refuse transactions when purchasing
        eligibility cannot be established or when information indicates prohibited use.
      </p>

      <h2>Chemical supplier status</h2>
      <p>{CHEMICAL_SUPPLIER_STATEMENT}</p>

      <h2>Disclaimer of warranties</h2>
      <ul>
        <li>
          BH Research Materials website content, services, and products are provided on an “as is” and “as
          available” basis to the fullest extent permitted by applicable law.
        </li>
        <li>BH does not warrant that website operation will always be uninterrupted or error-free.</li>
        <li>
          BH does not warrant that all website information will always be complete, current, or free from
          technical inaccuracies.
        </li>
        <li>Prices and availability are subject to change without notice.</li>
        <li>
          Users are responsible for maintaining appropriate protection and backups for their devices and data when
          accessing the website.
        </li>
        <li>
          To the fullest extent permitted by applicable law, BH disclaims applicable implied warranties, including
          warranties of merchantability, fitness for a particular purpose, and non-infringement, except where such
          disclaimers are prohibited by law.
        </li>
      </ul>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, BH will not be responsible for indirect, incidental,
        special, consequential, or punitive damages arising from use of the website or products. Nothing in these
        Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law.
        Customers are responsible for the lawful and appropriate handling of materials purchased through BH
        Research Materials.
      </p>

      <h2>Agreement to abide by applicable laws</h2>
      <ul>
        <li>
          By using BH Research Materials, users agree to comply with applicable local, state, federal, provincial,
          and international laws and regulations relating to the website and products.
        </li>
        <li>
          Customers are responsible for determining whether purchasing, possessing, importing, handling, or using
          a particular product is lawful within their jurisdiction.
        </li>
        <li>BH reserves the right to restrict or refuse orders when appropriate.</li>
      </ul>

      <h2>International orders</h2>
      <p>Product availability may vary by jurisdiction. International customers are responsible for understanding and complying with applicable:</p>
      <ul>
        <li>Import requirements</li>
        <li>Taxes</li>
        <li>Duties</li>
        <li>Permits</li>
        <li>Certifications</li>
        <li>Licenses</li>
        <li>Registrations</li>
        <li>Product restrictions</li>
      </ul>
      <p>
        BH reserves the right to restrict or refuse orders based on applicable legal, regulatory, shipping, or
        compliance considerations.
      </p>

      <h2>Governing law and jurisdiction</h2>
      <p>
        <em>
          [Pending final owner/legal configuration — governing law and venue have not yet been designated. No
          jurisdiction is asserted in this section until it is completed by BH and its legal counsel.]
        </em>
      </p>

      <h2>Severability</h2>
      <p>
        If any provision of these Terms and Conditions is determined to be invalid or unenforceable, that provision
        will be limited or removed to the minimum extent necessary, and the remaining provisions will remain in
        effect to the extent permitted by applicable law.
      </p>

      <h2>Force majeure</h2>
      <p>
        To the extent permitted by applicable law, BH will not be responsible for delays or failures resulting from
        circumstances beyond its reasonable control, including carrier delays, customs delays, natural disasters,
        service interruptions, or other events outside BH's reasonable control.
      </p>

      <h2>Complete agreement</h2>
      <p>
        These Terms and Conditions, together with applicable policies incorporated by reference, constitute the
        agreement governing use of BH Research Materials and applicable purchases. When placing an order, customers
        must affirmatively agree to the{" "}
        <Link to="/policies/terms-of-sale">BH Terms and Conditions</Link> and the{" "}
        <Link to="/policies/zero-tolerance">BH Zero-Tolerance Policy</Link>. Applicable{" "}
        <Link to="/policies/shipping">Shipping</Link>, <Link to="/policies/privacy">Privacy</Link>, and{" "}
        <Link to="/policies/refunds">Refund & Replacement</Link> Policies remain part of the website's governing
        policies. If a customer does not agree to the applicable Terms and Policies, the customer should not
        complete a purchase.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms may be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </PolicyPage>
  ),
});

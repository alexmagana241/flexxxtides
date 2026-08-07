import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { Vial } from "@/components/Vial";
import { lineId, useCart } from "@/components/CartProvider";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import {
  BRAND,
  CHECKOUT_CERTIFICATION,
  CONFIRMATIONS,
  formatPrice,
} from "@/lib/compliance";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — BIOHACKERS" },
      { name: "description", content: "Complete your BIOHACKERS research materials order securely." },
      { property: "og:title", content: "Checkout — BIOHACKERS" },
      { property: "og:description", content: "Secure checkout for BIOHACKERS research materials." },
      { property: "og:url", content: `${BRAND.domain}/checkout` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/checkout` }],
  }),
  component: Checkout,
});

type ShipMethod = "standard" | "express";
type Shipping = { method: ShipMethod; label: string; priceUSD: number };

// Automated zone-based rate calculation.
const ZONE_2 = ["CA", "OR", "WA", "NV", "AZ", "ID", "UT"]; // west
const ZONE_4 = ["AK", "HI", "PR"]; // remote

function shippingZone(country: string, state: string): number {
  const c = country.trim().toLowerCase();
  if (c && !["united states", "usa", "us", "united states of america"].includes(c)) return 5;
  const s = state.trim().toUpperCase();
  if (ZONE_4.includes(s)) return 4;
  if (ZONE_2.includes(s)) return 2;
  return 3;
}

function shippingOptions(country: string, state: string, weightUnits: number): Shipping[] {
  const zone = shippingZone(country, state);
  const zoneFee = { 2: 0, 3: 4, 4: 14, 5: 26 }[zone] ?? 4;
  const handling = Math.max(0, Math.ceil(weightUnits / 10) - 1) * 3;
  return [
    {
      method: "standard",
      label: "Standard shipping (4–7 business days)",
      priceUSD: 9 + zoneFee + handling,
    },
    {
      method: "express",
      label: "Express shipping (2–3 business days)",
      priceUSD: 22 + Math.round(zoneFee * 1.5) + handling,
    },
  ];
}


const STEPS = ["Customer", "Shipping", "Payment", "Review"] as const;

export function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);

  // Customer
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");

  // Shipping address
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [shipMethod, setShipMethod] = useState<ShipMethod>("standard");

  // Billing
  const [billingSame, setBillingSame] = useState(true);
  const [bAddr1, setBAddr1] = useState("");
  const [bCity, setBCity] = useState("");
  const [bState, setBState] = useState("");
  const [bZip, setBZip] = useState("");

  // Payment
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingZip, setBillingZip] = useState("");

  // Confirmations
  const [age21, setAge21] = useState(false);
  const [researchOnly, setResearchOnly] = useState(false);
  const [certify, setCertify] = useState(false);

  const vialCount = lines.reduce((n, l) => n + l.qty * (l.kit ? KIT_VIALS : 1), 0);
  const shipOptions = shippingOptions(country, state, vialCount);
  const ship = shipOptions.find((s) => s.method === shipMethod) ?? shipOptions[0]!;
  const shippingCost = lines.length ? ship.priceUSD : 0;
  const total = subtotal + shippingCost;


  const digits = cardNumber.replace(/\D/g, "");
  const customerOk = /\S+@\S+\.\S+/.test(email) && firstName.trim() !== "" && lastName.trim() !== "";
  const shippingOk =
    addr1.trim() !== "" && city.trim() !== "" && state.trim() !== "" && zip.trim().length >= 4 &&
    (billingSame || (bAddr1.trim() !== "" && bCity.trim() !== "" && bState.trim() !== "" && bZip.trim().length >= 4));
  const paymentOk =
    cardName.trim() !== "" &&
    digits.length >= 15 &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvv) &&
    billingZip.trim().length >= 4;
  const reviewOk = age21 && researchOnly && certify;

  const stepOk = [customerOk, shippingOk, paymentOk, reviewOk][step];

  if (placed) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold">Order confirmed</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you. Your order <span className="font-mono text-foreground">{placed.id}</span> has been received.
            A confirmation and tracking details will be emailed to {email || "your email"}.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Order total: <span className="font-semibold text-foreground">{formatPrice(placed.total)}</span></p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Continue shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (lines.length === 0) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Add research materials to your cart before checking out.</p>
          <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Browse the catalog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Secure checkout</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Checkout</h1>
          <ol className="mt-6 flex flex-wrap gap-2 text-xs">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`rounded-md border px-3 py-1.5 ${
                  i === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : i < step
                      ? "border-primary/40 text-primary"
                      : "border-border text-muted-foreground"
                }`}
              >
                {i + 1}. {s}
              </li>
            ))}
          </ol>
          <div className="mt-6 max-w-2xl"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 lg:grid-cols-[1fr_340px] items-start">
        <div className="space-y-6">
          {step === 0 && (
            <Card title="Customer information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" />
                <Field label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
                <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
                <Field label="Phone (optional)" value={phone} onChange={setPhone} autoComplete="tel" />
                <div className="sm:col-span-2">
                  <Field label="Institution / laboratory (optional)" value={org} onChange={setOrg} autoComplete="organization" />
                </div>
              </div>
            </Card>
          )}

          {step === 1 && (
            <>
              <Card title="Shipping address">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <AddressAutocomplete
                      value={addr1}
                      onChange={setAddr1}
                      onSelect={(parts) => {
                        if (parts.city) setCity(parts.city);
                        if (parts.state) setState(parts.state);
                        if (parts.postalCode) setZip(parts.postalCode);
                        if (parts.country) setCountry(parts.country);
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Address line 2 (optional)" value={addr2} onChange={setAddr2} autoComplete="address-line2" />
                  </div>
                  <Field label="City" value={city} onChange={setCity} autoComplete="address-level2" />
                  <Field label="State / Region" value={state} onChange={setState} autoComplete="address-level1" />
                  <Field label="ZIP / Postal code" value={zip} onChange={setZip} autoComplete="postal-code" />
                  <Field label="Country" value={country} onChange={setCountry} autoComplete="country-name" />
                </div>
              </Card>

              <Card title="Shipping method">
                <div className="space-y-3">
                  {SHIPPING.map((s) => (
                    <label key={s.method} className={`flex items-center gap-3 rounded-md border p-3 text-sm cursor-pointer ${ship.method === s.method ? "border-primary bg-primary/5" : "border-border"}`}>
                      <input type="radio" name="shipping" checked={ship.method === s.method} onChange={() => setShip(s)} />
                      <span className="flex-1">{s.label}</span>
                      <span className="font-semibold tabular-nums">{formatPrice(s.priceUSD)}</span>
                    </label>
                  ))}
                </div>
              </Card>

              <Card title="Billing address">
                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
                  Billing address is the same as shipping address
                </label>
                {!billingSame && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Address line 1" value={bAddr1} onChange={setBAddr1} />
                    </div>
                    <Field label="City" value={bCity} onChange={setBCity} />
                    <Field label="State / Region" value={bState} onChange={setBState} />
                    <Field label="ZIP / Postal code" value={bZip} onChange={setBZip} />
                  </div>
                )}
              </Card>
            </>
          )}

          {step === 2 && (
            <Card title="Payment information">
              <p className="mb-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" /> Payment details are transmitted over an encrypted connection.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Cardholder name" value={cardName} onChange={setCardName} autoComplete="cc-name" />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label="Card number"
                    value={cardNumber}
                    onChange={(v) =>
                      setCardNumber(
                        v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
                      )
                    }
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <Field
                  label="Expiration (MM/YY)"
                  value={expiry}
                  onChange={(v) => {
                    const d = v.replace(/\D/g, "").slice(0, 4);
                    setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                  }}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                />
                <Field
                  label="CVV"
                  value={cvv}
                  onChange={(v) => setCvv(v.replace(/\D/g, "").slice(0, 4))}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                />
                <Field
                  label="Billing ZIP / Postal code"
                  value={billingZip}
                  onChange={setBillingZip}
                  autoComplete="postal-code"
                />
              </div>
            </Card>
          )}

          {step === 3 && (
            <>
              <Card title="Order review">
                <ul className="divide-y divide-border">
                  {lines.map((l) => (
                    <li key={lineId(l)} className="flex items-center gap-3 py-3">
                      <Vial compound={l.name} packSize={l.size} className="h-16 w-auto shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{l.name}{l.kit ? " — 10-vial kit" : ""}</p>
                        <p className="text-xs text-muted-foreground">{l.size} · Qty {l.qty} · {formatPrice(l.priceUSD)} each</p>
                      </div>
                      <span className="text-sm font-semibold tabular-nums">{formatPrice(l.priceUSD * l.qty)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <Summary label="Ship to" value={`${firstName} ${lastName}, ${addr1}${addr2 ? `, ${addr2}` : ""}, ${city}, ${state} ${zip}, ${country}`} />
                  <Summary label="Shipping method" value={ship.label} />
                  <Summary label="Email" value={email} />
                  <Summary label="Payment" value={`Card ending ${digits.slice(-4)}`} />
                </dl>
              </Card>

              <Card title="Buyer confirmation">
                <div className="space-y-3 text-sm">
                  <label className="flex gap-3 items-start">
                    <input type="checkbox" checked={age21} onChange={(e) => setAge21(e.target.checked)} className="mt-1" />
                    <span>{CONFIRMATIONS.age21}</span>
                  </label>
                  <label className="flex gap-3 items-start">
                    <input type="checkbox" checked={researchOnly} onChange={(e) => setResearchOnly(e.target.checked)} className="mt-1" />
                    <span>{CONFIRMATIONS.researchOnly}</span>
                  </label>
                  <label className="flex gap-3 items-start">
                    <input type="checkbox" checked={certify} onChange={(e) => setCertify(e.target.checked)} className="mt-1" />
                    <span className="font-medium">{CHECKOUT_CERTIFICATION}</span>
                  </label>
                </div>
              </Card>
            </>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            {step === 0 ? (
              <Link to="/cart" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted">
                Back to cart
              </Link>
            ) : (
              <button onClick={() => setStep((s) => s - 1)} className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted">
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                disabled={!stepOk}
                onClick={() => setStep((s) => s + 1)}
                className={`rounded-md px-6 py-3 text-sm font-medium text-primary-foreground ${stepOk ? "bg-primary hover:opacity-90" : "bg-primary/40 cursor-not-allowed"}`}
              >
                Continue
              </button>
            ) : (
              <button
                disabled={!reviewOk}
                onClick={() => {
                  const id = `BH-${Date.now().toString(36).toUpperCase()}`;
                  setPlaced({ id, total });
                  clear();
                  void navigate;
                }}
                className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-primary-foreground ${reviewOk ? "bg-primary hover:opacity-90" : "bg-primary/40 cursor-not-allowed"}`}
              >
                <CreditCard className="h-4 w-4" /> Place order — {formatPrice(total)}
              </button>
            )}
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 space-y-3">
          <h2 className="font-semibold">Order summary</h2>
          <ul className="space-y-2 text-sm">
            {lines.map((l) => (
              <li key={lineId(l)} className="flex justify-between gap-3">
                <span className="text-muted-foreground truncate">{l.name} · {l.size}{l.kit ? " · kit of 10" : ""} × {l.qty}</span>
                <span className="tabular-nums">{formatPrice(l.priceUSD * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={formatPrice(shippingCost)} />
            <div className="flex justify-between pt-2 text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums text-primary">{formatPrice(total)}</span>
            </div>
          </div>
          <Link to="/catalog" className="block text-center rounded-md border border-border px-4 py-2 text-sm hover:bg-muted">
            Continue shopping
          </Link>
        </aside>
      </div>
    </Layout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric";
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-3">
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm break-words">{value}</dd>
    </div>
  );
}

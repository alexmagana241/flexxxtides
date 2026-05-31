import { createFileRoute } from "@tanstack/react-router";
import { Droplet, Calculator, Syringe, AlertTriangle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/reconstitution")({
  head: () => ({
    meta: [
      { title: "Reconstitution Center — Flex Peptide Research" },
      { name: "description", content: "Step-by-step educational guide to peptide reconstitution: bacteriostatic water, syringe ticks, and example calculations." },
      { property: "og:title", content: "Reconstitution Center" },
      { property: "og:description", content: "Educational reconstitution math for peptide research." },
    ],
    links: [{ rel: "canonical", href: "/reconstitution" }],
  }),
  component: Reconstitution,
});

const steps = [
  { title: "Gather your materials", body: "A sealed peptide vial, bacteriostatic water, an alcohol swab, and a U-100 insulin syringe." },
  { title: "Disinfect both vials", body: "Swab the rubber stopper of both the BAC water and peptide vials with an alcohol pad." },
  { title: "Draw bacteriostatic water", body: "Withdraw the chosen volume of BAC water (commonly 1–3 mL) into the syringe." },
  { title: "Add water slowly", body: "Inject the water down the side wall of the peptide vial. Do not spray directly onto the lyophilized powder." },
  { title: "Swirl, do not shake", body: "Gently roll the vial between your palms until the powder fully dissolves." },
  { title: "Label and refrigerate", body: "Record concentration and date on the vial label. Most reconstituted peptides are stored refrigerated." },
];

const examples = [
  { vial: "5 mg", water: "2 mL", result: "2,500 mcg/mL — each 0.01 mL tick = 25 mcg" },
  { vial: "5 mg", water: "1 mL", result: "5,000 mcg/mL — each 0.01 mL tick = 50 mcg" },
  { vial: "10 mg", water: "2 mL", result: "5,000 mcg/mL — each 0.01 mL tick = 50 mcg" },
  { vial: "2 mg", water: "2 mL", result: "1,000 mcg/mL — each 0.01 mL tick = 10 mcg" },
];

function Reconstitution() {
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs uppercase tracking-wider text-primary">Educational Walkthrough</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Reconstitution Center</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Reconstitution math is the foundation of accurate peptide research. This page explains the
            terms, the tools, and the calculations — all educational, all transparent.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Droplet className="h-5 w-5 text-primary" /> What is bacteriostatic water?
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol, an agent
            that inhibits bacterial growth in multi-use vials. It is the standard solvent used in
            published research protocols to reconstitute lyophilized peptide powders, giving a stable
            solution that can be repeatedly accessed over several weeks under proper storage.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Step-by-step guide</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-border bg-card p-5 card-hover">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-md bg-primary/10 text-primary grid place-items-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Syringe className="h-5 w-5 text-primary" /> Reading a U-100 insulin syringe
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            A U-100 insulin syringe holds 1.0 mL and is marked in 100 units. Each "unit" line equals
            0.01 mL. Researchers use this scale to draw very small volumes accurately — for example,
            10 units = 0.10 mL. Knowing this lets you translate any concentration into "ticks per dose."
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="px-4 py-3">Units (ticks)</th>
                  <th className="px-4 py-3">Volume</th>
                  <th className="px-4 py-3">At 1000 mcg/mL</th>
                  <th className="px-4 py-3">At 2500 mcg/mL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[5, 10, 20, 25, 50, 100].map((u) => (
                  <tr key={u} className="bg-card">
                    <td className="px-4 py-3 font-medium">{u}</td>
                    <td className="px-4 py-3 text-muted-foreground">{(u * 0.01).toFixed(2)} mL</td>
                    <td className="px-4 py-3 text-muted-foreground">{u * 10} mcg</td>
                    <td className="px-4 py-3 text-muted-foreground">{u * 25} mcg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" /> Example calculations
          </h2>
          <p className="mt-3 text-muted-foreground">
            Concentration (mcg/mL) = total peptide (mcg) ÷ total BAC water (mL).
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {examples.map((e) => (
              <div key={e.vial + e.water} className="rounded-lg border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">{e.vial} vial + {e.water} BAC water</p>
                <p className="mt-2 font-semibold">{e.result}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 flex gap-4">
          <AlertTriangle className="h-6 w-6 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold">Safety information</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Always inspect vials before use. Cloudy or discolored solutions, broken seals, or expired
              BAC water indicate a vial should not be used. Keep all research materials labeled, locked,
              and out of reach of unauthorized persons. This site does not authorize, endorse, or
              instruct administration to humans or animals.
            </p>
          </div>
        </div>

        <Disclaimer />
      </div>
    </Layout>
  );
}

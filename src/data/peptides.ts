export type PeptideCategory =
  | "Growth Hormone Secretagogue"
  | "Recovery & Repair"
  | "Copper Peptide"
  | "Weight Management";

export interface Peptide {
  slug: string;
  name: string;
  fullName?: string;
  category: PeptideCategory;
  tagline: string;
  overview: string;
  research: string;
  mechanism: string;
  applications: string[];
  reconstitution: {
    vialSize: string;
    bacWater: string;
    perTick: string;
    notes: string;
  };
  faq: { q: string; a: string }[];
}

export const peptides: Peptide[] = [
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Glycyl-L-Histidyl-L-Lysine Copper",
    category: "Copper Peptide",
    tagline: "A naturally occurring copper-binding tripeptide studied for skin and tissue research.",
    overview:
      "GHK-Cu is a tripeptide complex with copper(II) that has been the subject of decades of research into skin remodeling, antioxidant signaling, and gene expression modulation.",
    research:
      "First isolated from human plasma in 1973, GHK-Cu levels decline naturally with age. Research literature explores its role in extracellular matrix studies, collagen-related pathways, and antioxidant assays.",
    mechanism:
      "GHK binds copper(II) ions with high affinity. In research models, this complex has been studied for its influence on fibroblast activity, expression of collagen and decorin, and modulation of TGF-β related signaling pathways.",
    applications: [
      "Skin remodeling research models",
      "Wound-healing in vitro studies",
      "Hair follicle research",
      "Antioxidant pathway investigations",
    ],
    reconstitution: {
      vialSize: "50 mg",
      bacWater: "2 mL bacteriostatic water",
      perTick: "25 mcg per 0.01 mL on a U-100 insulin syringe",
      notes:
        "Educational example only. Researchers should calculate based on their own vial size and experimental protocol.",
    },
    faq: [
      { q: "What is GHK-Cu commonly studied for?", a: "Research literature focuses on skin and connective tissue models, hair follicle studies, and antioxidant assays." },
      { q: "Why is it blue?", a: "The copper(II) ion bound to the GHK tripeptide gives the reconstituted solution a characteristic blue color." },
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    category: "Weight Management",
    tagline: "An investigational triple agonist studied in metabolic research.",
    overview:
      "Retatrutide is an investigational peptide studied as a triple agonist of GLP-1, GIP, and glucagon receptors. It is under active clinical investigation and is for research and educational discussion only.",
    research:
      "Published Phase 1 and Phase 2 trial data have explored its pharmacokinetics and effects in metabolic research. It remains an investigational compound, not approved for clinical use.",
    mechanism:
      "Retatrutide is designed to engage three incretin-related receptors simultaneously: GLP-1R, GIPR, and the glucagon receptor, a combination studied for its effect on energy balance pathways in research models.",
    applications: [
      "Metabolic pathway research",
      "Receptor pharmacology studies",
      "Comparative incretin research",
    ],
    reconstitution: {
      vialSize: "10 mg",
      bacWater: "2 mL bacteriostatic water",
      perTick: "0.5 mg per 0.10 mL on a U-100 insulin syringe",
      notes: "Educational example only. Always verify calculations against your vial label.",
    },
    faq: [
      { q: "Is Retatrutide approved?", a: "No. It is an investigational compound described here for educational and research-information purposes only." },
      { q: "How is it different from single-agonist peptides?", a: "It is designed to engage three receptors rather than one, which researchers study for combined metabolic signaling." },
    ],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    category: "Growth Hormone Secretagogue",
    tagline: "A stabilized GHRH analog used in endocrinology research.",
    overview:
      "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH) that has been widely studied in endocrine research literature.",
    research:
      "Research has examined Tesamorelin's pharmacokinetics, half-life, and effects on IGF-1 axis signaling in published clinical studies.",
    mechanism:
      "As a GHRH analog, Tesamorelin binds the GHRH receptor on the anterior pituitary, a pathway studied for its role in endogenous growth hormone release.",
    applications: [
      "GHRH receptor research",
      "IGF-1 axis studies",
      "Body composition research models",
    ],
    reconstitution: {
      vialSize: "5 mg",
      bacWater: "2 mL bacteriostatic water",
      perTick: "25 mcg per 0.01 mL on a U-100 insulin syringe",
      notes: "Reconstituted Tesamorelin is typically stored refrigerated. Educational example only.",
    },
    faq: [
      { q: "What is GHRH?", a: "Growth hormone-releasing hormone, a hypothalamic peptide studied for its role in pituitary signaling." },
    ],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound-157",
    category: "Recovery & Repair",
    tagline: "A pentadecapeptide studied in tissue and recovery research.",
    overview:
      "BPC-157 is a synthetic 15-amino-acid sequence derived from a protective protein found in gastric juice, widely studied in preclinical research literature.",
    research:
      "Animal-model research has examined BPC-157's effects on tendon, muscle, and gastrointestinal tissue models. Human clinical data remain limited.",
    mechanism:
      "Research suggests effects on angiogenic signaling (e.g., VEGFR2), growth factor pathways, and nitric oxide system modulation in preclinical models.",
    applications: [
      "Tendon and ligament research models",
      "Gastrointestinal tissue studies",
      "Angiogenesis research",
    ],
    reconstitution: {
      vialSize: "5 mg",
      bacWater: "2.5 mL bacteriostatic water",
      perTick: "20 mcg per 0.01 mL on a U-100 insulin syringe",
      notes: "Educational example only.",
    },
    faq: [
      { q: "Is BPC-157 approved for clinical use?", a: "No. It is a research peptide and is described here for educational purposes only." },
    ],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    fullName: "Thymosin Beta-4 Fragment",
    category: "Recovery & Repair",
    tagline: "A synthetic fragment related to thymosin beta-4, studied in recovery research.",
    overview:
      "TB-500 is a synthetic peptide related to a region of thymosin beta-4, a naturally occurring protein studied in cellular migration and tissue research.",
    research:
      "Preclinical literature has investigated TB-500's role in actin regulation, cellular migration assays, and tissue research models.",
    mechanism:
      "Thymosin beta-4 binds G-actin and is studied for its role in cytoskeletal dynamics, cell migration, and angiogenesis-related signaling.",
    applications: [
      "Cellular migration research",
      "Connective tissue studies",
      "Cardiac and vascular research models",
    ],
    reconstitution: {
      vialSize: "5 mg",
      bacWater: "2.5 mL bacteriostatic water",
      perTick: "20 mcg per 0.01 mL on a U-100 insulin syringe",
      notes: "Educational example only.",
    },
    faq: [
      { q: "Is TB-500 the same as thymosin beta-4?", a: "No. TB-500 is a synthetic fragment with a sequence related to a region of thymosin beta-4." },
    ],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    category: "Growth Hormone Secretagogue",
    tagline: "A long-acting GHRH analog studied in endocrine research.",
    overview:
      "CJC-1295 is a synthetic peptide modeled on GHRH(1-29). Research versions exist with and without a Drug Affinity Complex (DAC) modification that extends half-life.",
    research:
      "Research literature has examined the effects of DAC modification on plasma half-life and pulsatile growth hormone release patterns in research models.",
    mechanism:
      "As a GHRH analog, CJC-1295 engages the GHRH receptor. The DAC variant binds serum albumin, a mechanism studied for its impact on pharmacokinetic profile.",
    applications: [
      "GHRH receptor research",
      "Pharmacokinetic comparison studies",
      "Pulsatile signaling research",
    ],
    reconstitution: {
      vialSize: "2 mg",
      bacWater: "2 mL bacteriostatic water",
      perTick: "10 mcg per 0.01 mL on a U-100 insulin syringe",
      notes: "Educational example only.",
    },
    faq: [
      { q: "What does 'DAC' mean?", a: "Drug Affinity Complex — a modification studied for its effect on plasma half-life." },
    ],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    category: "Growth Hormone Secretagogue",
    tagline: "A selective ghrelin-receptor agonist studied in endocrine research.",
    overview:
      "Ipamorelin is a synthetic pentapeptide and selective growth hormone secretagogue receptor (GHS-R) agonist studied in endocrine research.",
    research:
      "Research literature has examined Ipamorelin's selectivity profile, particularly its limited effect on prolactin and cortisol pathways compared with earlier secretagogues.",
    mechanism:
      "Ipamorelin binds the GHS-R (ghrelin receptor), a pathway studied for its role in pulsatile growth hormone release.",
    applications: [
      "Ghrelin receptor pharmacology",
      "Comparative secretagogue research",
      "Pulsatile GH signaling studies",
    ],
    reconstitution: {
      vialSize: "5 mg",
      bacWater: "2 mL bacteriostatic water",
      perTick: "25 mcg per 0.01 mL on a U-100 insulin syringe",
      notes: "Educational example only.",
    },
    faq: [
      { q: "What is the ghrelin receptor?", a: "GHS-R is a G-protein coupled receptor studied for its role in growth hormone release and appetite signaling." },
    ],
  },
];

export const categories: PeptideCategory[] = [
  "Growth Hormone Secretagogue",
  "Recovery & Repair",
  "Copper Peptide",
  "Weight Management",
];

export const getPeptide = (slug: string) => peptides.find((p) => p.slug === slug);

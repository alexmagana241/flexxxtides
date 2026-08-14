import bacteriostaticWaterAsset from "@/assets/bacteriostatic-water.png.asset.json";
import vialHoldersAsset from "@/assets/vial-holders.png.asset.json";

// BH research materials catalog — laboratory reference data only.
// No dosing, no administration, no therapeutic or bodily-effect claims.
//
// Molecular data is drawn from published chemistry references. Pricing is
// listed per pack size (dry powder, lyophilized). Pricing is subject to
// change without notice.

export type ResearchCategory =
  | "Reference Peptide"
  | "Investigational Reference Compound"
  | "Peptide Fragment"
  | "Metal-Complex Peptide"
  | "Research Compound"
  | "Laboratory Supply";

export interface PackOption {
  size: string;   // e.g. "5 mg"
  priceUSD: number; // per vial
}

export interface CatalogItem {
  slug: string;
  name: string;
  fullName?: string;
  synonyms?: string[];
  category: ResearchCategory;
  catalogNumber: string;
  casNumber?: string;
  molecularFormula: string;
  molecularWeight: string;
  sequence?: string;
  appearance?: string;
  physicalForm: string;
  statedPurity: string;
  storage: string;
  shippingTemperature?: string;
  solubility?: string;
  handling?: string;
  stability?: string;
  recommendedAnalyticalUse?: string;
  packs: PackOption[];
  scientificSummary: string;
  analyticalMethods: string[];
  references?: string[];
  documentation?: string[];
  imageUrl?: string;
  /** Accessory / non-vial item: no strengths, no kits. */
  accessory?: boolean;
  coaUrl?: string;
  sdsUrl?: string;
}

const COMMON = {
  solubility:
    "Typically soluble in bacteriostatic or sterile water, dilute acetic acid, or DMSO for analytical work; solubility is sequence-dependent and should be established per assay.",
  handling:
    "Handle in a chemical fume hood or biosafety cabinet using nitrile gloves, safety eyewear, and a laboratory coat. Avoid inhalation of dust. Equilibrate sealed vials to room temperature before opening to prevent condensation.",
  stability:
    "Lyophilized powder is stable when stored dry at ≤ -20 °C, protected from light and moisture. Reconstituted solutions are less stable and should be characterized per assay.",
  recommendedAnalyticalUse:
    "Reference standard for identity confirmation, RP-HPLC purity assays, LC-MS method development, and in vitro receptor / biochemical characterization.",
  documentation: [
    "Identity confirmed by LC-MS",
    "Purity determined by RP-HPLC (UV, 214 nm)",
    "Residual solvent screening where applicable",
    "Lot-controlled lyophilized fill",
  ],

};

export const items: CatalogItem[] = [
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Glycyl-L-Histidyl-L-Lysine Copper(II) Complex",
    synonyms: ["Copper tripeptide-1", "Cu-GHK", "Prezatide copper"],
    category: "Metal-Complex Peptide",
    catalogNumber: "BH-CU-001",
    casNumber: "89030-95-5",
    molecularFormula: "C14H22CuN6O4",
    molecularWeight: "401.91 g/mol",
    sequence: "Gly-His-Lys · Cu(II)",
    appearance: "Deep-blue lyophilized powder",
    physicalForm: "Lyophilized deep-blue powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "50 mg", priceUSD: 39 },
      { size: "100 mg", priceUSD: 58 },
    ],
    scientificSummary:
      "GHK-Cu is an endogenous copper-binding tripeptide first identified in human plasma and subsequently studied in extracellular matrix biology, wound-healing models, and copper transport chemistry. Supplied as a laboratory reference standard for in vitro assay development, spectroscopic characterization of copper(II) coordination, and analytical method work.",
    analyticalMethods: [
      "RP-HPLC (UV, 220 nm)",
      "ESI-MS",
      "UV-Vis (Cu(II) d-d band, ~625 nm)",
      "Karl Fischer moisture",
      "Amino-acid analysis (AAA)",
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide (reference standard)",
    fullName: "LY-3437943 — GIP/GLP-1/Glucagon tri-agonist reference peptide",
    synonyms: ["LY3437943", "Tri-agonist reference peptide"],
    category: "Investigational Reference Compound",
    catalogNumber: "BH-INC-014",
    molecularFormula: "See Certificate of Analysis (lot-specific)",
    molecularWeight: "≈ 4731.3 g/mol",
    appearance: "White to off-white lyophilized powder",
    physicalForm: "Lyophilized white to off-white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "5 mg", priceUSD: 40 },
      { size: "10 mg", priceUSD: 80 },
      { size: "20 mg", priceUSD: 120 },
      { size: "30 mg", priceUSD: 160 },
      { size: "60 mg", priceUSD: 310 },
    ],
    scientificSummary:
      "An investigational reference peptide described in the endocrinology literature in the context of tri-receptor incretin pharmacology research (GIP, GLP-1, and glucagon receptors). Empirical formula varies between reported preparations depending on salt form, counter-ion, and water content; the lot-specific formula and calculated mass are stated on each Certificate of Analysis. Supplied as a laboratory reference standard for analytical, receptor-binding, and method-development research applications.",
    analyticalMethods: [
      "RP-HPLC (UV, 214 nm)",
      "LC-MS (ESI, deconvoluted mass)",
      "Amino-acid analysis (AAA) — peptide content",
      "Karl Fischer moisture",
      "Residual TFA / acetate by IC",
    ],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin (reference standard)",
    fullName: "Synthetic stabilized GHRH(1-44) analog",
    synonyms: ["Tesamorelin acetate", "TH9507", "trans-3-hexenoyl-GHRH(1-44)"],
    category: "Reference Peptide",
    catalogNumber: "BH-REF-021",
    casNumber: "218949-48-5",
    molecularFormula: "C221H366N72O67S",
    molecularWeight: "≈ 5195.8 g/mol",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "5 mg", priceUSD: 60 },
      { size: "10 mg", priceUSD: 100 },
    ],
    scientificSummary:
      "A synthetic stabilized 44-amino-acid GHRH analog referenced in endocrinology literature as a laboratory reference standard for receptor-binding, analytical, and method-development research.",
    analyticalMethods: [
      "RP-HPLC (UV, 214 nm)",
      "ESI-MS / LC-MS",
      "Amino-acid analysis (AAA)",
      "Karl Fischer moisture",
    ],
  },
  {
    slug: "bpc-157",
    name: "BPC-157 (reference standard)",
    fullName: "Body Protection Compound-157 (pentadecapeptide)",
    synonyms: ["PL-14736", "Pentadecapeptide BPC-157"],
    category: "Peptide Fragment",
    catalogNumber: "BH-FRG-032",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.53 g/mol",
    sequence:
      "Synthetic pentadecapeptide corresponding to the published BPC-157 sequence (documented on Certificate of Analysis).",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "5 mg", priceUSD: 60 },
      { size: "10 mg", priceUSD: 80 },
    ],
    scientificSummary:
      "A synthetic pentadecapeptide whose sequence is described in the preclinical research literature as a partial sequence derived from gastric juice protein studies. Supplied as a laboratory reference standard for in vitro assay development and analytical characterization only.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Karl Fischer moisture", "Amino-acid analysis (AAA)"],
  },
  {
    slug: "tb-500",
    name: "TB-500 (reference standard)",
    fullName:
      "Synthetic peptide fragment corresponding to regions reported in thymosin β4 literature",
    synonyms: ["Tβ4 fragment (as supplied)", "Thymosin-β4 partial sequence"],
    category: "Peptide Fragment",
    catalogNumber: "BH-FRG-041",
    molecularFormula: "See Certificate of Analysis (fragment-specific)",
    molecularWeight: "See Certificate of Analysis (fragment-specific)",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "5 mg", priceUSD: 49 },
      { size: "10 mg", priceUSD: 87 },
    ],
    scientificSummary:
      "A synthetic peptide fragment corresponding to regions of thymosin β4 described in cytoskeletal-biology and actin-sequestration research literature. The exact molecular formula and mass depend on the fragment and any N-terminal acetylation reported on the Certificate of Analysis for the specific lot. Supplied as a laboratory reference standard for in vitro research and analytical method work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Amino-acid analysis (AAA)", "Karl Fischer moisture"],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295 (reference standard)",
    fullName: "Modified GHRH(1-29) analog (with or without DAC as documented on CoA)",
    synonyms: ["DAC:GRF", "CJC-1295 with DAC", "CJC-1295 no-DAC (Mod GRF 1-29)"],
    category: "Reference Peptide",
    catalogNumber: "BH-REF-055",
    molecularFormula: "Approximate: C165H269N47O46 (DAC form; lot-specific value on CoA)",
    molecularWeight: "≈ 3647.3 g/mol (DAC form)",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "2 mg", priceUSD: 34 },
      { size: "5 mg", priceUSD: 68 },
      { size: "10 mg", priceUSD: 126 },
    ],
    scientificSummary:
      "A modified GHRH(1-29) analog described in pharmacokinetic research literature. The DAC (drug affinity complex) variant carries a maleimidopropionic acid moiety at the C-terminus, described in the literature as a reference peptide for in vitro receptor and analytical work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Amino-acid analysis (AAA)", "Karl Fischer moisture"],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin (reference standard)",
    synonyms: ["NNC 26-0161"],
    category: "Reference Peptide",
    catalogNumber: "BH-REF-063",
    casNumber: "170851-70-4",
    molecularFormula: "C38H49N9O5",
    molecularWeight: "711.85 g/mol",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [
      { size: "5 mg", priceUSD: 44 },
      { size: "10 mg", priceUSD: 82 },
    ],
    scientificSummary:
      "A synthetic pentapeptide described in the receptor-pharmacology literature as a reference ligand at the ghrelin/GHS-R1a receptor system. Supplied as a laboratory reference standard for in vitro receptor and analytical work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Amino-acid analysis (AAA)", "Karl Fischer moisture"],
  },
  {
    slug: "ahk-cu",
    name: "AHK-Cu",
    fullName: "L-Alanyl-L-Histidyl-L-Lysine Copper(II) Complex",
    synonyms: ["Copper tripeptide AHK"],
    category: "Metal-Complex Peptide",
    catalogNumber: "BH-CU-002",
    molecularFormula: "C15H26CuN6O4",
    molecularWeight: "≈ 417.9 g/mol",
    sequence: "Ala-His-Lys · Cu(II)",
    appearance: "Blue lyophilized powder",
    physicalForm: "Lyophilized blue powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "50 mg", priceUSD: 70 }],
    scientificSummary:
      "A copper-binding tripeptide studied in extracellular-matrix and copper-coordination chemistry literature. Supplied as a laboratory reference standard for in vitro assay development, spectroscopic characterization, and analytical method work.",
    analyticalMethods: ["RP-HPLC (UV, 220 nm)", "ESI-MS", "UV-Vis (Cu(II) d-d band)", "Karl Fischer moisture"],
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3 (reference standard)",
    fullName: "Long R3 Insulin-like Growth Factor-1 analog",
    synonyms: ["LR3-IGF-1"],
    category: "Investigational Reference Compound",
    catalogNumber: "BH-INC-071",
    molecularFormula: "C990H1528N262O300S7",
    molecularWeight: "≈ 9111 g/mol",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "1 mg", priceUSD: 70 }],
    scientificSummary:
      "A recombinant analog of insulin-like growth factor-1 carrying an N-terminal extension and an Arg substitution at position 3, described in cell-culture literature as a reference protein for in vitro receptor and analytical characterization work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "LC-MS (ESI, deconvoluted mass)", "SDS-PAGE", "Karl Fischer moisture"],
  },
  {
    slug: "pt-141",
    name: "PT-141 (reference standard)",
    fullName: "Bremelanotide — cyclic melanocortin receptor reference peptide",
    synonyms: ["Bremelanotide"],
    category: "Reference Peptide",
    catalogNumber: "BH-REF-082",
    casNumber: "189691-06-3",
    molecularFormula: "C50H68N14O10",
    molecularWeight: "1025.2 g/mol",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "10 mg", priceUSD: 45 }],
    scientificSummary:
      "A cyclic heptapeptide described in receptor-pharmacology literature as a reference ligand at melanocortin receptor subtypes. Supplied as a laboratory reference standard for in vitro receptor binding and analytical method development.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Amino-acid analysis (AAA)", "Karl Fischer moisture"],
  },
  {
    slug: "glutathione",
    name: "Glutathione (reduced, reference standard)",
    fullName: "L-γ-Glutamyl-L-cysteinylglycine",
    synonyms: ["GSH", "Reduced glutathione"],
    category: "Research Compound",
    catalogNumber: "BH-RC-090",
    casNumber: "70-18-8",
    molecularFormula: "C10H17N3O6S",
    molecularWeight: "307.32 g/mol",
    sequence: "γ-Glu-Cys-Gly",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light, moisture, and oxidizing conditions.",
    ...COMMON,
    packs: [{ size: "1500 mg", priceUSD: 80 }],
    scientificSummary:
      "An endogenous thiol tripeptide widely used in redox-biochemistry research as an analytical reference standard and assay control. Supplied for laboratory and analytical research applications only.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "LC-MS (ESI)", "Ellman thiol assay", "Karl Fischer moisture"],
  },
  {
    slug: "nad-plus",
    name: "NAD+ (reference standard)",
    fullName: "β-Nicotinamide adenine dinucleotide (oxidized form)",
    synonyms: ["NAD", "β-NAD+"],
    category: "Research Compound",
    catalogNumber: "BH-RC-094",
    casNumber: "53-84-9",
    molecularFormula: "C21H27N7O14P2",
    molecularWeight: "663.43 g/mol",
    appearance: "White to off-white lyophilized powder",
    physicalForm: "Lyophilized white to off-white powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "1000 mg", priceUSD: 70 }],
    scientificSummary:
      "A ubiquitous redox cofactor used across enzymology and metabolic-biochemistry research as an analytical reference standard and enzyme-assay substrate. Supplied for laboratory and analytical research applications only.",
    analyticalMethods: ["RP-HPLC (UV, 260 nm)", "LC-MS (ESI)", "Enzymatic cycling assay", "Karl Fischer moisture"],
  },
  {
    slug: "klow",
    name: "KLOW (blended reference preparation)",
    fullName: "Blended peptide reference preparation (GHK-Cu, BPC-157, TB-500, KPV)",
    category: "Research Compound",
    catalogNumber: "BH-RC-101",
    molecularFormula: "Blend — component formulas listed on release documentation",
    molecularWeight: "Blend — component masses listed on release documentation",
    appearance: "Blue-tinted lyophilized powder",
    physicalForm: "Lyophilized blended powder",
    statedPurity: "≥ 98% per component",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "80 mg", priceUSD: 140 }],
    scientificSummary:
      "A blended lyophilized preparation combining peptide components described individually in the laboratory-research literature. Supplied as a research preparation for in vitro assay development and analytical characterization only.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "LC-MS (ESI)", "Component identity confirmation", "Karl Fischer moisture"],
  },
  {
    slug: "glow",
    name: "GLOW (blended reference preparation)",
    fullName: "Blended peptide reference preparation (GHK-Cu, BPC-157, TB-500)",
    category: "Research Compound",
    catalogNumber: "BH-RC-102",
    molecularFormula: "Blend — component formulas listed on release documentation",
    molecularWeight: "Blend — component masses listed on release documentation",
    appearance: "Blue-tinted lyophilized powder",
    physicalForm: "Lyophilized blended powder",
    statedPurity: "≥ 98% per component",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "70 mg", priceUSD: 115 }],
    scientificSummary:
      "A blended lyophilized preparation combining peptide components described individually in the laboratory-research literature. Supplied as a research preparation for in vitro assay development and analytical characterization only.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "LC-MS (ESI)", "Component identity confirmation", "Karl Fischer moisture"],
  },
  {
    slug: "mots-c",
    name: "MOTS-c (reference standard)",
    fullName: "Mitochondrial ORF of the 12S rRNA type-c peptide",
    synonyms: ["MOTS-C"],
    category: "Reference Peptide",
    catalogNumber: "BH-REF-110",
    molecularFormula: "C101H152N28O22S2",
    molecularWeight: "≈ 2174.6 g/mol",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "10 mg", priceUSD: 30 }],
    scientificSummary:
      "A 16-amino-acid mitochondrial-derived peptide described in metabolic-biology research literature. Supplied as a laboratory reference standard for in vitro and analytical research.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Amino-acid analysis (AAA)", "Karl Fischer moisture"],
  },
  {
    slug: "mt-2",
    name: "MT-2 (reference standard)",
    fullName: "Melanotan II — cyclic melanocortin analog",
    synonyms: ["Melanotan II", "MT-II"],
    category: "Reference Peptide",
    catalogNumber: "BH-REF-115",
    casNumber: "121062-08-6",
    molecularFormula: "C50H69N15O9",
    molecularWeight: "1024.2 g/mol",
    appearance: "White lyophilized powder",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98%",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    ...COMMON,
    packs: [{ size: "10 mg", priceUSD: 30 }],
    scientificSummary:
      "A cyclic lactam melanocortin analog described in receptor-pharmacology literature as a reference ligand for melanocortin receptor subtypes. Supplied as a laboratory reference standard for in vitro receptor and analytical work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS / LC-MS", "Amino-acid analysis (AAA)", "Karl Fischer moisture"],
  },
  {
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    imageUrl: bacteriostaticWaterAsset.url,
    fullName: "Sterile water containing 0.9% benzyl alcohol (laboratory diluent)",
    category: "Laboratory Supply",
    catalogNumber: "BH-SUP-201",
    molecularFormula: "H2O with 0.9% benzyl alcohol (C7H8O)",
    molecularWeight: "Not applicable",
    appearance: "Clear, colorless solution",
    physicalForm: "Sterile-filtered liquid in a sealed vial",
    statedPurity: "Laboratory-grade diluent",
    storage: "Store at 15–30 °C; protect from light. Do not freeze.",
    solubility: "Miscible with water-based laboratory solutions.",
    handling:
      "Handle with standard laboratory personal protective equipment. For laboratory reconstitution of research materials only.",
    stability: "Stable until the labeled expiry when the vial seal remains intact.",
    recommendedAnalyticalUse: "Laboratory diluent for reconstituting lyophilized research materials for in vitro work.",
    packs: [{ size: "10 mL", priceUSD: 15 }],
    scientificSummary:
      "A laboratory diluent consisting of sterile water with 0.9% benzyl alcohol as a bacteriostatic agent. Supplied for laboratory reconstitution of research materials only; not for human or veterinary use.",
    analyticalMethods: ["Sterility filtration record", "Benzyl alcohol content by HPLC", "Visual particulate inspection"],
  },
  {
    slug: "vial-holders",
    name: "Vial Holders",
    imageUrl: vialHoldersAsset.url,
    accessory: true,
    fullName: "Laboratory vial holder / rack insert",
    category: "Laboratory Supply",
    catalogNumber: "BH-SUP-210",
    molecularFormula: "Not applicable",
    molecularWeight: "Not applicable",
    appearance: "Moulded laboratory plastic",
    physicalForm: "Reusable vial holder",
    statedPurity: "Not applicable",
    storage: "Store at ambient laboratory temperature.",
    handling: "Clean with standard laboratory detergents; not autoclave-rated unless labeled.",
    recommendedAnalyticalUse: "Bench-top organization and upright storage of standard laboratory vials.",
    packs: [{ size: "Each", priceUSD: 2 }],
    scientificSummary:
      "A reusable holder for keeping standard laboratory vials upright and organized during bench work and cold storage.",
    analyticalMethods: ["Dimensional inspection", "Visual defect inspection"],
  },
];

export const categories: ResearchCategory[] = [
  "Reference Peptide",
  "Investigational Reference Compound",
  "Peptide Fragment",
  "Metal-Complex Peptide",
  "Research Compound",
  "Laboratory Supply",
];

export const getItem = (slug: string) => items.find((p) => p.slug === slug);

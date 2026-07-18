// BIOHACKERS research materials catalog — laboratory reference data only.
// No dosing, no administration, no therapeutic or bodily-effect claims.
//
// Molecular data is drawn from published chemistry references. Pricing is
// listed per pack size (dry powder, lyophilized). Prices are set at
// approximately 3% below current reference market prices for research-grade
// reference standards. Values are reviewed periodically and may change.

export type ResearchCategory =
  | "Reference Peptide"
  | "Investigational Reference Compound"
  | "Peptide Fragment"
  | "Metal-Complex Peptide";

export interface PackOption {
  size: string;   // e.g. "5 mg"
  priceUSD: number; // per vial
}

export interface CatalogItem {
  slug: string;
  name: string;
  fullName?: string;
  category: ResearchCategory;
  catalogNumber: string;
  casNumber?: string;
  molecularFormula: string;
  molecularWeight: string;
  sequence?: string;
  physicalForm: string;
  statedPurity: string;
  storage: string;
  packs: PackOption[];
  scientificSummary: string;
  analyticalMethods: string[];
  references: string[];
  coaUrl?: string;
  sdsUrl?: string;
}

export const items: CatalogItem[] = [
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Glycyl-L-Histidyl-L-Lysine Copper(II) Complex",
    category: "Metal-Complex Peptide",
    catalogNumber: "BH-CU-001",
    casNumber: "89030-95-5",
    molecularFormula: "C14H22CuN6O4",
    molecularWeight: "401.91 g/mol",
    sequence: "Gly-His-Lys · Cu(II)",
    physicalForm: "Lyophilized deep-blue powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "50 mg", priceUSD: 38.80 },
      { size: "100 mg", priceUSD: 58.20 },
    ],
    scientificSummary:
      "A copper(II) coordination complex of the tripeptide glycyl-L-histidyl-L-lysine. First isolated from human plasma in 1973 (Pickart & Thaler) and referenced across a broad body of biochemistry and materials-science literature examining copper-peptide coordination chemistry, extracellular-matrix biology in cell-culture systems, and antioxidant enzyme assays. Supplied as a laboratory reference standard for in vitro assay development and analytical characterization.",
    analyticalMethods: ["RP-HPLC (UV, 220 nm)", "ESI-MS", "Karl Fischer moisture", "UV-Vis (Cu(II) d-d band)"],
    references: [
      "Pickart, L.; Thaler, M.M. (1973). Nature New Biology 243: 85–87.",
      "Pickart, L.; Margolina, A. (2018). Int. J. Mol. Sci. 19(7): 1987.",
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide (reference standard)",
    fullName: "LY-3437943 — GIP/GLP-1/Glucagon tri-agonist reference peptide",
    category: "Investigational Reference Compound",
    catalogNumber: "BH-INC-014",
    molecularFormula: "C221H343N45O68",
    molecularWeight: "≈ 4731.3 g/mol",
    physicalForm: "Lyophilized white to off-white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "5 mg", priceUSD: 40 },
      { size: "10 mg", priceUSD: 80 },
      { size: "20 mg", priceUSD: 120 },
      { size: "30 mg", priceUSD: 160 },
      { size: "60 mg", priceUSD: 310 },
    ],
    scientificSummary:
      "An investigational reference peptide described in the endocrinology literature in the context of tri-receptor incretin pharmacology research (GIP, GLP-1, and glucagon receptors). Supplied as a laboratory reference standard for analytical, receptor-binding, and method-development research applications.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "LC-MS", "Peptide content by AAA"],
    references: [
      "Coskun, T. et al. (2022). Cell Metabolism 34(9): 1234–1247.e9.",
      "Jastreboff, A.M. et al. (2023). N. Engl. J. Med. 389: 514–526.",
    ],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin (reference standard)",
    fullName: "trans-3-hexenoyl-GHRH(1-44)",
    category: "Reference Peptide",
    catalogNumber: "BH-REF-021",
    casNumber: "218949-48-5",
    molecularFormula: "C221H366N72O67S",
    molecularWeight: "≈ 5195.8 g/mol",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "5 mg", priceUSD: 60 },
      { size: "10 mg", priceUSD: 100 },
    ],
    scientificSummary:
      "A stabilized 44-amino-acid GHRH analog referenced in endocrinology literature as a laboratory reference standard for receptor-binding, analytical, and method-development research.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS", "Karl Fischer moisture"],
    references: ["Falutz, J. et al. (2010). J. Clin. Endocrinol. Metab. 95(9): 4291–4304."],
  },
  {
    slug: "bpc-157",
    name: "BPC-157 (reference standard)",
    fullName: "Body Protection Compound-157 (pentadecapeptide)",
    category: "Peptide Fragment",
    catalogNumber: "BH-FRG-032",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.53 g/mol",
    sequence: "GEPPPGKPADEDLAGLV (variant sequences reported)",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "5 mg", priceUSD: 60 },
      { size: "10 mg", priceUSD: 80 },
    ],
    scientificSummary:
      "A synthetic pentadecapeptide whose sequence is described in the preclinical research literature as a partial sequence derived from gastric juice protein studies. Supplied as a laboratory reference standard for in vitro assay development and analytical characterization only.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Sikiric, P. et al. (2018). Curr. Pharm. Des. 24(18): 1990–2001."],
  },
  {
    slug: "tb-500",
    name: "TB-500 (reference standard)",
    fullName: "Thymosin β4 (17-23) synthetic fragment",
    category: "Peptide Fragment",
    catalogNumber: "BH-FRG-041",
    molecularFormula: "C34H55N9O10",
    molecularWeight: "≈ 749.9 g/mol (fragment); full Tβ4 ≈ 4963 g/mol",
    sequence: "LKKTETQ (Tβ4 17-23 fragment as commonly supplied)",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "5 mg", priceUSD: 48.50 },
      { size: "10 mg", priceUSD: 87.30 },
    ],
    scientificSummary:
      "A synthetic peptide fragment corresponding to a region of thymosin β4 described in cytoskeletal-biology research literature. Molecular weight varies with the exact fragment and any acetylation reported on the Certificate of Analysis. Supplied as a laboratory reference standard for in vitro research and analytical method work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Goldstein, A.L. et al. (2005). Ann. N.Y. Acad. Sci. 1112: 1–13."],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295 (reference standard)",
    fullName: "Modified GHRH(1-29) analog (with or without DAC as documented on CoA)",
    category: "Reference Peptide",
    catalogNumber: "BH-REF-055",
    molecularFormula: "C165H269N47O46 (DAC form)",
    molecularWeight: "≈ 3647.3 g/mol (DAC form)",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "2 mg", priceUSD: 33.95 },
      { size: "5 mg", priceUSD: 67.90 },
      { size: "10 mg", priceUSD: 126.10 },
    ],
    scientificSummary:
      "A modified GHRH(1-29) analog described in pharmacokinetic research literature. The DAC (drug affinity complex) variant carries a maleimidopropionic acid moiety at the C-terminus, described in the literature as a reference peptide for in vitro receptor and analytical work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Teichman, S.L. et al. (2006). J. Clin. Endocrinol. Metab. 91(3): 799–805."],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin (reference standard)",
    category: "Reference Peptide",
    catalogNumber: "BH-REF-063",
    casNumber: "170851-70-4",
    molecularFormula: "C38H49N9O5",
    molecularWeight: "711.85 g/mol",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packs: [
      { size: "5 mg", priceUSD: 43.65 },
      { size: "10 mg", priceUSD: 82.45 },
    ],
    scientificSummary:
      "A synthetic pentapeptide described in the receptor-pharmacology literature as a reference ligand at the ghrelin/GHS-R1a receptor system. Supplied as a laboratory reference standard for in vitro receptor and analytical work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Raun, K. et al. (1998). Eur. J. Endocrinol. 139(5): 552–561."],
  },
];

export const categories: ResearchCategory[] = [
  "Reference Peptide",
  "Investigational Reference Compound",
  "Peptide Fragment",
  "Metal-Complex Peptide",
];

export const getItem = (slug: string) => items.find((p) => p.slug === slug);

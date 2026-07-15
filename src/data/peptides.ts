// BIOHACKERS research materials catalog — laboratory reference data only.
// No dosing, no administration, no therapeutic or bodily-effect claims.

export type ResearchCategory =
  | "Reference Peptide"
  | "Investigational Reference Compound"
  | "Peptide Fragment"
  | "Metal-Complex Peptide";

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
  packSizes: string[]; // pack sizes for laboratory shipment (dry powder)
  scientificSummary: string; // literature-neutral background, no use claims
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
    molecularWeight: "401.9 g/mol",
    sequence: "Gly-His-Lys · Cu(II)",
    physicalForm: "Lyophilized deep-blue powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packSizes: ["50 mg", "100 mg", "200 mg"],
    scientificSummary:
      "A copper(II) coordination complex of the tripeptide glycyl-L-histidyl-L-lysine. First isolated from human plasma in 1973 and referenced in a broad body of biochemistry and materials-science literature examining copper-peptide coordination chemistry, extracellular-matrix biology in cell-culture systems, and antioxidant enzyme assays.",
    analyticalMethods: ["RP-HPLC (UV, 220 nm)", "ESI-MS", "Karl Fischer moisture"],
    references: [
      "Pickart, L. et al. (1973). Nature.",
      "Pickart, L., Margolina, A. (2018). Int. J. Mol. Sci.",
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide (reference standard)",
    category: "Investigational Reference Compound",
    catalogNumber: "BH-INC-014",
    molecularFormula: "C221H343N45O68",
    molecularWeight: "~4731 g/mol",
    physicalForm: "Lyophilized white to off-white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packSizes: ["5 mg", "10 mg", "15 mg", "20 mg"],
    scientificSummary:
      "An investigational reference peptide reported in the endocrinology literature in the context of tri-receptor incretin pharmacology research. Supplied as a laboratory reference standard for analytical, method-development, and non-clinical research applications.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "LC-MS", "Peptide content by AAA"],
    references: [
      "Coskun, T. et al. (2022). Cell Metab.",
      "Jastreboff, A.M. et al. (2023). NEJM.",
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
    molecularWeight: "~5195.8 g/mol",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packSizes: ["2 mg", "5 mg", "10 mg"],
    scientificSummary:
      "A stabilized 44-amino-acid GHRH analog referenced in endocrinology literature as a laboratory reference standard for receptor-binding, analytical, and method-development research.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS", "Karl Fischer moisture"],
    references: ["Falutz, J. et al. (2010). J. Clin. Endocrinol. Metab."],
  },
  {
    slug: "bpc-157",
    name: "BPC-157 (reference standard)",
    fullName: "Body Protection Compound-157",
    category: "Peptide Fragment",
    catalogNumber: "BH-FRG-032",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.5 g/mol",
    sequence: "GEPPPGKPADDAGLV",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packSizes: ["5 mg", "10 mg"],
    scientificSummary:
      "A synthetic pentadecapeptide whose sequence is described in the preclinical research literature. Supplied as a laboratory reference standard for in vitro assay development and analytical characterization.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Sikiric, P. et al. (2018). Curr. Pharm. Des."],
  },
  {
    slug: "tb-500",
    name: "TB-500 (reference standard)",
    fullName: "Thymosin β4 (17-23) fragment",
    category: "Peptide Fragment",
    catalogNumber: "BH-FRG-041",
    molecularFormula: "C34H55N9O10",
    molecularWeight: "~889 g/mol",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packSizes: ["2 mg", "5 mg", "10 mg"],
    scientificSummary:
      "A synthetic fragment corresponding to a region of thymosin β4 described in cytoskeletal-biology research literature. Supplied as a laboratory reference standard for in vitro research and analytical method work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Goldstein, A.L. et al. (2005). FASEB J."],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295 (reference standard)",
    fullName: "Modified GHRH(1-29) analog",
    category: "Reference Peptide",
    catalogNumber: "BH-REF-055",
    molecularFormula: "C165H269N47O46",
    molecularWeight: "3648.2 g/mol",
    physicalForm: "Lyophilized white powder",
    statedPurity: "≥ 98% (documented on Certificate of Analysis)",
    storage: "Store dry at ≤ -20 °C; protect from light and moisture.",
    packSizes: ["2 mg", "5 mg", "10 mg"],
    scientificSummary:
      "A modified GHRH(1-29) analog described in pharmacokinetic research literature. Supplied as a laboratory reference standard for receptor-binding and analytical research.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Teichman, S.L. et al. (2006). J. Clin. Endocrinol. Metab."],
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
    packSizes: ["2 mg", "5 mg", "10 mg"],
    scientificSummary:
      "A synthetic pentapeptide described in the receptor-pharmacology literature. Supplied as a laboratory reference standard for in vitro receptor and analytical work.",
    analyticalMethods: ["RP-HPLC (UV, 214 nm)", "ESI-MS"],
    references: ["Raun, K. et al. (1998). Eur. J. Endocrinol."],
  },
];

export const categories: ResearchCategory[] = [
  "Reference Peptide",
  "Investigational Reference Compound",
  "Peptide Fragment",
  "Metal-Complex Peptide",
];

export const getItem = (slug: string) => items.find((p) => p.slug === slug);

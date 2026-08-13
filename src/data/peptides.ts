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
  | "Metal-Complex Peptide";

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
  references: string[];
  documentation?: string[];
  coaUrl?: string;
  sdsUrl?: string;
}

const COMMON = {
  shippingTemperature:
    "Shipped with cold packs; short-term ambient exposure during transit does not typically affect a lyophilized reference standard.",
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
    references: [
      "Pickart, L.; Thaler, M.M. (1973). Nature New Biology 243: 85–87.",
      "Pickart, L.; Margolina, A. (2018). Int. J. Mol. Sci. 19(7): 1987.",
      "Maquart, F.X. et al. (1988). FEBS Lett. 238(2): 343–346.",
      "Pickart, L. (2008). J. Biomater. Sci. Polym. Ed. 19(8): 969–988.",
      "Pickart, L.; Vasquez-Soltero, J.M.; Margolina, A. (2015). Oxid. Med. Cell. Longev. 2015: 648108.",
      "Miller, D.M.; DeSilva, D.; Pickart, L.; Aust, S.D. (1990). Adv. Exp. Med. Biol. 264: 79–84.",
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
    references: [
      "Coskun, T. et al. (2022). Cell Metabolism 34(9): 1234–1247.e9.",
      "Jastreboff, A.M. et al. (2023). N. Engl. J. Med. 389: 514–526.",
      "Rosenstock, J. et al. (2023). The Lancet 402(10401): 529–544.",
      "Urva, S. et al. (2022). The Lancet 400(10366): 1869–1881.",
      "Knerr, P.J. et al. (2022). Mol. Metab. 63: 101533.",
      "Frías, J.P. (2024). Curr. Opin. Endocrinol. Diabetes Obes. 31(2): 68–75.",
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
    references: [
      "Falutz, J. et al. (2010). J. Clin. Endocrinol. Metab. 95(9): 4291–4304.",
      "Ferdinandi, E.S. et al. (2007). Basic Clin. Pharmacol. Toxicol. 100(1): 49–58.",
      "Stanley, T.L. et al. (2014). JAMA 312(4): 380–389.",
      "Adrian, S. et al. (2019). J. Endocr. Soc. 3(6): 1149–1162.",
      "Clemmons, D.R. (2019). Endocr. Rev. 40(1): 1–15.",
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
    references: [
      "Sikiric, P. et al. (2018). Curr. Pharm. Des. 24(18): 1990–2001.",
      "Seiwerth, S. et al. (2018). Curr. Pharm. Des. 24(18): 1972–1989.",
      "Sikiric, P. et al. (2020). Curr. Med. Chem. 27(41): 6795–6820.",
      "Chang, C.H. et al. (2014). J. Appl. Physiol. 117(11): 1287–1293.",
      "Vukojević, J. et al. (2022). Biomedicines 10(6): 1420.",
    ],
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
    references: [
      "Goldstein, A.L. et al. (2005). Ann. N.Y. Acad. Sci. 1112: 1–13.",
      "Crockford, D. et al. (2010). Ann. N.Y. Acad. Sci. 1194: 179–189.",
      "Sosne, G.; Rimmer, D.; Kleinman, H.K.; Ousler, G. (2010). Vitam. Horm. 87: 155–176.",
      "Kleinman, H.K.; Sosne, G. (2016). Vitam. Horm. 102: 251–275.",
      "Xing, Y. et al. (2021). Int. J. Mol. Sci. 22(11): 5904.",
    ],
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
    references: [
      "Teichman, S.L. et al. (2006). J. Clin. Endocrinol. Metab. 91(3): 799–805.",
      "Ionescu, M.; Frohman, L.A. (2006). J. Clin. Endocrinol. Metab. 91(12): 4792–4797.",
      "Sackmann-Sala, L.; Kopchick, J.J. (2015). Endocr. Rev. 36(2): 234–261.",
      "Alba, M. et al. (2006). J. Clin. Endocrinol. Metab. 91(4): 1477–1484.",
    ],
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
    references: [
      "Raun, K. et al. (1998). Eur. J. Endocrinol. 139(5): 552–561.",
      "Johansen, P.B. et al. (1999). Growth Horm. IGF Res. 9(2): 106–113.",
      "Gobburu, J.V.S. et al. (1999). J. Clin. Pharmacol. 39(11): 1141–1148.",
      "Sinha, D.K. et al. (2017). Transl. Androl. Urol. 6(Suppl 5): S760–S766.",
      "Andersen, N.H. et al. (2001). J. Am. Chem. Soc. 123(11): 2528–2533.",
    ],
  },
];

export const categories: ResearchCategory[] = [
  "Reference Peptide",
  "Investigational Reference Compound",
  "Peptide Fragment",
  "Metal-Complex Peptide",
];

export const getItem = (slug: string) => items.find((p) => p.slug === slug);

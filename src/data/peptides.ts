import ghkCuImg from "@/assets/peptides/ghk-cu.jpg";
import retatrutideImg from "@/assets/peptides/retatrutide.jpg";
import tesamorelinImg from "@/assets/peptides/tesamorelin.jpg";
import bpc157Img from "@/assets/peptides/bpc-157.jpg";
import tb500Img from "@/assets/peptides/tb-500.jpg";
import cjc1295Img from "@/assets/peptides/cjc-1295.jpg";
import ipamorelinImg from "@/assets/peptides/ipamorelin.jpg";

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
  image: string;
  tagline: string;
  overview: string;
  description: string;
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
    image: ghkCuImg,
    tagline: "A naturally occurring copper-binding tripeptide studied for skin and tissue research.",
    overview:
      "GHK-Cu is a tripeptide complex with copper(II) that has been the subject of decades of research into skin remodeling, antioxidant signaling, and gene expression modulation.",
    description:
      "GHK-Cu (glycyl-L-histidyl-L-lysine copper) is a small, naturally occurring tripeptide that forms a stable complex with copper(II) ions, giving reconstituted solutions a distinctive deep-blue color. It was first isolated from human plasma in 1973, where its concentration was observed to decline progressively with age — an observation that has driven hundreds of subsequent studies. Research literature has explored its influence over fibroblast behavior, collagen and glycosaminoglycan synthesis pathways, and broad gene-expression patterns linked to tissue remodeling and antioxidant defense. It remains a widely referenced compound in dermatological, regenerative, and follicular research models.",
    research:
      "First isolated from human plasma in 1973, GHK-Cu levels decline naturally with age. Research literature explores its role in extracellular matrix studies, collagen-related pathways, antioxidant assays, and gene expression profiling where it has been reported to modulate the expression of hundreds of genes related to tissue repair.",
    mechanism:
      "GHK binds copper(II) ions with high affinity. In research models, this complex has been studied for its influence on fibroblast activity, expression of collagen and decorin, modulation of TGF-β related signaling pathways, and activity at antioxidant enzyme systems including SOD.",
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
    image: retatrutideImg,
    tagline: "An investigational triple agonist studied in metabolic research.",
    overview:
      "Retatrutide is an investigational peptide studied as a triple agonist of GLP-1, GIP, and glucagon receptors. It is under active clinical investigation and is for research and educational discussion only.",
    description:
      "Retatrutide is an investigational next-generation incretin peptide engineered to simultaneously engage three distinct receptors involved in energy regulation: the GLP-1 receptor, the GIP receptor, and the glucagon receptor. This triple-agonism profile distinguishes it from earlier mono- and dual-agonist incretins and has made it a major focus of recent metabolic research. Published Phase 1 and Phase 2 trial data have explored its pharmacokinetics, dose-response curves, and effects on body composition and metabolic markers in clinical research populations. It is not an approved therapeutic and is presented here strictly as an educational summary of the existing research literature.",
    research:
      "Published Phase 1 and Phase 2 trial data have explored its pharmacokinetics and effects in metabolic research. It remains an investigational compound, not approved for clinical use.",
    mechanism:
      "Retatrutide is designed to engage three incretin-related receptors simultaneously: GLP-1R, GIPR, and the glucagon receptor, a combination studied for its effect on energy balance pathways, hepatic substrate handling, and satiety signaling in research models.",
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
    image: tesamorelinImg,
    tagline: "A stabilized GHRH analog used in endocrinology research.",
    overview:
      "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH) that has been widely studied in endocrine research literature.",
    description:
      "Tesamorelin is a stabilized 44-amino-acid analog of human growth hormone-releasing hormone (GHRH), modified with a trans-3-hexenoic acid group on the N-terminus to extend its plasma half-life relative to native GHRH. Because it acts directly at the GHRH receptor on the anterior pituitary, it has been studied as a tool for evaluating endogenous, pulsatile growth hormone release rather than supplying exogenous GH. Research literature has examined its pharmacokinetics, effects on IGF-1 signaling, and impact on body composition markers — particularly visceral adipose tissue — across multiple controlled clinical studies.",
    research:
      "Research has examined Tesamorelin's pharmacokinetics, half-life, and effects on IGF-1 axis signaling in published clinical studies, including controlled trials on visceral adipose tissue endpoints.",
    mechanism:
      "As a GHRH analog, Tesamorelin binds the GHRH receptor on the anterior pituitary, a pathway studied for its role in pulsatile endogenous growth hormone release and downstream IGF-1 production.",
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
    image: bpc157Img,
    tagline: "A pentadecapeptide studied in tissue and recovery research.",
    overview:
      "BPC-157 is a synthetic 15-amino-acid sequence derived from a protective protein found in gastric juice, widely studied in preclinical research literature.",
    description:
      "BPC-157, short for Body Protection Compound-157, is a synthetic pentadecapeptide whose sequence is derived from a larger gastric-protective protein identified in human gastric juice. It has been the subject of an unusually broad preclinical literature spanning tendon, ligament, muscle, nerve, and gastrointestinal tissue models. Researchers have repeatedly reported angiogenic, cytoprotective, and growth-factor-modulating effects in animal studies, although large-scale human clinical data remain limited. It is widely referenced in recovery and tissue-repair research discussions and is presented here strictly as an educational summary of that literature.",
    research:
      "Animal-model research has examined BPC-157's effects on tendon, muscle, nerve, and gastrointestinal tissue models, including tendon-to-bone healing assays. Human clinical data remain limited.",
    mechanism:
      "Research suggests effects on angiogenic signaling (e.g., VEGFR2 upregulation), growth factor pathways, nitric oxide system modulation, and dopaminergic and serotonergic interactions in preclinical models.",
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
    image: tb500Img,
    tagline: "A synthetic fragment related to thymosin beta-4, studied in recovery research.",
    overview:
      "TB-500 is a synthetic peptide related to a region of thymosin beta-4, a naturally occurring protein studied in cellular migration and tissue research.",
    description:
      "TB-500 is a synthetic peptide corresponding to an active region of thymosin beta-4 (Tβ4), a naturally occurring 43-amino-acid protein expressed in nearly every cell of the human body. Tβ4 is best known as the principal intracellular G-actin sequestering molecule, giving it a central role in cytoskeletal organization, cell migration, and tissue repair. Preclinical research on TB-500 and Tβ4 spans cardiac, vascular, dermal, ocular, and connective-tissue models, where investigators have explored their roles in cell motility, angiogenesis, and inflammation modulation.",
    research:
      "Preclinical literature has investigated TB-500's role in actin regulation, cellular migration assays, cardiac and corneal tissue repair models, and angiogenesis research.",
    mechanism:
      "Thymosin beta-4 binds G-actin and is studied for its role in cytoskeletal dynamics, cell migration, anti-inflammatory signaling, and angiogenesis-related pathways.",
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
    image: cjc1295Img,
    tagline: "A long-acting GHRH analog studied in endocrine research.",
    overview:
      "CJC-1295 is a synthetic peptide modeled on GHRH(1-29). Research versions exist with and without a Drug Affinity Complex (DAC) modification that extends half-life.",
    description:
      "CJC-1295 is a modified GHRH(1-29) analog engineered for greater stability than native GHRH. It exists in two principal research forms: a short-acting version (sometimes labeled Mod GRF 1-29) and a long-acting variant carrying a Drug Affinity Complex (DAC), a maleimide linker that covalently binds serum albumin in circulation. The DAC modification dramatically extends plasma half-life, which has made the two variants a frequent comparison pair in pharmacokinetic and pulsatility research. Studies have examined their effects on growth hormone and IGF-1 release patterns in research models.",
    research:
      "Research literature has examined the effects of DAC modification on plasma half-life, IGF-1 elevation duration, and pulsatile growth hormone release patterns in research models.",
    mechanism:
      "As a GHRH analog, CJC-1295 engages the GHRH receptor. The DAC variant binds serum albumin via a maleimide linker, a mechanism studied for its impact on circulation time and pharmacokinetic profile.",
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
    image: ipamorelinImg,
    tagline: "A selective ghrelin-receptor agonist studied in endocrine research.",
    overview:
      "Ipamorelin is a synthetic pentapeptide and selective growth hormone secretagogue receptor (GHS-R) agonist studied in endocrine research.",
    description:
      "Ipamorelin is a synthetic pentapeptide and one of the most selective growth hormone secretagogue receptor (GHS-R, the ghrelin receptor) agonists characterized in the research literature. Unlike earlier secretagogues such as GHRP-2 or GHRP-6, ipamorelin shows minimal cross-activity with the receptors that regulate prolactin, ACTH, or cortisol release — a selectivity profile that has made it a useful pharmacological tool for isolating ghrelin-pathway effects on pulsatile growth hormone release in research models. It is frequently paired with GHRH analogs in comparative endocrine studies.",
    research:
      "Research literature has examined Ipamorelin's selectivity profile, particularly its limited effect on prolactin and cortisol pathways compared with earlier secretagogues.",
    mechanism:
      "Ipamorelin binds the GHS-R (ghrelin receptor), a pathway studied for its role in pulsatile growth hormone release. Its selectivity for GHS-R over related receptors is a frequently cited feature in comparative pharmacology.",
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

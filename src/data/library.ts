// BIOHACKERS Research Library — long-form laboratory-practice reference
// articles. All content is neutral, laboratory-focused, and contains no
// administration or personal-use guidance.

export type LibraryIcon =
  | "FileText"
  | "TestTube"
  | "ShieldCheck"
  | "HardHat"
  | "FlaskConical"
  | "Recycle"
  | "BookOpen";

export interface LibrarySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LibraryArticle {
  slug: string;
  title: string;
  icon: LibraryIcon;
  summary: string;
  sections: LibrarySection[];
  furtherReading?: string[];
}

export const articles: LibraryArticle[] = [
  {
    slug: "reading-a-certificate-of-analysis",
    title: "Reading a Certificate of Analysis",
    icon: "FileText",
    summary:
      "How to interpret identity, purity, water content, residual solvents, and lot-specific data typically reported on a peptide reference-standard CoA.",
    sections: [
      {
        heading: "What a Certificate of Analysis is",
        paragraphs: [
          "A Certificate of Analysis (CoA) is a lot-specific quality document issued by the manufacturer that describes the analytical tests performed on a particular production batch and the results obtained. For peptide reference standards it is the primary record used by receiving laboratories to confirm identity, purity, and physical characteristics before the material is used in research.",
          "A CoA is not a marketing document. It reports measurements made by named analytical methods on the exact lot number shown, and it is signed or approved by a qualified analyst or QC officer.",
        ],
      },
      {
        heading: "Key fields to check on receipt",
        paragraphs: [
          "Verify that the following fields on the CoA match the vial label and your purchase record. A mismatch in any of these fields is a reason to quarantine the material and contact the supplier before use.",
        ],
        bullets: [
          "Product name and catalog number",
          "Lot / batch number and manufacturing date",
          "Storage conditions and re-test / expiry date",
          "Net contents per vial (mass, in mg)",
          "Molecular formula and calculated molecular weight",
          "Sequence (for peptides) written in one-letter or three-letter code",
        ],
      },
      {
        heading: "Identity tests",
        paragraphs: [
          "Identity is typically confirmed by mass spectrometry (ESI-MS, MALDI-TOF, or LC-MS) reporting an observed monoisotopic or average mass consistent with the theoretical value. For peptides, amino-acid analysis (AAA) may also be reported to confirm composition.",
          "The CoA should state the expected mass, the observed mass, and a pass/fail statement. If the observed mass differs by more than the tolerance stated by the method, the identity is not confirmed.",
        ],
      },
      {
        heading: "Purity",
        paragraphs: [
          "Chromatographic purity for peptides is usually reported as the percent area of the main peak in a reversed-phase HPLC chromatogram at a stated detection wavelength (commonly 214 nm for the peptide bond or 220 nm). Typical reference-standard specifications are ≥ 95% or ≥ 98% by HPLC.",
          "The CoA should also state the column, mobile-phase system, gradient, flow rate, and detection wavelength used, so that another laboratory can reproduce the measurement.",
        ],
      },
      {
        heading: "Water content, residual solvents, and counter-ion content",
        paragraphs: [
          "Water content is commonly measured by Karl Fischer titration and reported as a percent by mass. Residual solvents (for example, TFA, acetonitrile, DMF) are commonly measured by headspace GC or ion chromatography. The peptide-content or net-peptide value is calculated after subtracting water, counter-ions (such as trifluoroacetate or acetate), and residual solvents from the gross mass.",
          "This distinction matters: a vial labelled '5 mg' typically refers to gross mass. The mass of pure peptide in that vial is gross mass × (peptide content / 100).",
        ],
      },
      {
        heading: "Documentation to retain",
        paragraphs: [
          "File the CoA electronically against the lot number and cross-reference it to any downstream experimental notebooks that use the lot. Reference-standard laboratories typically retain CoAs for the life of the material plus a defined retention period set by institutional policy.",
        ],
      },
    ],
    furtherReading: [
      "USP General Chapter <1010> — Analytical Data Interpretation and Treatment",
      "ICH Q6A — Specifications: Test Procedures and Acceptance Criteria",
    ],
  },
  {
    slug: "interpreting-a-safety-data-sheet",
    title: "Interpreting a Safety Data Sheet",
    icon: "ShieldCheck",
    summary:
      "Section-by-section walkthrough of GHS-format SDS documents for laboratory chemicals: hazards, first-aid, handling, and disposal information.",
    sections: [
      {
        heading: "What a Safety Data Sheet is",
        paragraphs: [
          "A Safety Data Sheet (SDS) is a standardized document that communicates the physical, health, and environmental hazards of a chemical substance, along with recommended precautions for handling, storage, and emergency response. The Globally Harmonized System (GHS) format used worldwide is organized into 16 numbered sections in a fixed order.",
          "Every laboratory that receives a chemical is expected to review the SDS before opening the container and to keep the SDS accessible to personnel who may handle the material.",
        ],
      },
      {
        heading: "The 16 GHS sections",
        paragraphs: ["The GHS format standardizes SDS layout across suppliers and jurisdictions."],
        bullets: [
          "1 — Identification (product identifier, supplier, emergency contact)",
          "2 — Hazard identification (GHS classification, signal word, pictograms)",
          "3 — Composition / information on ingredients",
          "4 — First-aid measures",
          "5 — Fire-fighting measures",
          "6 — Accidental release measures (spill response)",
          "7 — Handling and storage",
          "8 — Exposure controls / personal protection",
          "9 — Physical and chemical properties",
          "10 — Stability and reactivity",
          "11 — Toxicological information",
          "12 — Ecological information",
          "13 — Disposal considerations",
          "14 — Transport information",
          "15 — Regulatory information",
          "16 — Other information (revision date, references)",
        ],
      },
      {
        heading: "Sections to read first",
        paragraphs: [
          "Sections 2, 4, 7, and 8 give the fastest overview of what the material is, what to do if someone is exposed, how to store it, and what PPE and engineering controls are recommended for routine handling.",
          "Section 10 (stability and reactivity) lists conditions and incompatible materials that could destabilize the substance during storage or in an experiment.",
        ],
      },
      {
        heading: "Peptide reference standards",
        paragraphs: [
          "Synthetic peptides often have limited published toxicological data (Section 11). In practice, laboratories handle them under general precautions for fine biological powders: minimize inhalation of dust, avoid skin and eye contact, and handle inside a chemical fume hood or biosafety cabinet.",
          "The SDS may state 'no data available' for many endpoints. That is not a statement of safety — it means the endpoint has not been characterized for the substance and precautionary handling is required.",
        ],
      },
      {
        heading: "What the SDS is not",
        paragraphs: [
          "An SDS is a hazard-communication document. It is not a use permission, a dosing document, or a treatment guide. It does not tell a laboratory whether a specific experimental use is permitted; that determination is made by the researcher's institution, biosafety committee, and jurisdictional regulator.",
        ],
      },
    ],
    furtherReading: [
      "OSHA Hazard Communication Standard, 29 CFR 1910.1200 (Appendix D — SDS format)",
      "UN Globally Harmonized System of Classification and Labelling of Chemicals (GHS), Purple Book",
    ],
  },
  {
    slug: "personal-protective-equipment",
    title: "Personal protective equipment",
    icon: "HardHat",
    summary:
      "General laboratory PPE principles for handling powdered reference standards: gloves, eye protection, lab coat, and engineering controls such as fume hoods and biosafety cabinets.",
    sections: [
      {
        heading: "The hierarchy of controls",
        paragraphs: [
          "In an occupational-hygiene framework, personal protective equipment (PPE) is the last line of defense, not the first. The recognized hierarchy of controls, in decreasing order of effectiveness, is: elimination, substitution, engineering controls, administrative controls, and finally PPE.",
          "For laboratory work with powdered reference standards, the primary engineering controls are a well-maintained chemical fume hood or a certified biosafety cabinet used to contain dust and vapors at the source.",
        ],
      },
      {
        heading: "Baseline PPE for handling dry peptide powders",
        paragraphs: [
          "The exact PPE set depends on the SDS and the risk assessment performed by the receiving laboratory. A common baseline for weighing and reconstituting a dry peptide reference standard in a research laboratory includes:",
        ],
        bullets: [
          "A closed lab coat with long sleeves, buttoned or snapped",
          "Chemical-splash safety goggles (ANSI Z87.1 or equivalent)",
          "Nitrile disposable gloves in the appropriate thickness; double-gloving if handling large amounts of powder",
          "Long trousers and closed-toe shoes covering the top of the foot",
          "Hair pulled back and no jewelry that can catch on equipment",
        ],
      },
      {
        heading: "Respiratory protection",
        paragraphs: [
          "Routine bench weighing of a few milligrams of powdered peptide inside a fume hood does not usually require a respirator. Respiratory protection is added when engineering controls cannot fully contain the material, for example when weighing large amounts of very fine powder outside a hood.",
          "Any respirator use falls under a formal respiratory-protection program: hazard assessment, medical clearance, fit testing, training, and documented recordkeeping.",
        ],
      },
      {
        heading: "Glove selection and use",
        paragraphs: [
          "Nitrile is a common general-purpose choice for laboratory work because it resists many organic solvents and offers reasonable puncture resistance. Latex is not preferred, both for allergen reasons and for its lower resistance to many solvents.",
          "Gloves are single-use. Change them if they become torn, contaminated, or after handling a spill. Remove gloves before touching door handles, keyboards, telephones, and personal items.",
        ],
      },
      {
        heading: "Doffing and hand hygiene",
        paragraphs: [
          "Remove gloves by pinching the outside of one glove near the wrist, peeling it away, and then sliding fingers under the second glove to peel it off without touching the outside. Wash hands with soap and water after removing PPE, before leaving the laboratory, and before eating or drinking (which are not permitted in the lab).",
        ],
      },
    ],
    furtherReading: [
      "OSHA Laboratory Standard, 29 CFR 1910.1450 and Appendix A (Prudent Practices in the Laboratory)",
      "NRC — Prudent Practices in the Laboratory (National Academies Press, latest edition)",
    ],
  },
  {
    slug: "storage-and-stability-principles",
    title: "Storage and stability principles",
    icon: "FlaskConical",
    summary:
      "Temperature, humidity, light, and container considerations when storing lyophilized peptide reference materials for analytical work.",
    sections: [
      {
        heading: "Why storage matters",
        paragraphs: [
          "Peptides can degrade by hydrolysis, oxidation, deamidation, aggregation, and disulfide scrambling. The rate of each pathway is a function of temperature, moisture, light, oxygen, container material, and the specific amino-acid sequence. Correct storage extends the interval during which a lot continues to meet the specifications stated on its CoA.",
        ],
      },
      {
        heading: "Temperature",
        paragraphs: [
          "Follow the storage condition stated on the CoA and the vial label. Many lyophilized peptide reference standards are stored dry at ≤ -20 °C, with long-term storage at ≤ -80 °C where indicated.",
          "A dedicated laboratory freezer with documented temperature monitoring is preferred to a domestic freezer. Sudden temperature swings and defrost cycles accelerate degradation.",
        ],
      },
      {
        heading: "Moisture",
        paragraphs: [
          "Water accelerates hydrolysis and can promote conformational changes. Always allow sealed vials to equilibrate to room temperature before opening, to avoid condensation on the vial contents. Handle open vials briefly and reseal under dry conditions where possible (for example, inside a desiccator cabinet with an active desiccant).",
        ],
      },
      {
        heading: "Light and oxygen",
        paragraphs: [
          "UV and visible light can drive photo-oxidation of aromatic residues (Trp, Tyr, Phe) and of methionine. Store amber vials in the dark. For unusually oxidation-sensitive sequences, headspace displacement with an inert gas (nitrogen or argon) may be specified in the CoA.",
        ],
      },
      {
        heading: "Containers and aliquoting",
        paragraphs: [
          "Repeated freeze–thaw cycles are a common cause of loss of stated purity in reconstituted stocks. When a stock solution is to be prepared for downstream analytical work, aliquot it into single-use volumes immediately after reconstitution, in low-adsorption tubes appropriate to the sequence, and freeze the aliquots at the temperature specified on the CoA.",
          "Record the reconstitution date, buffer, concentration, and lot number on every aliquot. Do not top up or combine aliquots from different lots.",
        ],
      },
    ],
    furtherReading: [
      "USP General Chapter <1049> — Quality of Biotechnological Products: Stability Testing",
      "ICH Q1A(R2) — Stability Testing of New Drug Substances and Products",
    ],
  },
  {
    slug: "laboratory-waste-and-disposal",
    title: "Laboratory waste and disposal",
    icon: "Recycle",
    summary:
      "General principles for segregating, labeling, and disposing of laboratory chemical waste in accordance with institutional and jurisdictional requirements.",
    sections: [
      {
        heading: "Waste is generated at every step",
        paragraphs: [
          "Analytical chemistry work generates spent solvents, contaminated glassware, disposable plasticware, gloves, wipes, unused reagent, and empty containers. Each stream may have a different disposal route.",
          "The definitive authority for laboratory chemical-waste disposal is the local Environmental Health & Safety (EHS) office or institutional equivalent, operating under the applicable jurisdictional rules (in the United States, RCRA; in the European Union, national implementations of the Waste Framework Directive; and analogous programs elsewhere).",
        ],
      },
      {
        heading: "Segregation",
        paragraphs: [
          "Segregate waste at the point of generation. Common baseline categories are: non-halogenated organic solvents, halogenated organic solvents, aqueous acids, aqueous bases, heavy-metal-containing solutions, sharps, biohazardous solids, and general chemical solids.",
          "Never mix incompatible waste streams (for example, acids with bulk oxidizers or cyanide-containing solutions), and never assume a mixture is safe if a component is unknown.",
        ],
      },
      {
        heading: "Labeling",
        paragraphs: [
          "Every waste container needs a label showing the full chemical name(s) of the contents (no abbreviations, no formulas alone), the approximate percentage composition, the words 'Hazardous Waste' where required by jurisdiction, and the accumulation start date. The label must be legible and applied as soon as the first drop of waste enters the container.",
        ],
      },
      {
        heading: "Containers and accumulation",
        paragraphs: [
          "Use containers compatible with the waste (for example, no strong bases in aluminum). Keep containers closed except when actively adding waste. Store on secondary containment sized for the primary container's volume. Follow the institutional accumulation-time and volume limits for satellite storage.",
        ],
      },
      {
        heading: "Peptide reference-standard waste",
        paragraphs: [
          "Small residues of a peptide reference standard on weighing paper, spatulas, and gloves are typically handled as general chemical waste unless the SDS or local rules assign a specific stream. Bulk unused peptide should never be discharged to the sanitary sewer. When in doubt, consult EHS.",
        ],
      },
    ],
    furtherReading: [
      "US EPA — Managing Hazardous Waste Generated in Laboratories (RCRA)",
      "European Waste Catalogue (Commission Decision 2000/532/EC, as amended)",
    ],
  },
  {
    slug: "evaluating-scientific-literature",
    title: "Evaluating scientific literature",
    icon: "BookOpen",
    summary:
      "How to read a peer-reviewed paper critically — study design, sample size, controls, and the difference between preclinical and clinical evidence.",
    sections: [
      {
        heading: "Not all evidence is equal",
        paragraphs: [
          "Published research spans a spectrum of designs, from in vitro receptor-binding assays through animal studies to controlled human clinical trials. When a claim is drawn from a paper, the design of the underlying study places a hard ceiling on how confidently the claim can be generalized.",
          "For laboratory research on reference standards, the goal of literature review is usually to characterize a molecule — its structure, chemical behavior, and receptor pharmacology — not to establish clinical outcomes.",
        ],
      },
      {
        heading: "Reading a paper: a suggested order",
        paragraphs: ["Rather than reading top to bottom, many analysts read a paper in this order:"],
        bullets: [
          "Title and abstract — what is claimed and in what system",
          "Figures and tables — the actual data",
          "Methods — how the data were collected (species, cell line, n, controls, statistics)",
          "Results narrative — the authors' description of the figures",
          "Discussion — the authors' interpretation and stated limitations",
          "Introduction and references — context and provenance",
        ],
      },
      {
        heading: "Design questions to ask",
        paragraphs: ["Any preclinical or clinical study can be interrogated with a small set of questions."],
        bullets: [
          "Was the design randomized? If not, why not?",
          "Were the investigators or analysts blinded to treatment?",
          "What were the controls (vehicle, sham, positive control)?",
          "Is the sample size (n) large enough for the reported statistics? Was a power calculation reported?",
          "Was the endpoint pre-specified, or selected after inspecting the data?",
          "Are the statistical tests appropriate to the data type and distribution?",
          "Are the raw data (or a deposited dataset) available for reanalysis?",
        ],
      },
      {
        heading: "Preclinical does not equal clinical",
        paragraphs: [
          "A large effect observed in a cell line or a rodent model does not, on its own, predict a comparable effect in humans. The failure rate of otherwise-promising preclinical candidates in later-phase human trials is high and well documented. Treat rodent, in vitro, and computational results as hypothesis-generating, not as evidence about human use.",
          "By the same reasoning, the presence of a compound in published preclinical literature is not a use recommendation for that compound outside the described experimental system.",
        ],
      },
      {
        heading: "Provenance and correction",
        paragraphs: [
          "Check whether a paper has been corrected, retracted, or the subject of published critique. Databases such as Retraction Watch and the publisher's own erratum system are the first stop. A retracted paper should not be cited to support a claim, and prior work that depended on it may need to be re-evaluated.",
        ],
      },
    ],
    furtherReading: [
      "Greenhalgh, T. — How to Read a Paper (BMJ Books, latest edition)",
      "EQUATOR Network — reporting guidelines by study type (CONSORT, ARRIVE, STROBE, PRISMA)",
    ],
  },
  {
    slug: "analytical-methods-overview",
    title: "Analytical methods overview",
    icon: "TestTube",
    summary:
      "Common analytical techniques used to characterize peptide reference materials: RP-HPLC, LC-MS, amino-acid analysis, and Karl Fischer titration.",
    sections: [
      {
        heading: "Reversed-phase HPLC (RP-HPLC)",
        paragraphs: [
          "RP-HPLC on a C18 stationary phase with a water/acetonitrile gradient (typically containing 0.1% trifluoroacetic acid as an ion-pair modifier) is the workhorse chromatographic method for peptide purity and identity confirmation. UV detection at 214 nm reads the peptide bond directly; 220 nm and 280 nm are used to weight aromatic-residue absorbance differently.",
        ],
      },
      {
        heading: "Mass spectrometry",
        paragraphs: [
          "Electrospray ionization mass spectrometry (ESI-MS), often coupled to HPLC as LC-MS, provides mass confirmation with high accuracy. For peptides above roughly 3 kDa, the observed spectrum is typically a series of multiply-charged states; deconvolution yields the neutral monoisotopic or average mass.",
          "MALDI-TOF is an alternative single-stage technique that is fast and tolerant of buffer components, useful for quick identity checks on lyophilized material.",
        ],
      },
      {
        heading: "Amino-acid analysis",
        paragraphs: [
          "Amino-acid analysis (AAA) hydrolyzes the peptide under strongly acidic conditions and quantitates the resulting free amino acids. AAA provides an orthogonal measurement of peptide content that does not depend on UV absorptivity, and is often the definitive method for expressing a stated peptide concentration on the CoA.",
        ],
      },
      {
        heading: "Water content",
        paragraphs: [
          "Karl Fischer titration measures water content directly. It is standard for lyophilized reference materials and appears on the CoA as a percent by mass. Water content is a required input to any accurate peptide-content calculation.",
        ],
      },
      {
        heading: "Residual solvents and counter-ions",
        paragraphs: [
          "Headspace GC is used for volatile residual solvents (for example, acetonitrile, methanol, DMF, DMSO). Ion chromatography or 19F NMR is used to quantify counter-ions such as trifluoroacetate that co-crystallize with a basic peptide.",
        ],
      },
    ],
    furtherReading: [
      "USP General Chapter <621> — Chromatography",
      "USP General Chapter <1225> — Validation of Compendial Procedures",
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

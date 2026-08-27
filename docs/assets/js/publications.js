/* ============================================================================
   PUBLICATIONS — the single source of truth for publications.html
   ============================================================================

   To add a paper: copy one { ... } block, put it in the right place
   (newest first), and fill it in. Nothing else needs editing.

   Fields
   ------
   year      Number. Used for sorting and display.
   title     String. No trailing period.
   authors   String, exactly as you would write it on your CV.
             Your own name is bolded automatically — just type "Lin H".
             Keep the markers you use on your CV: * co-first,
             † corresponding, ‡ mentored student.
   venue     String. Journal name and volume/pages, or "Preprint", etc.
             Wrap the journal name in <em>...</em>.
   doi       String or null. Just the DOI, no "https://doi.org/" prefix.
   group     "methods" | "collaborative" | "chapter"
   tags      Array of short labels shown as grey pills. Optional.
   software  "ANCOMBC" etc. — renders a link to software.html. Optional.
   status    Short italic note, e.g. "Under revision". Optional.
   featured  true = appears in the "Selected" view. Aim for 8–12.
   ============================================================================ */

window.PUBLICATIONS = [

  /* ---------------------------------------------------------------- 2026 */
  {
    year: 2026,
    title: "Beyond bacteria: a multi-omics view of the gut–brain axis in Parkinson’s disease",
    authors: "Han H*‡, Luo O*, Li K, Rahaman S, Ok EU, Zhang L, Liang M, Lin H†",
    venue: "<em>Frontiers in Cellular and Infection Microbiology</em>",
    doi: null,
    group: "methods",
    tags: ["Multi-omics", "Parkinson’s disease", "Student-led"],
    status: "Under revision",
    featured: true
  },
  {
    year: 2026,
    title: "Protocol for constructing correlation-based molecular networks from large-scale untargeted metabolomics data",
    authors: "Lin H†, Zhang L, Lotfi A, Jarmusch A, Lee I, Kim A, Morton JT, Aksenov A",
    venue: "<em>bioRxiv</em>",
    doi: "10.1101/2025.04.26.649581",
    group: "methods",
    tags: ["Metabolomics", "Correlation networks"],
    software: "MetVAE",
    status: "Under revision at STAR Protocols",
    featured: true
  },
  {
    year: 2026,
    title: "Efficient and scalable Python implementation of ANCOM-BC for omics differential abundance testing",
    authors: "Wu Z, Lin H, Morton JT, Zhu Q",
    venue: "<em>bioRxiv</em>",
    doi: "10.64898/2026.01.26.701398",
    group: "collaborative",
    tags: ["ANCOM-BC", "Software"],
    status: "Preprint",
    featured: true
  },
  {
    year: 2026,
    title: "The gut–brain axis in Alzheimer’s disease: early detection, microbial metabolites, mechanisms, and therapeutic opportunities",
    authors: "Liu C, Zhu Z, Lin H, …, Zhang L",
    venue: "<em>Frontiers in Molecular Biosciences</em>, 13:1735332",
    doi: null,
    group: "collaborative",
    tags: ["Gut–brain axis"],
    featured: false
  },
  {
    year: 2026,
    title: "Integrating GC–MS and LC–MS through correlation molecular networking to map fermentation chemistry",
    authors: "Lotfi A, Melnik AV, Veselkov K, Veselkova A, Lin H, Aksenov A",
    venue: "<em>ChemRxiv</em>",
    doi: "10.26434/chemrxiv.15002701/v1",
    group: "collaborative",
    tags: ["Metabolomics"],
    status: "Preprint",
    featured: false
  },

  /* ---------------------------------------------------------------- 2025 */
  {
    year: 2025,
    title: "Impact of ventilation on respiratory virus transmission in college residence hall cohorts: potential for causal inference about mode of transmission",
    authors: "Gold TL, McPhaul KM, Lin H, Doughty R, Berry IM, Hong F, Lai J, Treangen TJ, Srebric J, Milton DK",
    venue: "<em>Influenza and Other Respiratory Viruses</em>, 19(7):e70133",
    doi: null,
    group: "collaborative",
    tags: ["Causal inference", "Transmission"],
    featured: false
  },
  {
    year: 2025,
    title: "The 2023 Canadian wildfires and risk of hospitalization and mortality among hemodialysis patients in the United States",
    authors: "Song H, Liang M, Sieck NE, Lin H, …, Liang XZ",
    venue: "<em>Kidney International Reports</em>, 10(6):1750–1760",
    doi: null,
    group: "collaborative",
    tags: ["Environmental health", "Wildfires"],
    featured: true
  },
  {
    year: 2025,
    title: "Pipelines and databases — microbiome analysis",
    authors: "Sanders J, Lin H, Zhu Q, Morton JT",
    venue: "In <em>Manual of Molecular Microbiology: Fundamentals and Applications</em>, 296–313",
    doi: null,
    group: "chapter",
    tags: ["Book chapter"],
    featured: false
  },

  /* ---------------------------------------------------------------- 2024 */
  {
    year: 2024,
    title: "Multi-group analysis of compositions of microbiomes with covariate adjustments and repeated measures",
    authors: "Lin H, Peddada SD",
    venue: "<em>Nature Methods</em>, 21(1):83–91",
    doi: "10.1038/s41592-023-02092-7",
    group: "methods",
    tags: ["ANCOM-BC2", "Compositional data"],
    software: "ANCOMBC",
    featured: true
  },
  {
    year: 2024,
    title: "Sexual behavior is linked to changes in gut microbiome and systemic inflammation that lead to HIV-1 infection in men who have sex with men",
    authors: "Lin H, Chen Y*, Abror-Lacks G, Price M, Morris A, Sun J, Palella F, Chew KW, Brown TT, Rinaldo CR, Peddada SD",
    venue: "<em>Communications Biology</em>, 7(1):1145",
    doi: "10.1038/s42003-024-06816-z",
    group: "methods",
    tags: ["HIV/AIDS", "Microbiome"],
    featured: true
  },
  {
    year: 2024,
    title: "A study of short-chain fatty acids during the canalicular and the early saccular phase of fetal lung development and childhood asthma",
    authors: "Lin H, Perkins NJ, Nkoy F, Stanford JB, Schliep KC, Peddada SD",
    venue: "<em>Genes</em>, 15(12):1595",
    doi: null,
    group: "methods",
    tags: ["Asthma", "Metabolomics"],
    featured: true
  },

  /* ---------------------------------------------------------------- 2023 */
  {
    year: 2023,
    title: "The vaginal microbiota of pregnant women varies with gestational age, maternal age, and parity",
    authors: "Romero R, Theis KR, Gomez-Lopez N, Winters AD, Panzer JJ, Lin H, Galaz J, Greenberg JM, Shaffer Z, Kracht DJ, Chaiworapongsa T",
    venue: "<em>Microbiology Spectrum</em>, 11(4):e03429-22",
    doi: null,
    group: "collaborative",
    tags: ["Maternal health"],
    featured: false
  },
  {
    year: 2023,
    title: "Oral bacterial composition associated with lung function and lung inflammation in a community-based Norwegian population",
    authors: "Shigdel R, Johannessen A, Lin H, Peddada S, Gómez Real F, Ringel-Kulka T, Svanes C, Bertelsen RJ",
    venue: "<em>Respiratory Research</em>, 24(1):183",
    doi: null,
    group: "collaborative",
    tags: ["Oral microbiome"],
    featured: false
  },
  {
    year: 2023,
    title: "Association between lipid-A-producing oral bacteria of different potency and fractional exhaled nitric oxide in a Norwegian population-based adult cohort",
    authors: "Khomich M, Lin H, Malinovschi A, Brix S, Cestelli L, Peddada S, Johannessen A, Eriksen C, Real FG, Svanes C, Bertelsen RJ",
    venue: "<em>Journal of Translational Medicine</em>, 21(1):354",
    doi: null,
    group: "collaborative",
    tags: ["Oral microbiome"],
    featured: false
  },
  {
    year: 2023,
    title: "Multiple imputation for compositional data (MICoDa) adjusting for covariates",
    authors: "Saha A, Putnick DL, Lin H, Yeung E, Sundaram R, Peddada SD",
    venue: "In <em>Statistical Methods at the Forefront of Biomedical Advances</em>, 157–184",
    doi: null,
    group: "chapter",
    tags: ["Book chapter", "Compositional data"],
    featured: false
  },

  /* ---------------------------------------------------------------- 2022 */
  {
    year: 2022,
    title: "Linear and nonlinear correlation estimators unveil undescribed taxa interactions in microbiome data",
    authors: "Lin H, Eggesbø M, Peddada SD",
    venue: "<em>Nature Communications</em>, 13(1):4946",
    doi: "10.1038/s41467-022-32243-x",
    group: "methods",
    tags: ["SECOM", "Correlation estimation"],
    featured: true
  },
  {
    year: 2022,
    title: "Exposure to antibacterial chemicals is associated with altered composition of oral microbiome",
    authors: "Vindenes HK, Lin H*, Shigdel R, Ringel-Kulka T, Real FG, Svanes C, Peddada SD, Bertelsen RJ",
    venue: "<em>Frontiers in Microbiology</em>, 13:790496",
    doi: null,
    group: "methods",
    tags: ["Oral microbiome", "Exposures"],
    featured: false
  },
  {
    year: 2022,
    title: "Association of oral bacteria with oral hygiene habits and self-reported gum bleeding",
    authors: "Bertelsen RJ, Barrionuevo AM, Shigdel R, Lie SA, Lin H, Real FG, Ringel-Kulka T, Åstrøm AN, Svanes C",
    venue: "<em>Journal of Clinical Periodontology</em>, 49(8):768–781",
    doi: null,
    group: "collaborative",
    tags: ["Oral microbiome"],
    featured: false
  },

  /* ---------------------------------------------------------------- 2021 */
  {
    year: 2021,
    title: "Signature changes in gut microbiome are associated with increased susceptibility to HIV-1 infection in MSM",
    authors: "Chen Y, Lin H*, Cole M, Morris A, Martinson J, Mckay H, Mimiaga M, Margolick J, Fitch A, Methe B, Srinivas VR, Peddada SD, Rinaldo CR",
    venue: "<em>Microbiome</em>, 9(1):237",
    doi: null,
    group: "methods",
    tags: ["HIV/AIDS", "Microbiome"],
    featured: true
  },
  {
    year: 2021,
    title: "Neoadjuvant pembrolizumab and high-dose IFNα-2b in resectable regionally advanced melanoma",
    authors: "Najjar YG, McCurry D, Lin H, …, Ernstoff MS",
    venue: "<em>Clinical Cancer Research</em>, 27(15):4195–4204",
    doi: null,
    group: "collaborative",
    tags: ["Cancer", "Clinical trial"],
    featured: false
  },
  {
    year: 2021,
    title: "Phase 1 study of safety, pharmacokinetics, and pharmacodynamics of tivantinib in combination with bevacizumab in adult patients with advanced solid tumors",
    authors: "Maguire WF, …, Lin H, …, Stoller R",
    venue: "<em>Cancer Chemotherapy and Pharmacology</em>, 88(4):643–654",
    doi: null,
    group: "collaborative",
    tags: ["Cancer", "Clinical trial"],
    featured: false
  },

  /* ---------------------------------------------------------------- 2020 */
  {
    year: 2020,
    title: "Analysis of compositions of microbiomes with bias correction",
    authors: "Lin H, Peddada SD",
    venue: "<em>Nature Communications</em>, 11(1):3514",
    doi: "10.1038/s41467-020-17041-7",
    group: "methods",
    tags: ["ANCOM-BC", "Compositional data"],
    software: "ANCOMBC",
    featured: true
  },
  {
    year: 2020,
    title: "Analysis of microbial compositions: a review of normalization and differential abundance analysis",
    authors: "Lin H, Peddada SD",
    venue: "<em>npj Biofilms and Microbiomes</em>, 6(1):60",
    doi: "10.1038/s41522-020-00160-w",
    group: "methods",
    tags: ["Review"],
    featured: true
  },
  {
    year: 2020,
    title: "Resistance to PD1 blockade in the absence of metalloprotease-mediated LAG3 shedding",
    authors: "Andrews LP, …, Lin H, …, Irvine DJ",
    venue: "<em>Science Immunology</em>, 5(49):eabc2728",
    doi: null,
    group: "collaborative",
    tags: ["Cancer", "Immunology"],
    featured: false
  },

  /* ------------------------------------------------------------ 2019 and earlier */
  {
    year: 2019,
    title: "Multiple antigen-engineered DC vaccines with or without IFNα to promote antitumor immunity in melanoma",
    authors: "Butterfield LH, Vujanovic L, Santos PM, …, Lin H",
    venue: "<em>Journal for ImmunoTherapy of Cancer</em>, 7(1):113",
    doi: null,
    group: "collaborative",
    tags: ["Cancer", "Immunology"],
    featured: false
  },
  {
    year: 2018,
    title: "Sex specific function of epithelial STAT3 signaling in pathogenesis of K-ras mutant lung cancer",
    authors: "Caetano MS, …, Lin H, …, Moghaddam SJ",
    venue: "<em>Nature Communications</em>, 9(1):4589",
    doi: null,
    group: "collaborative",
    tags: ["Cancer"],
    featured: false
  },
  {
    year: 2018,
    title: "Neoadjuvant ipilimumab (3 mg/kg or 10 mg/kg) and high dose IFN-α2b in locally/regionally advanced melanoma: safety, efficacy and impact on T-cell repertoire",
    authors: "Tarhini A, Lin Y, Lin H, …, Rao UN",
    venue: "<em>Journal for ImmunoTherapy of Cancer</em>, 6(1):112",
    doi: null,
    group: "collaborative",
    tags: ["Cancer", "Clinical trial"],
    featured: false
  },
  {
    year: 2018,
    title: "Long term impact of CTLA4 blockade immunotherapy on regulatory and effector immune responses in patients with melanoma",
    authors: "Retseck J, Nasr A, Lin Y, Lin H, Mendiratta P, Butterfield LH, Tarhini AA",
    venue: "<em>Journal of Translational Medicine</em>, 16(1):184",
    doi: null,
    group: "collaborative",
    tags: ["Cancer", "Immunology"],
    featured: false
  },
  {
    year: 2018,
    title: "DNA methylation age is not accelerated in brain or blood of subjects with schizophrenia",
    authors: "McKinney BC, Lin H, Ding Y, Lewis DA, Sweet RA",
    venue: "<em>Schizophrenia Research</em>, 196:39–44",
    doi: null,
    group: "collaborative",
    tags: ["Epigenetics"],
    featured: false
  },
  {
    year: 2017,
    title: "DNA methylation evidence against the accelerated aging hypothesis of schizophrenia",
    authors: "McKinney BC, Lin H, Ding Y, Lewis DA, Sweet RA",
    venue: "<em>npj Schizophrenia</em>, 3(1):13",
    doi: null,
    group: "collaborative",
    tags: ["Epigenetics"],
    featured: false
  }

];

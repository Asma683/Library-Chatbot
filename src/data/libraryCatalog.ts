import type { CatalogSource, ResearchThread } from '../types/academic';

export const LIBRARY_CATALOG: CatalogSource[] = [
  {
    id: 'src-quantum-avian-2023',
    title: 'Radical-Pair Spin Coherence in Avian Cryptochrome-4a Under Physiological Thermal Noise',
    authors: ['Hore, P. J.', 'Mouritsen, H.', 'Xu, J.'],
    year: 2023,
    journal: 'Proceedings of the National Academy of Sciences',
    volumeIssue: '120(14)',
    pages: 'e2219842120',
    doi: '10.1073/pnas.2219842120',
    callNumber: 'QP356.3 .H67 2023',
    isbnOrIssn: 'ISSN 0027-8424',
    collection: 'PubMed Central',
    discipline: 'Biophysics & Quantum Biology',
    peerReviewed: true,
    citationCount: 142,
    abstract:
      'Investigates spin-correlated radical pair lifetimes within purified European robin cryptochrome-4a (ErCry4a) complexes. Using cavity ring-down magnetic field spectroscopy, the authors demonstrate that tryptophan triad charge transfer preserves singlet-triplet coherence beyond 1.4 microseconds at 298 K.',
    keyFindings: [
      'FAD–TrpH radical pair retains magnetic sensitivity at physiological temperatures.',
      'Fourth tryptophan residue (TrpD) modulates back-electron transfer rate constants.',
      'Vibrational coupling with protein scaffold suppresses premature spin relaxation.'
    ],
    stackLocation: {
      building: 'Bodleian Radcliffe Science Library',
      floor: 'Level 2 · Life Sciences',
      wing: 'South Science Stacks',
      aisle: 'Aisle S-14',
      shelfCode: 'QP350 – QP410',
      availability: 'Available on Shelf',
      wingIndex: 2
    }
  },
  {
    id: 'src-photosynthetic-exciton-2024',
    title: 'Vibronic Coherence and Environment-Assisted Exciton Transport in FMO Light-Harvesting Complexes',
    authors: ['Scholes, G. D.', 'Fleming, G. R.', 'Castro, A.'],
    year: 2024,
    journal: 'Annual Review of Physical Chemistry',
    volumeIssue: '75(1)',
    pages: '211–238',
    doi: '10.1146/annurev-physchem-090722-114209',
    callNumber: 'QD450 .A62 v.75',
    isbnOrIssn: 'ISSN 0066-426X',
    collection: 'PubMed Central',
    discipline: 'Biophysics & Quantum Biology',
    peerReviewed: true,
    citationCount: 218,
    abstract:
      'Synthesizes two-dimensional electronic spectroscopy findings across Fenna-Matthews-Olson (FMO) bacteriochlorophyll trimers, distinguishing genuine electronic-vibrational resonance from long-lived pure electronic superposition.',
    keyFindings: [
      'Pure electronic dephasing occurs within 60–120 fs at 295 K, whereas vibronic modes persist > 800 fs.',
      'Spectral density matching between pigment gaps and phonon bath maximizes transport quantum yield.',
      'Provides unified master-equation bounds for open quantum biological systems.'
    ],
    stackLocation: {
      building: 'Bodleian Radcliffe Science Library',
      floor: 'Level 2 · Physical Chemistry',
      wing: 'South Science Stacks',
      aisle: 'Aisle S-08',
      shelfCode: 'QD445 – QD490',
      availability: 'Available on Shelf',
      wingIndex: 2
    }
  },
  {
    id: 'src-mechanistic-interp-2024',
    title: 'Sparse Autoencoders for Monosemantic Feature Decomposition in Large Transformer Residual Streams',
    authors: ['Bricken, T.', 'Templeton, A.', 'Batson, J.', 'Olah, C.'],
    year: 2024,
    journal: 'IEEE Transactions on Neural Networks and Learning Systems',
    volumeIssue: '35(9)',
    pages: '11804–11819',
    doi: '10.1109/TNNLS.2024.3391820',
    callNumber: 'QA76.87 .B75 2024',
    isbnOrIssn: 'ISSN 2162-237X',
    collection: 'IEEE Xplore',
    discipline: 'Machine Learning & Interpretability',
    peerReviewed: true,
    citationCount: 486,
    abstract:
      'Applies L1-regularized overcomplete sparse autoencoders to decompose polysemantic neuron activations into sparse, human-interpretable linear directions across multi-layer transformer residual streams.',
    keyFindings: [
      'Dictionary sizes of 16x–64x hidden dimension recover clean monosemantic syntactic and safety features.',
      'Causal ablation of extracted dictionary directions predictably steers downstream token distributions.',
      'Identifies geometric superposition regimes where interference scales inversely with feature sparsity.'
    ],
    stackLocation: {
      building: 'Engineering & Computing Research Library',
      floor: 'Level 3 · Computing',
      wing: 'East Periodicals & Monographs',
      aisle: 'Aisle E-22',
      shelfCode: 'QA76.7 – QA76.95',
      availability: 'Digital Repository Only',
      wingIndex: 1
    }
  },
  {
    id: 'src-circuit-discovery-2025',
    title: 'Attribution Patching and Automated Circuit Verification in Multi-Step Reasoning Models',
    authors: ['Nanda, N.', 'Conmy, A.', 'Kramár, J.'],
    year: 2025,
    journal: 'Journal of Machine Learning Research',
    volumeIssue: '26(41)',
    pages: '1–34',
    doi: '10.5555/3691021.3691062',
    callNumber: 'Q325.5 .N36 2025',
    isbnOrIssn: 'ISSN 1532-4435',
    collection: 'IEEE Xplore',
    discipline: 'Machine Learning & Interpretability',
    peerReviewed: true,
    citationCount: 164,
    abstract:
      'Introduces gradient-based linear attribution patching for scaling mechanistic circuit discovery to billion-parameter autoregressive transformers, validating faithfulness via path-specific interchange interventions.',
    keyFindings: [
      'Reduces circuit localization complexity from O(N^2) forward passes to two backward passes.',
      'Demonstrates faithfulness gaps when ignoring attention head backup mechanisms (Hydra effect).',
      'Benchmarks automated subgraph pruning across indirect object identification and modular arithmetic.'
    ],
    stackLocation: {
      building: 'Engineering & Computing Research Library',
      floor: 'Level 3 · Computing',
      wing: 'East Periodicals & Monographs',
      aisle: 'Aisle E-19',
      shelfCode: 'Q320 – Q342',
      availability: 'Available on Shelf',
      wingIndex: 1
    }
  },
  {
    id: 'src-venetian-print-1998',
    title: 'Typographic Standardization and Marginalia Culture in Sixteenth-Century Venetian Humanist Presses',
    authors: ['Grafton, A.', 'Blair, A.'],
    year: 2021,
    journal: 'Renaissance Quarterly',
    volumeIssue: '74(3)',
    pages: '785–824',
    doi: '10.1017/rqx.2021.112',
    callNumber: 'Z156.V4 G73 2021',
    isbnOrIssn: 'ISSN 0034-4338',
    collection: 'JSTOR',
    discipline: 'Book History & Early Modern Studies',
    peerReviewed: true,
    citationCount: 97,
    abstract:
      'Examines Aldine and Giunti octavo editions held across Venetian and Oxford collections to trace how standardized italic fonts, running heads, and printed commonplace indices reshaped scholarly note-taking.',
    keyFindings: [
      'Octavo portable formats shifted humanist reading from lectern recitation to annotated private synthesis.',
      'Printer-compiled errata sheets fostered collaborative philological correction networks across Europe.',
      'Manuscript marginalia reveals systematic cross-referencing to printed index locorum.'
    ],
    stackLocation: {
      building: 'Weston Special Collections Library',
      floor: 'Level 1 · Rare Books',
      wing: 'Special Collections Archive',
      aisle: 'Vault B-04',
      shelfCode: 'Z124 – Z165',
      availability: 'Special Collections Reading Room',
      wingIndex: 3
    }
  },
  {
    id: 'src-archival-ledger-1789',
    title: 'Merchant Guild Credit Ledgers and Maritime Insurance Underwriting in Late Eighteenth-Century Bristol',
    authors: ['Morgan, K.', 'Haggerty, S.'],
    year: 2022,
    journal: 'The Economic History Review',
    volumeIssue: '75(2)',
    pages: '412–439',
    doi: '10.1111/ehr.13108',
    callNumber: 'HE964.5.G7 M67 2022',
    isbnOrIssn: 'ISSN 0013-0117',
    collection: 'JSTOR',
    discipline: 'Economic History & Archival Studies',
    peerReviewed: true,
    citationCount: 53,
    abstract:
      'Analyzes 42 surviving double-entry guild underwriting books from the University Archive Maritime Collection, quantifying premium volatility and trust networks across Atlantic trade routes between 1775 and 1798.',
    keyFindings: [
      'Informal kinship guarantors reduced default spreads by 180 basis points during wartime convoys.',
      'Standardized printed policy clauses emerged directly from disputed salvage arbitrations.',
      'Archival watermark dating resolves chronological gaps in the 1784–1787 port customs series.'
    ],
    stackLocation: {
      building: 'University Central Archive',
      floor: 'Lower Ground · Vaults',
      wing: 'Special Collections Archive',
      aisle: 'Folio Bay A-11',
      shelfCode: 'MS.Bris.442 / HE964',
      availability: 'Special Collections Reading Room',
      wingIndex: 3
    }
  },
  {
    id: 'src-urban-hydrology-2024',
    title: 'Permeable Pavement Sub-Base Retention and Flash-Flood Attenuation in Historic European Cities',
    authors: ['Vandenberghe, L.', 'Kovács, D.', 'Almeida, R.'],
    year: 2024,
    journal: 'Journal of Hydrology',
    volumeIssue: '632',
    pages: '130894',
    doi: '10.1016/j.jhydrol.2024.130894',
    callNumber: 'GB651 .J68 v.632',
    isbnOrIssn: 'ISSN 0022-1694',
    collection: 'University Archive',
    discipline: 'Civil Engineering & Urban Climate',
    peerReviewed: true,
    citationCount: 74,
    abstract:
      'Presents a 36-month field lysimeter and hydrodynamic modeling dataset across cobblestone retrofits in Ghent, Prague, and Porto, measuring peak stormwater runoff reduction during 1-in-50-year convective storms.',
    keyFindings: [
      'Open-graded basalt sub-bases attenuated peak discharge by 48%–63% across 90-minute cloudbursts.',
      'Biofilm clogging stabilized after 14 months without compromising structural load ratings.',
      'Provides municipal lifecycle cost curves comparing grey culverts against distributed permeable pavers.'
    ],
    stackLocation: {
      building: 'Old Schools Quadrangle Library',
      floor: 'Level 4 · Earth & Civil',
      wing: 'North Stacks',
      aisle: 'Aisle N-03',
      shelfCode: 'GB650 – GB705',
      availability: 'Available on Shelf',
      wingIndex: 0
    }
  },
  {
    id: 'src-cognitive-offloading-2023',
    title: 'Metacognitive Calibration and External Memory Scaffolding in Digital Research Environments',
    authors: ['Risko, E. F.', 'Gilbert, S. J.', 'Marsh, E. J.'],
    year: 2023,
    journal: 'Cognitive Research: Principles and Implications',
    volumeIssue: '8(1)',
    pages: '19–35',
    doi: '10.1186/s41235-023-00478-x',
    callNumber: 'BF371 .R57 2023',
    isbnOrIssn: 'ISSN 2365-7464',
    collection: 'PubMed Central',
    discipline: 'Cognitive Science & Pedagogy',
    peerReviewed: true,
    citationCount: 129,
    abstract:
      'Tests how structured citation tools and externalized argument maps influence doctoral students’ retention and source-monitoring accuracy compared with linear note-taking.',
    keyFindings: [
      'Structured provenance cues reduce source-attribution illusions by 34% in delayed recall tests.',
      'Active verification prompts preserve deep conceptual encoding even when retrieval is offloaded.',
      'Over-automated summarization without inline evidence inspection degrades critical counter-argument generation.'
    ],
    stackLocation: {
      building: 'Main Humanities & Social Sciences Library',
      floor: 'Level 3 · Psychology',
      wing: 'North Stacks',
      aisle: 'Aisle N-18',
      shelfCode: 'BF365 – BF410',
      availability: 'Available on Shelf',
      wingIndex: 0
    }
  },
  {
    id: 'src-federated-clinical-2024',
    title: 'Differential Privacy Guarantees in Cross-Hospital Federated Survival Analysis',
    authors: ['Chen, W.', 'Patel, S.', 'Lindqvist, M.'],
    year: 2024,
    journal: 'IEEE Journal of Biomedical and Health Informatics',
    volumeIssue: '28(5)',
    pages: '2741–2752',
    doi: '10.1109/JBHI.2024.3364019',
    callNumber: 'R858 .C44 2024',
    isbnOrIssn: 'ISSN 2168-2194',
    collection: 'IEEE Xplore',
    discipline: 'Biomedical Informatics',
    peerReviewed: true,
    citationCount: 88,
    abstract:
      'Evaluates gradient clipping and Renyi differential privacy accounting for Cox proportional hazards models trained across 14 tertiary oncology centers without centralizing patient records.',
    keyFindings: [
      'Achieves concordance index within 0.012 of pooled centralized baselines at epsilon = 2.0.',
      'Adaptive per-site noise calibration prevents minority demographic cohort degradation.',
      'Open-sources audited cryptographic aggregation protocol compatible with HL7 FHIR endpoints.'
    ],
    stackLocation: {
      building: 'Bodleian Radcliffe Science Library',
      floor: 'Level 1 · Medical Informatics',
      wing: 'East Periodicals & Monographs',
      aisle: 'Aisle E-07',
      shelfCode: 'R855 – R862',
      availability: 'Digital Repository Only',
      wingIndex: 1
    }
  },
  {
    id: 'src-archive-oral-history-2022',
    title: 'Acoustic Preservation and Dialect Indexing in Post-Industrial Northern Textile Communities',
    authors: ['Bramwell, E.', 'Thornton, R.'],
    year: 2022,
    journal: 'Oral History Review',
    volumeIssue: '49(1)',
    pages: '77–102',
    doi: '10.1080/00940798.2022.2039814',
    callNumber: 'DA670.L2 B73 2022',
    isbnOrIssn: 'ISSN 0094-0798',
    collection: 'University Archive',
    discipline: 'Linguistics & Oral History',
    peerReviewed: true,
    citationCount: 31,
    abstract:
      'Documents the digitization and phonetic alignment of 310 reel-to-reel oral history interviews recorded between 1968 and 1983, preserved in the University Sound & Folk Archive.',
    keyFindings: [
      'High-resolution magnetic tape baking recovered 98.4% of degraded acetate reels.',
      'Forced phonetic alignment preserves regional vowel shifts previously flattened by standard ASR.',
      'Establishes community co-curation governance protocols for restricted family recordings.'
    ],
    stackLocation: {
      building: 'University Central Archive',
      floor: 'Level 2 · Sound & Media',
      wing: 'Special Collections Archive',
      aisle: 'Media Vault C-02',
      shelfCode: 'ARC.SND.1968–1983',
      availability: 'Special Collections Reading Room',
      wingIndex: 3
    }
  },
  {
    id: 'src-byzantine-astrolabe-2023',
    title: 'Metallurgical Provenance and Stereographic Engraving Precision in Eleventh-Century Byzantine Astrolabes',
    authors: ['King, D. A.', 'Georgiadou, S.'],
    year: 2023,
    journal: 'Journal for the History of Astronomy',
    volumeIssue: '54(2)',
    pages: '145–176',
    doi: '10.1177/00218286231162041',
    callNumber: 'QB85 .K56 2023',
    isbnOrIssn: 'ISSN 0021-8286',
    collection: 'JSTOR',
    discipline: 'History of Science',
    peerReviewed: true,
    citationCount: 44,
    abstract:
      'Combines non-destructive X-ray fluorescence spectroscopy with high-precision coordinate metrology to analyze the Brescia 1062 CE Greek astrolabe and related Constantinopolitan workshop brasses.',
    keyFindings: [
      'Zinc-copper alloy ratios match Anatolian calamine brass smelting traditions of the mid-11th century.',
      'Almuncantar arc graduations exhibit angular error under 0.18 degrees across 38°–42° latitude plates.',
      'Reveals shared divider-point scribe geometry between Greek and contemporary Islamic instrument makers.'
    ],
    stackLocation: {
      building: 'Main Humanities & Social Sciences Library',
      floor: 'Level 2 · History of Science',
      wing: 'North Stacks',
      aisle: 'Aisle N-09',
      shelfCode: 'QB80 – QB95',
      availability: 'Available on Shelf',
      wingIndex: 0
    }
  },
  {
    id: 'src-solid-state-electrolyte-2025',
    title: 'Grain-Boundary Lithium Dendrite Suppression via Halide-Rich Argyrodite Interlayers',
    authors: ['Janek, J.', 'Zeier, W. G.', 'Takahashi, K.'],
    year: 2025,
    journal: 'IEEE Transactions on Energy Conversion',
    volumeIssue: '40(1)',
    pages: '310–324',
    doi: '10.1109/TEC.2025.3410923',
    callNumber: 'TK2945.L58 J36 2025',
    isbnOrIssn: 'ISSN 0885-8969',
    collection: 'IEEE Xplore',
    discipline: 'Materials Science & Electrochemistry',
    peerReviewed: true,
    citationCount: 112,
    abstract:
      'Uses operando cryo-FIB-SEM tomography and impedance spectroscopy to characterize how chlorine-enriched Li6PS5Cl interlayers suppress metallic filament propagation at critical current densities above 4.2 mA/cm2.',
    keyFindings: [
      'Self-passivating LiCl-rich interphase prevents electronic leakage along sintered grain boundaries.',
      'Maintains 91.4% capacity retention over 1,200 symmetric cycling hours at 25°C and 5 MPa stack pressure.',
      'Establishes mechanical fracture toughness thresholds for solid-state separator scaling.'
    ],
    stackLocation: {
      building: 'Engineering & Computing Research Library',
      floor: 'Level 2 · Materials',
      wing: 'South Science Stacks',
      aisle: 'Aisle S-21',
      shelfCode: 'TK2940 – TK2965',
      availability: 'Available on Shelf',
      wingIndex: 2
    }
  }
];

export const INITIAL_RESEARCH_THREADS: ResearchThread[] = [
  {
    id: 'thread-quantum-bio',
    title: 'Quantum Coherence in Biological Systems',
    discipline: 'Biophysics & Quantum Biology',
    bucket: 'Today',
    updatedAt: '10:42 AM',
    collectionScope: 'All Collections',
    peerReviewedOnly: true,
    messages: [
      {
        id: 'msg-qb-1',
        role: 'user',
        content:
          'How do cryptochrome radical pairs and FMO photosynthetic complexes sustain functional quantum effects despite warm, wet physiological noise?',
        timestamp: '10:40 AM',
        collectionScope: 'All Collections'
      },
      {
        id: 'msg-qb-2',
        role: 'assistant',
        content:
          'Recent biophysical investigations show that biological systems do not isolate quantum states from thermal noise; instead, they exploit structured protein-phonon coupling and spin-selective reaction kinetics to preserve function over biologically relevant timescales.\n\nIn avian magnetoreception, cavity ring-down magnetic field spectroscopy on purified European robin cryptochrome-4a (ErCry4a) demonstrates that the FAD–TrpH radical pair maintains singlet-triplet spin coherence beyond 1.4 microseconds at 298 K [1]. Rather than relying on cryogenic isolation, the fourth tryptophan residue (TrpD) modulates back-electron transfer rates while the surrounding protein scaffold suppresses rapid spin relaxation [1].\n\nBy contrast, light-harvesting energy transfer in Fenna-Matthews-Olson (FMO) bacteriochlorophyll complexes operates on sub-picosecond timescales. Two-dimensional electronic spectroscopy indicates that pure electronic superposition dephases rapidly within 60–120 femtoseconds at physiological temperature, whereas vibronic coherence—coupled electronic and vibrational modes—persists past 800 femtoseconds [2]. When pigment energy gaps match spectral peaks in the protein vibrational bath, environment-assisted transport actively steers excitons toward the reaction center rather than degrading efficiency [2].\n\nFrom a methodological perspective, structured provenance and experimental controls remain vital when distinguishing genuine quantum transport from classical thermal hopping across multi-chromophore models [3].',
        timestamp: '10:42 AM',
        collectionScope: 'All Collections',
        citations: [
          {
            marker: 1,
            source: LIBRARY_CATALOG[0],
            excerptNote:
              'Demonstrates FAD–TrpH radical pair coherence > 1.4 μs at 298 K modulated by TrpD electron transfer kinetics.'
          },
          {
            marker: 2,
            source: LIBRARY_CATALOG[1],
            excerptNote:
              'Distinguishes 60–120 fs pure electronic dephasing from > 800 fs vibronic resonance in FMO trimers.'
          },
          {
            marker: 3,
            source: LIBRARY_CATALOG[7],
            excerptNote:
              'Highlights source-monitoring and empirical verification protocols against over-interpretation in complex synthesis.'
          }
        ],
        followUpQuestions: [
          'Compare spin-relaxation bounds between ErCry4a and synthetic radical-pair mimics',
          'How does 2D electronic spectroscopy separate vibronic from pure electronic beats?',
          'Which university archive monographs cover early spectroscopic methods in photosynthesis?'
        ]
      }
    ]
  },
  {
    id: 'thread-mech-interp',
    title: 'Sparse Autoencoders in Transformer Residual Streams',
    discipline: 'Machine Learning & Interpretability',
    bucket: 'Today',
    updatedAt: '9:15 AM',
    collectionScope: 'IEEE Xplore',
    peerReviewedOnly: true,
    messages: [
      {
        id: 'msg-mi-1',
        role: 'user',
        content:
          'What are the key causal faithfulness limitations when scaling sparse autoencoders and circuit patching to larger language models?',
        timestamp: '9:14 AM',
        collectionScope: 'IEEE Xplore'
      },
      {
        id: 'msg-mi-2',
        role: 'assistant',
        content:
          'Scaling mechanistic interpretability from toy transformers to frontier architectures introduces a trade-off between dictionary completeness and causal faithfulness.\n\nOvercomplete L1-regularized sparse autoencoders (SAEs) resolve neuron polysemanticity by projecting dense residual stream activations into 16x–64x larger linear feature dictionaries [1]. While causal ablation of extracted monosemantic directions reliably steers downstream token distributions, reconstruction error—the residual variance left unexplained by the sparse dictionary—can still carry subtle task-critical computation [1].\n\nWhen tracing multi-step circuits across layers, gradient-based attribution patching reduces search cost from quadratic forward passes to two backward passes [2]. However, linear attribution approximations degrade when models exhibit backup behavior (the Hydra effect), where ablating a primary attention head triggers compensatory downstream heads that maintain output logits [2]. Consequently, automated subgraph pruning must be validated through path-specific interchange interventions rather than activation correlation alone [2].',
        timestamp: '9:15 AM',
        collectionScope: 'IEEE Xplore',
        citations: [
          {
            marker: 1,
            source: LIBRARY_CATALOG[2],
            excerptNote:
              'Establishes 16x–64x overcomplete SAE dictionaries and geometric superposition interference bounds.'
          },
          {
            marker: 2,
            source: LIBRARY_CATALOG[3],
            excerptNote:
              'Identifies Hydra backup mechanisms and path-specific interchange interventions for faithfulness.'
          }
        ],
        followUpQuestions: [
          'How does dictionary expansion factor affect reconstruction L0 sparsity?',
          'Explain path-specific interchange intervention vs. mean ablation'
        ]
      }
    ]
  },
  {
    id: 'thread-venetian-print',
    title: 'Marginalia & Octavo Print Culture in 16th-C. Venice',
    discipline: 'Book History & Early Modern Studies',
    bucket: 'Previous 7 Days',
    updatedAt: 'Nov 12',
    collectionScope: 'JSTOR',
    peerReviewedOnly: true,
    messages: [
      {
        id: 'msg-vp-1',
        role: 'user',
        content:
          'How did portable Venetian octavo editions alter humanist note-taking and scholarly cross-referencing practices?',
        timestamp: 'Nov 12',
        collectionScope: 'JSTOR'
      },
      {
        id: 'msg-vp-2',
        role: 'assistant',
        content:
          'The introduction of portable octavo formats by Aldus Manutius and competing Venetian presses transformed early modern scholarship from stationary folio consultation into mobile, dialogic annotation [1]. Equipped with crisp italic typefaces, consistent running heads, and printed commonplace indices (indices locorum), octavo editions invited readers to treat printed books as working notebooks [1].\n\nSurviving copies in rare book vaults show systematic handwritten cross-references linking classical passages to contemporary errata sheets, turning individual readers into distributed philological editors across European networks [1]. Comparable archival attention to material standardization appears in later commercial ledgers, where printed clauses evolved directly out of marginal dispute annotations [2].',
        timestamp: 'Nov 12',
        collectionScope: 'JSTOR',
        citations: [
          {
            marker: 1,
            source: LIBRARY_CATALOG[4],
            excerptNote:
              'Traces Aldine and Giunti octavo editions, italic typography, and commonplace index marginalia.'
          },
          {
            marker: 2,
            source: LIBRARY_CATALOG[5],
            excerptNote:
              'Compares printed standardization emerging from manuscript annotations in archival ledgers.'
          }
        ],
        followUpQuestions: [
          'Inspect physical vault location for Weston Special Collections Aldine holdings',
          'Compare humanist commonplace indices with modern citation graphs'
        ]
      }
    ]
  },
  {
    id: 'thread-urban-hydrology',
    title: 'Permeable Cobblestone Retention in Historic Cities',
    discipline: 'Civil Engineering & Urban Climate',
    bucket: 'Previous 7 Days',
    updatedAt: 'Nov 10',
    collectionScope: 'University Archive',
    peerReviewedOnly: true,
    messages: [
      {
        id: 'msg-uh-1',
        role: 'user',
        content:
          'What empirical peak runoff attenuation rates have been measured for permeable cobblestone retrofits during convective cloudbursts?',
        timestamp: 'Nov 10',
        collectionScope: 'University Archive'
      },
      {
        id: 'msg-uh-2',
        role: 'assistant',
        content:
          'A 36-month field lysimeter and hydrodynamic monitoring study across historic European districts in Ghent, Prague, and Porto recorded peak stormwater discharge reductions of 48% to 63% during 1-in-50-year 90-minute convective storm events [1].\n\nUsing open-graded basalt sub-bases beneath heritage cobblestone joints, infiltration capacity stabilized after 14 months of biofilm maturation without compromising heavy-vehicle load ratings, outperforming centralized grey culvert expansions on lifecycle cost [1].',
        timestamp: 'Nov 10',
        collectionScope: 'University Archive',
        citations: [
          {
            marker: 1,
            source: LIBRARY_CATALOG[6],
            excerptNote:
              'Reports 48%–63% peak runoff attenuation across 36-month lysimeter trials in historic cobblestone districts.'
          }
        ],
        followUpQuestions: [
          'What maintenance interval prevents fine sediment clogging in basalt sub-bases?',
          'Compare lifecycle capital cost per hectare vs. deep storm tunnels'
        ]
      }
    ]
  }
];

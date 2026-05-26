const BRANCH_REASONING = {
  cse: {
    tagline: "Your mind is wired for logic, abstraction, and building digital systems.",
    points: [
      "Your strong algorithmic thinking and comfort with abstract problem-solving are core CSE traits.",
      "Your affinity for programming, data analysis, and software-driven solutions signals a natural fit.",
      "You prefer innovative, fast-paced tech environments — exactly where CSE thrives.",
      "Career paths include software engineering, AI/ML, cybersecurity, cloud computing, and product development."
    ]
  },
  ece: {
    tagline: "You bridge the gap between hardware intelligence and the connected world.",
    points: [
      "Your curiosity about circuits, signals, and electronic systems points directly to ECE.",
      "Interest in VLSI design, embedded systems, and communication networks aligns strongly with this branch.",
      "You enjoy precision-driven technical work where small details make a big difference.",
      "ECE opens doors to semiconductor design, IoT, 5G, defense electronics, and consumer tech."
    ]
  },
  mech: {
    tagline: "You see the world in motion — machines, forces, and elegant mechanical solutions.",
    points: [
      "Strong spatial reasoning and fascination with how physical objects work are hallmarks of a mechanical engineer.",
      "Your comfort with thermodynamics, fluid mechanics, and hands-on outcomes suits this domain perfectly.",
      "You enjoy tangible, real-world engineering challenges with visible results.",
      "Mechanical Engineering offers careers in automotive, aerospace, robotics, HVAC, and manufacturing."
    ]
  },
  civil: {
    tagline: "You are a builder — you envision and create the infrastructure that societies depend on.",
    points: [
      "Your interest in structural analysis, large-scale infrastructure, and long-lasting impact aligns with Civil Engineering.",
      "Leadership qualities and comfort with fieldwork are essential strengths for a civil engineer.",
      "You value projects that directly improve communities — roads, bridges, dams, and water systems.",
      "Careers include structural engineering, urban planning, transportation, and environmental management."
    ]
  },
  elec: {
    tagline: "Power is your domain — you understand and control the energy that runs the modern world.",
    points: [
      "Your enthusiasm for power systems, energy conversion, and electrical infrastructure is a strong indicator.",
      "The global push for renewable energy, EVs, and smart grids makes Electrical Engineering future-critical.",
      "You enjoy systems-level challenges where reliability and precision are non-negotiable.",
      "Careers span power generation, transmission, electric mobility, and industrial automation."
    ]
  },
  bio: {
    tagline: "You see biology as an engineering canvas — life itself is a system to understand and improve.",
    points: [
      "Your deep curiosity about living systems, genetics, and molecular biology are the foundation of Biotech.",
      "Patience with long-term experimental research and comfort with interdisciplinary work suit this field well.",
      "Biotechnology merges life sciences with engineering to tackle medicine, agriculture, and environmental problems.",
      "Career paths include pharmaceutical R&D, genetic engineering, biomedical devices, and bioinformatics."
    ]
  },
  chem: {
    tagline: "You transform raw materials and reactions into products that shape the industrial world.",
    points: [
      "Your interest in chemical processes, material properties, and industrial production aligns with ChemE.",
      "You are detail-oriented and comfortable with quantitative, process-driven engineering work.",
      "Chemical Engineering bridges pure science with industrial-scale applications and process optimization.",
      "Careers span oil & gas, pharmaceuticals, food processing, specialty chemicals, and environmental engineering."
    ]
  },
  aero: {
    tagline: "You are drawn to the edge of what is physically possible — in the skies and beyond.",
    points: [
      "Your fascination with flight, spacecraft, and high-performance systems is the defining trait of an Aerospace Engineer.",
      "Thriving under pressure and embracing cutting-edge challenges are essential qualities here.",
      "Strong fundamentals in fluid dynamics, thermodynamics, and structures are your technical base.",
      "Careers are found in defense, space agencies (ISRO, NASA), commercial aviation, and satellite tech."
    ]
  },
  metal: {
    tagline: "You understand what things are made of — and how to make them better.",
    points: [
      "Your interest in material properties, chemical compositions, and structural behavior points to Metallurgy.",
      "You enjoy understanding how the microstructure of a material determines its macroscopic performance.",
      "Metallurgical Engineering is foundational to aerospace, automotive, electronics, and construction industries.",
      "Careers include materials R&D, quality engineering, process metallurgy, and mining operations."
    ]
  },
  phys: {
    tagline: "You think at the level of fundamental principles — where science and engineering meet their deepest questions.",
    points: [
      "Your high mathematical rigor and curiosity about fundamental physical laws are core Engineering Physics traits.",
      "You enjoy theoretical frameworks and are drawn to open-ended research with no predefined answers.",
      "Engineering Physics produces pioneers in nanotechnology, photonics, quantum computing, and semiconductor research.",
      "It is the ideal launchpad for graduate research, R&D labs, and frontier technology development."
    ]
  },
  mining: {
    tagline: "You unearth the raw foundations of civilization — literally.",
    points: [
      "Your interest in geology, earth sciences, and working in field environments aligns directly with Mining Engineering.",
      "You are comfortable with risk, fieldwork, and the challenge of extracting resources from complex natural environments.",
      "Mining Engineering is critical for sourcing the minerals that power modern electronics and infrastructure.",
      "Careers include mine planning, safety management, mineral processing, and environmental reclamation."
    ]
  }
};

function calculateScores(responses, questions) {
  // ── Phase 1: Deviation scoring ────────────────────────────────────────────
  // Each response is measured as its distance from neutral (3).
  //   Strongly Agree   (5) → +2 × weight  (boosts matching branches)
  //   Agree            (4) → +1 × weight
  //   Neutral          (3) →  0            (contributes nothing)
  //   Disagree         (2) → -1 × weight  (suppresses unrelated branches)
  //   Strongly Disagree(1) → -2 × weight
  //
  // This removes the baseline inflation of the old r × weight formula,
  // where even "Strongly Disagree" still gave every branch a positive score.
  const scores = {};
  const maxDev = {};   // maximum possible positive deviation
  BRANCH_KEYS.forEach(b => { scores[b] = 0; maxDev[b] = 0; });

  questions.forEach(q => {
    if (q.type === 'likert') {
      const r = responses[q.id] != null ? responses[q.id] : 3;
      BRANCH_KEYS.forEach((b, i) => {
        scores[b] += (r - 3) * q.weights[i];
        maxDev[b] += 2 * q.weights[i];           // max = (5-3) × weight
      });
    }
    // Section 5 MCQ scored separately as aptitude — does not affect branch %
  });

  // ── Phase 2: Normalise each branch to 0–100 ──────────────────────────────
  // scores[b] ∈ [-maxDev[b], +maxDev[b]]
  // Map to 0–100 via:  (score + maxDev) / (2 × maxDev) × 100
  const pct = {};
  BRANCH_KEYS.forEach(b => {
    pct[b] = maxDev[b] > 0
      ? ((scores[b] + maxDev[b]) / (2 * maxDev[b])) * 100
      : 50;
  });

  // ── Phase 3: Relative rescaling → [38, 85] ───────────────────────────────
  // Maps the student's actual [min, max] spread onto the display range.
  // Preserves every relative gap proportionally — the branch that genuinely
  // scored highest still scores highest, and by the same proportional margin.
  // Range [38, 85] caps the ceiling at 85% and gives ~5% avg gap per rank step.
  const vals = Object.values(pct);
  const lo   = Math.min(...vals);
  const hi   = Math.max(...vals);
  const span = hi - lo;

  const FLOOR = 38, CEIL = 85;           // display range — max ~85%, ~5% avg gap

  const normalized = {};
  BRANCH_KEYS.forEach(b => {
    if (span < 0.5) {
      // Truly flat responses (e.g. all answers = 3) — show centred score
      normalized[b] = Math.round(pct[b]);
    } else {
      normalized[b] = Math.round(((pct[b] - lo) / span) * (CEIL - FLOOR) + FLOOR);
    }
  });

  return normalized;
}

function getAptitudeScore(responses, questions) {
  let correct = 0;
  let total = 0;
  questions.filter(q => q.type === 'mcq').forEach(q => {
    total++;
    if (responses[q.id] === q.correctAnswer) correct++;
  });
  return { correct, total };
}

function getTop2(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([branch, score]) => ({ branch, score }));
}

function buildReport(top2, aptitude, userName) {
  return {
    userName,
    top2: top2.map(({ branch, score }) => ({
      branch,
      name: BRANCH_NAMES[branch],
      icon: BRANCH_ICONS[branch],
      color: BRANCH_COLORS[branch],
      score,
      ...BRANCH_REASONING[branch]
    })),
    aptitude,
    recommendation: top2[0].branch
  };
}

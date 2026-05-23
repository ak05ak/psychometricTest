// Branch order: [cse, ece, mech, civil, elec, bio, chem, aero, metal, phys, mining]
const BRANCH_KEYS = ['cse','ece','mech','civil','elec','bio','chem','aero','metal','phys','mining'];

const BRANCH_NAMES = {
  cse:   'Computer Science & Engineering',
  ece:   'Electronics & Communication Engineering',
  mech:  'Mechanical Engineering',
  civil: 'Civil Engineering',
  elec:  'Electrical Engineering',
  bio:   'Biotechnology & Genetic Engineering',
  chem:  'Chemical Engineering',
  aero:  'Aerospace / Aeronautical Engineering',
  metal: 'Metallurgical & Materials Engineering',
  phys:  'Engineering Physics',
  mining:'Mining Engineering'
};

const BRANCH_ICONS = {
  cse:'💻', ece:'📡', mech:'⚙️', civil:'🏗️', elec:'⚡',
  bio:'🧬', chem:'⚗️', aero:'🚀', metal:'🔩', phys:'🔬', mining:'⛏️'
};

const BRANCH_COLORS = {
  cse:'#3B5BDB', ece:'#7048E8', mech:'#D9480F', civil:'#5C7CFA',
  elec:'#F59F00', bio:'#2F9E44', chem:'#1098AD', aero:'#E64980',
  metal:'#868E96', phys:'#862E9C', mining:'#A61E4D'
};

// 80 questions — 16 per section; each session picks 8 per section = 40 total
const ALL_QUESTIONS = [
  // ── SECTION 1: Cognitive & Aptitude Profiling ──────────────────────────────
  { id:1,  section:1, text:"I enjoy breaking down complex problems into smaller, logical steps and finding elegant solutions.", type:'likert', weights:[5,4,3,2,3,2,2,4,2,5,2] },
  { id:2,  section:1, text:"I find it satisfying to understand how physical objects move, deform, and interact with each other.", type:'likert', weights:[2,3,5,4,3,2,3,5,3,4,3] },
  { id:3,  section:1, text:"I prefer working with abstract theoretical frameworks over hands-on practical applications.", type:'likert', weights:[5,4,2,2,4,3,4,3,2,5,1] },
  { id:4,  section:1, text:"I am naturally drawn to understanding how electrical circuits and electronic signals behave.", type:'likert', weights:[4,5,2,1,5,1,2,3,1,4,1] },
  { id:5,  section:1, text:"I enjoy creating algorithms and step-by-step processes to solve computational problems efficiently.", type:'likert', weights:[5,4,3,2,3,2,3,3,2,3,2] },
  { id:6,  section:1, text:"I like analyzing why structures stand, bend, or collapse under different loading conditions.", type:'likert', weights:[1,1,4,5,2,1,2,4,4,3,3] },
  { id:7,  section:1, text:"I find it fascinating to understand how living systems operate at a molecular and cellular level.", type:'likert', weights:[2,1,1,1,1,5,4,1,1,3,1] },
  { id:8,  section:1, text:"I enjoy thinking about energy conversion and how power flows through different types of systems.", type:'likert', weights:[2,4,4,2,5,1,3,4,2,4,3] },
  { id:9,  section:1, text:"I am comfortable with rigorous mathematical proofs, abstract algebra, and advanced calculus.", type:'likert', weights:[4,4,3,3,4,2,3,4,2,5,2] },
  { id:10, section:1, text:"I excel at spatial reasoning — visualizing 3D objects, reading blueprints, and working with engineering drawings.", type:'likert', weights:[2,3,5,5,2,2,2,5,3,3,4] },
  { id:11, section:1, text:"I am interested in understanding the chemical properties of materials, compounds, and their reactions.", type:'likert', weights:[1,2,2,3,2,4,5,2,5,3,4] },
  { id:12, section:1, text:"I find it natural to express solutions through code and enjoy programming as a creative process.", type:'likert', weights:[5,3,2,1,2,2,1,2,1,2,1] },
  { id:13, section:1, text:"I like studying how fluids (gases and liquids) behave under varying pressure, temperature, and velocity.", type:'likert', weights:[1,1,5,4,1,2,4,5,2,4,3] },
  { id:14, section:1, text:"I am drawn to problems involving electromagnetic waves, signal processing, and communication systems.", type:'likert', weights:[3,5,1,1,4,1,1,3,1,4,1] },
  { id:15, section:1, text:"I find geology, mineralogy, and the physical structure of the earth deeply interesting.", type:'likert', weights:[1,1,2,4,1,3,3,1,3,2,5] },
  { id:16, section:1, text:"I enjoy recognizing patterns in large datasets and drawing insights through data analysis.", type:'likert', weights:[5,4,2,2,3,3,2,3,2,3,2] },

  // ── SECTION 2: Core Domain Affinity ────────────────────────────────────────
  { id:17, section:2, text:"I would enjoy designing software products, mobile apps, or AI systems that solve real-world problems.", type:'likert', weights:[5,3,2,2,2,2,1,2,1,2,1] },
  { id:18, section:2, text:"I am excited by the prospect of designing aircraft, rockets, or planetary exploration systems.", type:'likert', weights:[2,3,4,1,3,1,2,5,2,3,1] },
  { id:19, section:2, text:"I want to work on renewable energy projects, smart power grids, or energy storage solutions.", type:'likert', weights:[2,3,3,3,5,2,3,2,2,3,2] },
  { id:20, section:2, text:"I am fascinated by genetic engineering, CRISPR technology, and biotechnological research.", type:'likert', weights:[3,1,1,1,1,5,4,1,1,2,1] },
  { id:21, section:2, text:"I want to design and build robots, automation systems, or autonomous vehicles.", type:'likert', weights:[4,5,5,1,4,1,1,4,2,3,2] },
  { id:22, section:2, text:"I am interested in designing bridges, dams, highways, and other large-scale civil infrastructure.", type:'likert', weights:[1,1,2,5,2,1,2,1,3,1,3] },
  { id:23, section:2, text:"I want to develop new materials with special properties like extreme strength, lightweight, or high conductivity.", type:'likert', weights:[2,2,3,3,2,3,4,4,5,4,3] },
  { id:24, section:2, text:"I enjoy working on industrial-scale chemical processes, refining operations, or material synthesis.", type:'likert', weights:[1,1,3,2,2,3,5,1,4,2,4] },
  { id:25, section:2, text:"I am interested in cybersecurity, ethical hacking, and protecting critical digital infrastructure.", type:'likert', weights:[5,3,1,1,2,1,1,2,1,1,1] },
  { id:26, section:2, text:"I want to work on satellite communication systems, GPS technology, or 5G wireless networks.", type:'likert', weights:[3,5,2,1,4,1,1,4,1,3,1] },
  { id:27, section:2, text:"I am interested in geological surveys, mineral extraction, and processing ore from the earth.", type:'likert', weights:[1,1,3,3,2,1,3,1,4,2,5] },
  { id:28, section:2, text:"I want to work on quantum computing, nanotechnology, or fundamental physics research.", type:'likert', weights:[4,4,2,1,4,2,3,3,3,5,1] },
  { id:29, section:2, text:"I am interested in designing microprocessors, VLSI chips, or embedded systems for IoT.", type:'likert', weights:[4,5,1,1,4,1,1,2,1,3,1] },
  { id:30, section:2, text:"I want to work on environmental engineering, water treatment, or sustainable urban infrastructure.", type:'likert', weights:[2,1,3,5,3,4,4,1,3,2,4] },
  { id:31, section:2, text:"I am interested in thermodynamics, combustion engineering, and thermal power plant design.", type:'likert', weights:[1,2,5,2,3,1,4,5,3,4,2] },
  { id:32, section:2, text:"I want to develop pharmaceutical products, vaccines, or advanced drug delivery systems.", type:'likert', weights:[2,1,1,1,1,5,5,1,1,2,1] },

  // ── SECTION 3: Work Environment & Lifestyle Preferences ────────────────────
  { id:33, section:3, text:"I strongly prefer working indoors at a desk or computer over outdoor or industrial environments.", type:'likert', weights:[5,4,2,1,3,3,3,3,2,4,1] },
  { id:34, section:3, text:"I enjoy fieldwork and am comfortable working in industrial plants, construction sites, or mines.", type:'likert', weights:[1,2,3,5,3,2,3,2,4,1,5] },
  { id:35, section:3, text:"I prefer the atmosphere of a research laboratory over the floor of a manufacturing plant.", type:'likert', weights:[4,3,3,2,3,5,4,3,3,5,2] },
  { id:36, section:3, text:"I thrive in high-pressure, fast-paced environments with tight deadlines and rapid decisions.", type:'likert', weights:[4,3,4,2,3,3,3,5,2,2,4] },
  { id:37, section:3, text:"I want a career that involves frequent travel to different locations, sites, or countries.", type:'likert', weights:[3,3,4,5,3,3,3,5,4,2,5] },
  { id:38, section:3, text:"I would enjoy managing large multidisciplinary teams across complex, multi-year engineering projects.", type:'likert', weights:[3,3,4,5,3,3,4,4,3,2,4] },
  { id:39, section:3, text:"I prefer long-term fundamental research over short-term practical engineering deliverables.", type:'likert', weights:[3,3,2,2,3,4,3,3,2,5,1] },
  { id:40, section:3, text:"I enjoy working on projects that produce immediate, visible, tangible physical outcomes.", type:'likert', weights:[2,3,5,5,3,2,3,4,4,2,4] },
  { id:41, section:3, text:"I prefer the culture of a tech startup or software company over a factory or field setting.", type:'likert', weights:[5,4,2,2,3,3,2,3,2,3,1] },
  { id:42, section:3, text:"I am comfortable working in environments with inherent occupational safety risks (chemical plants, mines).", type:'likert', weights:[1,1,3,3,3,3,4,2,4,2,5] },
  { id:43, section:3, text:"I enjoy collaborative, interdisciplinary projects that bring together expertise from many fields.", type:'likert', weights:[4,4,4,4,4,5,4,4,3,4,3] },
  { id:44, section:3, text:"I prefer work that requires extreme precision, careful measurements, and strict quality assurance.", type:'likert', weights:[4,5,4,4,5,4,5,4,4,5,3] },
  { id:45, section:3, text:"I would like a career in the aerospace, defense, or space exploration sector.", type:'likert', weights:[3,4,4,1,4,1,2,5,3,3,1] },
  { id:46, section:3, text:"I prefer academia, government research institutes, or teaching careers over private industry.", type:'likert', weights:[3,3,3,3,3,4,3,3,3,5,2] },
  { id:47, section:3, text:"I am entrepreneurially driven and would enjoy building my own engineering company or startup.", type:'likert', weights:[5,4,4,3,3,4,3,3,2,2,3] },
  { id:48, section:3, text:"I prefer the stability of well-defined government jobs, PSUs, or large established corporations.", type:'likert', weights:[3,3,4,5,4,3,3,3,3,3,4] },

  // ── SECTION 4: Personality & Behavioral Traits ─────────────────────────────
  { id:49, section:4, text:"I am naturally curious and persistently dig into the 'why' behind how things work.", type:'likert', weights:[4,4,4,3,4,5,4,4,4,5,3] },
  { id:50, section:4, text:"I prefer producing concrete, tangible outputs over spending time on abstract theoretical work.", type:'likert', weights:[3,3,5,5,3,3,4,4,4,2,4] },
  { id:51, section:4, text:"I enjoy disassembling gadgets, machines, or devices just to understand how they are built.", type:'likert', weights:[3,5,5,2,5,3,2,4,3,4,2] },
  { id:52, section:4, text:"I am highly detail-oriented and rarely make errors in technical calculations or documentation.", type:'likert', weights:[4,5,4,4,5,4,5,5,4,5,3] },
  { id:53, section:4, text:"I enjoy systems-level thinking — designing how many interconnected components work together as a whole.", type:'likert', weights:[4,4,4,5,4,3,3,5,3,4,3] },
  { id:54, section:4, text:"I am comfortable with ambiguity and enjoy open-ended exploratory research without a defined outcome.", type:'likert', weights:[3,3,2,2,3,5,4,3,3,5,2] },
  { id:55, section:4, text:"I prefer following well-established, proven engineering methods over experimenting with risky new approaches.", type:'likert', weights:[2,2,4,5,3,2,3,2,3,2,4] },
  { id:56, section:4, text:"I naturally gravitate toward leadership roles and enjoy owning outcomes end-to-end.", type:'likert', weights:[4,3,4,5,3,3,4,4,3,2,4] },
  { id:57, section:4, text:"I find quantitative analysis, mathematical modeling, and simulations genuinely engaging.", type:'likert', weights:[5,4,4,4,4,3,4,4,3,5,3] },
  { id:58, section:4, text:"I am passionate about environmental sustainability and solving climate-related engineering challenges.", type:'likert', weights:[3,2,3,5,4,5,4,2,3,2,3] },
  { id:59, section:4, text:"I am patient and comfortable with slow, methodical experimental work that may take months or years.", type:'likert', weights:[3,3,3,3,3,5,4,2,3,5,3] },
  { id:60, section:4, text:"I am motivated by making a direct, visible positive impact on people's everyday lives.", type:'likert', weights:[4,4,3,5,4,5,3,3,2,2,2] },
  { id:61, section:4, text:"I enjoy competitive, high-performance environments where I am challenged to push my own limits.", type:'likert', weights:[4,3,3,2,3,3,3,5,2,3,3] },
  { id:62, section:4, text:"I always prefer cutting-edge, innovative technology over maintaining or improving legacy systems.", type:'likert', weights:[5,5,4,2,4,5,4,5,3,5,2] },
  { id:63, section:4, text:"I can make confident decisions with incomplete information and adapt quickly as new data emerges.", type:'likert', weights:[4,3,4,3,3,4,3,4,3,4,4] },
  { id:64, section:4, text:"I naturally find patterns and connections across seemingly unrelated technical disciplines.", type:'likert', weights:[5,4,3,3,4,4,4,4,3,5,2] },

  // ── SECTION 5: General Aptitude & Reasoning (MCQ, 30-second timer) ─────────
  { id:65, section:5, text:"A train travels 120 km in 2 hours. What is its average speed?", type:'mcq', options:['40 km/h','60 km/h','80 km/h','100 km/h'], correctAnswer:1 },
  { id:66, section:5, text:"Which word is the odd one out?", type:'mcq', options:['Apple','Mango','Carrot','Banana'], correctAnswer:2 },
  { id:67, section:5, text:"If 2x + 5 = 13, what is the value of x?", type:'mcq', options:['3','4','5','6'], correctAnswer:1 },
  { id:68, section:5, text:"A square has a side length of 5 cm. What is its area?", type:'mcq', options:['10 cm²','20 cm²','25 cm²','30 cm²'], correctAnswer:2 },
  { id:69, section:5, text:"What is the next number in the series: 2, 4, 8, 16, ___?", type:'mcq', options:['24','28','32','36'], correctAnswer:2 },
  { id:70, section:5, text:"Which word is closest in meaning to 'Benevolent'?", type:'mcq', options:['Cruel','Kind','Selfish','Harsh'], correctAnswer:1 },
  { id:71, section:5, text:"A car uses 6 litres of fuel to travel 90 km. How many litres are needed for 150 km?", type:'mcq', options:['8 litres','9 litres','10 litres','12 litres'], correctAnswer:2 },
  { id:72, section:5, text:"Choose the correctly spelled word:", type:'mcq', options:['Accomodation','Accommodation','Accomadation','Accomodashun'], correctAnswer:1 },
  { id:73, section:5, text:"If all Bloops are Razzles and all Razzles are Lazzles, which statement must be true?", type:'mcq', options:['All Bloops are Lazzles','No Bloops are Lazzles','Some Razzles are not Lazzles','All Lazzles are Bloops'], correctAnswer:0 },
  { id:74, section:5, text:"A rectangular room is 8 m long and 6 m wide. What is its perimeter?", type:'mcq', options:['14 m','24 m','28 m','48 m'], correctAnswer:2 },
  { id:75, section:5, text:"What is the next number in the series: 1, 4, 9, 16, 25, ___?", type:'mcq', options:['30','35','36','49'], correctAnswer:2 },
  { id:76, section:5, text:"A shopkeeper sells at 20% profit. Cost price is ₹500. What is the selling price?", type:'mcq', options:['₹520','₹550','₹600','₹650'], correctAnswer:2 },
  { id:77, section:5, text:"Which of the following is NOT a programming language?", type:'mcq', options:['Python','Java','HTML','Kotlin'], correctAnswer:2 },
  { id:78, section:5, text:"In a class of 40 students, 25 play cricket and 20 play football. If 10 play both, how many play neither?", type:'mcq', options:['5','10','15','20'], correctAnswer:0 },
  { id:79, section:5, text:"What is the antonym of 'Verbose'?", type:'mcq', options:['Talkative','Concise','Elaborate','Detailed'], correctAnswer:1 },
  { id:80, section:5, text:"A clock shows 3:15. What is the angle between the hour and minute hands?", type:'mcq', options:['7.5°','52.5°','45°','90°'], correctAnswer:0 }
];

function getSessionQuestions() {
  const bySection = { 1:[], 2:[], 3:[], 4:[], 5:[] };
  ALL_QUESTIONS.forEach(q => bySection[q.section].push(q));
  const selected = [];
  [1,2,3,4,5].forEach(s => {
    const pool = [...bySection[s]];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    selected.push(...pool.slice(0, 8));
  });
  return selected;
}

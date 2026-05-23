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

// 120 questions — 24 per section; each session picks 8 per section = 40 total
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
  { id:80, section:5, text:"A clock shows 3:15. What is the angle between the hour and minute hands?", type:'mcq', options:['7.5°','52.5°','45°','90°'], correctAnswer:0 },

  // ── SECTION 1 extra: Cognitive & Aptitude Profiling (Q81–Q88) ──────────────
  { id:81,  section:1, text:"I enjoy writing pseudocode or drawing flowcharts to map out logic before I start building anything.", type:'likert', weights:[5,3,2,1,2,1,2,3,1,3,1] },
  { id:82,  section:1, text:"I naturally think in terms of inputs, processes, and outputs when approaching any problem.", type:'likert', weights:[5,4,3,2,3,2,3,3,2,4,2] },
  { id:83,  section:1, text:"I enjoy reverse-engineering a finished product to understand exactly how it was built from raw materials.", type:'likert', weights:[3,4,5,3,4,3,4,4,5,3,3] },
  { id:84,  section:1, text:"I am comfortable working with very small tolerances and highly precise numerical values.", type:'likert', weights:[3,5,5,4,4,4,5,5,4,5,3] },
  { id:85,  section:1, text:"I like studying how systems behave under extreme conditions such as very high temperature, pressure, or voltage.", type:'likert', weights:[1,2,4,3,3,2,5,5,4,4,3] },
  { id:86,  section:1, text:"I enjoy finding the most efficient route or schedule when facing limited time, budget, or resources.", type:'likert', weights:[5,3,4,5,3,2,3,4,2,3,3] },
  { id:87,  section:1, text:"I am drawn to failure analysis — figuring out why something broke and tracing back to the root cause.", type:'likert', weights:[3,4,5,5,4,3,4,5,5,3,4] },
  { id:88,  section:1, text:"I naturally think about trade-offs — cost vs. performance, speed vs. accuracy — when solving design problems.", type:'likert', weights:[4,4,4,4,4,3,4,5,3,3,3] },

  // ── SECTION 2 extra: Core Domain Affinity (Q89–Q96) ───────────────────────
  { id:89,  section:2, text:"I want to work on artificial intelligence, machine learning, or large language model development.", type:'likert', weights:[5,4,1,1,2,3,1,2,1,3,1] },
  { id:90,  section:2, text:"I am interested in designing smart-city systems — intelligent traffic, water networks, and waste management.", type:'likert', weights:[4,3,3,5,4,2,3,1,2,2,2] },
  { id:91,  section:2, text:"I want to work on medical devices, prosthetics, or other biomedical engineering applications.", type:'likert', weights:[3,3,4,1,3,5,3,1,3,3,1] },
  { id:92,  section:2, text:"I am excited about electric vehicles, battery technology, and next-generation energy storage systems.", type:'likert', weights:[3,4,4,2,5,2,4,3,4,4,2] },
  { id:93,  section:2, text:"I want to work on cloud computing, distributed systems, or large-scale data infrastructure.", type:'likert', weights:[5,3,1,1,2,2,1,2,1,2,1] },
  { id:94,  section:2, text:"I am fascinated by corrosion science, alloy design, and engineering materials for extreme durability.", type:'likert', weights:[1,1,3,4,2,2,4,4,5,3,3] },
  { id:95,  section:2, text:"I want to work on nuclear reactors, particle accelerators, or other advanced energy systems.", type:'likert', weights:[2,3,3,2,4,2,3,3,3,5,2] },
  { id:96,  section:2, text:"I am interested in industrial automation, control systems, or programmable logic controllers (PLCs).", type:'likert', weights:[3,5,4,2,5,1,3,3,2,2,3] },

  // ── SECTION 3 extra: Work Environment & Lifestyle (Q97–Q104) ──────────────
  { id:97,  section:3, text:"I prefer working in a clean, air-conditioned office rather than in harsh outdoor or industrial environments.", type:'likert', weights:[5,4,2,1,3,4,3,3,2,4,1] },
  { id:98,  section:3, text:"I enjoy working in a small, focused team deeply embedded in a single hard technical problem.", type:'likert', weights:[4,4,3,2,3,5,4,4,3,5,2] },
  { id:99,  section:3, text:"I would enjoy working for a multinational company with exposure to global projects and diverse cultures.", type:'likert', weights:[5,4,4,4,3,3,4,5,3,3,4] },
  { id:100, section:3, text:"I prefer structured, process-driven work with clearly defined goals and measurable outcomes.", type:'likert', weights:[4,3,4,5,4,3,4,3,3,2,4] },
  { id:101, section:3, text:"I am energised by tackling problems that have never been solved before in my field.", type:'likert', weights:[5,4,4,3,4,5,4,5,4,5,3] },
  { id:102, section:3, text:"I would rather work on a project that saves lives or helps society than one that simply maximises profit.", type:'likert', weights:[3,3,3,4,3,5,3,3,2,3,2] },
  { id:103, section:3, text:"I enjoy mentoring others and sharing technical knowledge through talks, workshops, or documentation.", type:'likert', weights:[4,3,3,3,3,4,3,3,3,5,2] },
  { id:104, section:3, text:"I am willing to work in remote locations or challenging geographies if the project requires it.", type:'likert', weights:[2,2,3,5,3,3,3,3,4,2,5] },

  // ── SECTION 4 extra: Personality & Behavioral Traits (Q105–Q112) ──────────
  { id:105, section:4, text:"I tend to ask 'What if?' questions and enjoy exploring hypothetical scenarios for any given problem.", type:'likert', weights:[4,3,3,3,3,5,4,4,3,5,2] },
  { id:106, section:4, text:"I prefer having complete information before committing to a decision rather than acting on gut instinct.", type:'likert', weights:[3,4,4,4,4,4,5,2,4,4,3] },
  { id:107, section:4, text:"I get deep satisfaction from optimising a process — making it faster, cheaper, or more energy-efficient.", type:'likert', weights:[5,4,5,4,4,3,5,4,3,3,3] },
  { id:108, section:4, text:"I enjoy representing my work visually through diagrams, flowcharts, blueprints, or simulation renders.", type:'likert', weights:[4,4,5,5,3,3,3,5,3,3,3] },
  { id:109, section:4, text:"I am resilient — I bounce back quickly from failed experiments or setbacks without losing motivation.", type:'likert', weights:[3,3,3,3,3,5,4,4,3,5,4] },
  { id:110, section:4, text:"I am naturally sceptical and always look for evidence before accepting a technical claim or conclusion.", type:'likert', weights:[4,3,3,3,3,4,4,3,3,5,3] },
  { id:111, section:4, text:"I enjoy reading about technology trends and proactively staying ahead of changes in my area of interest.", type:'likert', weights:[5,5,4,3,4,4,3,4,3,4,3] },
  { id:112, section:4, text:"I tend to be the person in a group who steps up to organise, delegate, and keep the team on track.", type:'likert', weights:[4,3,4,5,3,3,4,4,3,2,4] },

  // ── SECTION 5 extra: General Aptitude & Reasoning (Q113–Q120) ─────────────
  { id:113, section:5, text:"A pipe fills a tank in 6 hours; another empties it in 8 hours. With both open, how long to fill the tank?", type:'mcq', options:['12 hours','24 hours','16 hours','20 hours'], correctAnswer:1 },
  { id:114, section:5, text:"What is the next letter in the series: A, C, F, J, ___?", type:'mcq', options:['M','N','O','P'], correctAnswer:2 },
  { id:115, section:5, text:"A jacket costs ₹2000. A shopkeeper gives successive discounts of 10% then 5%. What is the final price?", type:'mcq', options:['₹1700','₹1710','₹1750','₹1800'], correctAnswer:1 },
  { id:116, section:5, text:"Which word is closest in meaning to 'Ephemeral'?", type:'mcq', options:['Permanent','Temporary','Ancient','Rigid'], correctAnswer:1 },
  { id:117, section:5, text:"A cube has a surface area of 150 cm². What is its volume?", type:'mcq', options:['75 cm³','100 cm³','125 cm³','150 cm³'], correctAnswer:2 },
  { id:118, section:5, text:"Pointing to a photo, Rajan says: 'She is the daughter of my grandfather's only son.' How is she related to Rajan?", type:'mcq', options:['Mother','Sister','Aunt','Cousin'], correctAnswer:1 },
  { id:119, section:5, text:"8 workers build a wall in 12 days. How many days would 6 workers take for the same wall?", type:'mcq', options:['10 days','14 days','16 days','18 days'], correctAnswer:2 },
  { id:120, section:5, text:"Complete the analogy — Pen : Writer :: Scalpel : ___", type:'mcq', options:['Hospital','Nurse','Surgeon','Medicine'], correctAnswer:2 }
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

# ⚙️ EngiMatch — Engineering Branch Psychometric Test

A 40-question psychometric assessment that helps students identify the best-fit engineering
branch across 11 disciplines. Built by **Akarsh Kumar**.

🌐 **Live site:** `https://ak05ak.github.io/psychometricTest/`

---

## Project Structure

```
psychometricTest/
├── docs/                  ← Served by GitHub Pages
│   ├── index.html         ← Single-page app (all views in one file)
│   ├── css/
│   │   └── style.css      ← All styles, fully responsive
│   └── js/
│       ├── questions.js   ← 120-question bank + branch-aware session selector
│       ├── scoring.js     ← Weighted branch-scoring algorithm
│       └── app.js         ← UI state machine, timer, EmailJS integration
├── CLAUDE.md              ← Project spec
└── README.md
```

---

## How It Works

Everything runs **100% in the browser** — no server, no database, no data storage.

| What | How |
|------|-----|
| Questions | 120 questions (24 per section) stored in `questions.js`. Each session picks **32 Likert + 8 MCQ = 40 unique questions**. The 32 Likert questions are chosen via a branch-aware algorithm |
| Scoring | Sections 1–4: **deviation scoring** — each response is measured as distance from neutral (3), so disagreeing actively suppresses unrelated branches. Scores are relatively rescaled to a [38, 85] display range (max ~85%, ~5% avg gap per rank). Section 5 aptitude scored separately |
| Results | Top 2 branches calculated client-side instantly after the last question |
| Email | [EmailJS](https://emailjs.com) SDK sends the report directly from the browser — no backend needed |

---

## Test Flow

```
Landing → Name → Instructions → Section 1–4 Questions → Section 5 Warning
→ Section 5 (30s timer per question) → Results + Email
```

- **Sections 1–4** — Likert scale, unlimited time, all mandatory
- **Section 5** — Multiple choice, 30-second timer, auto-skips if unanswered (optional)
- **No back button** at any point
- **Refresh guard** — warns before resetting the test

---

## Engineering Branches

| # | Branch | Key Traits Assessed |
|---|--------|---------------------|
| 1 | 💻 Computer Science & Engineering | Algorithms, programming, logic, abstraction |
| 2 | 📡 Electronics & Communication Engineering | Circuits, signals, VLSI, embedded systems |
| 3 | ⚙️ Mechanical Engineering | Fluids, thermodynamics, spatial reasoning |
| 4 | 🏗️ Civil Engineering | Structures, infrastructure, leadership |
| 5 | ⚡ Electrical Engineering | Power systems, energy, automation |
| 6 | 🧬 Biotechnology & Genetic Engineering | Biology, chemistry, research patience |
| 7 | ⚗️ Chemical Engineering | Chemical processes, precision, industry |
| 8 | 🚀 Aerospace / Aeronautical Engineering | Fluid dynamics, high-performance, ambition |
| 9 | 🔩 Metallurgical & Materials Engineering | Material science, chemistry, quality |
| 10 | 🔬 Engineering Physics | Math rigor, fundamental research, theory |
| 11 | ⛏️ Mining Engineering | Geology, fieldwork, risk tolerance |

---

## Creator

**Akarsh Kumar** — Software Engineer, BIT Mesra alumnus
🔗 [linkedin.com/in/akarsh-kumar](https://www.linkedin.com/in/akarsh-kumar/)

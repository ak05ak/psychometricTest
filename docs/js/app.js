// ── State ──────────────────────────────────────────────────────────────────────
const state = {
  view: 'landing',       // landing | name | instructions | test | results
  userName: '',
  questions: [],         // 40 selected questions for this session
  currentIndex: 0,
  responses: {},         // { questionId: answer }
  timerInterval: null,
  timerRemaining: 30,
  testStarted: false,
  report: null
};

// ── EmailJS configuration ──────────────────────────────────────────────────────
// Sign up free at https://emailjs.com, then fill in your IDs:
const EMAILJS_CONFIG = {
  publicKey:  'lIef-FmMwoyZwXT2G',   // Account → API Keys
  serviceId:  'service_1swj296',   // Email Services tab
  templateId: 'template_7q47m45'  // Email Templates tab
};
const ADMIN_EMAIL = 'akarshkr05@gmail.com';

// ── Helpers ────────────────────────────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + id);
  if (el) { el.classList.add('active'); el.scrollTop = 0; window.scrollTo(0,0); }
  state.view = id;
}

function showOverlay(id) { document.getElementById(id).classList.add('active'); }
function hideOverlay(id) { document.getElementById(id).classList.remove('active'); }

function el(id) { return document.getElementById(id); }

// ── Refresh / leave guard ──────────────────────────────────────────────────────
window.addEventListener('beforeunload', e => {
  if (state.testStarted && state.view === 'test') {
    e.preventDefault();
    e.returnValue = '';
  }
});

// Custom in-page refresh warning via visibilitychange + keydown
document.addEventListener('keydown', e => {
  if (state.testStarted && state.view === 'test' && (e.key === 'F5' || (e.ctrlKey && e.key === 'r'))) {
    e.preventDefault();
    showOverlay('overlay-refresh');
  }
});

// ── View: Landing ──────────────────────────────────────────────────────────────
el('btn-take-test').addEventListener('click', () => showView('name'));

// ── View: Name ─────────────────────────────────────────────────────────────────
el('btn-name-submit').addEventListener('click', submitName);
el('input-name').addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
el('input-name').addEventListener('input', () => {
  const v = el('input-name').value.trim();
  el('btn-name-submit').disabled = v.length < 2;
  el('name-error').style.display = 'none';
});

function submitName() {
  const name = el('input-name').value.trim();
  if (name.length < 2) { el('name-error').style.display = 'block'; return; }
  state.userName = name;
  el('greeting-name').textContent = name;
  showView('instructions');
}

// ── View: Instructions ─────────────────────────────────────────────────────────
el('btn-start-test').addEventListener('click', startTest);

function startTest() {
  state.questions = getSessionQuestions();
  state.currentIndex = 0;
  state.responses = {};
  state.testStarted = true;
  showView('test');
  renderQuestion();
}

// ── View: Test ─────────────────────────────────────────────────────────────────
function renderQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  const idx = state.currentIndex;

  // Progress
  el('progress-fill').style.width = ((idx / total) * 100) + '%';
  el('progress-text').textContent = `Question ${idx + 1} of ${total}`;

  // Section badge
  const sectionNames = ['','Cognitive & Aptitude','Domain Affinity','Work Preferences','Personality & Traits','General Aptitude'];
  el('section-badge').textContent = `Section ${q.section}: ${sectionNames[q.section]}`;
  el('section-badge').className = `section-badge s${q.section}`;

  // Question text
  el('question-text').textContent = q.text;

  // Answer area
  el('answer-area').innerHTML = '';
  el('btn-next').disabled = true;

  if (q.type === 'likert') {
    renderLikert(q);
  } else {
    renderMCQ(q);
  }
}

function renderLikert(q) {
  const labels = ['','Strongly\nDisagree','Disagree','Neutral','Agree','Strongly\nAgree'];
  const icons   = ['','😟','🙁','😐','🙂','😄'];
  const area = el('answer-area');
  area.innerHTML = '';

  const existing = state.responses[q.id];

  for (let v = 1; v <= 5; v++) {
    const btn = document.createElement('button');
    btn.className = 'likert-btn' + (existing === v ? ' selected' : '');
    btn.dataset.value = v;
    btn.innerHTML = `<span class="likert-icon">${icons[v]}</span><span class="likert-val">${v}</span><span class="likert-label">${labels[v].replace('\n','<br>')}</span>`;
    btn.addEventListener('click', () => {
      area.querySelectorAll('.likert-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.responses[q.id] = v;
      el('btn-next').disabled = false;
    });
    area.appendChild(btn);
  }

  if (existing != null) el('btn-next').disabled = false;
}

function renderMCQ(q) {
  const area = el('answer-area');
  area.innerHTML = '';
  const existing = state.responses[q.id];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'mcq-btn' + (existing === i ? ' selected' : '');
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      area.querySelectorAll('.mcq-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.responses[q.id] = i;
      el('btn-next').disabled = false;
    });
    area.appendChild(btn);
  });

  if (existing != null) el('btn-next').disabled = false;

  // Start 30-second timer
  startTimer(q);
}

function startTimer(q) {
  clearInterval(state.timerInterval);
  state.timerRemaining = 30;
  updateTimerUI();
  el('timer-wrap').style.display = 'flex';

  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    updateTimerUI();
    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      el('timer-wrap').style.display = 'none';
      // Auto-skip: record no answer
      if (state.responses[q.id] == null) state.responses[q.id] = -1;
      advanceQuestion();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
  el('timer-wrap').style.display = 'none';
}

function updateTimerUI() {
  const t = state.timerRemaining;
  el('timer-count').textContent = t;
  const fill = el('timer-fill');
  const pct = (t / 30) * 100;
  fill.style.width = pct + '%';
  fill.className = 'timer-bar-fill' + (t <= 10 ? ' danger' : t <= 20 ? ' warn' : '');
}

el('btn-next').addEventListener('click', () => {
  const q = state.questions[state.currentIndex];
  if (q.type === 'mcq') stopTimer();
  advanceQuestion();
});

function advanceQuestion() {
  const nextIdx = state.currentIndex + 1;

  // Check if we're about to enter section 5
  if (nextIdx < state.questions.length) {
    const next = state.questions[nextIdx];
    const curr = state.questions[state.currentIndex];
    if (curr.section < 5 && next.section === 5) {
      state.currentIndex = nextIdx;
      showOverlay('overlay-section5');
      return;
    }
    state.currentIndex = nextIdx;
    renderQuestion();
  } else {
    finishTest();
  }
}

// Section 5 warning overlay
el('btn-enter-section5').addEventListener('click', () => {
  hideOverlay('overlay-section5');
  renderQuestion();
});

// Refresh warning overlay
el('btn-refresh-cancel').addEventListener('click', () => hideOverlay('overlay-refresh'));
el('btn-refresh-confirm').addEventListener('click', () => {
  hideOverlay('overlay-refresh');
  resetTest();
});

function resetTest() {
  stopTimer();
  state.testStarted = false;
  state.questions = [];
  state.responses = {};
  state.currentIndex = 0;
  el('input-name').value = '';
  showView('landing');
}

// ── Finish & Results ───────────────────────────────────────────────────────────
function finishTest() {
  stopTimer();
  state.testStarted = false;

  const scores = calculateScores(state.responses, state.questions);
  const aptitude = getAptitudeScore(state.responses, state.questions);
  const top2 = getTop2(scores);
  state.report = buildReport(top2, aptitude, state.userName);

  renderResults(state.report, scores);
  showView('results');
}

function renderResults(report, allScores) {
  el('result-name').textContent = report.userName;
  el('aptitude-score').textContent = `${report.aptitude.correct} / ${report.aptitude.total}`;

  // Top 2 cards
  const container = el('top2-container');
  container.innerHTML = '';
  report.top2.forEach((branch, rank) => {
    const card = document.createElement('div');
    card.className = 'result-card' + (rank === 0 ? ' top-pick' : '');
    card.style.borderColor = branch.color;
    card.innerHTML = `
      ${rank === 0 ? '<div class="top-badge">⭐ Top Recommendation</div>' : '<div class="top-badge secondary">Runner Up</div>'}
      <div class="result-card-header" style="background:${branch.color}">
        <span class="result-icon">${branch.icon}</span>
        <h3>${branch.name}</h3>
        <div class="match-score">${branch.score}% match</div>
      </div>
      <div class="result-card-body">
        <p class="branch-tagline">"${branch.tagline}"</p>
        <ul class="reason-list">${branch.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>`;
    container.appendChild(card);
  });

  // All-branch bar chart
  const chartContainer = el('all-scores-chart');
  chartContainer.innerHTML = '';
  const sorted = Object.entries(allScores).sort((a,b) => b[1]-a[1]);
  sorted.forEach(([b, score]) => {
    const row = document.createElement('div');
    row.className = 'score-row';
    const isTop = report.top2.some(t => t.branch === b);
    row.innerHTML = `
      <span class="score-label ${isTop ? 'highlight' : ''}">${BRANCH_ICONS[b]} ${BRANCH_NAMES[b]}</span>
      <div class="score-bar-wrap">
        <div class="score-bar" style="width:${score}%;background:${BRANCH_COLORS[b]}"></div>
      </div>
      <span class="score-pct ${isTop ? 'highlight' : ''}">${score}%</span>`;
    chartContainer.appendChild(row);
  });
}

// ── Email Submission ───────────────────────────────────────────────────────────
el('btn-submit-email').addEventListener('click', submitEmail);
el('input-email').addEventListener('input', () => {
  el('email-error').style.display = 'none';
});

async function submitEmail() {
  const email = el('input-email').value.trim();
  if (!isValidEmail(email)) { el('email-error').style.display = 'block'; return; }

  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    el('email-status').className = 'email-status error';
    el('email-status').textContent = '⚙️ EmailJS not configured yet. See README for setup instructions.';
    el('email-status').style.display = 'block';
    return;
  }

  el('btn-submit-email').disabled = true;
  el('btn-submit-email').textContent = 'Sending…';
  el('email-status').style.display = 'none';

  const r = state.report;
  const b1 = r.top2[0];
  const b2 = r.top2[1] || {};
  const templateParams = {
    to_name:       r.userName,
    to_email:      email,
    branch1_name:  b1.name,
    branch1_score: b1.score + '%',
    branch1_tag:   b1.tagline,
    branch1_pts:   (b1.points || []).map((p, i) => `${i+1}. ${p}`).join('\n'),
    branch2_name:  b2.name  || 'N/A',
    branch2_score: b2.score ? b2.score + '%' : 'N/A',
    branch2_tag:   b2.tagline || '',
    branch2_pts:   (b2.points || []).map((p, i) => `${i+1}. ${p}`).join('\n'),
    aptitude:      `${r.aptitude.correct} / ${r.aptitude.total}`,
    recommendation: b1.name,
    linkedin:      'https://www.linkedin.com/in/akarsh-kumar/'
  };

  try {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

    // Send to user
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);

    // Send copy to admin
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      ...templateParams,
      to_name:  'Akarsh Kumar',
      to_email: ADMIN_EMAIL,
      // Include submitter context in admin copy
      branch1_pts: `Submitted by: ${r.userName} <${email}>\n\n` + templateParams.branch1_pts
    });

    el('email-status').className = 'email-status success';
    el('email-status').textContent = `✅ Report sent to ${email}! Check your inbox (and spam folder).`;
  } catch (err) {
    console.error('EmailJS error:', err);
    el('email-status').className = 'email-status error';
    el('email-status').textContent = '❌ Could not send. Check your EmailJS configuration or try again.';
  }

  el('email-status').style.display = 'block';
  el('btn-submit-email').disabled = false;
  el('btn-submit-email').textContent = 'Send My Report';
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

// ── Retake ─────────────────────────────────────────────────────────────────────
el('btn-retake').addEventListener('click', () => {
  el('input-name').value = '';
  showView('landing');
});

/* JSInfoComix ESP | Offline-first Progressive Web App
   No API key, no backend, no external dependency.
*/

const APP_KEY = 'jsinfocomix_esp_state_v1';
const DEFAULT_ADMIN_ID = 'admin';
const DEFAULT_ADMIN_PIN = 'JS2026';
const DB_NAME = 'JSInfoComixESPRecordings';
const DB_VERSION = 1;

const NAV_ITEMS = [
  ['home', '🏠', 'Home'],
  ['episodes', '📚', 'Comic Episodes'],
  ['vocabulary', '🧠', 'Vocabulary Lab'],
  ['voice', '🎙️', 'Voice Studio'],
  ['coach', '🤖', 'AI Coach'],
  ['assessment', '🏆', 'Assessment Missions'],
  ['portfolio', '🗂️', 'Speaking Portfolio'],
  ['leaderboard', '📊', 'Leaderboard'],
  ['dashboard', '🧑‍🏫', 'Lecturer Dashboard'],
  ['admin', '🛡️', 'Admin Center'],
  ['settings', '⚙️', 'Settings']
];

const COURSE = [
  {
    week: 1,
    title: 'Welcome to NusaTech Lab',
    focus: 'Professional introductions and informatics identity',
    task: 'Introduce yourself as an Informatics student and explain your technical interest.',
    assessment: 'Diagnostic speaking record',
    terms: ['software engineer', 'informatics', 'specialization', 'team role', 'technical interest'],
    panels: [
      ['Dr. Joe', 'Welcome to NusaTech Lab. Today you join an international software team.'],
      ['Arka', 'I am a backend developer. I usually work with databases and server logic.'],
      ['Naya', 'I design interfaces. My job is to make the app usable and accessible.'],
      ['Mira', 'Your first mission is simple: introduce your role clearly and professionally.']
    ],
    quiz: [
      { q: 'Which expression sounds most professional in an informatics introduction?', options: ['I like computer so much.', 'My technical interest is backend development and database design.', 'I am good in laptop.', 'I play games every day.'], answer: 1 },
      { q: 'What should be included in a professional self-introduction?', options: ['Only hobbies', 'Name, field, technical interest, and learning goal', 'Only nickname', 'Only social media account'], answer: 1 }
    ]
  },
  {
    week: 2,
    title: 'The Broken Login Page',
    focus: 'Bug reporting and problem explanation',
    task: 'Explain a login bug using problem, evidence, and suggested solution.',
    assessment: 'Quiz and voice task',
    terms: ['bug', 'authentication', 'error message', 'debug', 'expected behavior', 'actual behavior'],
    panels: [
      ['Client', 'The login page is not working. We need the demo tomorrow.'],
      ['Rafi', 'The authentication module returns an error when the password field is empty.'],
      ['Arka', 'We must report the bug with clear evidence and possible cause.'],
      ['Dr. Joe', 'Use this structure: problem, condition, evidence, and solution.']
    ],
    quiz: [
      { q: 'What is “actual behavior” in bug reporting?', options: ['What the software should do', 'What the software really does during the problem', 'The developer’s feeling', 'The client’s budget'], answer: 1 },
      { q: 'The best bug report includes...', options: ['Emotion only', 'Problem, steps, evidence, expected behavior, actual behavior', 'Only screenshots', 'Only the word “error”'], answer: 1 }
    ]
  },
  {
    week: 3,
    title: 'The UI/UX Meeting',
    focus: 'Interface description and design rationale',
    task: 'Describe an app screen and justify one design decision.',
    assessment: 'Vocabulary mission',
    terms: ['layout', 'navigation bar', 'button', 'accessibility', 'user flow', 'wireframe'],
    panels: [
      ['Naya', 'This dashboard uses a simple navigation bar and a clear action button.'],
      ['Ken', 'Can you explain why the button is placed at the top right?'],
      ['Naya', 'It supports the user flow because the user usually submits after reviewing the form.'],
      ['Dr. Joe', 'Professional UI/UX English explains what users see and why it matters.']
    ],
    quiz: [
      { q: 'A wireframe is...', options: ['A rough visual plan of an interface', 'A virus scanner', 'A data table', 'A programming language'], answer: 0 },
      { q: 'Which sentence explains design rationale?', options: ['The button is blue.', 'The button is placed near the form to help users submit quickly.', 'The app has many colors.', 'The screen exists.'], answer: 1 }
    ]
  },
  {
    week: 4,
    title: 'The Database Problem',
    focus: 'Database terminology and data relationships',
    task: 'Explain a simple database table and relationship.',
    assessment: 'Comic-based quiz',
    terms: ['table', 'record', 'field', 'primary key', 'foreign key', 'relationship'],
    panels: [
      ['Mira', 'The users table stores user ID, name, email, and role.'],
      ['Arka', 'The orders table uses user ID as a foreign key.'],
      ['Ken', 'So each order belongs to one user?'],
      ['Dr. Joe', 'Exactly. Explain database relationships with clear examples.']
    ],
    quiz: [
      { q: 'A primary key is used to...', options: ['Delete the database', 'Identify each record uniquely', 'Design the icon', 'Open the browser'], answer: 1 },
      { q: 'A field means...', options: ['A column or data category in a table', 'A meeting room', 'A cable', 'A software bug'], answer: 0 }
    ]
  },
  {
    week: 5,
    title: 'The API Confusion',
    focus: 'Reading API documentation and summarizing instructions',
    task: 'Summarize an API endpoint and explain required parameters.',
    assessment: 'Reading task',
    terms: ['API', 'endpoint', 'request', 'response', 'parameter', 'token'],
    panels: [
      ['Arka', 'The documentation says we must send a POST request to /api/login.'],
      ['Rafi', 'The request needs email and password parameters.'],
      ['Ken', 'Please summarize it for the non-technical client.'],
      ['Dr. Joe', 'Good technical English makes complex instructions easier to understand.']
    ],
    quiz: [
      { q: 'An API endpoint is...', options: ['A specific URL where an app sends a request', 'A computer chair', 'A project deadline', 'A drawing tool'], answer: 0 },
      { q: 'A response usually means...', options: ['Data returned by the server', 'A classroom response only', 'A broken cable', 'A menu color'], answer: 0 }
    ]
  },
  {
    week: 6,
    title: 'Cyber Attack Alert',
    focus: 'Cybersecurity incident reporting',
    task: 'Report a suspicious login attempt and recommend a security action.',
    assessment: 'Voice recording',
    terms: ['phishing', 'malware', 'suspicious login', 'two-factor authentication', 'breach', 'secure password'],
    panels: [
      ['Rafi', 'We detected multiple suspicious login attempts from unknown locations.'],
      ['Mira', 'The dashboard shows failed attempts every two minutes.'],
      ['Ken', 'Prepare a concise incident report for the team.'],
      ['Dr. Joe', 'Use careful language: detected, suspected, evidence, recommendation.']
    ],
    quiz: [
      { q: 'Which phrase is suitable for an incident report?', options: ['Maybe something weird happened.', 'We detected repeated suspicious login attempts.', 'The system is crazy.', 'I do not care.'], answer: 1 },
      { q: 'Two-factor authentication improves security by...', options: ['Adding a second verification step', 'Deleting user data', 'Changing fonts', 'Removing passwords'], answer: 0 }
    ]
  },
  {
    week: 7,
    title: 'Sprint Review Day',
    focus: 'Agile communication and progress reporting',
    task: 'Present completed tasks, pending issues, and next sprint goals.',
    assessment: 'Peer assessment',
    terms: ['sprint', 'backlog', 'progress', 'blocker', 'deliverable', 'iteration'],
    panels: [
      ['Ken', 'In today’s sprint review, each member reports progress and blockers.'],
      ['Arka', 'I completed the login API, but I still need to fix the validation bug.'],
      ['Naya', 'The wireframe is ready, and I will test it with users this week.'],
      ['Dr. Joe', 'A strong progress report is specific, brief, and solution-oriented.']
    ],
    quiz: [
      { q: 'A blocker is...', options: ['A problem that prevents progress', 'A design color', 'A keyboard key', 'A student role'], answer: 0 },
      { q: 'A sprint review usually discusses...', options: ['Food preference', 'Completed work, issues, feedback, next steps', 'Only attendance', 'Only entertainment'], answer: 1 }
    ]
  },
  {
    week: 8,
    title: 'Midterm Boss Battle',
    focus: 'Integrated technical meeting simulation',
    task: 'Join a simulated meeting and explain one technical problem clearly.',
    assessment: 'Midterm speaking performance',
    terms: ['clarification', 'recommendation', 'priority', 'timeline', 'risk', 'solution'],
    panels: [
      ['Client', 'The app must be ready soon. What is the highest priority issue?'],
      ['Ken', 'We need a clear technical explanation before making a decision.'],
      ['Team', 'Each member must speak with evidence and recommendation.'],
      ['Dr. Joe', 'Boss Battle: communicate professionally under pressure.']
    ],
    quiz: [
      { q: 'In a technical meeting, a recommendation should be...', options: ['Clear, realistic, and supported by evidence', 'Very emotional', 'Unrelated to the problem', 'Hidden from the team'], answer: 0 },
      { q: 'When you do not understand a point, you should...', options: ['Stay silent forever', 'Ask for clarification politely', 'Leave immediately', 'Change the topic'], answer: 1 }
    ]
  },
  {
    week: 9,
    title: 'Data Dashboard Mystery',
    focus: 'Data interpretation and visual explanation',
    task: 'Explain user data from a dashboard and identify one trend.',
    assessment: 'Formative data explanation task',
    terms: ['dashboard', 'metric', 'trend', 'increase', 'decrease', 'conversion rate'],
    panels: [
      ['Mira', 'The dashboard shows that active users increased by 18 percent this week.'],
      ['Ken', 'What does that trend mean for the launch strategy?'],
      ['Mira', 'It suggests that onboarding changes may improve user engagement.'],
      ['Dr. Joe', 'Use data language: increase, decrease, trend, comparison, implication.']
    ],
    quiz: [
      { q: 'A trend is...', options: ['A general pattern in data', 'A password', 'An interface bug', 'A comic character'], answer: 0 },
      { q: 'Which sentence interprets data?', options: ['The number is 80.', 'Active users increased by 18 percent, suggesting stronger engagement.', 'The chart is nice.', 'The dashboard is blue.'], answer: 1 }
    ]
  },
  {
    week: 10,
    title: 'The Client Complaint',
    focus: 'Technical support and polite response',
    task: 'Respond to a client complaint using empathy, explanation, and solution.',
    assessment: 'Dialogue completion',
    terms: ['complaint', 'apologize', 'investigate', 'resolve', 'follow up', 'technical support'],
    panels: [
      ['Client', 'The app crashed during my presentation. This is unacceptable.'],
      ['Naya', 'We need to respond politely and explain the next action.'],
      ['Rafi', 'We will investigate the crash log and update the client today.'],
      ['Dr. Joe', 'Professional support language balances empathy and responsibility.']
    ],
    quiz: [
      { q: 'A polite support response should include...', options: ['Empathy, explanation, and action', 'Blame and anger', 'No solution', 'Only emoji'], answer: 0 },
      { q: 'Which sentence is best?', options: ['You are wrong.', 'We apologize for the issue and will investigate the crash log immediately.', 'It is not my problem.', 'Try again maybe.'], answer: 1 }
    ]
  },
  {
    week: 11,
    title: 'AI Feature Debate',
    focus: 'AI ethics, digital literacy, and responsible explanation',
    task: 'Discuss the benefit and risk of an AI feature in an app.',
    assessment: 'Reflection and speaking',
    terms: ['AI feature', 'bias', 'privacy', 'transparency', 'automation', 'human oversight'],
    panels: [
      ['Ken', 'Should we add an AI recommendation feature to the app?'],
      ['Mira', 'It may personalize learning, but we must consider privacy and bias.'],
      ['Rafi', 'Human oversight is necessary before automated decisions are used.'],
      ['Dr. Joe', 'Good AI literacy means explaining benefits, risks, and safeguards.']
    ],
    quiz: [
      { q: 'Human oversight means...', options: ['Humans review or guide automated decisions', 'AI replaces everyone', 'No one checks the system', 'Only machines communicate'], answer: 0 },
      { q: 'A responsible AI explanation includes...', options: ['Only benefits', 'Benefits, risks, data use, and safeguards', 'Only marketing words', 'Only jokes'], answer: 1 }
    ]
  },
  {
    week: 12,
    title: 'Testing Before Launch',
    focus: 'Software testing and test-result reporting',
    task: 'Explain test results and classify issues by severity.',
    assessment: 'Quiz and mini report',
    terms: ['test case', 'bug severity', 'passed', 'failed', 'usability test', 'regression test'],
    panels: [
      ['Arka', 'The payment test passed, but the notification test failed.'],
      ['Naya', 'Users also found the settings page difficult to navigate.'],
      ['Ken', 'Classify each issue by severity before launch.'],
      ['Dr. Joe', 'Testing English uses objective and precise reporting.']
    ],
    quiz: [
      { q: 'A failed test means...', options: ['The feature did not meet the expected result', 'The user is always wrong', 'The app is finished', 'The design is perfect'], answer: 0 },
      { q: 'Bug severity describes...', options: ['How serious the bug is', 'How colorful the screen is', 'How loud the audio is', 'How old the laptop is'], answer: 0 }
    ]
  },
  {
    week: 13,
    title: 'Product Pitch Training',
    focus: 'Persuasive technical presentation',
    task: 'Pitch an app idea using problem, solution, feature, and value.',
    assessment: 'Voice portfolio',
    terms: ['pitch', 'value proposition', 'target user', 'feature', 'benefit', 'prototype'],
    panels: [
      ['Ken', 'Your pitch must show the problem, solution, and product value.'],
      ['Naya', 'I will explain the prototype from the user’s perspective.'],
      ['Mira', 'I will support the pitch with usage data.'],
      ['Dr. Joe', 'Persuasive ESP connects technical features to real user needs.']
    ],
    quiz: [
      { q: 'A value proposition explains...', options: ['Why the product is useful for users', 'Only the app color', 'Only the price', 'Only the developer name'], answer: 0 },
      { q: 'A strong pitch should be...', options: ['Clear, problem-based, feature-focused, and user-centered', 'Random and very long', 'Unprepared', 'Only technical code'], answer: 0 }
    ]
  },
  {
    week: 14,
    title: 'International Demo Day',
    focus: 'Intercultural communication and Q&A handling',
    task: 'Answer client questions politely and clarify technical limitations.',
    assessment: 'Role-play',
    terms: ['clarify', 'limitation', 'cross-cultural', 'follow-up', 'stakeholder', 'demo'],
    panels: [
      ['Client', 'Can your app support multiple languages next month?'],
      ['Arka', 'Technically possible, but we need more time for testing.'],
      ['Ken', 'Explain the limitation politely and offer a realistic timeline.'],
      ['Dr. Joe', 'International communication values clarity, politeness, and realistic commitment.']
    ],
    quiz: [
      { q: 'When explaining a limitation, you should...', options: ['Be honest and offer a realistic alternative', 'Promise anything', 'Blame the client', 'Avoid the question'], answer: 0 },
      { q: 'A stakeholder is...', options: ['A person or group affected by the project', 'A type of cable', 'A login form', 'A database field only'], answer: 0 }
    ]
  },
  {
    week: 15,
    title: 'Final Launch Preparation',
    focus: 'Final technical presentation preparation',
    task: 'Prepare a structured final product presentation script.',
    assessment: 'Draft submission',
    terms: ['opening', 'problem statement', 'technical solution', 'demo flow', 'closing', 'call to action'],
    panels: [
      ['Ken', 'Your presentation must be structured and rehearsed.'],
      ['Mira', 'Start with the problem, then explain the solution and evidence.'],
      ['Naya', 'The demo flow should be simple and easy to follow.'],
      ['Dr. Joe', 'A final script helps you sound professional and confident.']
    ],
    quiz: [
      { q: 'A final presentation script should include...', options: ['Opening, problem, solution, evidence, demo, closing', 'Only jokes', 'Only references', 'Only code snippets'], answer: 0 },
      { q: 'A demo flow explains...', options: ['The order of features shown during a demonstration', 'A grammar error', 'A file name', 'A classroom chair'], answer: 0 }
    ]
  },
  {
    week: 16,
    title: 'Product Launch Expo',
    focus: 'Summative ESP performance and professional reflection',
    task: 'Deliver final product pitch and submit a speaking portfolio reflection.',
    assessment: 'Final project and oral exam',
    terms: ['launch', 'reflection', 'portfolio', 'achievement', 'feedback', 'professional growth'],
    panels: [
      ['Client', 'Your team is ready for the product launch expo.'],
      ['Team', 'We will present the product, answer questions, and reflect on our progress.'],
      ['Dr. Joe', 'Your final mission is to show professional communication growth.'],
      ['Narrator', 'Congratulations. You have completed the JSInfoComix ESP journey.']
    ],
    quiz: [
      { q: 'A portfolio reflection should discuss...', options: ['Progress, strengths, challenges, and future goals', 'Only scores', 'Only attendance', 'Only the lecturer'], answer: 0 },
      { q: 'The final product pitch assesses...', options: ['Integrated ESP communication performance', 'Only memorization', 'Only typing speed', 'Only drawing skill'], answer: 0 }
    ]
  }
];

const RUBRIC = [
  ['Task Completion', 'Addresses the assigned ESP mission clearly and completely.'],
  ['Vocabulary Use', 'Uses relevant informatics terms accurately.'],
  ['Organization', 'Uses logical structure such as problem, evidence, solution.'],
  ['Fluency and Clarity', 'Communicates smoothly and understandably.'],
  ['Professional Tone', 'Uses polite and workplace-appropriate language.']
];

const BADGES = [
  { id: 'starter', name: 'NusaTech Starter', rule: s => totalCompletedWeeks(s) >= 1 },
  { id: 'bug', name: 'Bug Reporter', rule: s => hasWeekSubmission(s, 2) },
  { id: 'voice3', name: 'Voice Builder', rule: s => countRecordings(s) >= 3 },
  { id: 'quiz5', name: 'Quiz Strategist', rule: s => quizCount(s) >= 5 },
  { id: 'midterm', name: 'Boss Battle Survivor', rule: s => hasWeekSubmission(s, 8) || (s.progress?.quizzes?.['8']?.score >= 70) },
  { id: 'aiethics', name: 'Responsible AI Speaker', rule: s => hasWeekSubmission(s, 11) },
  { id: 'pitcher', name: 'Product Pitcher', rule: s => hasWeekSubmission(s, 13) },
  { id: 'finisher', name: 'ESP Launch Master', rule: s => totalCompletedWeeks(s) >= 16 }
];

const DEFAULT_STATE = {
  currentUserId: null,
  activeView: 'home',
  selectedWeek: 1,
  users: {},
  classMeta: {
    courseTitle: 'English for Informatics',
    semester: '16 Weeks',
    institution: 'ESP Class Workspace',
    lecturer: 'Dr. Joe'
  },
  submissions: [],
  settings: {
    createdAt: new Date().toISOString(),
    demoSeeded: false
  }
};

let state = loadState();
let mediaRecorder = null;
let recordedChunks = [];
let timerInterval = null;
let seconds = 0;
let deferredInstallPrompt = null;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function uid(prefix = 'id') { return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`; }
function sanitize(text) {
  return String(text ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
function loadState() {
  try {
    const raw = localStorage.getItem(APP_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const merged = { ...clone(DEFAULT_STATE), ...parsed, users: parsed.users || {}, submissions: parsed.submissions || [] };
    return migrateState(merged);
  } catch (e) {
    console.warn(e);
    return migrateState(clone(DEFAULT_STATE));
  }
}
function migrateState(appState) {
  appState.users = appState.users || {};
  appState.submissions = appState.submissions || [];
  appState.settings = appState.settings || {};
  if (!appState.users.admin_root) {
    appState.users.admin_root = {
      id: 'admin_root', role: 'admin', name: 'Admin', email: DEFAULT_ADMIN_ID, pin: DEFAULT_ADMIN_PIN,
      status: 'approved', createdAt: new Date().toISOString(),
      progress: { xp: 0, completedWeeks: {}, quizzes: {}, voiceIds: [], notes: {}, words: {}, reflections: {} }
    };
  } else {
    appState.users.admin_root.role = 'admin';
    appState.users.admin_root.email = DEFAULT_ADMIN_ID;
    appState.users.admin_root.pin = DEFAULT_ADMIN_PIN;
    appState.users.admin_root.status = 'approved';
  }
  Object.values(appState.users).forEach(u => {
    if (!u.status) u.status = u.role === 'lecturer' || u.role === 'admin' ? 'approved' : 'active';
    if (u.role === 'student') u.status = u.status === 'approved' ? 'active' : u.status;
    userProgress(u);
  });
  return appState;
}
function saveState() { localStorage.setItem(APP_KEY, JSON.stringify(state)); }
function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  setTimeout(() => node.classList.remove('show'), 3200);
}
function currentUser() { return state.users[state.currentUserId] || null; }
function requireUser() {
  const user = currentUser();
  $('#authOverlay').classList.toggle('hidden', Boolean(user));
  return user;
}
function setView(view) {
  state.activeView = view;
  saveState();
  renderApp();
}
function episode(week = state.selectedWeek) { return COURSE.find(x => x.week === Number(week)) || COURSE[0]; }
function userProgress(user = currentUser()) {
  if (!user.progress) user.progress = { xp: 0, completedWeeks: {}, quizzes: {}, voiceIds: [], notes: {}, words: {}, reflections: {} };
  if (!user.progress.completedWeeks) user.progress.completedWeeks = {};
  if (!user.progress.quizzes) user.progress.quizzes = {};
  if (!user.progress.voiceIds) user.progress.voiceIds = [];
  if (!user.progress.notes) user.progress.notes = {};
  if (!user.progress.words) user.progress.words = {};
  if (!user.progress.reflections) user.progress.reflections = {};
  return user.progress;
}
function addXp(points) {
  const user = currentUser();
  if (!user) return;
  const progress = userProgress(user);
  progress.xp = Math.max(0, (progress.xp || 0) + points);
  saveState();
}
function levelFromXp(xp = 0) { return Math.max(1, Math.floor(xp / 450) + 1); }
function totalCompletedWeeks(sOrUser = currentUser()) {
  const p = sOrUser.progress || sOrUser;
  return Object.values(p.completedWeeks || {}).filter(Boolean).length;
}
function quizCount(sOrUser = currentUser()) {
  const p = sOrUser.progress || sOrUser;
  return Object.keys(p.quizzes || {}).length;
}
function countRecordings(sOrUser = currentUser()) {
  const p = sOrUser.progress || sOrUser;
  return (p.voiceIds || []).length;
}
function hasWeekSubmission(sOrUser, week) {
  const p = sOrUser.progress || sOrUser;
  return (p.voiceIds || []).some(id => state.submissions.find(sub => sub.id === id && Number(sub.week) === Number(week)));
}
function earnedBadges(user = currentUser()) {
  if (!user) return [];
  userProgress(user);
  return BADGES.filter(b => {
    try { return b.rule(user); } catch { return false; }
  });
}
function allTerms() {
  const map = new Map();
  COURSE.forEach(ep => ep.terms.forEach(term => {
    if (!map.has(term)) map.set(term, { term, weeks: [ep.week], context: ep.title });
    else map.get(term).weeks.push(ep.week);
  }));
  return [...map.values()].sort((a,b) => a.term.localeCompare(b.term));
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('recordings')) {
        db.createObjectStore('recordings', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function putRecording(record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readwrite');
    tx.objectStore('recordings').put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}
async function getRecording(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readonly');
    const req = tx.objectStore('recordings').get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}
async function deleteRecording(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readwrite');
    tx.objectStore('recordings').delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function init() {
  registerServiceWorker();
  setupInstallButton();
  setupAuth();
  $('#copyrightYear').textContent = new Date().getFullYear();
  $('#exportQuickBtn').addEventListener('click', exportAllData);
  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); setView(go.dataset.go); }
  });
  renderNav();
  requireUser();
  renderApp();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(console.warn));
  }
}
function setupInstallButton() {
  const btn = $('#installBtn');
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btn.hidden = false;
  });
  btn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    btn.hidden = true;
  });
}

function setupAuth() {
  $$('.auth-tab').forEach(btn => btn.addEventListener('click', () => {
    $$('.auth-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $$('.auth-form').forEach(f => f.classList.remove('active'));
    $(`#${btn.dataset.auth}Form`).classList.add('active');
    $('#authMessage').textContent = '';
  }));

  $('#loginRole')?.addEventListener('change', () => updateLoginPlaceholder());
  updateLoginPlaceholder();

  $('#registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#regEmail').value.trim().toLowerCase();
    if (Object.values(state.users).some(u => u.email?.toLowerCase() === email)) return authError('This email or ID already exists in this browser.');
    const id = uid('student');
    state.users[id] = {
      id, role: 'student', status: 'active', name: $('#regName').value.trim(), email,
      className: $('#regClass').value.trim(), pin: $('#regPin').value,
      createdAt: new Date().toISOString(), progress: { xp: 0, completedWeeks: {}, quizzes: {}, voiceIds: [], notes: {}, words: {}, reflections: {} }
    };
    state.currentUserId = id;
    saveState();
    $('#authOverlay').classList.add('hidden');
    renderApp();
    toast('Student workspace created.');
  });

  $('#lecturerForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#lecEmail').value.trim().toLowerCase();
    const existing = Object.values(state.users).find(u => u.email?.toLowerCase() === email);
    if (existing) return authError('This lecturer email or ID already exists. Use Login or contact the Admin.');
    const id = uid('lecturer');
    state.users[id] = {
      id, role: 'lecturer', status: 'pending', name: $('#lecName').value.trim(), email,
      institution: $('#lecInstitution').value.trim(), pin: $('#lecPin').value,
      createdAt: new Date().toISOString(), progress: { xp: 0, completedWeeks: {}, quizzes: {}, voiceIds: [], notes: {}, words: {}, reflections: {} }
    };
    saveState();
    $$('#lecturerForm input').forEach(input => input.value = '');
    authError('Lecturer verification request sent. Admin approval is required before login.');
  });

  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const role = $('#loginRole').value;
    const login = $('#loginEmail').value.trim().toLowerCase();
    const pin = $('#loginPin').value;
    let user;
    if (role === 'admin') {
      user = state.users.admin_root;
      if (!user || pin !== DEFAULT_ADMIN_PIN || (login && login !== DEFAULT_ADMIN_ID && login !== 'administrator')) {
        return authError('Login failed. Check the Admin ID and PIN.');
      }
    } else {
      user = Object.values(state.users).find(u =>
        u.role === role &&
        (u.email?.toLowerCase() === login || u.name?.toLowerCase() === login || u.id === login)
      );
      if (!user || user.pin !== pin) return authError('Login failed. Check the role, email/ID, and PIN saved in this browser.');
      if (role === 'lecturer' && user.status !== 'approved') return authError('Lecturer account is awaiting Admin verification.');
      if (user.status === 'rejected') return authError('This account has not been approved for access.');
    }
    state.currentUserId = user.id;
    saveState();
    $('#authOverlay').classList.add('hidden');
    renderApp();
    toast(`Welcome, ${user.name}.`);
  });

  $('#demoSeedBtn').addEventListener('click', () => {
    seedDemo();
    toast('Demo class data created.');
  });
}
function updateLoginPlaceholder() {
  const role = $('#loginRole')?.value || 'student';
  const input = $('#loginEmail');
  const label = $('#loginIdentityLabel');
  if (!input || !label) return;
  const labelText = role === 'admin' ? 'Admin ID' : 'Email or ID';
  label.childNodes[0].nodeValue = labelText + '\n            ';
  input.placeholder = role === 'admin' ? 'admin' : (role === 'lecturer' ? 'lecturer01' : 'student01');
}
function authError(message) { $('#authMessage').textContent = message; }

function seedDemo() {
  migrateState(state);
  const lecturerId = uid('lecturer');
  state.users[lecturerId] = {
    id: lecturerId, role: 'lecturer', status: 'approved', name: 'Dr. Joe', email: 'lecturer@demo.local', institution: 'ESP Class Workspace', pin: '2026', createdAt: new Date().toISOString(), progress: { xp: 0, completedWeeks: {}, quizzes: {}, voiceIds: [], notes: {}, words: {}, reflections: {} }
  };
  const names = ['Andi Wijaya', 'Siti Nurhaliza', 'Budi Santoso', 'Aulia Rahma', 'Raka Pratama'];
  names.forEach((name, i) => {
    const id = uid('student');
    const completed = {};
    const quizzes = {};
    const maxWeek = 2 + i;
    for (let w=1; w<=maxWeek; w++) {
      completed[w] = true;
      quizzes[w] = { score: Math.min(98, 68 + (i*4) + w), correct: 2, total: 2, submittedAt: new Date().toISOString() };
    }
    state.users[id] = {
      id, role: 'student', status: 'active', name, email: `student${i+1}@demo.local`, className: 'Informatics A', pin: '1234', createdAt: new Date().toISOString(),
      progress: { xp: 260 + i*180, completedWeeks: completed, quizzes, voiceIds: [], notes: {}, words: {}, reflections: {} }
    };
  });
  state.settings.demoSeeded = true;
  state.currentUserId = lecturerId;
  saveState();
  $('#authOverlay').classList.add('hidden');
  renderApp();
}

function navForRole(role) {
  const allowed = {
    student: ['home','episodes','vocabulary','voice','coach','assessment','portfolio','leaderboard','settings'],
    lecturer: ['home','episodes','vocabulary','coach','assessment','leaderboard','dashboard','settings'],
    admin: ['home','episodes','vocabulary','leaderboard','dashboard','admin','settings']
  };
  const ids = allowed[role] || ['home','settings'];
  return NAV_ITEMS.filter(item => ids.includes(item[0]));
}
function renderNav() {
  const nav = $('#navList');
  const user = currentUser();
  const items = navForRole(user?.role || 'student');
  nav.innerHTML = items.map(([id, icon, label]) => `<button class="nav-btn" type="button" data-view="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`).join('');
  if (!nav.dataset.bound) {
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      e.preventDefault();
      setView(btn.dataset.view);
    });
    nav.dataset.bound = 'true';
  }
}

function renderApp() {
  const user = requireUser();
  if (!user) return;
  renderNav();
  const allowed = navForRole(user.role).map(item => item[0]);
  let view = state.activeView || 'home';
  if (!allowed.includes(view)) {
    view = user.role === 'admin' ? 'admin' : 'home';
    state.activeView = view;
    saveState();
  }
  $$('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  $('#pageTitle').textContent = NAV_ITEMS.find(x => x[0] === view)?.[2] || 'Home';
  const roleLabel = user.role === 'admin' ? 'Admin' : user.role === 'lecturer' ? 'Lecturer' : `Level ${levelFromXp(userProgress(user).xp)}`;
  $('#userPill').innerHTML = `${sanitize(user.name)} · ${roleLabel}`;
  const root = $('#viewRoot');
  const routes = {
    home: renderHome,
    episodes: renderEpisodes,
    vocabulary: renderVocabulary,
    voice: renderVoiceStudio,
    coach: renderCoach,
    assessment: renderAssessment,
    portfolio: renderPortfolio,
    leaderboard: renderLeaderboard,
    dashboard: renderDashboard,
    admin: renderAdminCenter,
    settings: renderSettings
  };
  root.innerHTML = routes[view] ? routes[view]() : renderHome();
  bindViewEvents(view);
}

function renderHome() {
  const user = currentUser();
  const p = userProgress(user);
  const done = totalCompletedWeeks(user);
  const xp = p.xp || 0;
  const badges = earnedBadges(user);
  const next = COURSE.find(ep => !p.completedWeeks[ep.week]) || COURSE[COURSE.length - 1];
  return `
    <section class="hero">
      <div class="card dark">
        <p class="eyebrow">Semester-based ESP Comic PWA</p>
        <h2 class="hero-title">Sprint to Launch:<br><span>English Missions</span><br>in a Tech Startup</h2>
        <p>Students learn English for Informatics through interactive comic episodes, voice-recorded tasks, local AI feedback, gamified formative assessment, and a speaking portfolio for summative evaluation.</p>
        <div class="hero-actions">
          <button class="primary-btn" data-go="episodes">Continue Week ${next.week}</button>
          <button class="ghost-btn" data-go="voice">Record Voice Task</button>
          <button class="ghost-btn" data-go="assessment">Open Missions</button>
        </div>
        <div class="stat-row">
          <div class="stat"><strong>${done}/16</strong><span>Weeks completed</span></div>
          <div class="stat"><strong>${xp}</strong><span>XP collected</span></div>
          <div class="stat"><strong>${badges.length}</strong><span>Badges earned</span></div>
          <div class="stat"><strong>${countRecordings(user)}</strong><span>Voice portfolio</span></div>
        </div>
      </div>
      <div class="card poster-card"><img src="assets/concept-poster.png" alt="Concept figure for JSInfoComix ESP"></div>
    </section>

    <section class="grid three">
      <div class="card">
        <h3>Current Learning Path</h3>
        <p><strong>Next episode:</strong> Week ${next.week}, ${sanitize(next.title)}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.round(done/16*100)}%"></div></div>
        <p>${Math.round(done/16*100)}% of semester journey completed.</p>
      </div>
      <div class="card">
        <h3>Recent Badges</h3>
        <div class="badge-list">${BADGES.map(b => `<span class="badge ${badges.find(x => x.id === b.id) ? 'gold' : 'locked'}">${sanitize(b.name)}</span>`).join('')}</div>
      </div>
      <div class="card">
        <h3>Course Identity</h3>
        <p><strong>${sanitize(state.classMeta.courseTitle)}</strong><br>${sanitize(state.classMeta.semester)}<br>Lecturer: ${sanitize(state.classMeta.lecturer)}</p>
      </div>
    </section>

    <section class="card">
      <h3>16-Week Learning Journey</h3>
      ${renderCourseTable()}
    </section>
  `;
}

function renderCourseTable() {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Week</th><th>Episode</th><th>ESP Focus</th><th>Main Task</th><th>Assessment</th></tr></thead><tbody>${COURSE.map(ep => `<tr><td>${ep.week}</td><td><strong>${sanitize(ep.title)}</strong></td><td>${sanitize(ep.focus)}</td><td>${sanitize(ep.task)}</td><td>${sanitize(ep.assessment)}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderEpisodes() {
  const ep = episode();
  return `
    <section class="episode-grid">
      <aside class="card">
        <h3>Episodes</h3>
        <div class="week-list">${COURSE.map(item => `<button class="week-btn ${item.week === ep.week ? 'active' : ''}" data-week="${item.week}"><strong>Week ${item.week}<span>${isWeekDone(item.week) ? '✓' : ''}</span></strong><span>${sanitize(item.title)}</span><span>${sanitize(item.focus)}</span></button>`).join('')}</div>
      </aside>
      <div class="grid">
        <div class="card">
          <p class="eyebrow">Week ${ep.week}</p>
          <h3>${sanitize(ep.title)}</h3>
          <p><strong>ESP Focus:</strong> ${sanitize(ep.focus)}</p>
          <div class="comic-board">
            <div class="panels">${ep.panels.map((panel, idx) => renderPanel(panel, idx)).join('')}</div>
            <aside class="mission-card">
              <p class="eyebrow">Mission Task</p>
              <h3>${sanitize(ep.task)}</h3>
              <p>Complete the comic, study the vocabulary, submit the voice task, and finish the weekly assessment mission.</p>
              <div class="chip-list">${ep.terms.map(t => `<span class="chip">${sanitize(t)}</span>`).join('')}</div>
              <div class="hero-actions">
                <button class="primary-btn" data-go="voice">Open Voice Task</button>
                <button class="ghost-btn" data-go="assessment">Weekly Quiz</button>
                <button class="success-btn" id="markWeekDone">Mark Episode Complete</button>
              </div>
            </aside>
          </div>
        </div>
        <div class="grid two">
          <div class="card">
            <h3>Vocabulary in Context</h3>
            ${ep.terms.map(t => `<div class="quiz-question"><strong>${sanitize(toTitle(t))}</strong><p>${termDefinition(t)}</p></div>`).join('')}
          </div>
          <div class="card">
            <h3>Reflection Note</h3>
            <label>What did you learn from this episode?
              <textarea id="episodeNote" placeholder="Write a short reflection or key expressions from the comic.">${sanitize(userProgress().notes[ep.week] || '')}</textarea>
            </label>
            <button class="primary-btn" id="saveEpisodeNote">Save Reflection</button>
          </div>
        </div>
      </div>
    </section>`;
}
function renderPanel(panel, idx) {
  const initials = panel[0].split(' ').map(w => w[0]).join('').slice(0,2);
  return `<button class="panel-card ${idx === 0 ? 'active' : ''}" data-panel="${idx}">
    <div class="panel-art"><div class="avatar">${sanitize(initials)}</div><strong>${sanitize(panel[0])}</strong></div>
    <div class="speech-bubble">${sanitize(panel[1])}</div>
    <div class="panel-meta"><span class="panel-tag">Interactive Panel ${idx+1}</span><span>Tap</span></div>
  </button>`;
}
function isWeekDone(week) { return Boolean(userProgress().completedWeeks[week]); }
function toTitle(str) { return str.replace(/\b\w/g, c => c.toUpperCase()); }
function termDefinition(term) {
  const defs = {
    'bug': 'An error or problem in software that causes incorrect behavior.',
    'authentication': 'The process of verifying a user identity before access is granted.',
    'debug': 'To find, analyze, and fix software errors.',
    'API': 'A set of rules that allows different software systems to communicate.',
    'endpoint': 'A specific URL or route where an application sends a request.',
    'phishing': 'A cyberattack that tricks users into giving sensitive information.',
    'wireframe': 'A basic visual plan for an interface before full design.',
    'dashboard': 'A screen that displays important data, metrics, or activity summaries.',
    'sprint': 'A short development cycle in agile project management.',
    'portfolio': 'A collection of work showing progress, achievement, and reflection.'
  };
  return defs[term] || `A professional Informatics term used in Week ${COURSE.find(ep => ep.terms.includes(term))?.week || '-'} communication tasks.`;
}

function renderVocabulary() {
  const words = allTerms();
  const known = userProgress().words || {};
  return `
    <section class="grid side-main">
      <div class="card">
        <h3>Vocabulary Mastery</h3>
        <div class="score-big">${Object.keys(known).length}<small style="font-size:1rem">/${words.length}</small></div>
        <p>Mark terms as mastered after you can explain and use them in a professional sentence.</p>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.round(Object.keys(known).length / words.length * 100)}%"></div></div>
      </div>
      <div class="card">
        <h3>Informatics ESP Glossary</h3>
        <div class="grid two">${words.map(item => `<div class="quiz-question"><strong>${sanitize(toTitle(item.term))}</strong><p>${termDefinition(item.term)}</p><p><small>Context: Week ${item.weeks.join(', ')} · ${sanitize(item.context)}</small></p><button class="${known[item.term] ? 'success-btn' : 'ghost-btn'} word-master" data-word="${sanitize(item.term)}">${known[item.term] ? 'Mastered ✓' : 'Mark as Mastered'}</button></div>`).join('')}</div>
      </div>
    </section>`;
}

function renderVoiceStudio() {
  const ep = episode();
  return `
    <section class="grid side-main">
      <div class="card recorder">
        <h3>Voice Studio</h3>
        <label>Select mission week
          <select id="voiceWeek">${COURSE.map(item => `<option value="${item.week}" ${item.week === ep.week ? 'selected' : ''}>Week ${item.week}: ${sanitize(item.title)}</option>`).join('')}</select>
        </label>
        <div class="recorder-display">
          <div>
            <div class="record-dot" id="recordDot">●</div>
            <h3 id="recordStatus">Ready to Record</h3>
            <p id="recordTime">00:00</p>
            <div class="wave" aria-hidden="true">${'<span></span>'.repeat(18)}</div>
          </div>
        </div>
        <div class="audio-controls">
          <button class="danger-btn" id="startRecordBtn">Start</button>
          <button class="ghost-btn" id="stopRecordBtn" disabled>Stop</button>
          <button class="ghost-btn" id="playPreviewBtn" disabled>Play Preview</button>
          <button class="primary-btn" id="saveRecordBtn" disabled>Save to Portfolio</button>
        </div>
        <audio id="audioPreview" controls hidden></audio>
      </div>
      <div class="grid">
        <div class="card">
          <p class="eyebrow">Selected Mission</p>
          <h3 id="voiceMissionTitle">Week ${ep.week}: ${sanitize(ep.title)}</h3>
          <p id="voiceMissionText">${sanitize(ep.task)}</p>
          <label>Optional transcript or speaking script
            <textarea id="voiceTranscript" placeholder="Type what you said or planned to say. The local AI coach will analyze this text."></textarea>
          </label>
          <label>Self-assessment
            <select id="selfAssessment">
              <option value="clear">I spoke clearly and completed the task.</option>
              <option value="partial">I completed the task but need better vocabulary.</option>
              <option value="practice">I need more practice and lecturer feedback.</option>
            </select>
          </label>
        </div>
        <div class="card">
          <h3>Speaking Rubric</h3>
          ${renderRubric()}
        </div>
      </div>
    </section>`;
}
function renderRubric() {
  return `<div class="table-wrap"><table class="rubric-table"><thead><tr><th>Criterion</th><th>Descriptor</th></tr></thead><tbody>${RUBRIC.map(row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderCoach() {
  return `
    <section class="grid two">
      <div class="card">
        <h3>Local AI Speaking Coach</h3>
        <p>This coach uses local rule-based analysis. It does not call external AI services and does not require an API key.</p>
        <label>Choose mission context
          <select id="coachWeek">${COURSE.map(item => `<option value="${item.week}">Week ${item.week}: ${sanitize(item.title)}</option>`).join('')}</select>
        </label>
        <label>Your speaking script or transcript
          <textarea id="coachText" placeholder="Paste or type your speaking transcript here."></textarea>
        </label>
        <button class="primary-btn" id="analyzeTextBtn">Analyze with Local Coach</button>
      </div>
      <div class="card" id="coachResult">
        <h3>Feedback Result</h3>
        <div class="empty-state">Your feedback will appear here.</div>
      </div>
    </section>
    <section class="card">
      <h3>Rubric-Based AI Logic</h3>
      ${renderRubric()}
    </section>`;
}

function renderAssessment() {
  const ep = episode();
  const prev = userProgress().quizzes[ep.week];
  return `
    <section class="grid side-main">
      <div class="card">
        <h3>Assessment Missions</h3>
        <label>Select week
          <select id="quizWeek">${COURSE.map(item => `<option value="${item.week}" ${item.week === ep.week ? 'selected' : ''}>Week ${item.week}: ${sanitize(item.title)}</option>`).join('')}</select>
        </label>
        <div class="quiz-question">
          <strong>Assessment type</strong>
          <p>${sanitize(ep.assessment)}</p>
        </div>
        <div class="quiz-question">
          <strong>Previous score</strong>
          <p>${prev ? `${prev.score}/100 submitted on ${new Date(prev.submittedAt).toLocaleString()}` : 'No submission yet.'}</p>
        </div>
      </div>
      <div class="card">
        <p class="eyebrow">Week ${ep.week}</p>
        <h3>${sanitize(ep.title)} Quiz Mission</h3>
        <form id="quizForm">
          ${ep.quiz.map((q, qi) => `<div class="quiz-question"><strong>${qi+1}. ${sanitize(q.q)}</strong>${q.options.map((op, oi) => `<label class="quiz-option"><input type="radio" name="q${qi}" value="${oi}" required><span>${sanitize(op)}</span></label>`).join('')}</div>`).join('')}
          <button class="primary-btn" type="submit">Submit Quiz Mission</button>
        </form>
        <div id="quizResult"></div>
      </div>
    </section>
    <section class="card">
      <h3>Assessment Framework</h3>
      <div class="grid two">
        <div class="card soft"><h3>Formative Assessment 60%</h3><p>Weekly comic missions 20%, vocabulary and reading tasks 10%, voice portfolio 15%, peer feedback 10%, reflective journal 5%.</p></div>
        <div class="card soft"><h3>Summative Assessment 40%</h3><p>Midterm technical meeting simulation 15%, final product pitch 15%, final ESP comic-based test 10%.</p></div>
      </div>
    </section>`;
}

function renderPortfolio() {
  const user = currentUser();
  const submissions = state.submissions.filter(s => s.userId === user.id).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  return `
    <section class="grid side-main">
      <div class="card">
        <h3>Speaking Portfolio</h3>
        <div class="score-big">${submissions.length}</div>
        <p>Voice submissions are saved in this browser through IndexedDB. Use Export Data for backup.</p>
        <button class="primary-btn" id="printPortfolioBtn">Print Portfolio Report</button>
      </div>
      <div class="card">
        <h3>Portfolio Entries</h3>
        <div id="portfolioList">${submissions.length ? submissions.map(renderPortfolioItem).join('') : '<div class="empty-state">No voice recording yet. Open Voice Studio to submit your first mission.</div>'}</div>
      </div>
    </section>`;
}
function renderPortfolioItem(sub) {
  return `<div class="portfolio-item" data-submission="${sub.id}">
    <div>
      <strong>Week ${sub.week}: ${sanitize(sub.title)}</strong>
      <p>${new Date(sub.createdAt).toLocaleString()} · Score ${sub.feedback.score}/100</p>
      <div class="feedback-card"><strong>AI Coach:</strong> ${sanitize(sub.feedback.summary)}</div>
      <div class="audio-slot" id="audio-${sub.id}"><small>Loading audio...</small></div>
    </div>
    <div class="badge gold">${sub.feedback.score}/100</div>
  </div>`;
}

function renderLeaderboard() {
  const students = Object.values(state.users).filter(u => u.role === 'student').sort((a,b) => (userProgress(b).xp || 0) - (userProgress(a).xp || 0));
  return `
    <section class="card">
      <h3>Gamified Leaderboard</h3>
      <p>Leaderboard is based on local XP from episode completion, quiz missions, vocabulary mastery, and voice portfolio submissions.</p>
      ${students.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Rank</th><th>Student</th><th>Class</th><th>Level</th><th>XP</th><th>Badges</th><th>Completed Weeks</th></tr></thead><tbody>${students.map((u,i) => `<tr><td>${i+1}</td><td><strong>${sanitize(u.name)}</strong></td><td>${sanitize(u.className || '-')}</td><td>${levelFromXp(userProgress(u).xp)}</td><td>${userProgress(u).xp || 0}</td><td>${earnedBadges(u).length}</td><td>${totalCompletedWeeks(u)}/16</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">No student data yet.</div>'}
    </section>
    <section class="grid four">
      ${BADGES.map(b => `<div class="card"><h3>${sanitize(b.name)}</h3><p>${badgeDescription(b.id)}</p></div>`).join('')}
    </section>`;
}
function badgeDescription(id) {
  const desc = {
    starter: 'Complete the first episode mission.', bug: 'Submit a Week 2 bug-reporting voice task.', voice3: 'Save at least three voice recordings.', quiz5: 'Complete five quiz missions.', midterm: 'Complete the midterm boss battle.', aiethics: 'Submit the responsible AI speaking task.', pitcher: 'Submit product pitch training.', finisher: 'Complete all 16 weeks.'
  };
  return desc[id] || 'Learning achievement badge.';
}

function renderDashboard() {
  const user = currentUser();
  if (!['lecturer','admin'].includes(user.role)) {
    return `<section class="card"><h3>Lecturer Dashboard</h3><div class="empty-state">This area is available for lecturer accounts only.</div></section>`;
  }
  const students = Object.values(state.users).filter(u => u.role === 'student');
  const totalSub = state.submissions.length;
  const avgScore = totalSub ? Math.round(state.submissions.reduce((a,b) => a + b.feedback.score, 0) / totalSub) : 0;
  return `
    <section class="grid four">
      <div class="card"><h3>Students</h3><div class="score-big">${students.length}</div></div>
      <div class="card"><h3>Voice Submissions</h3><div class="score-big">${totalSub}</div></div>
      <div class="card"><h3>Average Score</h3><div class="score-big">${avgScore}</div></div>
      <div class="card"><h3>Active Weeks</h3><div class="score-big">16</div></div>
    </section>
    <section class="grid two">
      <div class="card">
        <h3>Student Progress</h3>
        ${students.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Student</th><th>Class</th><th>XP</th><th>Level</th><th>Quizzes</th><th>Voice</th><th>Completed</th></tr></thead><tbody>${students.map(u => `<tr><td><strong>${sanitize(u.name)}</strong><br><small>${sanitize(u.email)}</small></td><td>${sanitize(u.className || '-')}</td><td>${userProgress(u).xp || 0}</td><td>${levelFromXp(userProgress(u).xp)}</td><td>${quizCount(u)}</td><td>${countRecordings(u)}</td><td>${totalCompletedWeeks(u)}/16</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">No student account yet.</div>'}
      </div>
      <div class="card">
        <h3>Recent Voice Submissions</h3>
        ${state.submissions.length ? state.submissions.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10).map(sub => `<div class="quiz-question"><strong>${sanitize(sub.studentName)}</strong><p>Week ${sub.week}: ${sanitize(sub.title)} · Score ${sub.feedback.score}/100<br>${new Date(sub.createdAt).toLocaleString()}</p></div>`).join('') : '<div class="empty-state">No submissions yet.</div>'}
      </div>
    </section>
    <section class="card">
      <h3>Course Monitoring Matrix</h3>
      ${renderCourseTable()}
    </section>`;
}

function renderAdminCenter() {
  const user = currentUser();
  if (user.role !== 'admin') {
    return `<section class="card"><h3>Admin Center</h3><div class="empty-state">This area is available for Admin only.</div></section>`;
  }
  const lecturers = Object.values(state.users).filter(u => u.role === 'lecturer');
  const pending = lecturers.filter(u => u.status === 'pending');
  const students = Object.values(state.users).filter(u => u.role === 'student');
  return `
    <section class="grid four">
      <div class="card"><h3>Pending Lecturers</h3><div class="score-big">${pending.length}</div></div>
      <div class="card"><h3>Approved Lecturers</h3><div class="score-big">${lecturers.filter(u => u.status === 'approved').length}</div></div>
      <div class="card"><h3>Students</h3><div class="score-big">${students.length}</div></div>
      <div class="card"><h3>Total Accounts</h3><div class="score-big">${Object.values(state.users).filter(u => u.role !== 'admin').length}</div></div>
    </section>
    <section class="card">
      <h3>Lecturer Verification Requests</h3>
      ${pending.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Name</th><th>Email/ID</th><th>Program</th><th>Requested</th><th>Action</th></tr></thead><tbody>${pending.map(u => `<tr><td><strong>${sanitize(u.name)}</strong></td><td>${sanitize(u.email)}</td><td>${sanitize(u.institution || '-')}</td><td>${new Date(u.createdAt).toLocaleString()}</td><td><button class="success-btn approve-lecturer" data-id="${u.id}">Approve</button> <button class="danger-btn reject-lecturer" data-id="${u.id}">Reject</button></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">No pending lecturer request.</div>'}
    </section>
    <section class="card">
      <h3>Verified Lecturer Accounts</h3>
      ${lecturers.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Status</th><th>Name</th><th>Email/ID</th><th>Program</th><th>Action</th></tr></thead><tbody>${lecturers.map(u => `<tr><td>${sanitize(u.status || '-')}</td><td><strong>${sanitize(u.name)}</strong></td><td>${sanitize(u.email)}</td><td>${sanitize(u.institution || '-')}</td><td>${u.status === 'approved' ? `<button class="ghost-btn pending-lecturer" data-id="${u.id}">Set Pending</button>` : `<button class="success-btn approve-lecturer" data-id="${u.id}">Approve</button>`}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">No lecturer account yet.</div>'}
    </section>
    <section class="card">
      <h3>Admin Notes</h3>
      <p>Admin verification protects the lecturer dashboard from unapproved lecturer accounts in this local browser workspace.</p>
    </section>`;
}

function renderSettings() {
  const user = currentUser();
  return `
    <section class="grid two">
      <div class="card">
        <h3>Profile and Workspace</h3>
        <label>Name <input id="setName" value="${sanitize(user.name)}"></label>
        <label>Email or ID <input id="setEmail" value="${sanitize(user.email)}"></label>
        ${user.role === 'student' ? `<label>Class <input id="setClass" value="${sanitize(user.className || '')}"></label>` : user.role === 'lecturer' ? `<label>Program <input id="setInstitution" value="${sanitize(user.institution || state.classMeta.institution)}"></label>` : `<label>Role <input value="Administrator" disabled></label>`}
        <label>Change PIN <input id="setPin" type="password" placeholder="Leave blank to keep current PIN"></label>
        <button class="primary-btn" id="saveSettingsBtn">Save Profile</button>
        <button class="ghost-btn" id="logoutBtn">Logout</button>
      </div>
      <div class="card">
        <h3>Backup and Deployment</h3>
        <p>Use export before moving browser or device. GitHub Pages deployment only requires uploading these files to your repository.</p>
        <div class="audio-controls">
          <button class="primary-btn" id="exportDataBtn">Export Data JSON</button>
          <button class="ghost-btn" id="importDataBtn">Import Data JSON</button>
          <input id="importFile" type="file" accept="application/json" hidden>
        </div>
        <h4>PWA Status</h4>
        <p>${'serviceWorker' in navigator ? 'Service worker supported. The app can work offline after first load.' : 'Service worker is not supported in this browser.'}</p>
      </div>
    </section>
    ${['lecturer','admin'].includes(user.role) ? `<section class="card">
      <h3>Class Account Overview</h3>
      <p>This overview lists accounts saved in this browser for class management. PIN values are never displayed.</p>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Role</th><th>Status</th><th>Name</th><th>Email/ID</th><th>Class/Program</th></tr></thead><tbody>${Object.values(state.users).filter(u => u.role !== 'admin').map(u => `<tr><td>${u.role}</td><td>${u.status || '-'}</td><td>${sanitize(u.name)}</td><td>${sanitize(u.email)}</td><td>${sanitize(u.className || u.institution || '-')}</td></tr>`).join('')}</tbody></table></div>
    </section>` : `<section class="card"><h3>Student Privacy</h3><p>Your profile page only shows your own learning workspace. The lecturer dashboard controls class-level monitoring.</p></section>`}
    <section class="card">
      <h3>Danger Area</h3>
      <p>Reset removes local accounts, progress, scores, and metadata from this browser. Audio blobs in IndexedDB may be removed by the browser storage manager.</p>
      <button class="danger-btn" id="resetAppBtn">Reset Local App Data</button>
    </section>`;
}

function bindViewEvents(view) {
  $$('[data-go]').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.go)));

  if (view === 'episodes') bindEpisodes();
  if (view === 'vocabulary') bindVocabulary();
  if (view === 'voice') bindVoiceStudio();
  if (view === 'coach') bindCoach();
  if (view === 'assessment') bindAssessment();
  if (view === 'portfolio') bindPortfolio();
  if (view === 'admin') bindAdminCenter();
  if (view === 'settings') bindSettings();
}

function bindEpisodes() {
  $$('.week-btn').forEach(btn => btn.addEventListener('click', () => {
    state.selectedWeek = Number(btn.dataset.week);
    saveState(); renderApp();
  }));
  $$('.panel-card').forEach(card => card.addEventListener('click', () => {
    $$('.panel-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }));
  $('#markWeekDone')?.addEventListener('click', () => {
    const p = userProgress();
    if (!p.completedWeeks[state.selectedWeek]) addXp(60);
    p.completedWeeks[state.selectedWeek] = true;
    saveState(); renderApp(); toast(`Week ${state.selectedWeek} completed. XP added.`);
  });
  $('#saveEpisodeNote')?.addEventListener('click', () => {
    userProgress().notes[state.selectedWeek] = $('#episodeNote').value.trim();
    addXp(10); saveState(); toast('Reflection saved.');
  });
}
function bindVocabulary() {
  $$('.word-master').forEach(btn => btn.addEventListener('click', () => {
    const p = userProgress();
    const word = btn.dataset.word;
    if (!p.words[word]) addXp(8);
    p.words[word] = new Date().toISOString();
    saveState(); renderApp();
  }));
}

function bindVoiceStudio() {
  let previewBlob = null;
  let previewUrl = null;
  const startBtn = $('#startRecordBtn');
  const stopBtn = $('#stopRecordBtn');
  const playBtn = $('#playPreviewBtn');
  const saveBtn = $('#saveRecordBtn');
  const audio = $('#audioPreview');

  $('#voiceWeek').addEventListener('change', e => {
    state.selectedWeek = Number(e.target.value);
    saveState();
    const ep = episode();
    $('#voiceMissionTitle').textContent = `Week ${ep.week}: ${ep.title}`;
    $('#voiceMissionText').textContent = ep.task;
  });

  startBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recordedChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        previewBlob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = URL.createObjectURL(previewBlob);
        audio.src = previewUrl;
        audio.hidden = false;
        playBtn.disabled = false;
        saveBtn.disabled = false;
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      seconds = 0;
      timerInterval = setInterval(updateTimer, 1000);
      $('#recordDot').classList.add('recording');
      $('#recordStatus').textContent = 'Recording...';
      startBtn.disabled = true;
      stopBtn.disabled = false;
      saveBtn.disabled = true;
    } catch (err) {
      toast('Microphone access failed. You can still type the transcript and use the AI Coach.');
      console.warn(err);
    }
  });

  stopBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    clearInterval(timerInterval);
    $('#recordDot').classList.remove('recording');
    $('#recordStatus').textContent = 'Recording Stopped';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

  playBtn.addEventListener('click', () => audio.play());

  saveBtn.addEventListener('click', async () => {
    if (!previewBlob) return toast('No recording preview to save.');
    const ep = episode(Number($('#voiceWeek').value));
    const transcript = $('#voiceTranscript').value.trim();
    const feedback = analyzeSpeaking(transcript, ep.week);
    const id = uid('voice');
    const user = currentUser();
    const record = { id, userId: user.id, blob: previewBlob, mimeType: previewBlob.type, createdAt: new Date().toISOString() };
    await putRecording(record);
    const submission = {
      id, userId: user.id, studentName: user.name, week: ep.week, title: ep.title, task: ep.task,
      transcript, selfAssessment: $('#selfAssessment').value, feedback, createdAt: new Date().toISOString()
    };
    state.submissions.push(submission);
    const p = userProgress(user);
    p.voiceIds.push(id);
    p.completedWeeks[ep.week] = true;
    addXp(120 + Math.round(feedback.score / 5));
    saveState();
    toast('Voice task saved to portfolio with local AI feedback.');
    setView('portfolio');
  });
}
function updateTimer() {
  seconds += 1;
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  $('#recordTime').textContent = `${m}:${s}`;
}

function bindCoach() {
  $('#analyzeTextBtn').addEventListener('click', () => {
    const week = Number($('#coachWeek').value);
    const text = $('#coachText').value.trim();
    const result = analyzeSpeaking(text, week);
    $('#coachResult').innerHTML = renderFeedback(result);
  });
}
function renderFeedback(result) {
  return `<h3>Feedback Result</h3>
    <div class="score-big">${result.score}<small style="font-size:1rem">/100</small></div>
    <div class="feedback-card"><strong>Summary:</strong> ${sanitize(result.summary)}</div>
    <h4>Criterion Scores</h4>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>Criterion</th><th>Score</th><th>Feedback</th></tr></thead><tbody>${Object.entries(result.criteria).map(([k,v]) => `<tr><td>${sanitize(k)}</td><td>${v.score}</td><td>${sanitize(v.note)}</td></tr>`).join('')}</tbody></table></div>
    <h4>Suggested Revision</h4><p>${sanitize(result.suggestion)}</p>`;
}

function analyzeSpeaking(text, week) {
  const ep = episode(week);
  const raw = text || '';
  const lower = raw.toLowerCase();
  const tokens = lower.match(/[a-zA-Z]+/g) || [];
  const wordCount = tokens.length;
  const unique = new Set(tokens).size;
  const termHits = ep.terms.filter(t => lower.includes(t.toLowerCase())).length;
  const structureWords = ['problem', 'because', 'evidence', 'solution', 'recommend', 'first', 'then', 'finally', 'therefore', 'however', 'result', 'suggest'];
  const structureHits = structureWords.filter(w => lower.includes(w)).length;
  const professionalWords = ['please', 'recommend', 'suggest', 'investigate', 'resolve', 'clarify', 'support', 'improve', 'secure', 'professional'];
  const professionalHits = professionalWords.filter(w => lower.includes(w)).length;
  const sentenceCount = Math.max(1, (raw.match(/[.!?]/g) || []).length);
  const avgLen = wordCount / sentenceCount;

  const taskScore = clamp(45 + Math.min(30, wordCount * 0.7) + Math.min(25, structureHits * 5), 45, 95);
  const vocabScore = clamp(45 + termHits * 12 + Math.min(15, unique / 4), 45, 96);
  const orgScore = clamp(45 + structureHits * 9 + (raw.includes(',') ? 5 : 0), 45, 94);
  const fluencyScore = clamp(50 + Math.min(30, wordCount * .5) - (avgLen > 28 ? 8 : 0) + (sentenceCount >= 2 ? 8 : 0), 45, 94);
  const toneScore = clamp(55 + professionalHits * 7 + (lower.includes('sorry') || lower.includes('apologize') ? 6 : 0), 50, 96);
  const score = Math.round((taskScore + vocabScore + orgScore + fluencyScore + toneScore) / 5);
  const summary = score >= 85 ? 'Excellent professional ESP response. Your message is clear, relevant, and workplace-oriented.' : score >= 70 ? 'Good response. You completed the main task, but the explanation can be more structured and term-rich.' : 'Developing response. Add more informatics vocabulary, clearer structure, and a concrete solution or recommendation.';
  return {
    score,
    criteria: {
      'Task Completion': { score: Math.round(taskScore), note: wordCount > 30 ? 'The response gives enough detail for the mission.' : 'Add more details to fully complete the mission.' },
      'Vocabulary Use': { score: Math.round(vocabScore), note: termHits ? `You used ${termHits} target term(s): ${ep.terms.filter(t => lower.includes(t.toLowerCase())).join(', ')}.` : 'Use more target informatics vocabulary from the episode.' },
      'Organization': { score: Math.round(orgScore), note: structureHits ? 'The response shows some logical markers.' : 'Use a clearer sequence such as problem, evidence, solution.' },
      'Fluency and Clarity': { score: Math.round(fluencyScore), note: sentenceCount >= 2 ? 'The response is divided into sentences.' : 'Use two or more complete sentences for clearer delivery.' },
      'Professional Tone': { score: Math.round(toneScore), note: professionalHits ? 'The response includes workplace-appropriate wording.' : 'Use polite and professional expressions such as recommend, suggest, clarify, or investigate.' }
    },
    summary,
    suggestion: `Try this structure: “The main issue is ... . The evidence is ... . This may happen because ... . I recommend ... so that ... .” Include target terms from Week ${ep.week}: ${ep.terms.slice(0,4).join(', ')}.`
  };
}
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function bindAssessment() {
  $('#quizWeek').addEventListener('change', e => {
    state.selectedWeek = Number(e.target.value);
    saveState(); renderApp();
  });
  $('#quizForm').addEventListener('submit', e => {
    e.preventDefault();
    const ep = episode();
    let correct = 0;
    ep.quiz.forEach((q, qi) => {
      const selected = Number(new FormData(e.target).get(`q${qi}`));
      if (selected === q.answer) correct++;
    });
    const score = Math.round(correct / ep.quiz.length * 100);
    const p = userProgress();
    if (!p.quizzes[ep.week]) addXp(score >= 70 ? 80 : 35);
    p.quizzes[ep.week] = { score, correct, total: ep.quiz.length, submittedAt: new Date().toISOString() };
    if (score >= 70) p.completedWeeks[ep.week] = true;
    saveState();
    $('#quizResult').innerHTML = `<div class="feedback-card" style="margin-top:14px"><strong>Score: ${score}/100</strong><p>You answered ${correct} of ${ep.quiz.length} questions correctly. ${score >= 70 ? 'Mission passed and XP added.' : 'Review the comic episode and try again.'}</p></div>`;
  });
}

function bindPortfolio() {
  loadPortfolioAudio();
  $('#printPortfolioBtn')?.addEventListener('click', () => window.print());
}
async function loadPortfolioAudio() {
  for (const sub of state.submissions.filter(s => s.userId === currentUser().id)) {
    const slot = $(`#audio-${CSS.escape(sub.id)}`);
    if (!slot) continue;
    try {
      const rec = await getRecording(sub.id);
      if (!rec) { slot.innerHTML = '<small>Audio blob not found in this browser.</small>'; continue; }
      const url = URL.createObjectURL(rec.blob);
      slot.innerHTML = `<audio controls src="${url}"></audio><div class="audio-controls"><button class="danger-btn delete-submission" data-id="${sub.id}">Delete</button></div>`;
    } catch (e) {
      slot.innerHTML = '<small>Could not load audio.</small>';
    }
  }
  $$('.delete-submission').forEach(btn => btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    await deleteRecording(id);
    state.submissions = state.submissions.filter(s => s.id !== id);
    Object.values(state.users).forEach(u => { if (u.progress?.voiceIds) u.progress.voiceIds = u.progress.voiceIds.filter(x => x !== id); });
    saveState(); renderApp(); toast('Voice submission deleted.');
  }));
}

function bindAdminCenter() {
  $$('.approve-lecturer').forEach(btn => btn.addEventListener('click', () => {
    const u = state.users[btn.dataset.id];
    if (!u) return;
    u.status = 'approved';
    saveState();
    renderApp();
    toast(`${u.name} is now verified as Lecturer.`);
  }));
  $$('.reject-lecturer').forEach(btn => btn.addEventListener('click', () => {
    const u = state.users[btn.dataset.id];
    if (!u) return;
    u.status = 'rejected';
    saveState();
    renderApp();
    toast(`${u.name} request rejected.`);
  }));
  $$('.pending-lecturer').forEach(btn => btn.addEventListener('click', () => {
    const u = state.users[btn.dataset.id];
    if (!u) return;
    u.status = 'pending';
    saveState();
    renderApp();
    toast(`${u.name} moved to pending status.`);
  }));
}

function bindSettings() {
  $('#saveSettingsBtn').addEventListener('click', () => {
    const u = currentUser();
    u.name = $('#setName').value.trim();
    u.email = $('#setEmail').value.trim().toLowerCase();
    if ($('#setPin').value.trim()) u.pin = $('#setPin').value.trim();
    if (u.role === 'student') u.className = $('#setClass').value.trim();
    if (u.role === 'lecturer') {
      u.institution = $('#setInstitution').value.trim();
      state.classMeta.institution = u.institution;
      state.classMeta.lecturer = u.name;
    }
    saveState(); renderApp(); toast('Profile saved.');
  });
  $('#logoutBtn').addEventListener('click', () => { state.currentUserId = null; saveState(); renderApp(); $('#authOverlay').classList.remove('hidden'); });
  $('#exportDataBtn').addEventListener('click', exportAllData);
  $('#importDataBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', importAllData);
  $('#resetAppBtn').addEventListener('click', () => {
    const ok = confirm('Reset all local JSInfoComix ESP data in this browser?');
    if (!ok) return;
    localStorage.removeItem(APP_KEY);
    state = migrateState(clone(DEFAULT_STATE));
    saveState();
    renderApp();
    $('#authOverlay').classList.remove('hidden');
    toast('Local app data reset.');
  });
}
function exportAllData() {
  const user = currentUser();
  const isLecturer = ['lecturer','admin'].includes(user?.role);
  const payload = isLecturer
    ? { app: 'JSInfoComix ESP', version: '1.1.0', type: 'full-class-backup', exportedAt: new Date().toISOString(), state }
    : {
        app: 'JSInfoComix ESP', version: '1.1.0', type: 'student-portfolio-backup', exportedAt: new Date().toISOString(),
        student: user ? { id: user.id, name: user.name, email: user.email, className: user.className, progress: userProgress(user) } : null,
        submissions: state.submissions.filter(s => s.userId === user?.id)
      };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `JSInfoComix-ESP-${isLecturer ? 'class-backup' : 'student-portfolio'}-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
function importAllData(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!payload.state || !payload.state.users) throw new Error('Invalid backup');
      state = { ...clone(DEFAULT_STATE), ...payload.state };
      saveState(); renderApp(); toast('Data imported successfully.');
    } catch (err) { toast('Import failed. Check the JSON backup file.'); }
  };
  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', init);

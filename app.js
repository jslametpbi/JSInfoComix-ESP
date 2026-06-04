/* JSInfoComix ESP v1.5
   Local-first PWA. No backend. No external API. Voice listening uses browser speech synthesis.
   Recordings use MediaRecorder and IndexedDB.
*/

const APP_KEY = 'jsinfocomix_esp_state_v15';
const OLD_KEYS = ['jsinfocomix_esp_state_v14', 'jsinfocomix_esp_state_v13', 'jsinfocomix_esp_state_v12', 'jsinfocomix_esp_state_v1', 'jsinfocomix_esp_state_v2'];
const ADMIN_ID = 'admin';
const ADMIN_PIN = 'JS2026';
const DB_NAME = 'JSInfoComixESPRecordingsV15';
const DB_VERSION = 1;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const sanitize = value => String(value ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const uid = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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
    scene: 'startup lab',
    terms: ['software engineer', 'informatics', 'specialization', 'team role', 'technical interest'],
    panels: [
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Welcome to NusaTech Lab. Today you join an international software team.' },
      { speaker: 'Arka', role: 'developer', line: 'I am a backend developer. I usually work with databases and server logic.' },
      { speaker: 'Naya', role: 'female', line: 'I design interfaces. My job is to make the app usable and accessible.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Your first mission is to introduce your role clearly and professionally.' }
    ],
    quiz: [
      { q: 'Which expression sounds most professional?', options: ['I like computer so much.', 'My technical interest is backend development and database design.', 'I am good in laptop.', 'I play games every day.'], answer: 1 },
      { q: 'A professional self-introduction should include...', options: ['Only hobbies', 'Name, field, technical interest, and learning goal', 'Only nickname', 'Only social media'], answer: 1 }
    ]
  },
  {
    week: 2,
    title: 'The Broken Login Page',
    focus: 'Bug reporting and problem explanation',
    task: 'Explain a login bug using problem, evidence, and suggested solution.',
    assessment: 'Quiz and voice task',
    scene: 'debugging room',
    terms: ['bug', 'authentication', 'error message', 'debug', 'expected behavior', 'actual behavior'],
    panels: [
      { speaker: 'Client', role: 'client', line: 'The login page is not working. We need the demo tomorrow.' },
      { speaker: 'Rafi', role: 'developer', line: 'The authentication module returns an error when the password field is empty.' },
      { speaker: 'Arka', role: 'developer', line: 'We must report the bug with clear evidence and possible cause.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Use this structure: problem, condition, evidence, and solution.' }
    ],
    quiz: [
      { q: 'What is actual behavior in bug reporting?', options: ['What the software should do', 'What the software really does during the problem', 'The developer’s feeling', 'The client’s budget'], answer: 1 },
      { q: 'The best bug report includes...', options: ['Emotion only', 'Problem, steps, evidence, expected behavior, actual behavior', 'Only screenshots', 'Only the word error'], answer: 1 }
    ]
  },
  {
    week: 3,
    title: 'The UI/UX Meeting',
    focus: 'Interface description and design rationale',
    task: 'Describe an app screen and justify one design decision.',
    assessment: 'Vocabulary mission',
    scene: 'design studio',
    terms: ['layout', 'navigation bar', 'button', 'accessibility', 'user flow', 'wireframe'],
    panels: [
      { speaker: 'Naya', role: 'female', line: 'This dashboard uses a simple navigation bar and a clear action button.' },
      { speaker: 'Ken', role: 'client', line: 'Can you explain why the button is placed at the top right?' },
      { speaker: 'Naya', role: 'female', line: 'It supports the user flow because the user usually submits after reviewing the form.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Professional UI and UX English explains what users see and why it matters.' }
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
    scene: 'database console',
    terms: ['table', 'record', 'field', 'primary key', 'foreign key', 'relationship'],
    panels: [
      { speaker: 'Mira', role: 'female', line: 'The users table stores user ID, name, email, and role.' },
      { speaker: 'Arka', role: 'developer', line: 'The orders table uses user ID as a foreign key.' },
      { speaker: 'Ken', role: 'client', line: 'So each order belongs to one user?' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Exactly. Explain database relationships with clear examples.' }
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
    scene: 'API documentation',
    terms: ['API', 'endpoint', 'request', 'response', 'parameter', 'token'],
    panels: [
      { speaker: 'Arka', role: 'developer', line: 'The documentation says we must send a POST request to slash API slash login.' },
      { speaker: 'Rafi', role: 'developer', line: 'The request needs email and password parameters.' },
      { speaker: 'Ken', role: 'client', line: 'Please summarize it for the non-technical client.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Good technical English makes complex instructions easier to understand.' }
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
    scene: 'security operation center',
    terms: ['phishing', 'malware', 'suspicious login', 'two-factor authentication', 'breach', 'secure password'],
    panels: [
      { speaker: 'Rafi', role: 'developer', line: 'We detected multiple suspicious login attempts from unknown locations.' },
      { speaker: 'Mira', role: 'female', line: 'The dashboard shows failed attempts every two minutes.' },
      { speaker: 'Ken', role: 'client', line: 'Prepare a concise incident report for the team.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Use careful language: detected, suspected, evidence, and recommendation.' }
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
    scene: 'agile meeting',
    terms: ['sprint', 'backlog', 'progress', 'blocker', 'deliverable', 'iteration'],
    panels: [
      { speaker: 'Ken', role: 'client', line: 'In today’s sprint review, each member reports progress and blockers.' },
      { speaker: 'Arka', role: 'developer', line: 'I completed the login API, but I still need to fix the validation bug.' },
      { speaker: 'Naya', role: 'female', line: 'The wireframe is ready, and I will test it with users this week.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'A strong progress report is specific, brief, and solution-oriented.' }
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
    scene: 'client meeting',
    terms: ['clarification', 'recommendation', 'priority', 'timeline', 'risk', 'solution'],
    panels: [
      { speaker: 'Client', role: 'client', line: 'The app must be ready soon. What is the highest priority issue?' },
      { speaker: 'Ken', role: 'client', line: 'We need a clear technical explanation before making a decision.' },
      { speaker: 'Team', role: 'bot', line: 'Each member must speak with evidence and recommendation.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Boss Battle: communicate professionally under pressure.' }
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
    scene: 'analytics room',
    terms: ['dashboard', 'metric', 'trend', 'increase', 'decrease', 'conversion rate'],
    panels: [
      { speaker: 'Mira', role: 'female', line: 'The dashboard shows that active users increased by eighteen percent this week.' },
      { speaker: 'Ken', role: 'client', line: 'What does that trend mean for the launch strategy?' },
      { speaker: 'Mira', role: 'female', line: 'It suggests that onboarding changes may improve user engagement.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Use data language: increase, decrease, trend, comparison, and implication.' }
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
    scene: 'support desk',
    terms: ['complaint', 'apologize', 'investigate', 'resolve', 'follow up', 'technical support'],
    panels: [
      { speaker: 'Client', role: 'client', line: 'The app crashed during my presentation. This is unacceptable.' },
      { speaker: 'Naya', role: 'female', line: 'We need to respond politely and explain the next action.' },
      { speaker: 'Rafi', role: 'developer', line: 'We will investigate the crash log and update the client today.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Professional support language balances empathy and responsibility.' }
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
    scene: 'innovation lab',
    terms: ['AI feature', 'bias', 'privacy', 'transparency', 'automation', 'human oversight'],
    panels: [
      { speaker: 'Ken', role: 'client', line: 'Should we add an AI recommendation feature to the app?' },
      { speaker: 'Mira', role: 'female', line: 'It may personalize learning, but we must consider privacy and bias.' },
      { speaker: 'Rafi', role: 'developer', line: 'Human oversight is necessary before automated decisions are used.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Good AI literacy means explaining benefits, risks, and safeguards.' }
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
    scene: 'testing bay',
    terms: ['test case', 'bug severity', 'passed', 'failed', 'usability test', 'regression test'],
    panels: [
      { speaker: 'Arka', role: 'developer', line: 'The payment test passed, but the notification test failed.' },
      { speaker: 'Naya', role: 'female', line: 'Users also found the settings page difficult to navigate.' },
      { speaker: 'Ken', role: 'client', line: 'Classify each issue by severity before launch.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Testing English uses objective and precise reporting.' }
    ],
    quiz: [
      { q: 'A failed test means...', options: ['The feature did not meet the expected result', 'The user is always wrong', 'The app is finished', 'The design is perfect'], answer: 0 },
      { q: 'Bug severity describes...', options: ['How serious the bug is', 'How colorful the screen is', 'How loud the audio is', 'How old the laptop is'], answer: 0 }
    ]
  },
  {
    week: 13,
    title: 'Product Pitch Training',
    focus: 'Persuasive product explanation',
    task: 'Pitch an app idea using problem, solution, features, and benefit.',
    assessment: 'Voice portfolio',
    scene: 'pitch room',
    terms: ['pitch', 'target users', 'feature', 'benefit', 'value proposition', 'prototype'],
    panels: [
      { speaker: 'Ken', role: 'client', line: 'A strong pitch begins with the problem and target users.' },
      { speaker: 'Naya', role: 'female', line: 'Then we explain the prototype and its most useful features.' },
      { speaker: 'Arka', role: 'developer', line: 'We should also show how the system solves the problem efficiently.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Use persuasive but evidence-based language for your product pitch.' }
    ],
    quiz: [
      { q: 'A value proposition explains...', options: ['Why the product is useful for users', 'Only the price', 'Only the color', 'Only the developer name'], answer: 0 },
      { q: 'A good pitch usually includes...', options: ['Problem, solution, users, features, benefits', 'Only jokes', 'Only code', 'Only one word'], answer: 0 }
    ]
  },
  {
    week: 14,
    title: 'International Demo Day',
    focus: 'Intercultural communication and Q&A',
    task: 'Answer a client question clearly and politely during an international demo.',
    assessment: 'Role-play',
    scene: 'international demo',
    terms: ['clarify', 'confirm', 'cross-cultural', 'demo', 'question and answer', 'follow-up'],
    panels: [
      { speaker: 'Client', role: 'client', line: 'Could you clarify how the app protects user data?' },
      { speaker: 'Rafi', role: 'developer', line: 'Certainly. The app stores only necessary data and uses role-based access.' },
      { speaker: 'Ken', role: 'client', line: 'That answer is clear. Please add one follow-up action.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'In international settings, clarity and politeness are equally important.' }
    ],
    quiz: [
      { q: 'A polite clarification response can start with...', options: ['Certainly, let me clarify...', 'No, listen to me.', 'Whatever.', 'I forgot.'], answer: 0 },
      { q: 'Cross-cultural communication requires...', options: ['Clarity, respect, and awareness of different expectations', 'Rudeness', 'Only slang', 'Ignoring questions'], answer: 0 }
    ]
  },
  {
    week: 15,
    title: 'Final Launch Preparation',
    focus: 'Technical presentation planning',
    task: 'Prepare the final presentation structure for the product launch.',
    assessment: 'Draft submission',
    scene: 'launch planning',
    terms: ['presentation structure', 'opening', 'transition', 'summary', 'visual support', 'closing statement'],
    panels: [
      { speaker: 'Mira', role: 'female', line: 'The final presentation needs a clear opening, demo, evidence, and closing.' },
      { speaker: 'Naya', role: 'female', line: 'Visual support should help the audience understand the product, not distract them.' },
      { speaker: 'Ken', role: 'client', line: 'Each speaker must know the transition to the next part.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'A professional launch presentation is organized, concise, and confident.' }
    ],
    quiz: [
      { q: 'A transition helps speakers...', options: ['Move smoothly from one part to the next', 'Delete the presentation', 'Avoid structure', 'Hide the conclusion'], answer: 0 },
      { q: 'Visual support should...', options: ['Support the explanation clearly', 'Replace all speaking', 'Be unreadable', 'Contain random pictures'], answer: 0 }
    ]
  },
  {
    week: 16,
    title: 'Product Launch Expo',
    focus: 'Final ESP performance and professional reflection',
    task: 'Present the final product scenario and reflect on your speaking development.',
    assessment: 'Final project and oral examination',
    scene: 'expo hall',
    terms: ['launch', 'reflection', 'professional growth', 'technical communication', 'audience engagement', 'final evaluation'],
    panels: [
      { speaker: 'Ken', role: 'client', line: 'Welcome to the Product Launch Expo. Your team is ready to present.' },
      { speaker: 'Team', role: 'bot', line: 'We will explain the problem, product, technical features, and user benefits.' },
      { speaker: 'Client', role: 'client', line: 'Your presentation shows growth in technical communication.' },
      { speaker: 'Dr. Joe', role: 'mentor', line: 'Final mission: demonstrate your ESP competence with confidence and clarity.' }
    ],
    quiz: [
      { q: 'Final reflection should discuss...', options: ['Learning progress, strengths, weaknesses, and future goals', 'Only score', 'Only complaint', 'Only attendance'], answer: 0 },
      { q: 'Technical communication combines...', options: ['Accuracy, clarity, audience awareness, and professional tone', 'Noise and speed only', 'Random terms', 'Silence'], answer: 0 }
    ]
  }
];

const TERM_DEFINITIONS = {
  'software engineer': 'A professional who designs, develops, tests, and maintains software systems.',
  'informatics': 'The study and practice of information processing, computing systems, and digital solutions.',
  'specialization': 'A focused area of expertise, such as cybersecurity, data analysis, or software development.',
  'team role': 'A specific responsibility in a project team, such as developer, designer, tester, or manager.',
  'technical interest': 'A preferred technology area or professional skill to develop.',
  bug: 'An error or problem in software that causes incorrect behavior.',
  authentication: 'The process of verifying user identity before access is granted.',
  'error message': 'A message that explains what went wrong in a system or application.',
  debug: 'To find, analyze, and fix software errors.',
  'expected behavior': 'What a system should do when it works correctly.',
  'actual behavior': 'What a system really does when it is tested or used.',
  layout: 'The arrangement of visual elements on a screen or page.',
  'navigation bar': 'An interface area that helps users move between sections.',
  button: 'A clickable interface element used to perform an action.',
  accessibility: 'Design practice that allows people with different needs to use a product.',
  'user flow': 'The path users take to complete a task in an application.',
  wireframe: 'A simple visual plan showing the structure of an interface.',
  table: 'A structured database object that stores records in rows and fields in columns.',
  record: 'One row of data in a database table.',
  field: 'A column or category of data in a table.',
  'primary key': 'A unique identifier for each record in a database table.',
  'foreign key': 'A field that links one database table to another.',
  relationship: 'A connection between data entities or tables.',
  API: 'A set of rules that allows software systems to communicate.',
  endpoint: 'A specific address where an application sends a request.',
  request: 'A message sent from a client to a server asking for data or action.',
  response: 'Data or information returned by a server after a request.',
  parameter: 'A value sent with a request to specify what is needed.',
  token: 'A digital string used for authorization or session access.',
  phishing: 'A cyberattack that tricks users into giving sensitive information.',
  malware: 'Software designed to damage, disrupt, or gain unauthorized access.',
  'suspicious login': 'A login attempt that appears unusual or potentially unsafe.',
  'two-factor authentication': 'A login method that requires two forms of verification.',
  breach: 'An incident where data or systems are accessed without authorization.',
  'secure password': 'A strong password that is difficult to guess or attack.',
  sprint: 'A short work cycle in agile development.',
  backlog: 'A prioritized list of tasks or features to complete.',
  progress: 'Movement toward completing a task or project.',
  blocker: 'A problem that prevents work from continuing.',
  deliverable: 'A product, feature, report, or output that must be completed.',
  iteration: 'A repeated cycle of improvement or development.',
  clarification: 'A request or explanation that makes something clearer.',
  recommendation: 'A proposed action or solution based on evidence.',
  priority: 'The level of importance assigned to a task or issue.',
  timeline: 'A schedule showing when tasks or milestones should happen.',
  risk: 'A possible problem that may affect project success.',
  solution: 'A way to solve a problem.',
  dashboard: 'A visual display of important data and metrics.',
  metric: 'A measurable indicator used to evaluate performance.',
  trend: 'A general pattern or direction in data.',
  increase: 'A rise in number, level, or amount.',
  decrease: 'A fall in number, level, or amount.',
  'conversion rate': 'The percentage of users who complete a desired action.',
  complaint: 'A statement that something is wrong or unsatisfactory.',
  apologize: 'To express regret politely for a problem or inconvenience.',
  investigate: 'To examine a problem carefully to find the cause.',
  resolve: 'To fix or settle a problem.',
  'follow up': 'To contact again or continue an action after the first response.',
  'technical support': 'Help provided to users who experience technical problems.',
  'AI feature': 'A function in an application that uses artificial intelligence.',
  bias: 'Unfair or unbalanced influence in data, design, or decision-making.',
  privacy: 'Protection of personal data and user information.',
  transparency: 'Clear explanation of how a system works or uses data.',
  automation: 'A process performed by a system with limited human action.',
  'human oversight': 'Human review or control over automated decisions.',
  'test case': 'A specific condition used to check whether software works correctly.',
  'bug severity': 'The level of seriousness or impact of a software bug.',
  passed: 'A test result showing that a feature met the expected condition.',
  failed: 'A test result showing that a feature did not meet the expected condition.',
  'usability test': 'A test that checks how easily users can use a product.',
  'regression test': 'A test to confirm that new changes do not break existing features.',
  pitch: 'A persuasive explanation of a product, idea, or solution.',
  'target users': 'The group of people the product is designed for.',
  feature: 'A specific function or capability of a product.',
  benefit: 'The positive value or advantage gained by users.',
  'value proposition': 'A clear statement of why a product is useful and worth using.',
  prototype: 'An early model of a product used for testing or demonstration.',
  clarify: 'To make information clearer or easier to understand.',
  confirm: 'To check or state that something is correct.',
  'cross-cultural': 'Related to communication across different cultural backgrounds.',
  demo: 'A demonstration of how a product or feature works.',
  'question and answer': 'A session where presenters respond to audience questions.',
  'follow-up': 'An additional action or response after an initial discussion.',
  'presentation structure': 'The organized sequence of a presentation.',
  opening: 'The beginning part of a presentation.',
  transition: 'A phrase or section that connects one part to another.',
  summary: 'A short restatement of key points.',
  'visual support': 'Slides, images, diagrams, or charts that support speaking.',
  'closing statement': 'The final message that ends a presentation strongly.',
  launch: 'The official release or introduction of a product.',
  reflection: 'Careful thinking about learning progress and future improvement.',
  'professional growth': 'Development of professional skills, confidence, and competence.',
  'technical communication': 'Clear communication about technical information for a specific audience.',
  'audience engagement': 'Ways of keeping listeners interested and involved.',
  'final evaluation': 'A summative assessment of learning achievement.'
};

const BADGES = [
  { id: 'starter', name: 'Startup Communicator', test: user => completedCount(user) >= 1 },
  { id: 'bug', name: 'Bug Reporter', test: user => Boolean(progressOf(user).completedWeeks[2]) },
  { id: 'visual', name: 'UI Storyteller', test: user => Boolean(progressOf(user).completedWeeks[3]) },
  { id: 'cyber', name: 'Cyber Alert Speaker', test: user => Boolean(progressOf(user).completedWeeks[6]) },
  { id: 'voice3', name: 'Voice Builder', test: user => voiceCount(user) >= 3 },
  { id: 'quiz5', name: 'Quiz Strategist', test: user => Object.keys(progressOf(user).quizzes || {}).length >= 5 },
  { id: 'quizMaster', name: 'Quiz Master', test: user => Object.values(progressOf(user).quizzes || {}).filter(q => q.score >= 85).length >= 4 },
  { id: 'boss3', name: 'Boss Challenge Winner', test: user => Object.keys(progressOf(user).bossChallenges || {}).length >= 3 },
  { id: 'midterm', name: 'Boss Battle Speaker', test: user => Boolean(progressOf(user).completedWeeks[8]) },
  { id: 'aiethics', name: 'AI Ethics Explainer', test: user => Boolean(progressOf(user).completedWeeks[11]) },
  { id: 'pitcher', name: 'Product Pitcher', test: user => Boolean(progressOf(user).completedWeeks[13]) },
  { id: 'finisher', name: 'ESP Finalist', test: user => completedCount(user) >= 16 }
];

function enhanceCourseAssessments() {
  COURSE.forEach(ep => {
    const existing = Array.isArray(ep.quiz) ? ep.quiz : [];
    const term1 = ep.terms[0] || 'technical communication';
    const term2 = ep.terms[1] || 'professional explanation';
    const term3 = ep.terms[2] || 'clear response';
    const additional = [
      { q: `Which expression best fits the Week ${ep.week} mission?`, options: [`I will explain the ${term1} clearly with context and evidence.`, 'It is just like that, no explanation needed.', 'The system is bad and I do not know why.', 'I cannot say anything about this task.'], answer: 0 },
      { q: `Which term should be used accurately in this episode?`, options: [titleCase(term1), 'Random picture', 'Personal gossip', 'Unrelated hobby'], answer: 0 },
      { q: 'Which response structure is most professional?', options: ['Problem, evidence, cause, and recommendation', 'Only one word answer', 'Complaint without solution', 'Long unrelated story'], answer: 0 },
      { q: `In the comic context, ${term2} is mainly connected to...`, options: [ep.focus, 'sports commentary', 'food ordering', 'music performance'], answer: 0 },
      { q: 'A strong ESP speaking answer should include...', options: [`task relevance, ${term3}, clear organization, and polite tone`, 'speed only', 'accent imitation only', 'memorized sentences without meaning'], answer: 0 }
    ];
    const seen = new Set(existing.map(q => q.q));
    additional.forEach(q => { if (existing.length < 5 && !seen.has(q.q)) existing.push(q); });
    ep.quiz = existing.slice(0, 5);
    ep.quest = {
      name: `Week ${ep.week} Skill Quest`,
      boss: ep.week === 8 ? 'Midterm Boss Battle' : ep.week === 16 ? 'Final Launch Boss' : `${titleCase(term1)} Challenge`,
      xp: 150,
      unlock: `Score at least 80 in the quiz and save one voice mission for Week ${ep.week}.`
    };
  });
}
enhanceCourseAssessments();

const CHARACTER_PROFILES = {
  Arka: { role: 'developer', color: '#0f3b5f', shirt: '#38bdf8', hair: '#111827', label: 'Backend Developer' },
  Naya: { role: 'female', color: '#9a3412', shirt: '#f97316', hair: '#24111f', label: 'UI/UX Designer' },
  Rafi: { role: 'developer', color: '#1e3a8a', shirt: '#60a5fa', hair: '#111827', label: 'Cybersecurity Intern' },
  Mira: { role: 'female', color: '#b45309', shirt: '#facc15', hair: '#24111f', label: 'Data Analyst' },
  Ken: { role: 'client', color: '#334155', shirt: '#e2e8f0', hair: '#111827', label: 'Project Manager' },
  'Dr. Joe': { role: 'mentor', color: '#0f172a', shirt: '#e2e8f0', hair: '#111827', label: 'ESP Mentor and Coach' },
  Client: { role: 'client', color: '#9a3412', shirt: '#fed7aa', hair: '#111827', label: 'Client' },
  Team: { role: 'bot', color: '#0f766e', shirt: '#ccfbf1', hair: '#111827', label: 'NusaTech Team' }
};

function castLabel(panel) {
  const names = panel.cast?.length ? panel.cast : [panel.speaker];
  return names.filter(Boolean).join(', ');
}
function speakerRole(name) { return CHARACTER_PROFILES[name]?.role || (name === 'Client' ? 'client' : 'developer'); }
function characterColor(name, fallback = '#0f3b5f') { return CHARACTER_PROFILES[name]?.color || fallback; }

function seriesForEpisode(ep) {
  const t1 = ep.terms[0] || 'technical problem';
  const t2 = ep.terms[1] || 'evidence';
  const t3 = ep.terms[2] || 'solution';
  const t4 = ep.terms[3] || 'professional communication';
  const t5 = ep.terms[4] || 'team decision';
  const topic = ep.title.toLowerCase();
  const clientIntro = topic.includes('welcome') ? 'The new interns must introduce their technical roles before the first sprint begins.' :
    topic.includes('launch') ? 'The final audience is waiting for a clear product story from the whole team.' :
    topic.includes('pitch') ? 'The investor wants to know the problem, solution, and user benefit clearly.' :
    topic.includes('cyber') ? 'A warning appears on the security dashboard and the team must respond quickly.' :
    topic.includes('database') ? 'The data model is confusing and the team must explain the relationship clearly.' :
    topic.includes('api') ? 'The documentation is difficult for non-technical users to understand.' :
    topic.includes('ui') ? 'The interface review starts because the client questions the screen layout.' :
    topic.includes('login') ? 'The client reports that the login page is broken before the demo.' :
    `The team faces a professional communication problem related to ${ep.focus}.`;
  return [
    {
      id: 1,
      title: 'Situation Briefing',
      subtitle: 'Understanding the weekly professional context',
      xp: 40,
      panels: [
        { speaker: 'Ken', cast: ['Ken', 'Arka', 'Naya'], role: 'client', line: clientIntro },
        { speaker: 'Arka', cast: ['Arka', 'Rafi'], role: 'developer', line: `I will check the ${t1} and collect evidence before we explain the issue.` },
        { speaker: 'Naya', cast: ['Naya', 'Mira'], role: 'female', line: `The explanation must be understandable for users, not only for developers.` },
        { speaker: 'Dr. Joe', cast: ['Dr. Joe', 'Ken'], role: 'mentor', line: `Start with context, then explain the problem, evidence, and expected professional response.` }
      ],
      dialogueMissions: [
        { as: 'Ken', prompt: `Open the team briefing and ask for one clear explanation about ${t1}.`, xp: 35 },
        { as: 'Arka', prompt: `Explain the first technical observation using the term ${t1}.`, xp: 40 },
        { as: 'Naya', prompt: `Rephrase the problem for a non-technical user.`, xp: 40 }
      ]
    },
    {
      id: 2,
      title: 'Investigation',
      subtitle: 'Finding evidence and technical causes',
      xp: 45,
      panels: [
        { speaker: 'Rafi', cast: ['Rafi', 'Arka'], role: 'developer', line: `I found an issue related to ${t2}. We should compare actual behavior and expected behavior.` },
        { speaker: 'Mira', cast: ['Mira', 'Rafi'], role: 'female', line: `The data pattern shows that the problem appears when ${t3} is not handled properly.` },
        { speaker: 'Arka', cast: ['Arka', 'Naya'], role: 'developer', line: `Let us make the explanation specific: condition, evidence, cause, and technical action.` },
        { speaker: 'Dr. Joe', cast: ['Dr. Joe', 'Mira'], role: 'mentor', line: `Good ESP speaking turns technical findings into clear professional evidence.` }
      ],
      dialogueMissions: [
        { as: 'Rafi', prompt: `Report the evidence and possible cause using ${t2}.`, xp: 45 },
        { as: 'Mira', prompt: `Explain one pattern or data clue from the investigation.`, xp: 45 },
        { as: 'Arka', prompt: `Summarize the cause and recommend one next action.`, xp: 45 }
      ]
    },
    {
      id: 3,
      title: 'Team Decision',
      subtitle: 'Negotiating a solution and responsibilities',
      xp: 50,
      panels: [
        { speaker: 'Ken', cast: ['Ken', 'Mira', 'Rafi'], role: 'client', line: `We need a decision today. Which action should become the first priority?` },
        { speaker: 'Mira', cast: ['Mira', 'Naya'], role: 'female', line: `From the evidence, the priority should connect ${t4} with user impact.` },
        { speaker: 'Rafi', cast: ['Rafi', 'Arka'], role: 'developer', line: `I suggest we test the solution and prepare a short technical update.` },
        { speaker: 'Dr. Joe', cast: ['Dr. Joe', 'Ken', 'Arka'], role: 'mentor', line: `A professional decision includes reason, risk, responsibility, and timeline.` }
      ],
      dialogueMissions: [
        { as: 'Ken', prompt: `Ask the team to justify the priority and timeline.`, xp: 50 },
        { as: 'Mira', prompt: `Use evidence to support the team's decision.`, xp: 50 },
        { as: 'Rafi', prompt: `Recommend a test or action before the update is sent.`, xp: 50 }
      ]
    },
    {
      id: 4,
      title: 'Client Update',
      subtitle: 'Delivering a clear professional response',
      xp: 60,
      panels: [
        { speaker: 'Team', cast: ['Arka', 'Naya', 'Rafi', 'Mira'], role: 'bot', line: `We prepared the update: problem, evidence, solution, and benefit for the users.` },
        { speaker: 'Naya', cast: ['Naya', 'Ken'], role: 'female', line: `The message should sound polite, concise, and confident.` },
        { speaker: 'Ken', cast: ['Ken', 'Client'], role: 'client', line: `The client needs assurance that the team can manage ${t5} professionally.` },
        { speaker: 'Dr. Joe', cast: ['Dr. Joe', 'Arka', 'Naya', 'Rafi', 'Mira', 'Ken'], role: 'mentor', line: `Final dialogue mission: speak as one character and complete the professional update.` }
      ],
      dialogueMissions: [
        { as: 'Naya', prompt: `Give a polite client-facing update in simple English.`, xp: 60 },
        { as: 'Ken', prompt: `Assure the client about the next step and timeline.`, xp: 60 },
        { as: 'Dr. Joe', prompt: `Summarize the professional language strategy for this episode.`, xp: 60 }
      ]
    }
  ];
}

function getActiveSeries(ep = episode()) {
  const series = seriesForEpisode(ep);
  const idx = clamp(Number(state.selectedSeries || 0), 0, series.length - 1);
  return { series, active: series[idx], index: idx };
}

function renderMiniCharacterGroup(names, t, offset = 0) {
  const clean = (names || ['Arka']).slice(0, 5);
  return `<svg viewBox="0 0 180 82" class="mini-group" aria-hidden="true">
    <defs>
      <linearGradient id="miniSky_${Math.random().toString(36).slice(2)}" x1="0" x2="1"><stop offset="0" stop-color="${t.wash}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
    </defs>
    <rect width="180" height="82" rx="12" fill="${t.wash}"/>
    <rect x="7" y="7" width="166" height="36" rx="8" fill="#dbeafe" opacity=".95"/>
    <rect x="12" y="12" width="34" height="22" rx="3" fill="#0f172a"/><path d="M18 21h21M18 27h15" stroke="${t.accent}" stroke-width="2"/>
    <path d="M0 66 C38 48 92 84 180 53 V82 H0 Z" fill="${t.primary}" opacity=".18"/>
    ${clean.map((name, i) => {
      const x = 33 + i * 29;
      const p = CHARACTER_PROFILES[name] || CHARACTER_PROFILES.Arka;
      const female = p.role === 'female';
      const mentor = name === 'Dr. Joe';
      return `<g transform="translate(${x} 55)"><rect x="-14" y="5" width="28" height="26" rx="8" fill="${p.color}"/><path d="M-8 7 L0 26 L8 7" fill="${p.shirt}"/><circle cx="0" cy="-7" r="13" fill="#f7c59f" stroke="#1f2937" stroke-width="1.2"/><path d="M-13-8 C-11-25 11-26 14-9 C8-17 -8-17 -13-8" fill="${p.hair}"/>${female ? '<path d="M-14-3 C-21 10 -17 22 -8 27 C-10 14 -9 4 -4 0 Z" fill="#24111f"/>' : ''}${mentor ? '<circle cx="-5" cy="-6" r="4" fill="none" stroke="#111827"/><circle cx="5" cy="-6" r="4" fill="none" stroke="#111827"/>' : ''}<circle cx="-4" cy="-6" r="1.4"/><circle cx="5" cy="-6" r="1.4"/><path d="M-4 2 C-1 5 3 5 6 2" stroke="#111827" stroke-width="1.5" fill="none"/></g>`;
    }).join('')}
  </svg>`;
}

function renderMiniSeriesThumb(ep, series, active = false) {
  const t = sceneTheme(ep.week + series.id - 1);
  const panels = series.panels.slice(0, 4);
  return `<div class="series-thumb ${active ? 'active' : ''}">
    <div class="series-art-strip">
      ${panels.map((panel, i) => `<div class="mini-panel">${renderMiniCharacterGroup(panel.cast || [panel.speaker], t, i)}</div>`).join('')}
    </div>
    <span>Series ${series.id}</span>
  </div>`;
}

function renderDialogueMissions(series) {
  return `<div class="dialogue-missions">
    <div class="dialogue-head"><p class="eyebrow">Interactive Dialogue Mission</p><h3>Record as a character</h3></div>
    ${series.dialogueMissions.map((m, i) => `<button class="dialogue-mission-btn" type="button" data-dialogue-as="${sanitize(m.as)}" data-dialogue-prompt="${sanitize(m.prompt)}">
      <span class="mission-number">${i + 1}</span><div><strong>Speak as ${sanitize(m.as)}</strong><small>${sanitize(m.prompt)}</small></div><em>+${m.xp} XP</em>
    </button>`).join('')}
  </div>`;
}


let state = loadState();
let dbPromise;
let deferredPrompt;
let toastTimer;

function defaultState() {
  return {
    version: '1.5',
    currentUserId: null,
    activeView: 'home',
    selectedWeek: 1,
    selectedSeries: 0,
    selectedQuizWeek: 1,
    users: {},
    submissions: [],
    rejectedLecturers: [],
    classMeta: {
      courseTitle: 'English for Informatics through Interactive Digital Comics',
      semester: '16-Week Semester Course',
      lecturer: 'Dr. Joe',
      assessmentModel: 'Formative 60% and Summative 40%'
    },
    settings: {
      installedOnce: false,
      demoSeeded: false
    }
  };
}

function loadState() {
  const raw = localStorage.getItem(APP_KEY);
  if (raw) {
    try { return normalizeState(JSON.parse(raw)); } catch (error) { console.warn(error); }
  }
  for (const key of OLD_KEYS) {
    const oldRaw = localStorage.getItem(key);
    if (oldRaw) {
      try {
        const migrated = normalizeState(JSON.parse(oldRaw));
        migrated.version = '1.5';
        localStorage.setItem(APP_KEY, JSON.stringify(migrated));
        return migrated;
      } catch (error) { console.warn(error); }
    }
  }
  return defaultState();
}
function normalizeState(input) {
  const base = defaultState();
  const next = { ...base, ...input };
  next.users = next.users || {};
  next.submissions = Array.isArray(next.submissions) ? next.submissions : [];
  next.rejectedLecturers = Array.isArray(next.rejectedLecturers) ? next.rejectedLecturers : [];
  next.classMeta = { ...base.classMeta, ...(input.classMeta || {}) };
  next.settings = { ...base.settings, ...(input.settings || {}) };
  next.selectedSeries = Number.isFinite(Number(next.selectedSeries)) ? clamp(Number(next.selectedSeries), 0, 3) : 0;
  Object.values(next.users).forEach(user => {
    user.status = user.status || (user.role === 'lecturer' ? 'pending' : 'active');
    user.progress = normalizeProgress(user.progress);
  });
  return next;
}
function normalizeProgress(progress = {}) {
  return {
    xp: Number(progress.xp || 0),
    completedWeeks: progress.completedWeeks || {},
    quizzes: progress.quizzes || {},
    voiceIds: Array.isArray(progress.voiceIds) ? progress.voiceIds : [],
    words: progress.words || {},
    notes: progress.notes || {},
    reflections: progress.reflections || {},
    bossChallenges: progress.bossChallenges || {},
    missionStreak: Number(progress.missionStreak || 0)
  };
}
function saveState() { localStorage.setItem(APP_KEY, JSON.stringify(state)); }
function currentUser() { return state.users[state.currentUserId] || null; }
function progressOf(user = currentUser()) {
  if (!user) return normalizeProgress();
  user.progress = normalizeProgress(user.progress);
  return user.progress;
}
function allStudents() { return Object.values(state.users).filter(user => user.role === 'student'); }
function allLecturers() { return Object.values(state.users).filter(user => user.role === 'lecturer'); }
function pendingLecturers() { return allLecturers().filter(user => user.status === 'pending'); }
function completedCount(user = currentUser()) { return Object.keys(progressOf(user).completedWeeks || {}).filter(k => progressOf(user).completedWeeks[k]).length; }
function voiceCount(user = currentUser()) { return state.submissions.filter(sub => sub.userId === user?.id).length; }
function levelFromXp(xp) { return Math.max(1, Math.floor(Number(xp || 0) / 450) + 1); }
function addXp(points, user = currentUser()) {
  if (!user) return;
  progressOf(user).xp += points;
}
function episode(week = state.selectedWeek) { return COURSE.find(item => item.week === Number(week)) || COURSE[0]; }
function isDone(week, user = currentUser()) { return Boolean(progressOf(user).completedWeeks[week]); }
function hasWeeklyVoice(week, user = currentUser()) {
  return state.submissions.some(sub => sub.userId === user?.id && Number(sub.week) === Number(week));
}
function weeklyQuizPassed(week, user = currentUser()) {
  const quiz = progressOf(user).quizzes?.[week];
  return Boolean(quiz && Number(quiz.score) >= 70);
}
function updateWeekCompletion(week, user = currentUser()) {
  if (!user) return false;
  const p = progressOf(user);
  const ready = weeklyQuizPassed(week, user) && hasWeeklyVoice(week, user);
  if (ready && !p.completedWeeks[week]) {
    p.completedWeeks[week] = true;
    addXp(60, user);
    return true;
  }
  return false;
}
function earnedBadges(user = currentUser()) { return user ? BADGES.filter(badge => badge.test(user)) : []; }
function roleName(user = currentUser()) {
  if (!user) return 'Guest';
  if (user.role === 'admin') return 'Admin';
  if (user.role === 'lecturer') return user.status === 'approved' ? 'Lecturer' : 'Pending Lecturer';
  return `Student · Level ${levelFromXp(progressOf(user).xp)}`;
}

function ensureAdminUser() {
  const existing = Object.values(state.users).find(u => u.role === 'admin' && u.email === ADMIN_ID);
  if (existing) return existing;
  const admin = { id: 'admin_owner', role: 'admin', status: 'active', name: 'Admin', email: ADMIN_ID, pin: ADMIN_PIN, createdAt: new Date().toISOString(), progress: normalizeProgress() };
  state.users[admin.id] = admin;
  saveState();
  return admin;
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
function setAuthMessage(message, success = false) {
  const el = $('#authMessage');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('success', success);
}
function toggleAdminLoginMode() {
  const role = $('#loginRole')?.value;
  const label = $('#loginIdentityLabel');
  const email = $('#loginEmail');
  const note = $('#loginModeNote');
  if (!label || !email) return;
  const isAdmin = role === 'admin';
  label.hidden = isAdmin;
  email.required = !isAdmin;
  email.disabled = isAdmin;
  if (isAdmin) email.value = '';
  if (note) note.textContent = isAdmin
    ? 'Admin access uses only the private PIN. No Admin credential is displayed in the interface.'
    : 'Your class data is stored locally in this browser. Admin information is never displayed on this page.';
}
function setView(view) {
  state.activeView = view;
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function selectWeek(week, view = 'episodes') {
  const oldWeek = state.selectedWeek;
  state.selectedWeek = Number(week);
  if (oldWeek !== state.selectedWeek) state.selectedSeries = 0;
  if (view) state.activeView = view;
  saveState();
  renderApp();
}

function init() {
  $('#copyrightYear').textContent = new Date().getFullYear();
  $('#authYear').textContent = new Date().getFullYear();
  bindAuth();
  bindGlobalActions();
  registerPwa();
  if (currentUser()) {
    $('#authOverlay').classList.add('hidden');
    $('#appShell').removeAttribute('aria-hidden');
    renderApp();
  } else {
    $('#appShell').setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', init);

function bindAuth() {
  $$('.auth-tab').forEach(tab => tab.addEventListener('click', () => {
    $$('.auth-tab').forEach(btn => btn.classList.remove('active'));
    $$('.auth-form').forEach(form => form.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.auth;
    $(`#${target === 'login' ? 'loginForm' : target === 'register' ? 'registerForm' : 'lecturerForm'}`).classList.add('active');
    setAuthMessage('');
  }));

  $('#loginRole')?.addEventListener('change', toggleAdminLoginMode);
  toggleAdminLoginMode();

  $('#loginForm').addEventListener('submit', event => {
    event.preventDefault();
    const role = $('#loginRole').value;
    const identity = $('#loginEmail').value.trim();
    const pin = $('#loginPin').value;
    let user = null;
    if (role === 'admin') {
      if (pin !== ADMIN_PIN) return setAuthMessage('Admin login failed. Please check the private PIN.');
      user = ensureAdminUser();
    } else {
      user = Object.values(state.users).find(item => item.role === role && String(item.email).toLowerCase() === identity.toLowerCase() && item.pin === pin);
      if (!user) return setAuthMessage('Login failed. Check your role, ID, and PIN.');
      if (user.role === 'lecturer' && user.status !== 'approved') return setAuthMessage('Lecturer access is waiting for Admin verification.');
    }
    state.currentUserId = user.id;
    state.activeView = user.role === 'admin' ? 'admin' : 'home';
    saveState();
    $('#authOverlay').classList.add('hidden');
    $('#appShell').removeAttribute('aria-hidden');
    $('#loginForm').reset();
    toggleAdminLoginMode();
    renderApp();
  });

  $('#registerForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = $('#regEmail').value.trim();
    if (Object.values(state.users).some(user => user.email.toLowerCase() === email.toLowerCase())) return setAuthMessage('This email or ID is already registered.');
    const user = {
      id: uid('student'), role: 'student', status: 'active', name: $('#regName').value.trim(), email,
      className: $('#regClass').value.trim(), pin: $('#regPin').value, createdAt: new Date().toISOString(), progress: normalizeProgress()
    };
    state.users[user.id] = user;
    state.currentUserId = user.id;
    state.activeView = 'home';
    saveState();
    $('#authOverlay').classList.add('hidden');
    $('#appShell').removeAttribute('aria-hidden');
    $('#registerForm').reset();
    renderApp();
  });

  $('#lecturerForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = $('#lecEmail').value.trim();
    if (Object.values(state.users).some(user => user.email.toLowerCase() === email.toLowerCase())) return setAuthMessage('This email or ID is already registered.');
    const lecturer = {
      id: uid('lecturer'), role: 'lecturer', status: 'pending', name: $('#lecName').value.trim(), email,
      program: $('#lecProgram').value.trim(), pin: $('#lecPin').value, createdAt: new Date().toISOString(), progress: normalizeProgress()
    };
    state.users[lecturer.id] = lecturer;
    saveState();
    $('#lecturerForm').reset();
    setAuthMessage('Verification request sent. Please wait for Admin approval.', true);
  });

}

function bindGlobalActions() {
  $('#logoutBtn').addEventListener('click', () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    state.currentUserId = null;
    state.activeView = 'home';
    saveState();
    $('#authOverlay').classList.remove('hidden');
    $('#appShell').setAttribute('aria-hidden', 'true');
    setAuthMessage('');
  });
  $('#exportQuickBtn').addEventListener('click', exportData);
}

function seedDemoClass() {
  ensureAdminUser();
  const lecturer = {
    id: uid('lecturer'), role: 'lecturer', status: 'approved', name: 'Dr. Joe', email: 'lecturer01', program: 'English for Informatics', pin: '2026', createdAt: new Date().toISOString(), progress: normalizeProgress()
  };
  state.users[lecturer.id] = lecturer;
  ['Andi Wijaya', 'Siti Nurhaliza', 'Budi Santoso', 'Raka Pratama', 'Aulia Rahma'].forEach((name, index) => {
    const user = { id: uid('student'), role: 'student', status: 'active', name, email: `student0${index + 1}`, className: 'Informatics A', pin: '1234', createdAt: new Date().toISOString(), progress: normalizeProgress() };
    const max = Math.min(16, index + 2);
    for (let week = 1; week <= max; week++) {
      user.progress.completedWeeks[week] = true;
      user.progress.quizzes[week] = { score: 70 + index * 4 + week, correct: 2, total: 2, submittedAt: new Date().toISOString() };
    }
    user.progress.xp = 320 + index * 190;
    state.users[user.id] = user;
  });
  state.currentUserId = lecturer.id;
  state.activeView = 'dashboard';
  state.settings.demoSeeded = true;
  saveState();
  $('#authOverlay').classList.add('hidden');
  $('#appShell').removeAttribute('aria-hidden');
  renderApp();
}

function navForRole(role) {
  const allowed = {
    student: ['home','episodes','vocabulary','voice','coach','assessment','portfolio','leaderboard','settings'],
    lecturer: ['home','episodes','vocabulary','voice','coach','assessment','portfolio','leaderboard','dashboard','settings'],
    admin: ['home','episodes','vocabulary','voice','coach','assessment','portfolio','leaderboard','dashboard','admin','settings']
  };
  return NAV_ITEMS.filter(item => (allowed[role] || allowed.student).includes(item[0]));
}
function renderNav() {
  const nav = $('#navList');
  const user = currentUser();
  nav.innerHTML = navForRole(user.role).map(([id, icon, label]) => `<button class="nav-btn" type="button" data-view="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`).join('');
  nav.onclick = event => {
    const button = event.target.closest('.nav-btn');
    if (!button) return;
    setView(button.dataset.view);
  };
}
function renderApp() {
  const user = currentUser();
  if (!user) return;
  if (user.role === 'lecturer' && user.status !== 'approved') {
    state.currentUserId = null;
    saveState();
    $('#authOverlay').classList.remove('hidden');
    setAuthMessage('Lecturer access is waiting for Admin verification.');
    return;
  }
  renderNav();
  const allowed = navForRole(user.role).map(item => item[0]);
  if (!allowed.includes(state.activeView)) state.activeView = 'home';
  $$('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === state.activeView));
  $('#pageTitle').textContent = NAV_ITEMS.find(item => item[0] === state.activeView)?.[2] || 'Home';
  $('#roleKicker').textContent = roleName(user);
  $('#userPill').textContent = `${user.name} · ${roleName(user)}`;
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
    admin: renderAdmin,
    settings: renderSettings
  };
  $('#viewRoot').innerHTML = (routes[state.activeView] || renderHome)();
  bindView(state.activeView);
}

function renderHome() {
  const user = currentUser();
  const p = progressOf(user);
  const done = completedCount(user);
  const next = COURSE.find(ep => !p.completedWeeks[ep.week]) || COURSE[COURSE.length - 1];
  const badges = earnedBadges(user);
  return `
    <section class="hero">
      <div class="card dark">
        <p class="eyebrow">Semester-based ESP comic course</p>
        <h2 class="hero-title">Sprint to Launch:<br><span>English Missions</span><br>in a Tech Startup</h2>
        <p>Learn English for Informatics through clickable comic panels, listening dialogue, speaking missions, local AI-style feedback, formative quizzes, and a semester portfolio.</p>
        <div class="hero-actions">
          <button class="primary-btn" data-go-week="${next.week}" data-go="episodes">Continue Week ${next.week}</button>
          <button class="ghost-btn" data-go-week="${next.week}" data-go="voice">Record Voice Task</button>
          <button class="ghost-btn" data-go="assessment">Open Assessment</button>
        </div>
        <div class="stat-row">
          <div class="stat"><strong>${done}/16</strong><span>Episodes completed</span></div>
          <div class="stat"><strong>${p.xp}</strong><span>XP collected</span></div>
          <div class="stat"><strong>${badges.length}</strong><span>Badges earned</span></div>
          <div class="stat"><strong>${voiceCount(user)}</strong><span>Voice submissions</span></div>
        </div>
      </div>
      <div class="card">
        <h3>Next Mission</h3>
        <p class="eyebrow">Week ${next.week}</p>
        <h2>${sanitize(next.title)}</h2>
        <p><strong>ESP Focus:</strong> ${sanitize(next.focus)}</p>
        <p><strong>Task:</strong> ${sanitize(next.task)}</p>
        <div class="chip-list">${next.terms.map(term => `<span class="chip">${sanitize(term)}</span>`).join('')}</div>
        <div class="hero-actions">
          <button class="primary-btn" data-go-week="${next.week}" data-go="episodes">Open Comic</button>
          <button class="ghost-btn" data-speak="${sanitize(next.panels.map(p => `${p.speaker} says: ${p.line}`).join(' '))}">Listen Episode</button>
        </div>
      </div>
    </section>
    <section class="grid three">
      <div class="card">
        <h3>Integrated Learning Path</h3>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.round(done / 16 * 100)}%"></div></div>
        <p>${Math.round(done / 16 * 100)}% completed. Every episode connects comic comprehension, listening, speaking, vocabulary, quiz, and portfolio.</p>
      </div>
      <div class="card">
        <h3>Badges</h3>
        <div class="badge-list">${BADGES.map(b => `<span class="badge ${badges.includes(b) ? 'gold' : 'locked'}">${sanitize(b.name)}</span>`).join('')}</div>
      </div>
      <div class="card">
        <h3>Course Identity</h3>
        <p><strong>${sanitize(state.classMeta.courseTitle)}</strong></p>
        <p>${sanitize(state.classMeta.semester)}<br>${sanitize(state.classMeta.assessmentModel)}</p>
      </div>
    </section>
    <section class="card" style="margin-top:18px">
      <h3>16-Week Learning Journey</h3>
      ${renderCourseTable()}
    </section>`;
}
function renderCourseTable() {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Week</th><th>Episode</th><th>ESP Focus</th><th>Main Task</th><th>Assessment</th><th>Status</th></tr></thead><tbody>${COURSE.map(ep => `<tr><td>${ep.week}</td><td><button class="link-btn" data-go="episodes" data-go-week="${ep.week}">${sanitize(ep.title)}</button></td><td>${sanitize(ep.focus)}</td><td>${sanitize(ep.task)}</td><td>${sanitize(ep.assessment)}</td><td>${isDone(ep.week) ? 'Completed' : 'Open'}</td></tr>`).join('')}</tbody></table></div>`;
}

function sceneTheme(week) {
  const themes = [
    ['#0f766e','#22c55e','#e0f2fe'], ['#1d4ed8','#ef4444','#e0ecff'], ['#7c3aed','#f59e0b','#f4ecff'], ['#0e7490','#38bdf8','#e7faff'],
    ['#0369a1','#22d3ee','#e0f7ff'], ['#b91c1c','#f97316','#fff0e7'], ['#047857','#84cc16','#ecfdf3'], ['#4338ca','#eab308','#f5f3ff'],
    ['#0f172a','#06b6d4','#ecfeff'], ['#be123c','#fb7185','#fff1f2'], ['#6d28d9','#14b8a6','#f0fdfa'], ['#15803d','#65a30d','#f0fdf4'],
    ['#c2410c','#facc15','#fff7ed'], ['#1e40af','#a855f7','#eef2ff'], ['#334155','#0ea5e9','#f8fafc'], ['#0f766e','#f59e0b','#fffbeb']
  ];
  const [primary, accent, wash] = themes[(Number(week) - 1) % themes.length];
  return { primary, accent, wash };
}
function renderWeekThumbnail(ep) {
  const t = sceneTheme(ep.week);
  const y = ep.week % 2 ? 20 : 26;
  return `<svg class="week-thumb" viewBox="0 0 96 64" role="img" aria-label="Week ${ep.week} comic thumbnail">
    <rect width="96" height="64" rx="14" fill="${t.wash}"/>
    <rect x="6" y="8" width="84" height="48" rx="10" fill="white" opacity=".72"/>
    <path d="M0 54 C24 42 49 66 96 40 L96 64 L0 64 Z" fill="${t.primary}" opacity=".2"/>
    ${renderSceneObject(ep.week, t, true)}
    <circle cx="22" cy="${y}" r="10" fill="#f8caa7" stroke="#1f2937" stroke-width="1.5"/>
    <path d="M12 ${y-3} q10-15 20 0 v-7 q-11-8-22 0z" fill="#111827"/>
    <rect x="12" y="${y+9}" width="21" height="23" rx="8" fill="${t.primary}"/>
    <text x="78" y="18" text-anchor="middle" font-size="11" font-weight="900" fill="${t.primary}">W${ep.week}</text>
  </svg>`;
}
function renderSceneObject(week, t, compact = false) {
  const k = Number(week);
  const s = compact ? .62 : 1;
  const x = compact ? 44 : 232;
  const y = compact ? 23 : 74;
  switch (k) {
    case 1: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-34" y="-18" width="70" height="40" rx="6" fill="#0f172a"/><rect x="-28" y="-12" width="58" height="25" rx="3" fill="#0ea5e9" opacity=".75"/><path d="M-23 0h18M-23 7h34M-23-7h44" stroke="#fff" stroke-width="3" opacity=".75"/></g>`;
    case 2: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-42" y="-22" width="84" height="46" rx="7" fill="#111827"/><rect x="-34" y="-14" width="68" height="30" rx="4" fill="#1f2937"/><path d="M-22-2h17M-22 7h40M7-2h13" stroke="#ef4444" stroke-width="3"/><text x="0" y="-29" font-size="15" text-anchor="middle" fill="#ef4444" font-weight="900">404</text></g>`;
    case 3: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-40" y="-24" width="80" height="50" rx="9" fill="#ffffff" stroke="${t.primary}" stroke-width="4"/><rect x="-29" y="-13" width="58" height="10" rx="5" fill="${t.primary}" opacity=".75"/><circle cx="-21" cy="12" r="7" fill="${t.accent}"/><rect x="-9" y="7" width="30" height="11" rx="5" fill="#e5e7eb"/></g>`;
    case 4: return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-20" rx="34" ry="11" fill="${t.primary}"/><rect x="-34" y="-20" width="68" height="42" fill="${t.primary}" opacity=".9"/><ellipse cx="0" cy="22" rx="34" ry="11" fill="${t.accent}"/><path d="M-25-5h50M-25 9h50" stroke="#fff" stroke-width="3" opacity=".65"/></g>`;
    case 5: return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="-32" cy="0" r="14" fill="${t.primary}"/><circle cx="32" cy="0" r="14" fill="${t.accent}"/><circle cx="0" cy="-22" r="14" fill="#0f172a"/><path d="M-18-5 L-5-15M18-5 L5-15M-16 3h32" stroke="#334155" stroke-width="5" stroke-linecap="round"/><text x="0" y="35" font-size="13" text-anchor="middle" fill="#0f172a" font-weight="900">API</text></g>`;
    case 6: return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-34 L36-18 V8 C36 27 18 37 0 44 C-18 37-36 27-36 8 V-18 Z" fill="${t.primary}"/><path d="M-15 4 L-4 16 L18-12" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34" cy="-27" r="12" fill="${t.accent}"/><text x="34" y="-22" text-anchor="middle" fill="#fff" font-size="17" font-weight="900">!</text></g>`;
    case 7: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-45" y="-28" width="90" height="56" rx="8" fill="#fff" stroke="${t.primary}" stroke-width="4"/><path d="M-15-28v56M15-28v56M-45-8h90M-45 11h90" stroke="#cbd5e1" stroke-width="3"/><rect x="-37" y="-21" width="17" height="10" rx="3" fill="${t.accent}"/><rect x="-7" y="-1" width="17" height="10" rx="3" fill="${t.primary}"/><rect x="22" y="15" width="17" height="10" rx="3" fill="#f43f5e"/></g>`;
    case 8: return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-44 25 h88 l-12-42 h-64z" fill="#1e293b"/><circle cx="0" cy="-21" r="26" fill="${t.accent}"/><path d="M-16-12h32M-10 0h20" stroke="#111827" stroke-width="6"/><text x="0" y="42" text-anchor="middle" font-size="13" font-weight="900" fill="${t.primary}">BOSS</text></g>`;
    case 9: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-44" y="-30" width="88" height="58" rx="8" fill="#fff" stroke="${t.primary}" stroke-width="4"/><path d="M-32 16 V-4M-12 16v-24M8 16v-35M28 16v-14" stroke="${t.accent}" stroke-width="9" stroke-linecap="round"/><path d="M-35-18 C-15-2 0-30 35-8" fill="none" stroke="#111827" stroke-width="4"/></g>`;
    case 10: return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="32" fill="${t.primary}"/><path d="M-23 4 a23 23 0 0 1 46 0" fill="none" stroke="#fff" stroke-width="8"/><rect x="22" y="5" width="21" height="14" rx="5" fill="${t.accent}"/><path d="M-12 31h24" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`;
    case 11: return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-31 2 C-38-28-4-42 4-22 C17-41 48-20 30 8 C41 24 18 43 0 27 C-22 43-46 22-31 2Z" fill="${t.primary}"/><circle cx="-13" cy="-4" r="4" fill="#fff"/><circle cx="13" cy="-4" r="4" fill="#fff"/><path d="M-20 14h40" stroke="${t.accent}" stroke-width="5" stroke-linecap="round"/></g>`;
    case 12: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-38" y="-31" width="76" height="62" rx="8" fill="#fff" stroke="${t.primary}" stroke-width="4"/><path d="M-22-14l8 8 17-20M-22 5l8 8 17-20M10-12h18M10 7h18" fill="none" stroke="${t.accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    case 13: return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-45 28h90v-18c-26-16-59-16-90 0z" fill="${t.primary}"/><rect x="-30" y="-32" width="60" height="34" rx="5" fill="#fff" stroke="${t.accent}" stroke-width="4"/><path d="M-17-12h34M-17 0h20" stroke="#111827" stroke-width="4"/><path d="M0 28v-24" stroke="#fff" stroke-width="5"/></g>`;
    case 14: return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="38" fill="${t.primary}"/><path d="M-23-13c13 1 13-9 27-7 9 2 16 8 22 18-13-3-15 7-25 7-11 0-17-8-24-18zM-17 17c10-2 15 2 23 8" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M-38 0h76M0-38c11 19 11 56 0 76" stroke="#fff" stroke-width="3" opacity=".45"/></g>`;
    case 15: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-44" y="-28" width="88" height="56" rx="8" fill="#fff" stroke="${t.primary}" stroke-width="4"/><rect x="-33" y="-18" width="22" height="14" rx="3" fill="${t.accent}"/><rect x="-5" y="-18" width="27" height="5" rx="2" fill="#94a3b8"/><rect x="-33" y="6" width="49" height="5" rx="2" fill="#94a3b8"/><path d="M24 15l12-7-12-7z" fill="${t.primary}"/></g>`;
    default: return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-45" y="-22" width="90" height="44" rx="10" fill="${t.primary}"/><rect x="-34" y="-13" width="68" height="26" rx="5" fill="#fff" opacity=".9"/><path d="M-21-2h42M-14 8h28" stroke="${t.accent}" stroke-width="5"/><path d="M-58 34h116" stroke="#1f2937" stroke-width="8" stroke-linecap="round"/></g>`;
  }
}
function renderCharacterSvg(panel, index, t) {
  const role = panel.role || 'developer';
  const isFemale = role === 'female';
  const isMentor = role === 'mentor';
  const isClient = role === 'client';
  const isBot = role === 'bot';
  const jacket = isMentor ? '#0f172a' : isFemale ? '#7c2d12' : isClient ? '#9a3412' : isBot ? '#0f766e' : '#0f3b5f';
  const shirt = isMentor ? '#e2e8f0' : isFemale ? '#f59e0b' : isClient ? '#fed7aa' : isBot ? '#ccfbf1' : '#38bdf8';
  const hair = isFemale ? '#24111f' : isMentor ? '#111827' : '#0f172a';
  const x = index % 2 === 0 ? 40 : 276;
  const flip = index % 2 === 0 ? 1 : -1;
  if (isBot) {
    return `<g transform="translate(${x} 119) scale(${flip} 1)"><rect x="-28" y="-54" width="56" height="44" rx="12" fill="#ccfbf1" stroke="#0f766e" stroke-width="4"/><circle cx="-11" cy="-33" r="5" fill="#0f766e"/><circle cx="11" cy="-33" r="5" fill="#0f766e"/><path d="M-15-18h30" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/><rect x="-34" y="-9" width="68" height="58" rx="18" fill="${jacket}"/><path d="M-33 8h66" stroke="#99f6e4" stroke-width="5" opacity=".5"/></g>`;
  }
  return `<g transform="translate(${x} 117) scale(${flip} 1)">
    <path d="M-38 50 C-30 6 30 6 38 50 Z" fill="${jacket}"/>
    <path d="M-18 15 L0 42 L18 15" fill="${shirt}" opacity=".9"/>
    <circle cx="0" cy="-20" r="28" fill="#f7c59f" stroke="#1f2937" stroke-width="2"/>
    <path d="M-29-21 C-26-52 18-55 29-24 C20-36-11-37-29-21 Z" fill="${hair}"/>
    ${isFemale ? '<path d="M-31-15 C-49 10-32 33-20 43 C-24 17-20 3-10-5 Z" fill="#24111f"/><path d="M28-14 C45 8 33 33 17 43 C21 16 18 2 8-5 Z" fill="#24111f"/>' : ''}
    <circle cx="-9" cy="-17" r="3.2" fill="#111827"/><circle cx="9" cy="-17" r="3.2" fill="#111827"/>
    ${isMentor ? '<circle cx="-9" cy="-17" r="8" fill="none" stroke="#111827" stroke-width="2"/><circle cx="9" cy="-17" r="8" fill="none" stroke="#111827" stroke-width="2"/><path d="M-1-17h2" stroke="#111827" stroke-width="2"/><path d="M-7 3 C-2 7 5 7 10 3" stroke="#111827" stroke-width="3" stroke-linecap="round"/>' : '<path d="M-9 3 C-3 8 4 8 10 3" stroke="#111827" stroke-width="3" fill="none" stroke-linecap="round"/>'}
    <path d="M-44 26 C-66 13-65-9-50-13" stroke="${jacket}" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M44 26 C66 13 65-9 50-13" stroke="${jacket}" stroke-width="12" stroke-linecap="round" fill="none"/>
  </g>`;
}
function renderCharacterAvatar(name, x, y, scale = 1, flip = 1) {
  const profile = CHARACTER_PROFILES[name] || CHARACTER_PROFILES.Arka;
  const isFemale = profile.role === 'female';
  const isMentor = name === 'Dr. Joe';
  const isBot = name === 'Team';
  if (isBot) {
    return `<g transform="translate(${x} ${y}) scale(${scale * flip} ${scale})">
      <rect x="-25" y="-58" width="50" height="42" rx="12" fill="#d1fae5" stroke="#0f766e" stroke-width="4"/>
      <circle cx="-9" cy="-37" r="4" fill="#0f766e"/><circle cx="9" cy="-37" r="4" fill="#0f766e"/>
      <path d="M-13-24h26" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/>
      <path d="M-37 67 C-33 15 33 15 37 67 Z" fill="${profile.color}"/>
      <path d="M-28 28 h56" stroke="#99f6e4" stroke-width="7" opacity=".7"/>
    </g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${scale * flip} ${scale})">
    <path d="M-46 76 C-41 22 41 22 46 76 Z" fill="${profile.color}" stroke="#111827" stroke-width="1.8"/>
    <path d="M-22 21 L0 63 L22 21" fill="${profile.shirt}" opacity=".98"/>
    <path d="M-51 46 C-74 28 -70 2 -50 -7" stroke="${profile.color}" stroke-width="13" stroke-linecap="round" fill="none"/>
    <path d="M51 46 C73 29 70 4 50 -7" stroke="${profile.color}" stroke-width="13" stroke-linecap="round" fill="none"/>
    <circle cx="0" cy="-19" r="31" fill="#f7c59f" stroke="#1f2937" stroke-width="2.2"/>
    <path d="M-31-21 C-30-58 22-59 33-24 C19-40 -12-42 -31-21 Z" fill="${profile.hair}"/>
    ${isFemale ? '<path d="M-34-13 C-55 13 -38 48 -22 60 C-27 33 -24 9 -10-4 Z" fill="#24111f"/><path d="M32-12 C51 12 37 47 18 60 C24 32 21 8 8-4 Z" fill="#24111f"/>' : ''}
    <circle cx="-10" cy="-18" r="3.4" fill="#111827"/><circle cx="10" cy="-18" r="3.4" fill="#111827"/>
    ${isMentor || name === 'Rafi' || name === 'Naya' || name === 'Mira' ? '<circle cx="-10" cy="-18" r="8" fill="none" stroke="#111827" stroke-width="2"/><circle cx="10" cy="-18" r="8" fill="none" stroke="#111827" stroke-width="2"/><path d="M-2-18h4" stroke="#111827" stroke-width="2"/>' : ''}
    <path d="M-10 6 C-4 12 5 12 11 6" stroke="#111827" stroke-width="3" fill="none" stroke-linecap="round"/>
    <text x="0" y="94" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a" transform="scale(${flip} 1)">${sanitize(name)}</text>
  </g>`;
}

function renderCharacterGroup(panel, index, t) {
  const cast = (panel.cast?.length ? panel.cast : [panel.speaker]).slice(0, 6);
  const layouts = {
    1: [[320,260,1.2,1]],
    2: [[220,258,1.12,1],[420,258,1.12,-1]],
    3: [[168,258,1.0,1],[320,252,1.12,1],[472,258,1.0,-1]],
    4: [[126,260,.9,1],[258,255,1.0,1],[386,255,1.0,-1],[520,260,.9,-1]],
    5: [[96,262,.78,1],[205,258,.88,1],[320,252,1.0,1],[435,258,.88,-1],[545,262,.78,-1]],
    6: [[72,264,.72,1],[172,260,.8,1],[277,255,.9,1],[380,255,.9,-1],[486,260,.8,-1],[580,264,.72,-1]]
  };
  const positions = layouts[cast.length] || layouts[3];
  return cast.map((name, i) => renderCharacterAvatar(name, ...(positions[i] || [100 + i*86, 260, .82, 1]))).join('');
}

function panelCodeLines(ep, index, t) {
  const snippets = {
    1: ['team.role = "informatics";', 'introduce(goal);', 'commit("first sprint");'],
    2: ['if (password == null) {', ' return "Invalid password";', '} // debug auth'],
    3: ['button.place("top-right");', 'userFlow.review();', 'submit.action();'],
    4: ['users.id -> orders.user_id', 'SELECT role, email FROM users;', 'PRIMARY KEY(id);'],
    5: ['POST /api/login', '{ email, password }', 'return token;'],
    6: ['alert: suspicious_login', 'enable 2FA();', 'block(ip_address);'],
    7: ['sprint.review();', 'blockers.list();', 'nextSprint.plan();'],
    8: ['priority = risk.high', 'recommend(solution);', 'timeline.update();'],
    9: ['activeUsers += 18%', 'trend.compare(week);', 'insight.report();'],
    10: ['try { app.open(); }', 'catch(crash) { log(); }', 'support.followUp();'],
    11: ['AI.feature = responsible', 'checkBias();', 'protectPrivacy();'],
    12: ['testCase.run();', 'severity = high;', 'bug.fix();'],
    13: ['pitch(problem, solution)', 'value.proposition();', 'demo.start();'],
    14: ['globalDemo.qna();', 'clarify(request);', 'respondPolitely();'],
    15: ['slides.prepare();', 'speaker.notes();', 'launch.ready();'],
    16: ['product.launch();', 'reflect(progress);', 'portfolio.submit();']
  };
  return (snippets[ep.week] || snippets[1]).map((line, i) => `<text x="430" y="${76 + i * 24}" font-size="14" fill="${i === index % 3 ? t.accent : '#93c5fd'}" font-family="monospace" font-weight="800">${sanitize(line)}</text>`).join('');
}

function renderOfficeBackground(ep, t, index) {
  const windowColor = index % 2 ? '#dbeafe' : '#e0f2fe';
  return `<rect width="640" height="400" rx="28" fill="${t.wash}"/>
    <rect width="640" height="400" rx="28" fill="url(#halftone_${ep.week}_${index})" opacity=".36"/>
    <rect x="24" y="28" width="592" height="214" rx="18" fill="#dcecff" opacity=".72"/>
    <rect x="42" y="45" width="120" height="74" rx="8" fill="${windowColor}" stroke="#94a3b8" opacity=".9"/>
    <rect x="177" y="45" width="120" height="74" rx="8" fill="${windowColor}" stroke="#94a3b8" opacity=".9"/>
    <rect x="42" y="134" width="255" height="65" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
    <path d="M56 166h215M56 182h152M56 150h88" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <rect x="382" y="44" width="214" height="118" rx="14" fill="#0f172a" stroke="#334155" stroke-width="5"/>
    <rect x="398" y="59" width="182" height="88" rx="7" fill="#111827"/>
    ${panelCodeLines(ep, index, t)}
    <rect x="88" y="290" width="468" height="54" rx="18" fill="#1f2937" opacity=".95"/>
    <rect x="116" y="268" width="144" height="36" rx="10" fill="#334155"/><rect x="292" y="263" width="138" height="41" rx="10" fill="#334155"/>
    <path d="M0 336 C135 294 270 370 418 321 C512 289 589 315 640 292 V400 H0 Z" fill="${t.primary}" opacity=".16"/>`;
}

function renderPanelIllustration(panel, index, ep, series) {
  const t = sceneTheme(ep.week + ((series?.id || 1) - 1));
  const id = `comicGradient_${ep.week}_${series?.id || 1}_${index}`;
  const speaker = panel.speaker || 'Team';
  return `<svg class="panel-art real-comic-art" viewBox="0 0 640 400" role="img" aria-label="Illustrated comic panel ${index + 1} for Week ${ep.week}">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.wash}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
      <pattern id="halftone_${ep.week}_${index}" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#0f172a" opacity=".10"/></pattern>
      <filter id="comicShadow_${ep.week}_${index}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="#0f172a" flood-opacity=".20"/></filter>
    </defs>
    <rect width="640" height="400" rx="28" fill="url(#${id})"/>
    ${renderOfficeBackground(ep, t, index)}
    <g filter="url(#comicShadow_${ep.week}_${index})">${renderCharacterGroup(panel, index, t)}</g>
    <path d="M34 28 h250 q18 0 18 18 v88 q0 18-18 18 h-118 l-32 28 8-28 H34 q-18 0-18-18 V46 q0-18 18-18z" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <text x="52" y="60" font-size="20" font-weight="950" fill="#0f172a">${sanitize(speaker)}</text>
    <foreignObject x="52" y="72" width="220" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.16;color:#0f172a;font-weight:650;">${sanitize(panel.line).slice(0, 150)}</div></foreignObject>
    <rect x="20" y="354" width="154" height="30" rx="15" fill="#0f172a" opacity=".94"/>
    <text x="97" y="375" text-anchor="middle" font-size="14" fill="#fff" font-weight="900">Series ${series?.id || 1} · Panel ${index + 1}</text>
    <rect x="501" y="346" width="118" height="38" rx="19" fill="${t.primary}"/><text x="560" y="371" text-anchor="middle" font-size="14" fill="#fff" font-weight="950">${sanitize(ep.scene)}</text>
  </svg>`;
}

function renderWeeklyRequirements(ep) {
  const quiz = progressOf().quizzes?.[ep.week];
  const voice = hasWeeklyVoice(ep.week);
  return `<div class="requirements-box">
    <strong>Weekly completion requirements</strong>
    <div class="requirement-row ${quiz?.score >= 70 ? 'done' : ''}"><span>${quiz?.score >= 70 ? '✓' : '1'}</span>Quiz mission score at least 70</div>
    <div class="requirement-row ${voice ? 'done' : ''}"><span>${voice ? '✓' : '2'}</span>One saved voice response in Speaking Portfolio</div>
  </div>`;
}

function renderEpisodes() {
  const ep = episode();
  const p = progressOf();
  const { series, active, index } = getActiveSeries(ep);
  const fullText = series.flatMap(s => s.panels.map(p => `${p.speaker}: ${p.line}`)).join(' ');
  const seriesText = active.panels.map(p => `${p.speaker}: ${p.line}`).join(' ');
  return `
    <section class="episode-layout expanded-series-layout">
      <aside class="card episode-picker-card">
        <h3>Comic Episodes</h3>
        <p class="mini">Each week contains four illustrated comic series. Students must listen, practice, record voice responses, and complete the quiz before the week is counted as completed.</p>
        <div class="week-list">${COURSE.map(item => `<button class="week-btn illustrated ${item.week === ep.week ? 'active' : ''}" type="button" data-week="${item.week}"><div class="week-art">${renderWeekThumbnail(item)}</div><div class="week-copy"><strong>Week ${item.week}<span>${p.completedWeeks[item.week] ? '✓' : ''}</span></strong><span>${sanitize(item.title)}</span><small>4 story series · all characters integrated</small></div></button>`).join('')}</div>
      </aside>
      <main class="grid">
        <div class="card comic-episode-card premium-series-card">
          <div class="comic-top">
            <div>
              <p class="eyebrow">Week ${ep.week} · ${sanitize(ep.scene)} · 4 comic story series</p>
              <h2>${sanitize(ep.title)}</h2>
              <p><strong>ESP Focus:</strong> ${sanitize(ep.focus)}</p>
            </div>
            <div class="hero-actions">
              <button class="ghost-btn" data-speak="${sanitize(fullText)}">▶ Listen All Series</button>
              <button class="ghost-btn" data-speak="${sanitize(seriesText)}">▶ Listen Selected Series</button>
              <span class="status-pill ${isDone(ep.week) ? 'done' : 'locked'}">${isDone(ep.week) ? 'Completed' : 'Complete by quiz + voice'}</span>
            </div>
          </div>
          <div class="series-carousel" aria-label="Comic series selector">
            ${series.map((s, i) => `<button class="series-card ${i === index ? 'active' : ''}" type="button" data-series="${i}">
              ${renderMiniSeriesThumb(ep, s, i === index)}
              <div><strong>Series ${s.id}: ${sanitize(s.title)}</strong><small>${sanitize(s.subtitle)} · ${s.panels.length} illustrated panels</small></div>
              <span class="play-dot">▶</span>
            </button>`).join('')}
          </div>
          <div class="active-series-title">
            <div><p class="eyebrow">Series ${active.id}</p><h3>${sanitize(active.title)}</h3><p>${sanitize(active.subtitle)}</p></div>
            <span class="xp-pill">+${active.xp} XP story mission</span>
          </div>
          <div class="comic-stage illustrated-comic-stage series-comic-stage">
            ${active.panels.map((panel, i) => renderComicPanel(panel, i, ep, active)).join('')}
          </div>
        </div>
        <div class="mission-banner series-mission-banner">
          <div class="card mission-card">
            <p class="eyebrow">Mission Task</p>
            <h2>${sanitize(ep.task)}</h2>
            <p>Complete the selected comic series by listening to the dialogue, practicing one role, recording your response, and submitting the weekly gamified quiz.</p>
            <div class="cast-strip"><strong>Characters in this week:</strong>${['Arka','Naya','Rafi','Mira','Ken','Dr. Joe'].map(name => `<span>${sanitize(name)}</span>`).join('')}</div>
            <div class="chip-list">${ep.terms.map(term => `<span class="chip">${sanitize(term)}</span>`).join('')}</div>
            ${renderDialogueMissions(active)}
            <div class="quest-mini-row">
              <span>Listen Dialogue</span><span>Record Voice Mission</span><span>Submit Quiz</span><span>Unlock Boss XP</span>
            </div>
            ${renderWeeklyRequirements(ep)}
            <div class="hero-actions">
              <button class="primary-btn" data-go="assessment" data-go-week="${ep.week}">Open Gamified Quiz</button>
              <button class="ghost-btn" data-go="vocabulary" data-go-week="${ep.week}">Study Vocabulary</button>
              <button class="ghost-btn" data-go="coach" data-go-week="${ep.week}">Open AI Coach</button>
            </div>
          </div>
          ${renderRecorder('ep', ep.week, `Series ${active.id} Voice Mission`)}
        </div>
        <section class="grid two">
          <div class="card">
            <h3>Vocabulary in Context</h3>
            ${ep.terms.map(term => `<div class="quiz-question"><strong>${sanitize(titleCase(term))}</strong><p>${sanitize(TERM_DEFINITIONS[term] || 'A key term in this informatics communication scenario.')}</p><button class="ghost-btn" data-speak="${sanitize(`${term}. ${TERM_DEFINITIONS[term] || ''}`)}">Listen Term</button></div>`).join('')}
          </div>
          <div class="card">
            <h3>Reflection Note</h3>
            <label>What professional expression did you learn from Series ${active.id}?
              <textarea id="episodeNote">${sanitize(progressOf().notes[ep.week] || '')}</textarea>
            </label>
            <button class="primary-btn" id="saveEpisodeNote">Save Reflection</button>
          </div>
        </section>
      </main>
    </section>`;
}
function renderComicPanel(panel, index, ep, series) {
  return `<article class="comic-panel illustrated-panel premium-panel" data-panel="${index}">
    <div class="panel-art-wrap">${renderPanelIllustration(panel, index, ep, series)}</div>
    <div class="panel-dialogue">
      <div class="speech"><strong>${sanitize(panel.speaker)}</strong>${sanitize(panel.line)}</div>
      <div class="cast-line">Cast: ${sanitize(castLabel(panel))}</div>
    </div>
    <div class="panel-actions">
      <span class="chip">Panel ${index + 1}</span>
      <div>
        <button class="ghost-btn" data-speak="${sanitize(`${panel.speaker} says: ${panel.line}`)}">Listen</button>
        <button class="primary-btn" data-practice-line="${sanitize(panel.line)}" data-practice-speaker="${sanitize(panel.speaker)}">Practice</button>
      </div>
    </div>
  </article>`;
}
function titleCase(str) { return String(str).replace(/\b\w/g, c => c.toUpperCase()); }

function renderRecorder(prefix, week, title = 'Voice Recorder') {
  const ep = episode(week);
  return `<div class="card recorder-card" data-recorder="${prefix}">
    <h3>${sanitize(title)}</h3>
    <p class="mini"><strong>Week ${ep.week}:</strong> ${sanitize(ep.title)}</p>
    <p>${sanitize(ep.task)}</p>
    <div class="recorder-display">
      <div class="record-dot" id="${prefix}RecordDot">●</div>
      <div><strong id="${prefix}RecordStatus">Ready to record</strong><br><span id="${prefix}RecordTime" class="mini">00:00</span></div>
    </div>
    <div class="hero-actions">
      <button class="primary-btn" id="${prefix}StartRecordBtn">Start</button>
      <button class="danger-lite-btn" id="${prefix}StopRecordBtn" disabled>Stop</button>
      <button class="ghost-btn" id="${prefix}PlayPreviewBtn" disabled>Play</button>
      <button class="success-btn" id="${prefix}SaveRecordBtn" disabled>Save to Portfolio</button>
    </div>
    <audio class="audio-preview" id="${prefix}AudioPreview" controls hidden></audio>
    <label style="margin-top:12px">Transcript or speaking notes
      <textarea id="${prefix}Transcript" placeholder="Type your key ideas. The local AI coach uses this text to provide feedback."></textarea>
    </label>
    <label>Self-assessment
      <select id="${prefix}SelfAssessment">
        <option>I completed the task clearly.</option>
        <option>I need more vocabulary support.</option>
        <option>I need to improve fluency and pronunciation.</option>
        <option>I want lecturer feedback.</option>
      </select>
    </label>
  </div>`;
}

function renderVocabulary() {
  const ep = episode();
  return `<section class="grid">
    <div class="card">
      <div class="comic-top"><div><p class="eyebrow">Week ${ep.week}</p><h2>Vocabulary Lab: ${sanitize(ep.title)}</h2><p>${sanitize(ep.focus)}</p></div><div class="view-actions"><button class="ghost-btn" data-go="episodes" data-go-week="${ep.week}">Back to Comic</button><button class="ghost-btn" data-go="assessment" data-go-week="${ep.week}">Open Quiz</button></div><select id="vocabWeek">${COURSE.map(item => `<option value="${item.week}" ${item.week === ep.week ? 'selected' : ''}>Week ${item.week} · ${sanitize(item.title)}</option>`).join('')}</select></div>
      <div class="grid three">${ep.terms.map(term => `<div class="card"><h3>${sanitize(titleCase(term))}</h3><p>${sanitize(TERM_DEFINITIONS[term] || 'A target ESP term.')}</p><button class="ghost-btn" data-speak="${sanitize(`${term}. ${TERM_DEFINITIONS[term] || ''}`)}">Listen</button> <button class="success-btn word-master" data-word="${sanitize(term)}">Mastered</button></div>`).join('')}</div>
    </div>
  </section>`;
}

function renderVoiceStudio() {
  const ep = episode();
  return `<section class="grid two">
    <div class="card">
      <h2>Voice Studio</h2>
      <p>Choose an episode, listen to the dialogue, record your ESP speaking task, and save it into your speaking portfolio.</p>
      <label>Select episode
        <select id="voiceWeek">${COURSE.map(item => `<option value="${item.week}" ${item.week === ep.week ? 'selected' : ''}>Week ${item.week} · ${sanitize(item.title)}</option>`).join('')}</select>
      </label>
      <div class="feedback-card" style="margin-top:14px">
        <p class="eyebrow" id="voiceMissionTitle">Week ${ep.week}: ${sanitize(ep.title)}</p>
        <h3 id="voiceMissionText">${sanitize(ep.task)}</h3>
        <div class="hero-actions">
          <button class="ghost-btn" id="listenVoiceMission">Listen Mission</button>
          <button class="ghost-btn" data-go="episodes" data-go-week="${ep.week}">Open Comic Episode</button>
        </div>
      </div>
      <h3>Speaking Rubric</h3>
      ${renderRubric()}
    </div>
    ${renderRecorder('vs', ep.week, 'Interactive Recording')}
  </section>`;
}
function renderRubric() {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Criterion</th><th>Excellent</th><th>Good</th><th>Needs Improvement</th></tr></thead><tbody>
    <tr><td>Task Completion</td><td>Clear, complete, relevant</td><td>Mostly complete</td><td>Limited or unclear</td></tr>
    <tr><td>ESP Vocabulary</td><td>Uses target technical terms accurately</td><td>Uses some target terms</td><td>Very few target terms</td></tr>
    <tr><td>Organization</td><td>Problem, evidence, solution structure</td><td>Some structure</td><td>Ideas not connected</td></tr>
    <tr><td>Fluency and Clarity</td><td>Easy to understand</td><td>Generally clear</td><td>Frequent hesitation or unclear message</td></tr>
    <tr><td>Professional Tone</td><td>Polite and workplace-oriented</td><td>Mostly appropriate</td><td>Too informal or incomplete</td></tr>
  </tbody></table></div>`;
}

function renderCoach() {
  const ep = episode();
  return `<section class="grid two">
    <div class="card">
      <h2>Local AI Speaking Coach</h2>
      <p>This coach gives rule-based local feedback from your transcript. It does not use any external API.</p>
      <label>Episode
        <select id="coachWeek">${COURSE.map(item => `<option value="${item.week}" ${item.week === ep.week ? 'selected' : ''}>Week ${item.week} · ${sanitize(item.title)}</option>`).join('')}</select>
      </label>
      <label>Paste or type your speaking transcript
        <textarea id="coachText" placeholder="Example: The login page has an authentication bug because..."></textarea>
      </label>
      <div class="hero-actions"><button class="primary-btn" id="analyzeTextBtn">Analyze My Speaking</button><button class="ghost-btn" data-go="episodes" data-go-week="${ep.week}">Back to Comic</button><button class="ghost-btn" data-go="voice" data-go-week="${ep.week}">Open Voice Recorder</button></div>
    </div>
    <div class="card" id="coachResult">
      <h3>Feedback appears here</h3>
      <p>Scores are calculated from task relevance, informatics vocabulary, organization, clarity, and professional tone.</p>
    </div>
  </section>`;
}

function renderQuestBoard(ep) {
  const p = progressOf();
  const quiz = p.quizzes[ep.week];
  const voiceDone = state.submissions.some(sub => sub.userId === currentUser()?.id && Number(sub.week) === ep.week);
  const claimed = Boolean(p.bossChallenges?.[ep.week]);
  const quizStatus = quiz ? `${quiz.score}/100` : 'Not submitted';
  return `<div class="card quest-board">
    <div class="quest-header">
      <div><p class="eyebrow">Gamified Assessment</p><h3>${sanitize(ep.quest.name)}</h3><p>${sanitize(ep.quest.unlock)}</p></div>
      <div class="boss-token">BOSS<br><strong>+${ep.quest.xp}</strong></div>
    </div>
    <div class="quest-grid">
      <div class="quest-card ${quiz?.score >= 80 ? 'done' : ''}"><span>1</span><strong>Quiz Duel</strong><small>${sanitize(quizStatus)}</small></div>
      <div class="quest-card ${voiceDone ? 'done' : ''}"><span>2</span><strong>Voice Mission</strong><small>${voiceDone ? 'Saved' : 'Record required'}</small></div>
      <div class="quest-card ${claimed ? 'done' : ''}"><span>3</span><strong>${sanitize(ep.quest.boss)}</strong><small>${claimed ? 'Claimed' : 'Locked'}</small></div>
    </div>
    <button class="success-btn" id="claimBossChallengeBtn" ${claimed ? 'disabled' : ''}>${claimed ? 'Boss XP Claimed' : 'Claim Boss Challenge XP'}</button>
  </div>`;
}
function renderAssessment() {
  const ep = episode(state.selectedQuizWeek || state.selectedWeek);
  const p = progressOf();
  const previous = p.quizzes[ep.week];
  return `<section class="grid">
    <div class="assessment-hero">
      <div>
        <p class="eyebrow">Assessment Missions</p>
        <h2>Gamified ESP Quiz Arena</h2>
        <p>Each weekly assessment contains five mission questions, XP rewards, a required voice mission, and a boss challenge. The week is completed only after quiz and voice submission are finished.</p>
        <div class="hero-actions"><button class="ghost-light-btn" data-go="episodes" data-go-week="${ep.week}">Back to Comic Episode</button><button class="ghost-light-btn" data-go="voice" data-go-week="${ep.week}">Open Voice Mission</button><button class="ghost-light-btn" data-go="home">Back Home</button></div>
      </div>
      <select id="quizWeekSelect">${COURSE.map(item => `<option value="${item.week}" ${item.week === ep.week ? 'selected' : ''}>Week ${item.week} · ${sanitize(item.title)}</option>`).join('')}</select>
    </div>
    <section class="grid two assessment-grid">
      <div class="card">
        <div class="comic-top"><div><p class="eyebrow">Week ${ep.week}</p><h2>${sanitize(ep.title)}</h2><p><strong>Boss:</strong> ${sanitize(ep.quest.boss)}</p></div><div class="xp-stack"><strong>+100</strong><span>Quiz XP</span></div></div>
        <div id="quizBox">${ep.quiz.map((q, qi) => `<div class="quiz-question gamified-question"><div class="question-rank">Q${qi + 1}</div><strong>${sanitize(q.q)}</strong><div class="option-list">${q.options.map((option, oi) => `<button class="option" type="button" data-q="${qi}" data-o="${oi}">${sanitize(option)}</button>`).join('')}</div></div>`).join('')}</div>
        <div class="hero-actions"><button class="primary-btn" id="submitQuizBtn">Submit Quiz Mission</button><button class="ghost-btn" data-go="episodes" data-go-week="${ep.week}">Back to Comic</button><button class="ghost-btn" data-go="voice" data-go-week="${ep.week}">Record Voice</button></div>
        <div id="quizResult" style="margin-top:12px">${previous ? `<div class="feedback-card"><strong>Previous score:</strong> ${previous.score}/100 · ${previous.correct}/${previous.total} correct</div>` : ''}</div>
      </div>
      <div class="grid">
        ${renderQuestBoard(ep)}
        <div class="card reward-card"><h3>Reward System</h3><div class="reward-row"><span>Week completion bonus after quiz + voice</span><strong>+60 XP</strong></div><div class="reward-row"><span>Quiz mission passed</span><strong>+70 to +170 XP</strong></div><div class="reward-row"><span>Voice portfolio saved</span><strong>+120 XP+</strong></div><div class="reward-row"><span>Boss challenge</span><strong>+${ep.quest.xp} XP</strong></div></div>
      </div>
    </section>
    <section class="grid two">
      <div class="card"><h3>Formative Assessment 60%</h3><div class="table-wrap"><table class="data-table"><tbody><tr><td>Weekly comic missions and unlocks</td><td>20%</td></tr><tr><td>Gamified vocabulary and reading quests</td><td>10%</td></tr><tr><td>Voice portfolio with AI-style feedback</td><td>15%</td></tr><tr><td>Peer feedback and collaboration</td><td>10%</td></tr><tr><td>Reflective journal and mission notes</td><td>5%</td></tr></tbody></table></div></div>
      <div class="card"><h3>Summative Assessment 40%</h3><div class="table-wrap"><table class="data-table"><tbody><tr><td>Week 8 Midterm tech-meeting boss battle</td><td>15%</td></tr><tr><td>Week 16 final product pitch expo</td><td>15%</td></tr><tr><td>Final ESP comic-based test</td><td>10%</td></tr></tbody></table></div></div>
    </section>
  </section>`;
}

function renderPortfolio() {
  const user = currentUser();
  const records = (user.role === 'student' ? state.submissions.filter(sub => sub.userId === user.id) : state.submissions).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  return `<section class="grid">
    <div class="card">
      <h2>Speaking Portfolio</h2>
      <p>${user.role === 'student' ? 'Your voice submissions and AI feedback are saved here.' : 'Lecturers and Admin can review all student voice submissions stored in this browser.'}</p>
      <div>${records.length ? records.map(renderPortfolioItem).join('') : '<div class="empty-state">No voice submissions yet. Open a Comic Episode or Voice Studio to record the first task.</div>'}</div>
    </div>
  </section>`;
}
function renderPortfolioItem(sub) {
  return `<article class="portfolio-item" data-submission="${sanitize(sub.id)}">
    <div>
      <p class="eyebrow">Week ${sub.week} · ${sanitize(sub.title)}</p>
      <h3>${sanitize(sub.studentName || 'Student')}</h3>
      <p><strong>Task:</strong> ${sanitize(sub.task)}</p>
      <p><strong>Transcript:</strong> ${sanitize(sub.transcript || 'No transcript typed.')}</p>
      <div class="feedback-card"><strong>AI Coach:</strong> ${sanitize(sub.feedback.summary)}<br><strong>Score:</strong> ${sub.feedback.score}/100</div>
    </div>
    <div>
      <audio id="audio_${sanitize(sub.id)}" controls class="audio-preview"></audio>
      <p class="mini">Submitted: ${new Date(sub.createdAt).toLocaleString()}</p>
      <button class="ghost-btn" data-go="episodes" data-go-week="${sub.week}">Open Episode</button>
    </div>
  </article>`;
}

function renderLeaderboard() {
  const students = allStudents().sort((a,b) => progressOf(b).xp - progressOf(a).xp);
  return `<section class="card">
    <h2>Leaderboard</h2>
    <p>Rank is based on XP from completed episodes, quizzes, vocabulary practice, reflection, and voice submissions.</p>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>Rank</th><th>Student</th><th>Class</th><th>Level</th><th>XP</th><th>Episodes</th><th>Voice</th><th>Badges</th></tr></thead><tbody>${students.map((s, i) => `<tr><td>${i + 1}</td><td><strong>${sanitize(s.name)}</strong></td><td>${sanitize(s.className || '-')}</td><td>${levelFromXp(progressOf(s).xp)}</td><td>${progressOf(s).xp}</td><td>${completedCount(s)}/16</td><td>${voiceCount(s)}</td><td>${earnedBadges(s).length}</td></tr>`).join('') || '<tr><td colspan="8">No student data yet.</td></tr>'}</tbody></table></div>
  </section>`;
}

function renderDashboard() {
  const user = currentUser();
  if (!['lecturer','admin'].includes(user.role)) return `<div class="empty-state">Lecturer dashboard is available only for verified lecturers and Admin.</div>`;
  const students = allStudents();
  const submissions = state.submissions;
  const avg = students.length ? Math.round(students.reduce((sum, s) => sum + progressOf(s).xp, 0) / students.length) : 0;
  const activeThisWeek = students.filter(s => progressOf(s).completedWeeks[state.selectedWeek]).length;
  return `<section class="grid">
    <div class="analytics-grid">
      <div class="metric"><span>Students</span><strong>${students.length}</strong></div>
      <div class="metric"><span>Voice Submissions</span><strong>${submissions.length}</strong></div>
      <div class="metric"><span>Completed Week ${state.selectedWeek}</span><strong>${activeThisWeek}</strong></div>
      <div class="metric"><span>Average XP</span><strong>${avg}</strong></div>
    </div>
    <div class="grid two">
      <div class="card"><h3>Student Progress</h3>${renderLeaderboard().replace('<section class="card">','').replace('</section>','')}</div>
      <div class="card"><h3>Recent Voice Submissions</h3>${submissions.slice().sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).slice(0,8).map(sub => `<div class="feedback-card"><strong>${sanitize(sub.studentName)}</strong><br>Week ${sub.week}: ${sanitize(sub.title)}<br>Score: ${sub.feedback.score}/100</div>`).join('') || '<div class="empty-state">No submissions yet.</div>'}</div>
    </div>
  </section>`;
}

function renderAdmin() {
  const user = currentUser();
  if (user.role !== 'admin') return `<div class="empty-state">Admin Center is restricted.</div>`;
  const pending = pendingLecturers();
  return `<section class="grid">
    <div class="card">
      <h2>Admin Center</h2>
      <p>Approve or reject lecturer verification requests. No Admin PIN is displayed in the app interface.</p>
      <h3>Lecturer Verification Requests</h3>
      ${pending.length ? pending.map(lec => `<div class="feedback-card"><strong>${sanitize(lec.name)}</strong><br>${sanitize(lec.email)} · ${sanitize(lec.program || '')}<div class="admin-actions" style="margin-top:10px"><button class="success-btn approve-lecturer" data-id="${lec.id}">Approve</button><button class="danger-lite-btn reject-lecturer" data-id="${lec.id}">Reject</button></div></div>`).join('') : '<div class="empty-state">No pending lecturer requests.</div>'}
    </div>
    <div class="grid three">
      <div class="card"><h3>Users</h3><p><strong>${Object.keys(state.users).length}</strong> total accounts</p></div>
      <div class="card"><h3>Students</h3><p><strong>${allStudents().length}</strong> registered students</p></div>
      <div class="card"><h3>Approved Lecturers</h3><p><strong>${allLecturers().filter(l => l.status === 'approved').length}</strong> lecturer accounts</p></div>
    </div>
  </section>`;
}

function renderSettings() {
  const user = currentUser();
  const canEdit = ['lecturer','admin'].includes(user.role);
  return `<section class="grid two">
    <div class="card">
      <h2>Settings and Backup</h2>
      <p>Export/import browser data before changing devices or browsers.</p>
      <div class="hero-actions"><button class="primary-btn" id="exportDataBtn">Export JSON</button><label class="ghost-btn" style="display:inline-flex;align-items:center;gap:8px">Import JSON<input id="importDataInput" type="file" accept="application/json" hidden /></label></div>
      <hr style="border:0;border-top:1px solid var(--line);margin:18px 0">
      <button class="danger-lite-btn" id="clearLocalBtn">Clear Local Class Data</button>
    </div>
    <div class="card">
      <h2>Course Metadata</h2>
      ${canEdit ? `<label>Course title<input id="metaTitle" value="${sanitize(state.classMeta.courseTitle)}"></label><label>Semester<input id="metaSemester" value="${sanitize(state.classMeta.semester)}"></label><label>Lecturer display name<input id="metaLecturer" value="${sanitize(state.classMeta.lecturer)}"></label><label>Assessment model<input id="metaAssessment" value="${sanitize(state.classMeta.assessmentModel)}"></label><button class="primary-btn" id="saveMetaBtn">Save Metadata</button>` : `<p><strong>${sanitize(state.classMeta.courseTitle)}</strong><br>${sanitize(state.classMeta.semester)}<br>${sanitize(state.classMeta.assessmentModel)}</p>`}
    </div>
  </section>`;
}

function bindView(view) {
  $$('[data-go]').forEach(button => button.addEventListener('click', () => {
    const week = button.dataset.goWeek;
    if (week) {
      state.selectedWeek = Number(week);
      state.selectedQuizWeek = Number(week);
    }
    setView(button.dataset.go);
  }));
  $$('[data-speak]').forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    speak(button.dataset.speak);
  }));

  if (view === 'episodes') bindEpisodes();
  if (view === 'vocabulary') bindVocabulary();
  if (view === 'voice') bindVoiceStudio();
  if (view === 'coach') bindCoach();
  if (view === 'assessment') bindAssessment();
  if (view === 'portfolio') bindPortfolioAudio();
  if (view === 'admin') bindAdmin();
  if (view === 'settings') bindSettings();
}

function bindEpisodes() {
  $$('.week-btn').forEach(button => button.addEventListener('click', () => selectWeek(button.dataset.week, 'episodes')));
  $$('.series-card').forEach(button => button.addEventListener('click', () => {
    state.selectedSeries = Number(button.dataset.series || 0);
    saveState();
    renderApp();
  }));
  $$('.comic-panel').forEach(panel => panel.addEventListener('click', () => {
    $$('.comic-panel').forEach(item => item.classList.remove('active'));
    panel.classList.add('active');
  }));
  $$('[data-practice-line]').forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    const transcript = $('#epTranscript');
    const speaker = button.dataset.practiceSpeaker || 'the character';
    if (transcript) transcript.value = `Speaking as ${speaker}: I will respond to this dialogue line: ${button.dataset.practiceLine}\n`;
    showToast('Character practice prompt copied to the episode recorder.');
    transcript?.focus();
  }));
  $$('.dialogue-mission-btn').forEach(button => button.addEventListener('click', () => {
    const transcript = $('#epTranscript');
    const as = button.dataset.dialogueAs || 'Character';
    const prompt = button.dataset.dialoguePrompt || '';
    if (transcript) transcript.value = `Speaking as ${as}: ${prompt}\nMy response: `;
    showToast(`Dialogue mission selected: speak as ${as}.`);
    transcript?.focus();
  }));
  $('#saveEpisodeNote')?.addEventListener('click', () => {
    const p = progressOf();
    p.notes[state.selectedWeek] = $('#episodeNote').value.trim();
    addXp(10);
    saveState();
    showToast('Reflection saved.');
  });
  bindRecorder('ep', () => state.selectedWeek);
}

function bindVocabulary() {
  $('#vocabWeek')?.addEventListener('change', event => selectWeek(event.target.value, 'vocabulary'));
  $$('.word-master').forEach(button => button.addEventListener('click', () => {
    const p = progressOf();
    if (!p.words[button.dataset.word]) addXp(8);
    p.words[button.dataset.word] = new Date().toISOString();
    saveState();
    renderApp();
  }));
}

function bindVoiceStudio() {
  $('#voiceWeek')?.addEventListener('change', event => {
    state.selectedWeek = Number(event.target.value);
    saveState();
    renderApp();
  });
  $('#listenVoiceMission')?.addEventListener('click', () => speak(`Week ${episode().week}. ${episode().title}. Your mission is: ${episode().task}`));
  bindRecorder('vs', () => state.selectedWeek);
}

function bindCoach() {
  $('#coachWeek')?.addEventListener('change', event => {
    state.selectedWeek = Number(event.target.value);
    saveState();
  });
  $('#analyzeTextBtn')?.addEventListener('click', () => {
    const result = analyzeSpeaking($('#coachText').value.trim(), Number($('#coachWeek').value));
    $('#coachResult').innerHTML = renderFeedback(result);
  });
}

function bindAssessment() {
  const selected = {};
  $('#quizWeekSelect')?.addEventListener('change', event => {
    state.selectedQuizWeek = Number(event.target.value);
    state.selectedWeek = Number(event.target.value);
    saveState();
    renderApp();
  });
  $$('.option').forEach(option => option.addEventListener('click', () => {
    const q = option.dataset.q;
    selected[q] = Number(option.dataset.o);
    $$(`.option[data-q="${q}"]`).forEach(btn => btn.classList.remove('selected'));
    option.classList.add('selected');
  }));
  $('#submitQuizBtn')?.addEventListener('click', () => {
    const ep = episode(state.selectedQuizWeek || state.selectedWeek);
    if (Object.keys(selected).length < ep.quiz.length) return showToast('Please answer all questions first.');
    let correct = 0;
    ep.quiz.forEach((q, qi) => {
      if (selected[qi] === q.answer) correct += 1;
      $$(`.option[data-q="${qi}"]`).forEach(btn => {
        btn.classList.toggle('correct', Number(btn.dataset.o) === q.answer);
        btn.classList.toggle('wrong', Number(btn.dataset.o) === selected[qi] && selected[qi] !== q.answer);
      });
    });
    const score = Math.round(correct / ep.quiz.length * 100);
    progressOf().quizzes[ep.week] = { score, correct, total: ep.quiz.length, submittedAt: new Date().toISOString() };
    if (score >= 70) {
      progressOf().missionStreak = Number(progressOf().missionStreak || 0) + 1;
      addXp(70 + score);
    } else {
      progressOf().missionStreak = 0;
      addXp(25);
    }
    const completedNow = updateWeekCompletion(ep.week);
    const voiceDone = hasWeeklyVoice(ep.week);
    saveState();
    $('#quizResult').innerHTML = `<div class="feedback-card"><strong>Quiz score:</strong> ${score}/100 · ${correct}/${ep.quiz.length} correct. ${score >= 70 ? (voiceDone ? 'Week completed because quiz and voice mission are both finished.' : 'Quiz passed. Record and save one voice mission to complete this week.') : 'Review the comic and try again.'}</div>`;
    showToast(completedNow ? 'Week completed: quiz and voice mission finished.' : 'Quiz submitted.');
  });
  $('#claimBossChallengeBtn')?.addEventListener('click', () => {
    const ep = episode(state.selectedQuizWeek || state.selectedWeek);
    const p = progressOf();
    const quiz = p.quizzes[ep.week];
    const voiceDone = state.submissions.some(sub => sub.userId === currentUser()?.id && Number(sub.week) === ep.week);
    if (!quiz || quiz.score < 80) return showToast('Boss challenge locked. Score at least 80 in the quiz first.');
    if (!voiceDone) return showToast('Boss challenge locked. Save one voice mission for this week first.');
    if (p.bossChallenges[ep.week]) return showToast('Boss challenge XP already claimed.');
    p.bossChallenges[ep.week] = { claimedAt: new Date().toISOString(), xp: ep.quest.xp };
    addXp(ep.quest.xp);
    saveState();
    renderApp();
    showToast(`Boss challenge completed. +${ep.quest.xp} XP.`);
  });
}

function bindAdmin() {
  $$('.approve-lecturer').forEach(btn => btn.addEventListener('click', () => {
    const user = state.users[btn.dataset.id];
    if (!user) return;
    user.status = 'approved';
    saveState();
    renderApp();
    showToast(`${user.name} approved as lecturer.`);
  }));
  $$('.reject-lecturer').forEach(btn => btn.addEventListener('click', () => {
    const user = state.users[btn.dataset.id];
    if (!user) return;
    user.status = 'rejected';
    state.rejectedLecturers.push({ id: user.id, name: user.name, email: user.email, rejectedAt: new Date().toISOString() });
    saveState();
    renderApp();
    showToast(`${user.name} rejected.`);
  }));
}

function bindSettings() {
  $('#exportDataBtn')?.addEventListener('click', exportData);
  $('#importDataInput')?.addEventListener('change', importData);
  $('#saveMetaBtn')?.addEventListener('click', () => {
    state.classMeta.courseTitle = $('#metaTitle').value.trim();
    state.classMeta.semester = $('#metaSemester').value.trim();
    state.classMeta.lecturer = $('#metaLecturer').value.trim();
    state.classMeta.assessmentModel = $('#metaAssessment').value.trim();
    saveState();
    showToast('Course metadata saved.');
  });
  $('#clearLocalBtn')?.addEventListener('click', () => {
    if (!confirm('Clear all local class data in this browser?')) return;
    localStorage.removeItem(APP_KEY);
    state = defaultState();
    location.reload();
  });
}

function speak(text) {
  if (!('speechSynthesis' in window)) return showToast('Speech synthesis is not supported in this browser.');
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text || ''));
  utterance.lang = 'en-US';
  utterance.rate = 0.92;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => /en-/i.test(v.lang));
  if (englishVoice) utterance.voice = englishVoice;
  window.speechSynthesis.speak(utterance);
}

function bindRecorder(prefix, getWeek) {
  const startBtn = $(`#${prefix}StartRecordBtn`);
  const stopBtn = $(`#${prefix}StopRecordBtn`);
  const playBtn = $(`#${prefix}PlayPreviewBtn`);
  const saveBtn = $(`#${prefix}SaveRecordBtn`);
  const audio = $(`#${prefix}AudioPreview`);
  if (!startBtn || !stopBtn || !playBtn || !saveBtn || !audio) return;
  let mediaRecorder = null;
  let chunks = [];
  let previewBlob = null;
  let previewUrl = null;
  let timer = null;
  let seconds = 0;
  const setStatus = (text) => { const el = $(`#${prefix}RecordStatus`); if (el) el.textContent = text; };
  const setTime = () => { const el = $(`#${prefix}RecordTime`); if (!el) return; const m = String(Math.floor(seconds / 60)).padStart(2, '0'); const s = String(seconds % 60).padStart(2, '0'); el.textContent = `${m}:${s}`; };
  startBtn.addEventListener('click', async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) return showToast('Voice recording needs a browser with microphone support.');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => { if (event.data && event.data.size > 0) chunks.push(event.data); };
      mediaRecorder.onstop = () => {
        previewBlob = new Blob(chunks, { type: mediaRecorder.mimeType || 'audio/webm' });
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
      setTime();
      timer = setInterval(() => { seconds += 1; setTime(); }, 1000);
      $(`#${prefix}RecordDot`)?.classList.add('recording');
      setStatus('Recording...');
      startBtn.disabled = true;
      stopBtn.disabled = false;
      playBtn.disabled = true;
      saveBtn.disabled = true;
    } catch (error) {
      console.warn(error);
      showToast('Microphone permission was blocked or unavailable. Please allow microphone access.');
    }
  });
  stopBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    clearInterval(timer);
    $(`#${prefix}RecordDot`)?.classList.remove('recording');
    setStatus('Recording stopped. Review and save it.');
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
  playBtn.addEventListener('click', () => audio.play());
  saveBtn.addEventListener('click', async () => {
    if (!previewBlob) return showToast('Please record your voice before saving.');
    const week = Number(getWeek());
    const ep = episode(week);
    const transcript = $(`#${prefix}Transcript`)?.value.trim() || '';
    const selfAssessment = $(`#${prefix}SelfAssessment`)?.value || '';
    const feedback = analyzeSpeaking(transcript, week);
    const id = uid('voice');
    const user = currentUser();
    await putRecording({ id, userId: user.id, blob: previewBlob, mimeType: previewBlob.type, createdAt: new Date().toISOString() });
    const submission = { id, userId: user.id, studentName: user.name, week, title: ep.title, task: ep.task, transcript, selfAssessment, feedback, createdAt: new Date().toISOString() };
    state.submissions.push(submission);
    progressOf(user).voiceIds.push(id);
    addXp(120 + Math.round(feedback.score / 4), user);
    const completedNow = updateWeekCompletion(week, user);
    saveState();
    showToast(completedNow ? 'Voice saved and weekly mission completed.' : 'Voice recording saved. Complete the quiz to finish this week.');
    setView('portfolio');
  });
}

function analyzeSpeaking(text, week = state.selectedWeek) {
  const ep = episode(week);
  const raw = String(text || '').trim();
  const lower = raw.toLowerCase();
  const tokens = lower.match(/[a-zA-Z]+/g) || [];
  const wordCount = tokens.length;
  const unique = new Set(tokens).size;
  const termHits = ep.terms.filter(term => lower.includes(term.toLowerCase())).length;
  const structureWords = ['problem','because','evidence','solution','recommend','suggest','first','then','finally','therefore','however','result','cause','action','next'];
  const professionalWords = ['please','recommend','suggest','investigate','resolve','clarify','support','improve','secure','apologize','confirm','priority'];
  const structureHits = structureWords.filter(word => lower.includes(word)).length;
  const professionalHits = professionalWords.filter(word => lower.includes(word)).length;
  const sentenceCount = Math.max(1, (raw.match(/[.!?]/g) || []).length);
  const taskScore = clamp(42 + Math.min(28, wordCount * .72) + Math.min(25, structureHits * 5), 42, 96);
  const vocabScore = clamp(44 + termHits * 13 + Math.min(15, unique / 4), 44, 98);
  const orgScore = clamp(45 + structureHits * 8 + (sentenceCount >= 3 ? 8 : 0), 44, 96);
  const fluencyScore = clamp(46 + Math.min(34, wordCount * .55) + (sentenceCount >= 2 ? 8 : 0), 44, 95);
  const toneScore = clamp(52 + professionalHits * 7 + (lower.includes('thank') ? 4 : 0), 50, 98);
  const score = Math.round((taskScore + vocabScore + orgScore + fluencyScore + toneScore) / 5);
  const termsUsed = ep.terms.filter(term => lower.includes(term.toLowerCase()));
  const summary = score >= 85 ? 'Excellent professional ESP response. Your message is clear, relevant, structured, and workplace-oriented.' : score >= 70 ? 'Good response. The task is mostly completed, but the explanation can use more target terms and clearer sequencing.' : 'Developing response. Add more informatics vocabulary, clearer organization, and a specific solution or recommendation.';
  return {
    score,
    summary,
    criteria: {
      'Task Completion': { score: Math.round(taskScore), note: wordCount >= 35 ? 'The response gives enough detail for the mission.' : 'Add more details to fully complete the mission.' },
      'ESP Vocabulary': { score: Math.round(vocabScore), note: termsUsed.length ? `Target terms used: ${termsUsed.join(', ')}.` : 'Use target informatics terms from the episode.' },
      'Organization': { score: Math.round(orgScore), note: structureHits ? 'The response uses logical markers or problem-solution structure.' : 'Use a clearer sequence such as problem, evidence, solution.' },
      'Fluency and Clarity': { score: Math.round(fluencyScore), note: sentenceCount >= 2 ? 'The transcript shows sentence-level clarity.' : 'Use two or more complete sentences for clearer delivery.' },
      'Professional Tone': { score: Math.round(toneScore), note: professionalHits ? 'The language sounds workplace-appropriate.' : 'Use polite professional expressions such as recommend, clarify, investigate, or resolve.' }
    },
    suggestion: buildSuggestion(ep, termHits, structureHits, wordCount)
  };
}
function buildSuggestion(ep, termHits, structureHits, wordCount) {
  const parts = [];
  if (wordCount < 35) parts.push('expand your answer with more explanation');
  if (termHits < 2) parts.push(`include target terms such as ${ep.terms.slice(0,3).join(', ')}`);
  if (structureHits < 2) parts.push('organize it as problem, evidence, and solution');
  if (!parts.length) return 'Maintain this structure and practice smoother delivery with natural pauses.';
  return `To improve, ${parts.join('; ')}.`;
}
function renderFeedback(result) {
  return `<h3>Feedback Result</h3><div class="score-big">${result.score}<small>/100</small></div><div class="feedback-card"><strong>Summary:</strong> ${sanitize(result.summary)}</div><div class="table-wrap"><table class="data-table"><thead><tr><th>Criterion</th><th>Score</th><th>Feedback</th></tr></thead><tbody>${Object.entries(result.criteria).map(([key, val]) => `<tr><td>${sanitize(key)}</td><td>${val.score}</td><td>${sanitize(val.note)}</td></tr>`).join('')}</tbody></table></div><h4>Suggested Revision</h4><p>${sanitize(result.suggestion)}</p>`;
}

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('recordings')) db.createObjectStore('recordings', { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}
async function putRecording(record) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readwrite');
    tx.objectStore('recordings').put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}
async function getRecording(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('recordings', 'readonly');
    const req = tx.objectStore('recordings').get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}
async function bindPortfolioAudio() {
  for (const audio of $$('audio[id^="audio_"]')) {
    const id = audio.id.replace('audio_', '');
    try {
      const record = await getRecording(id);
      if (record?.blob) audio.src = URL.createObjectURL(record.blob);
      else audio.outerHTML = '<p class="mini">Audio blob is not available in this browser backup.</p>';
    } catch (error) {
      console.warn(error);
      audio.outerHTML = '<p class="mini">Unable to load audio.</p>';
    }
  }
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'JSInfoComix ESP',
    version: state.version,
    note: 'This backup includes account, progress, quiz, and portfolio metadata. Browser audio blobs remain in IndexedDB on this device.',
    state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JSInfoComix-ESP-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const imported = parsed.state || parsed;
      state = normalizeState(imported);
      state.currentUserId = null;
      saveState();
      showToast('Backup imported. Please log in again.');
      setTimeout(() => location.reload(), 700);
    } catch (error) {
      console.warn(error);
      showToast('Import failed. Please use a valid JSInfoComix ESP backup JSON.');
    }
  };
  reader.readAsText(file);
}

function registerPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(console.warn));
  }
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    const btn = $('#installBtn');
    if (btn) btn.hidden = false;
  });
  $('#installBtn')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    $('#installBtn').hidden = true;
  });
}

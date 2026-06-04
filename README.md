# JSInfoComix ESP PWA

JSInfoComix ESP is a GitHub Pages-ready Progressive Web App for English for Informatics students. It combines semester-based interactive comic episodes, voice-recorded speaking tasks, formative and summative assessment, gamified learning, a local rule-based AI coach, lecturer monitoring, and Admin verification.

## Main Features

- 16-week interactive ESP comic course
- Comic Episodes page with clickable weekly missions
- Voice Studio with browser-based recording
- Speaking Portfolio saved locally with IndexedDB
- Local AI Speaking Coach with no external API key
- Formative and summative assessment missions
- XP, levels, badges, and leaderboard
- Role-based login: Student, Lecturer, and Admin
- Lecturer verification by Admin before dashboard access
- Lecturer dashboard and Admin Center
- Offline-first PWA support through service worker
- Export/import browser data backup
- Copyright footer for Dr. Joko Slamet

## Local-First Notes

This version is designed for GitHub Pages and does not use a backend database. Student, lecturer, Admin, score, and portfolio metadata are saved in the current browser. Audio recordings are saved in IndexedDB. Use Export Data regularly when moving devices or browsers.

## Basic Use

1. Open the app URL.
2. Students can register directly.
3. Lecturers send a verification request.
4. Admin logs in, opens Admin Center, and approves lecturers.
5. Approved lecturers can access the Lecturer Dashboard.
6. Students open Comic Episodes, complete weekly missions, record voice tasks, and submit quizzes.

## Deployment

Upload all files in this folder directly into the root of a GitHub repository, then enable GitHub Pages from `Settings > Pages > Deploy from branch > main > /(root)`.

# JSInfoComix ESP

**JSInfoComix ESP** is an offline-first Progressive Web App for **English for Informatics**. It integrates a 16-week interactive digital comic course, voice-recorded speaking tasks, local AI-style feedback, gamified formative assessment, summative portfolio preparation, and a lecturer dashboard.

## Core Identity

- **Course area:** English for Specific Purposes, English for Informatics
- **Learning model:** Interactive comic-based professional simulation
- **Main storyline:** *Sprint to Launch: English Missions in a Tech Startup*
- **Duration:** 16 weekly meetings
- **Deployment:** Static PWA, suitable for GitHub Pages
- **AI model:** Local rule-based AI coach, no external API key
- **Voice recording:** Browser microphone through MediaRecorder
- **Storage:** Browser localStorage for accounts and progress, IndexedDB for voice blobs

## Main Features

1. Interactive comic episodes for 16 weeks
2. ESP vocabulary lab for Informatics terminology
3. Voice Studio for recording speaking tasks
4. Local AI Speaking Coach with rubric-based feedback
5. Weekly gamified assessment missions
6. Speaking portfolio with playable recordings
7. XP, levels, badges, and leaderboard
8. Lecturer dashboard for class monitoring
9. Export and import backup system
10. Offline support through service worker

## First Use

1. Open `index.html` through a local server or publish it through GitHub Pages.
2. Choose **Lecturer Setup** to create the owner workspace and private PIN.
3. Students choose **Register** to create their local student workspace.
4. Use **Comic Episodes**, **Voice Studio**, and **Assessment Missions** across the semester.
5. Use **Settings > Export Data JSON** regularly for backup.

## GitHub Pages Deployment

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to **Settings > Pages**.
4. Select the main branch and root folder.
5. Save and open the generated GitHub Pages link.

## Important Notes

- This version is intentionally **API-key-free** and **backend-free**.
- Data is stored locally in the browser. Students and lecturers should export backups regularly.
- For institutional multi-device use, the next development phase can add Firebase, Supabase, or a university LMS integration. This current version prioritizes simple free deployment.
- Voice recording depends on browser microphone permission and requires HTTPS when deployed online. GitHub Pages already provides HTTPS.

## Suggested Research Title

**Developing JSInfoComix ESP: A Local-First AI-Supported Interactive Digital Comic PWA for Enhancing Informatics Students’ Technical Communication, Speaking Performance, and ESP Vocabulary Mastery**

## Suggested R&D Design

- Phase 1: Needs analysis with Informatics students and ESP lecturers
- Phase 2: App design and expert validation
- Phase 3: Small-group usability trial
- Phase 4: 16-week classroom implementation
- Phase 5: Evaluation through speaking portfolio, vocabulary test, questionnaire, interview, and learning analytics

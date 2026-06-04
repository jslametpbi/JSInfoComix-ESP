# JSInfoComix ESP PWA v1.5

JSInfoComix ESP is a local-first Progressive Web App for English for Informatics students. It integrates interactive digital comic episodes, voice listening, voice recording, local AI-style speaking feedback, formative quizzes, gamified progress, speaking portfolio, lecturer dashboard, and Admin verification.

## Main fixes in v1.5

- Redesigned exclusive login landing page with fewer visual figures.
- Added visible Log out button in the top bar.
- Rebuilt Comic Episodes page so all 16 episodes are clickable.
- Added real interactive comic panels for every episode.
- Added Listen buttons for full episode, each panel, and vocabulary terms.
- Added interactive recording directly inside each comic episode.
- Integrated Voice Studio, AI Coach, Assessment, Portfolio, Dashboard, and Leaderboard through shared week selection and progress data.
- Added role-based login: Student, Lecturer, and Admin.
- Lecturer accounts require Admin approval before dashboard access.
- Admin login is secured by PIN and the PIN is not displayed in the app interface.
- Added footer copyright: © Dr. Joko Slamet. All rights reserved.
- Removed university name from the app interface.

## Deployment

Upload these files directly to the root of your GitHub repository:

- index.html
- styles.css
- app.js
- manifest.webmanifest
- sw.js
- icons/
- assets/

Then activate GitHub Pages from Settings > Pages > Deploy from branch > main > /root.

## Important after updating GitHub Pages

If the old version still appears, clear the browser cache/site data or open the link in a private/incognito window. This version uses a new service worker cache name.


## Version 1.3 updates
- Illustrated comic panels and thumbnails for all 16 weekly ESP episodes.
- Admin login uses role selection plus private PIN only; no Admin ID is required.
- Lecturer label simplified to Lecturer.
- Weekly quizzes expanded to five questions.
- Gamified quest board, XP rewards, and boss challenge added to assessment missions.


## v1.5 Series Comic Update

- Every week now contains four related comic story series.
- Each selected series contains illustrated comic panels.
- Arka, Naya, Rafi, Mira, Ken, and Dr. Joe are integrated into the weekly story cycle.
- Students can listen to all series, listen to the selected series, practice each panel, and record dialogue missions as a character.
- Interactive dialogue missions are connected to the voice recorder and portfolio.


## v1.5 Update
- Real-comic style illustrated panels for every weekly series.
- Removed manual Mark Complete. A week completes only after quiz pass and voice submission.
- Added clearer Back to Comic, Open Voice Mission, and Back Home buttons in assessment and task areas.
- Improved series thumbnails and panel layout to mirror a real comic strip.

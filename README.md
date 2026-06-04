# JSInfoComix ESP PWA v1.2

JSInfoComix ESP is a local-first Progressive Web App for English for Informatics students. It integrates interactive digital comic episodes, voice listening, voice recording, local AI-style speaking feedback, formative quizzes, gamified progress, speaking portfolio, lecturer dashboard, and Admin verification.

## Main fixes in v1.2

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

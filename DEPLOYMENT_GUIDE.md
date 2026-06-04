# GitHub Pages Deployment Guide

1. Extract the ZIP file.
2. Open the extracted folder.
3. Upload all files and folders inside the extracted folder to the root of your GitHub repository.
4. Make sure index.html is visible in the repository root.
5. Go to Settings > Pages.
6. Choose Deploy from a branch.
7. Select main and /root.
8. Save and wait for deployment.
9. Open your GitHub Pages link.
10. If an old version appears, clear site data or open the page in an incognito/private window.

Correct structure:

JSInfoComix-ESP/index.html
JSInfoComix-ESP/styles.css
JSInfoComix-ESP/app.js
JSInfoComix-ESP/manifest.webmanifest
JSInfoComix-ESP/sw.js
JSInfoComix-ESP/icons/
JSInfoComix-ESP/assets/

Wrong structure:

JSInfoComix-ESP/JSInfoComix-ESP-PWA-v1.3/index.html


## Version 1.3 updates
- Illustrated comic panels and thumbnails for all 16 weekly ESP episodes.
- Admin login uses role selection plus private PIN only; no Admin ID is required.
- Lecturer label simplified to Lecturer.
- Weekly quizzes expanded to five questions.
- Gamified quest board, XP rewards, and boss challenge added to assessment missions.


## Updating from v1.3 to v1.4

Replace all old repository files with this package. After upload, open the GitHub Pages link in an incognito window or clear site data because the old service worker may cache earlier versions.

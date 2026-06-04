# Deployment Guide: JSInfoComix ESP on GitHub Pages

## A. Simple Upload Method

1. Extract the ZIP file.
2. Open GitHub and create a repository, for example: `JSInfoComix-ESP`.
3. Upload these files directly to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.webmanifest`
   - `sw.js`
   - `assets/`
   - `icons/`
   - `README.md`
4. Open repository **Settings**.
5. Click **Pages**.
6. Under **Build and deployment**, choose:
   - Source: Deploy from branch
   - Branch: main
   - Folder: `/root`
7. Save.
8. Open the GitHub Pages link after deployment finishes.

## B. Recommended First Configuration

1. Open the app link.
2. Select **Lecturer Setup**.
3. Create your lecturer profile and private PIN.
4. Ask students to register from their own device or browser.
5. Tell students to export their portfolio backup before the final week.

## C. Why the App Works Without API Key

The app uses local browser logic for AI-style feedback. It checks task completion, vocabulary use, organization markers, clarity indicators, and professional tone using a rubric-based local algorithm.

## D. Offline Use

After the first successful load, the service worker caches the app shell. The app can reopen offline from the same browser, but new device access still requires opening the GitHub Pages link at least once.

## E. Browser Recommendations

Use updated Chrome, Edge, or Safari. Voice recording requires microphone permission. On deployed pages, HTTPS is required for microphone access, and GitHub Pages provides HTTPS automatically.

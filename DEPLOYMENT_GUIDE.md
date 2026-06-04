# Deployment Guide: JSInfoComix ESP

## 1. Upload Files

Upload the contents of this folder directly to the root of your GitHub repository.

Correct root structure:

```text
index.html
styles.css
app.js
manifest.webmanifest
sw.js
assets/
icons/
README.md
DEPLOYMENT_GUIDE.md
```

Do not upload the outer folder only, because GitHub Pages needs `index.html` in the repository root.

## 2. Enable GitHub Pages

1. Open the repository.
2. Go to **Settings**.
3. Open **Pages**.
4. Select **Deploy from a branch**.
5. Select branch: **main**.
6. Select folder: **/(root)**.
7. Click **Save**.

## 3. Open the Live Site

The link will normally be:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

For example:

```text
https://jslametpbi.github.io/JSInfoComix-ESP/
```

## 4. After Updating Files

If the old version still appears, refresh the browser, clear site data, or open the link in an incognito/private window. The updated service worker cache is versioned to help GitHub Pages load the revised app.

## 5. Role System

The app has Student, Lecturer, and Admin roles. Student accounts can be created directly. Lecturer accounts must be approved through the Admin Center before the Lecturer Dashboard is accessible.

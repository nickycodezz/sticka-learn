# Wonder Lens

## Prerequisites

* Git installed.
* Python 3 available as `python3` in your PATH (for the simple local server).
* A modern browser (Chrome, Firefox, Edge, or Safari). Camera access requires serving over localhost.

## Repository layout (relevant files)

* `app/index.html` - Start page (landing screen).
* `app/camera.html` - Camera and gallery page (main app).
* `app/style.css` - Main stylesheet.
* `app/src/start.js` - Launcher script for the start page.
* `app/src/main.js` - Camera logic and gallery rendering.
* `app/src/storage.js` - LocalStorage helpers for saved images.
* `app/assets/` - Images required by the UI (logo, bgdeco image).

## Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/nickycodezz/sticka-learn.git
cd sticka-learn/app
```

If the repo path or name differs, adjust the URL accordingly.

## Prepare assets (one-time)

Ensure the `assets` folder exists and contains the supporting images used by the start page and header:

* `app/assets/logo.png`
* `app/assets/bgdeco.png` (or `bgdeco.jpg`)

If you copied these from `johaan-frontend`, confirm the filenames and case match exactly.

## Serve the app locally

From the `app` folder run a simple HTTP server with Python 3:

```bash
python3 -m http.server 8000
```

Open your browser and navigate to:

```
http://localhost:8000/
```

This should display the start page. Click the "Open Camera" button to go to the camera page.

## Camera permission and use

* The browser will prompt for camera permissions. Allow camera access for the page to work.
* If the camera does not start, check that no other app or tab is using the camera.
* If the page is opened from the file system (file://) the camera will not work. You must serve over [http://localhost](http://localhost).

## Common commands while developing

* Fetch remote changes and rebase your local branch:

```bash
git fetch origin
git pull --rebase origin main
```

* Add and commit a single file with a descriptive message:

```bash
git add app/style.css
git commit -m "Polish styles: centered camera and gallery grid"
```

* Push local commits to remote:

```bash
git push origin main
```

## Troubleshooting

* If the start page is blank but the image loads directly, verify paths:

  * `index.html` should include `link rel="stylesheet" href="style.css"`
  * Background image path in `style.css` should be `url("assets/bgdeco.png")` or the correct filename

* If you see a push rejection when pushing to `main`:

  * Run `git pull --rebase origin main`, resolve any conflicts, then `git push origin main`.

* If CSS changes do not appear, do a hard refresh in your browser (Ctrl+F5 or Cmd+Shift+R).

* To test whether the asset path is correct, open the direct URL in your browser:

```
http://localhost:8000/assets/bgdeco.png
```

## Notes and next steps

* The app uses LocalStorage to save gallery images. Those saved images remain in the browser until you clear them or remove them via the app.
* If you want to reset the saved images, open browser dev tools and clear the `stickers_v1` key from LocalStorage or use the app delete controls.


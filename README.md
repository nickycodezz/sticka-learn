# Wonder Lens

## What it Does
Wonder Lens is a playful camera app powered by Groq AI.
It gives short imagination prompts like:

 *“I wonder... can you find something that sparkles in nature?”*
 *“I wonder... can you find something that is hidden in plain sight?”*
 *“I wonder... can you capture an interesting shape in the landscape?”*

Users take photos, name their discoveries, and save them in a soft, kid-friendly gallery with timestamps and gentle color tones.
The goal is to make curiosity feel natural and creative again.

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
cd wonder-lens/app
```

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

## Database

* The app uses LocalStorage to save gallery images. Those saved images remain in the browser until you clear them or remove them via the app.

## What We Learned
As a team, we learned how to combine creativity, design, and engineering into a single project that actually runs all in under 36 hours.
Coming into this hackathon, and it being some of our first ever, we came in from different backgrounds. There is knowledge of C, Python, Java, art, AI prompting and writing. With this, we had to quickly learn how to speak a shared language in HTML, CSS, and JavaScript.

We also learned how to use GitHub collaboratively, resolving merge conflicts, committing carefully, and using commands like git pull --rebase, git add, and git push to keep everyone in sync.
This taught us version control discipline and communication under time pressure.

On the backend and structure side, we learned how to make the camera, AI prompts, and gallery work seamlessly in one flow, serving everything locally while still feeling polished.
Most importantly, we learned to trust our different strengths, some of us designing the visuals, others debugging the logic. 

Last, but not least, our research, attending workshops, and reaching out to mentors allowed us to to utilize and research new, modern technologies to our project. We recognized and celebrated how each role mattered to the final product and our ability to compromise and use straight forward communication allowed for significant progess. It is truly big step in experiencing collaborative project building. 

 *Special thanks to Knight Hacks VIII at UCF 2025*

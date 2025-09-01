# Halim — Portfolio

A modern, static portfolio you can host on **GitHub Pages**.

## Quick start

1. Create a repository named `YOUR-USERNAME.github.io` (replace with your GitHub username).
2. Download this folder and upload contents to the repo root. Or push via git.
3. In the repo: **Settings → Pages → Build and deployment** → Source: *Deploy from a branch* → Branch: `main` (root).
4. (Optional) Put a real `assets/Halim_CV.pdf` and replace links in `index.html`.
5. Edit `projects.json`, `index.html` (About/Contact), and `assets/avatar.svg`.

Your site will be live at `https://YOUR-USERNAME.github.io`.

## Local preview
Open `index.html` in a browser, or use a tiny web server:
```bash
python3 -m http.server 8000
```

## Custom domain
- Buy a domain and set a CNAME record to `YOUR-USERNAME.github.io`.
- Add a `CNAME` file at repo root containing your domain (e.g., `halim.dev`).

## Notes
- `script.js` loads `projects.json` to render project cards.
- `styles.css` supports dark/light via the toggle (saved to localStorage).
- Contact form uses Formspree—replace the placeholder form ID or remove the form.

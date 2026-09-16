# Abdelrahman Adel — Flutter Developer Portfolio

A dark-mode-first, responsive personal portfolio website for Abdelrahman Adel, a Computer Science student and Flutter Developer. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Live Site

https://abdelrhamanadel4-flutter.github.io/

## Features

- Dark / light theme toggle (persisted in localStorage, respects system preference)
- Hero section with typing effect and particle background
- Skills, education & training timeline, certificates, and contact sections
- Filterable project gallery (All / Featured / Flutter / Firebase / UI/UX / Other)
- Project detail modals generated from a single data source (`script.js`)
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Contact form powered by [FormSubmit](https://formsubmit.co/) (no backend required)
- SEO: Open Graph, Twitter Cards, JSON-LD, `robots.txt`, `sitemap.xml`, custom `404.html`

## Project Structure

```
portfolio/
├── index.html              # Single-page markup (empty containers; content rendered by JS)
├── style.css               # All styles (dark/light themes, responsive)
├── script.js               # Project data + UI logic (renders everything)
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon/
└── assets/
    ├── Abdelrahman_Adel_CV.pdf
    ├── images/og-image.png
    ├── certificates/       # Route & NTI certificate images
    └── projects/           # Per-project covers + fallback SVGs
```

## Run Locally

The contact form requires the site to be served over HTTP(S) — opening `index.html` directly (`file://`) will not work.

```bash
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000

## Deployment to GitHub Pages

1. Create a repository named `abdelrhamanadel4-Flutter.github.io` (replace with your username if different).
2. Push the contents of `portfolio/` to the `main` branch.
3. In the repo: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. Your site goes live at `https://<username>.github.io/`.

## Contact Form Activation

The form posts to FormSubmit, which forwards submissions to `abdelrhamanadel4@gmail.com`.

1. Deploy the site (see above).
2. Submit the form once from the live site.
3. Click the **"Activate Form"** link in the confirmation email sent to your Gmail.
4. All future submissions arrive in your inbox.

## License

All rights reserved. Content is owned by Abdelrahman Adel.
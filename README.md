# Μάθε Μπριτζ – learn.heraklion-bridge.gr

Learning material of the Heraklion Bridge Club (Όμιλος Μπριτζ Ηρακλείου): lecture slides and interactive quizzes, all in Greek. It is a plain static site (HTML/CSS/JS, no build step) served by GitHub Pages at **https://learn.heraklion-bridge.gr**. The club's main website (www.heraklion-bridge.gr) stays on WordPress and links here.

## Contents

| URL | What | Files |
|---|---|---|
| `/` | home page with a button per section | `index.html` |
| `/lectures/` | lecture slides ([reveal.js](https://revealjs.com) 5.1.0, stored in `lectures/vendor/reveal/`) | `lectures/index.html`, `lectures/mathima-N/index.html`, `lectures/deck.css`, `lectures/deck.js` |
| `/quiz/` | one quiz per lesson (1, 2 are listed; 5 and 6 exist but are hidden for now: unlinked and `noindex`) | `quiz/index.html`, `quiz/mathima-N/{index.html,questions.js}` |

Shared parts: `assets/site.js` (top menu and footer – **edit the `menu` and `footer` blocks at the top**), `assets/style.css`, `assets/quiz.js` (the quiz engine).

## Editing

- **Add a button to the home page:** copy one `<a class="quiz-tile">…</a>` block in `index.html`.
- **Menu:** `menu` list at the top of `assets/site.js`. Addresses starting with `https://` are used as they are (links to the club's site).
- **Quiz questions:** plain text in `quiz/mathima-N/questions.js` (instructions at the top of the file). The page picks changes up automatically.
- **New quiz (e.g. lesson 7):** copy `quiz/mathima-6/` to `quiz/mathima-7/`, edit `questions.js` and the texts in `index.html`, then add it to the menu in `assets/site.js`, to the list in `quiz/index.html` and to `sitemap.xml`. Set `next` in the previous quiz's `questions.js` to `'../mathima-7/'`.
- **Slides:** each slide is a `<section>…</section>` in `lectures/mathima-N/index.html` (lectures 1 and 2 exist). Building blocks (styled in `lectures/deck.css`): `<div class="example">`, `class="fragment"`, playing cards `<span class="pc">♠K</span>` (add `red` for ♥ ♦). **New deck:** copy `lectures/mathima-1/`, replace the slides, add a tile in `lectures/index.html` and the page in `sitemap.xml`.
  Shortcuts while viewing: arrows/Space = next/previous, **Esc** = overview, **F** = full screen, **?** = help; add `?print-pdf` to the address to print or save as PDF.

## Preview on your computer

```bash
python3 -m http.server 8000
```
then open http://localhost:8000.

## Publishing (GitHub Pages + `learn.heraklion-bridge.gr`)

1. Repository → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)`.
2. DNS for `heraklion-bridge.gr`: add a **CNAME** record `learn` → `<your-github-username>.github.io` (in Cloudflare set it to *DNS only*).
3. **Settings → Pages → Custom domain**: `learn.heraklion-bridge.gr` (the `CNAME` file in this repo already says so), then tick **Enforce HTTPS** once it is offered.

## Credits

Quiz questions and slides are based on the lesson summaries of the first cycle (Γιώργος Φλουρής). reveal.js is MIT-licensed (`lectures/vendor/reveal/LICENSE`).

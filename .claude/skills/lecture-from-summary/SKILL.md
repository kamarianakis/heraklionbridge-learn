---
name: lecture-from-summary
description: Turn a lesson-summary PDF (e.g. A2.pdf, "Περίληψη μαθήματος: Α΄ κύκλος, μάθημα N") into the Greek reveal.js lecture deck for learn.heraklion-bridge.gr, and create the matching quiz if it does not exist yet. Use when the user gives a summary PDF and asks for the lecture/slides/notes ("γράψε μου το μάθημα", "lecture notes", "διαφάνειες") and/or the quiz of a lesson.
argument-hint: <path to summary PDF> [quiz exists | create quiz]
---

# Lecture (and quiz) from a lesson-summary PDF

The site is a plain static site (no build step). Everything is in Greek. A lesson N has up to two artifacts:

| Artifact | Path | Reference to copy the style from |
|---|---|---|
| Slides | `lectures/mathima-N/index.html` | `lectures/mathima-1/` and `lectures/mathima-2/` |
| Quiz | `quiz/mathima-N/{index.html,questions.js}` | `quiz/mathima-2/` (header comment of `quiz/mathima-1/questions.js` documents every field) |

"Lecture notes" in the user's words = the slide deck. Stay consistent with the existing decks and quizzes: read at least one existing deck in full before writing a new one.

## Workflow

1. **Read the PDF.** Use `Read` with `pages` (it shows page images, so suit symbols and tables are visible); `pdftotext -layout` is available as a cross-check. Find the lesson number N from the title/filename (A2.pdf → N=2). The summary is the source of truth.
2. **Check what exists:** `ls lectures quiz`, and whether `quiz/mathima-N/` exists. The user usually says whether the quiz is already there; if it is, read its `questions.js` — the deck must agree with it (same terms, same examples where sensible, same question count in the last slide).
3. **Write the deck** `lectures/mathima-N/index.html` (see "Deck conventions"). Do not copy long passages of the summary verbatim into slides; explain, then give an example.
4. **Wire it into the site** (see "Wiring").
5. **Quiz:** only if it does not exist (see "Creating a quiz").
6. **Verify visually** (see "Verification"), then report. Do **not** commit unless the user asks; leave the source PDF untracked unless asked.

## Deck conventions

Copy the `<head>`/script skeleton of `lectures/mathima-2/index.html` (change title, descriptions, canonical/og URLs to `/lectures/mathima-N/`). Slide order:

1. **Title** (suit symbols, `<h1>`, "Α΄ κύκλος · Μάθημα N", club name, note about navigation).
2. **«Τι θα δούμε»** – numbered list of the summary's sections + the example/quiz teaser box.
3. **«Από το προηγούμενο μάθημα»** – 3 bullets recalling what the lesson builds on + what is new today (skip for lesson 1).
4. **Content slides**, grouped by the summary's sections; each slide starts with `<div class="kicker">K · Τίτλος ενότητας</div>`. One idea per slide: short bullets (≤ 4–5), then an `.example` box or a diagram. After a rule, add a "Τι παίζεις; / Ποιος κερδίζει; / Τι έγινε;" practice slide whose answer is hidden in a `class="fragment answer"` block.
5. **«Συνοψίζοντας»** (`ul.recap`) – one bullet per section.
6. **«Τι ακολουθεί»** – bullets + buttons: quiz of lesson N, previous lecture, `https://www.heraklion-bridge.gr/lessons/`, `../`. State the number of quiz questions (count them, see below).

Target ≈ 22–28 slides. Every slide must fit in 1280×720 (and 720×1280 portrait); if one overflows, split it or trim text — don't shrink fonts.

Building blocks (all styled in `lectures/deck.css`; add new CSS there, never inline big styles, and add a `.portrait` variant if the block is a multi-column grid):

- Layout: `.cols` / `.cols.even` (two columns), `.example` (adds the «Παράδειγμα» label), `.note`, `.center`, `.big`.
- Cards: `<span class="pc">♠K</span>` (+ `red` for ♥♦, sizes `sm`/`xs`, `on` highlight, `dim`, `ghost` for a not-yet-played seat); hand by suit: `.hand` (see mathima-1 slide «Παράδειγμα: ένα χέρι»).
- Table diagrams: `.compass` (roles: `.seat.n/.e/.s/.w` with `ax1` N–S blue / `ax2` E–W purple, `.tag` = role pill, `.tag.def` = opening lead), `.trick` (one trick: each `.seat` has `<b>` name, `.pc`, `<i>` order), `.pile`.
- Auction: `table.auction` with header order **Δύση, Βορράς, Ανατολή, Νότος**; leave leading cells empty so the dealer sits in his column; mark the closing passes with `class="end"` (yellow).
- Bidding: `.bidbox` + `.bid` (`.pass`, `.ok`, `.no`), `.ladder` (35 bids), `.cmp` (compare two bids), `.counts`, `.need` (generic table; `.key`, `.ok`, `.bad`), `.outcomes`/`.oc`, `.rules`/`.rule`, `.flow`, `.suits`, `.trump-pill`.
- `class="fragment"` on cells/blocks reveals them step by step; answers always go in `.fragment.answer`.

Text rules:

- **Red suits:** wrap ♥ and ♦ in `<span class="rs">♥</span>` in running text (inside `.pc.red`/`.hand .suit.red` use `red`). ♠ ♣ stay plain.
- **ΧΑ (no trump) must be typed with Greek letters Χ and Α**, never Latin X A. After writing, run a grep for mixed-script `XA|ΧA|XΑ`.
- Vocabulary used on the site (keep it): εκτελεστής, μορ, αντάμ, αμυνόμενοι, άξονας, λεβέ (= μπάζα), ατού, ΧΑ, τσάκα, ονέρ / λιμά, μαζέρ / μινέρ, συμβόλαιο, δέσμευση, θήκη (ντόνα/διανομή), κουτί αγορών, πάσο, «το έβγαλε ακριβώς», «το έβγαλε με N άνω λεβέ», «μπήκε μέσα (N λεβέ κάτω)». **dealer** and **bridgemate** stay in Latin letters. Don't introduce new terminology that the summary doesn't use. Things the summary only counts but defers are **not named at all** in the lectures: the remaining bidding-box calls (X/κοντρ, XX/ρεκοντρ) and the 2 helper cards (STOP, ALERT) — only the pass is mentioned ("οι υπόλοιπες δηλώσεις και οι βοηθητικές δεν θα μας χρειαστούν για τώρα"). Likewise for anything else the user says is out of scope.
- Address the learner informally (singular «δες», «δοκίμασε»), as in lecture 1/2.
- Table conventions: clockwise order is Β → Α → Ν → Δ → Β, so the player **to the left of** X is the next one clockwise (left of Νότος = Δύση, left of Δύση = Βορράς, left of Βορράς = Ανατολή, left of Ανατολή = Νότος). Declarer's left-hand opponent makes the opening lead.
- **Check every example for correctness** before finishing: auctions are legal (each call higher than the previous, ends with 3 passes or 4 at the start), the declarer is the first of the *axis* to bid the final denomination, tricks needed = level + 6, who wins each trick, etc. Prefer examples that don't contradict a "usually" rule of the summary (e.g. don't pick an honor-on-honor example that clashes with "second hand low" in a confusing way).
- Derived facts (e.g. defenders need 8 − level tricks) are fine if they follow directly from the summary; don't add bridge theory that isn't in it.

## Wiring (after the deck exists)

- `lectures/index.html`: add a `<a class="quiz-tile" href="mathima-N/">` block (copy the existing one: kicker «Μάθημα N · <slide count> διαφάνειες», title, one-sentence description). Slide count = `grep -c "<section" lectures/mathima-N/index.html`. Keep the credit/quiz-link note at the bottom accurate.
- `sitemap.xml`: add `https://learn.heraklion-bridge.gr/lectures/mathima-N/` after the previous lecture.
- Previous deck (`lectures/mathima-(N-1)/index.html`), last slide: add a `btnlink alt` to `../mathima-N/` if it isn't there.
- `README.md` already says `lectures/mathima-N/`; update it only if something structural changed.
- Home `index.html` is generic ("Διαφάνειες μαθημάτων"); only touch it if the numbers it shows change (quiz count, see below).

## Creating a quiz (only if `quiz/mathima-N/` does not exist)

1. `cp -r quiz/mathima-6 quiz/mathima-N`; in `index.html` replace every «6» / title / description / canonical / og URL / the "Δείτε και το κουίζ του μαθήματος …" link; in `questions.js` replace the title comment and questions.
2. **Questions:** 18–21, Greek, 4 options, one correct. Cover each fact of the summary at least once, then add worked-example questions that reuse the board widgets: `auction`, `context`, `hand`, `fullhand`, `trump`, `trick` (documented at the top of `quiz/mathima-1/questions.js`). Write `correct: 0` as the right answer — the engine shuffles unless `shuffle: false` (use `false` whenever the options are Βορράς/Ανατολή/Νότος/Δύση or are ordered/numbered in a way that matters). `explain` always gives the reason, quoting the rule from the summary.
3. **Chain:** set `next` in `quiz/mathima-N/questions.js` to the following existing quiz (or `null` if last) and update the previous quiz's `next` to `{ label: 'Κουίζ μαθήματος N', href: 'quiz/mathima-N/' }` (keep the numeric order of existing quizzes).
4. **Register it:** `assets/site.js` menu (`Κουίζ μαθήματος N`), a tile in `quiz/index.html` (question count = number of questions), `sitemap.xml`, and the home page tile text in `index.html` («K κουίζ · M ερωτήσεις» — recompute both). Update `README.md` ("one quiz per lesson (1, 2, 5, 6)").
5. Question count: `grep -c "^    {" quiz/mathima-N/questions.js` (each question object starts at 4-space indent) — cross-check with the number in the deck's last slide and the tiles.

## Verification

```bash
cd <repo> && python3 -m http.server 8123   # run in background
```

Open `http://localhost:8123/lectures/mathima-N/` in the Browser pane, resize to 1280×720, then for each slide run in the page console:

```js
Reveal.configure({transition:'none'}); Reveal.slide(i, 0, 99)   // 99 = show all fragments
```

wait ~1 s (screenshots otherwise show the previous slide), take a screenshot at scale 0.6 and look for overflow, cropped boxes and wrong highlights. Overflow check for all slides at once (every value should stay below ~700 in landscape):

```js
(async()=>{const chk=s=>Math.max(...[...s.children].map(c=>c.offsetTop+c.offsetHeight));const o=[];for(let i=0;i<Reveal.getTotalSlides();i++){Reveal.slide(i,0,99);await new Promise(r=>setTimeout(r,200));o.push((i+1)+':'+chk(Reveal.getCurrentSlide()))}return o.join(' ')})()
```

Then `resize_window` preset `mobile`, reload, and spot-check 2–3 slides with grids (tables, `.rules`, `.outcomes`). Reset the viewport with preset `desktop` and stop the server when done. For a quiz, open `quiz/mathima-N/` and click through a few questions incl. the board widgets.

## Final report to the user

Say what was created (deck path, slide count, quiz created or reused), which existing files were touched (lectures index, sitemap, previous deck, README, …), anything in the summary that was ambiguous or that you derived/added, and that nothing was committed.

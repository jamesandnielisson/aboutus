# CLAUDE.md — project handbook (read first, update last)

Personal "about us" website for **James & Nielisson**. Plain HTML/CSS/JS, no build step, no dependencies.
Hosted on GitHub Pages from `main` / root → remote `https://github.com/jamesandnielisson/aboutus.git`.
The owner is not a developer: `README.md` is the owner-facing guide (keep it in sync when behaviour changes).

## Working rules for Claude
1. **Start of every task:** read this file (auto-loaded), then only the files the task touches. Don't re-explore the whole repo.
2. **End of every task that changes files:** add an entry to the **Change log** below (newest first) and update
   **Open items** / **Architecture notes** if anything changed. Keep entries short (what + which files + why).
3. Content changes go in `js/content.js` only. Layout/logic changes go in `main.js` / `feed.js` / `styles.css`.
4. Match the existing style: ES5 IIFEs (`var`, `function`, no modules/arrow functions), the `el()` / `setText()` /
   `image()` helpers, BEM-ish CSS classes (`block__elem`, `is-open`, `is-visible`), colours via `:root` tokens.
5. Anything added to `index.html` that also exists on `feed.html` (header/menu, footer) must be mirrored in both,
   and the JS for it lives in both `main.js` and `feed.js` (they are not shared).
6. Test by opening `index.html` / `feed.html` directly in a browser (`file://` works; YouTube/Vimeo embeds won't).
7. Commit only when asked. Commit messages so far are terse ("maj"); use clearer ones when committing for the owner.

## File map
| File | Role |
|---|---|
| `index.html` | Home page skeleton (sections: `#home`, video, `#our-story`, `#albums`, `#more`, `#feed`, closing, footer). Empty elements with ids filled by JS. |
| `feed.html` | "Our Feed" page (all posts, Instagram-style grid + post viewer). Same header/menu as home. |
| `js/content.js` | `window.SITE_CONTENT` — **all text, image paths, albums, video, feed posts**. Sections labelled `SECTION 1 … 6`. `PLACEHOLDER` marks unwritten text. |
| `js/feed-posts.js` | Normalises `SITE_CONTENT.feed.posts` → `window.FEED_POSTS` (sorted newest first, `id`, `dateText` en-GB, local-time date parsing). Used by both pages. |
| `js/main.js` | Builds the home page from content: hero (+ "latest feed post" peek card), video, story, albums + lightbox, more-cards (inline SVG icons), feed preview, closing, menu/scroll-spy, reveal-on-scroll. |
| `js/feed.js` | Builds `feed.html`: profile header, grid, post viewer, menu toggle. |
| `css/styles.css` | All styles (~820 lines). Tokens in `:root` at top (colours, fonts, radius, shadows, `--header-h`). |
| `assets/images/{hero,story,albums/<name>,more,closing}` | Resized site images (≤1600 px). Album folders: life-together, family-friends, travel, nature, animals, everyday-moments, celebrations. |
| `assets/images/OurPhotos/` | Owner's full-size originals (~180 MB). **Not used by the site.** Source for new resized images. |
| `assets/videos/OurIntro.mp4` (+ `poster.jpg`) | Intro video, ~90 MB. |

Script load order on both pages: `content.js` → `feed-posts.js` → `main.js` | `feed.js`.

## Architecture notes / gotchas
- Album photos: `folder` + `photos: ["a.jpg", {file, caption}]`; optional `cover`. First photo = cover by default.
- Feed post shape: `{ image, alt, date: "YYYY-MM-DD", place?, text: string|string[], id? }`. Links use `feed.html#<id>`
  (id derived from image filename). `feed.previewCount` (6), `feed.showLatestOnHome`, `feed.latestLabel`.
- Menu labels come from `SITE_CONTENT.menu` via `[data-menu]` attributes; adding a menu item = add `<li>` in **both** HTML files + a key in `menu`.
- More-cards icons available: heart, home, leaf, sun, book, compass, star, coffee, music, paw, gift, smile (defined in `main.js` `icon()`).
- GitHub Pages is case-sensitive: paths in `content.js` must match filenames exactly.
- File size limits: GitHub rejects files >100 MB; the web uploader caps at 25 MB.

## Open items / known issues
- [ ] Many texts are still `PLACEHOLDER` in `content.js` (hero intro, story chapters, more-cards, closing, example feed posts).
- [ ] `assets/images/OurPhotos/` (~180 MB of originals, incl. a `.HEIC` and a `.MOV`) **is committed to git**, although the README says to leave it out (it publishes full-size originals). Consider a `.gitignore` + removing it from the repo — ask the owner first.
- [ ] `OurIntro.mp4` is ~90 MB: under GitHub's 100 MB limit but slow for visitors; compressing it (HandBrake) would help.
- [ ] `assets/images/feed/` doesn't exist yet; current feed posts reuse album photos.

## Change log (newest first)
- **2026-10-24** — Added this `CLAUDE.md` handbook (project map, rules, open items, change log) so future sessions can resume quickly.
- **2026-10-24** (commit `de09c44` "maj") — Feed page now uses the full site menu (hamburger toggle in `feed.js`) instead of a "Back to home" link; added "Our Feed" to the menu on both pages (`menu.feed`); added a "Latest from our feed" peek card in the hero (`#hero-peek`, `main.js`, styles); removed `feed.page.backText`.
- **2026-10-24** (commit `9d20070` "all files") — Initial site: home page with hero, video, story, albums + lightbox, more-cards, feed preview, closing; `feed.html`; README guide.

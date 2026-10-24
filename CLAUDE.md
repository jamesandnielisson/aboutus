# CLAUDE.md — project handbook (read first, update last)

Personal "about us" website for **James & Nielisson**. Plain HTML/CSS/JS, no build step, no dependencies.
Hosted on GitHub Pages from `main` / root at **https://jamesandnielisson.github.io/** → remote
`https://github.com/jamesandnielisson/jamesandnielisson.github.io.git` (repo renamed from `aboutus` on 2026-10-24; the old
`/aboutus/` URL no longer works). The local folder is still named `aboutus`, which doesn't matter.
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
7. Never commit or push unless explicitly asked, and don't offer to; the owner does git themselves.
8. All site URLs are relative (no leading `/`), so the site works both at `/aboutus/` and at a domain root.

## File map
| File | Role |
|---|---|
| `index.html` | Home page skeleton (sections: `#home`, video, `#our-story`, `#albums`, `#feed`, closing, footer). Empty elements with ids filled by JS. Backgrounds alternate: albums tint → feed white → closing tint. |
| `feed.html` | "Our Feed" page (all posts, Instagram-style grid + post viewer). Same header/menu as home. |
| `js/content.js` | `window.SITE_CONTENT` — **all text, image paths, albums, video, feed posts**. Sections labelled `SECTION 1 … 6`. `PLACEHOLDER` marks unwritten text. |
| `js/feed-posts.js` | Normalises `SITE_CONTENT.feed.posts` → `window.FEED_POSTS` (sorted newest first, `id`, `dateText` en-GB, local-time date parsing). Used by both pages. |
| `js/main.js` | Builds the home page from content: hero (+ "latest feed post" peek card), video, story, albums + lightbox, feed preview, closing, menu/scroll-spy, reveal-on-scroll. |
| `js/feed.js` | Builds `feed.html`: profile header, grid, post viewer, menu toggle. |
| `css/styles.css` | All styles (~820 lines). Tokens in `:root` at top (colours, fonts, radius, shadows, `--header-h`). |
| `assets/images/{hero,story,albums/<name>,closing}` | Resized site images (≤1600 px). Album folders: life-together, family-friends, travel, nature, animals, everyday-moments, celebrations. |
| `assets/images/OurPhotos/` | Owner's full-size originals (~180 MB). **Not used by the site.** Source for new resized images. |
| `assets/videos/OurIntro.mp4` (+ `poster.jpg`) | Intro video, ~90 MB. |
| `assets/videos/Our_Vacation_2023-2024_Brazil.mp4` | Feed video post, ~13 MB. |

Script load order on both pages: `content.js` → `feed-posts.js` → `main.js` | `feed.js`.

## Architecture notes / gotchas
- Album photos: `folder` + `photos: ["a.jpg", {file, caption}]`; optional `cover`. First photo = cover by default.
- Feed post shape: `{ image?, video?, alt, date: "YYYY-MM-DD", place?, text: string|string[], id? }` — needs `image` or `video`
  (both = image is the video's poster). `FEED_POSTS[i].src` is the image ("" for video-only), `.video` the mp4. Thumbnails go
  through `postThumb()` (in both `main.js` and `feed.js`): image, else a muted `<video src="…#t=0.1">` first frame; video tiles get
  `playBadge()` (`.feed-tile__play`). The post dialog has `#post-img` + `#post-video` (toggled via `hidden`; `stopVideo()` on
  change/close; swipe and arrow keys ignored when the target is the video). Links use `feed.html#<id>` (id from video/image filename). `feed.previewCount` (6), `feed.showLatestOnHome`, `feed.latestLabel`.
- Menu labels come from `SITE_CONTENT.menu` via `[data-menu]` attributes; adding a menu item = add `<li>` in **both** HTML files + a key in `menu`.
- Section numbering in comments (`5b` = feed, `6` = closing) was kept after "5. More About Us" was removed — gaps are intentional, not missing code.
- No Python, Node or ffmpeg on this machine: edit with the Edit tool; JS can't be syntax-checked locally, and the Chrome
  extension can't open `file://` pages — ask the owner to check in the browser.
- `el()` sets every prop with `setAttribute`, so never pass `null`/`undefined` values (they become the string "null").
- GitHub Pages is case-sensitive: paths in `content.js` must match filenames exactly.
- File size limits: GitHub rejects files >100 MB; the web uploader caps at 25 MB.

## Open items / known issues
- [ ] Many texts are still `PLACEHOLDER` in `content.js` (hero intro, story chapters, closing, example feed posts).
- [ ] `assets/images/OurPhotos/` (~180 MB of originals, incl. a `.HEIC` and a `.MOV`) **is committed to git**, although the README says to leave it out (it publishes full-size originals). Consider a `.gitignore` + removing it from the repo — ask the owner first.
- [ ] `OurIntro.mp4` is ~90 MB: under GitHub's 100 MB limit but slow for visitors; compressing it (HandBrake) would help.
- [ ] `assets/images/feed/` doesn't exist yet; current feed posts reuse album photos.
- [ ] Brazil video post: date set to 2026-10-24 (so it shows first) and text is a placeholder — owner to confirm/replace. Could get a cover `image:`.
- [ ] Video-post support not yet checked in a real browser (owner to verify, incl. on a phone).

## Change log (newest first)
- **2026-10-24** — Livelier "Latest from our feed" card (CSS only): pulsing green dot (`--live` token, `live-ping`/`live-glow`),
  rotating conic-gradient story ring on the thumbnail (`spin`, faster on hover), green glow on hover. Looping animations are
  explicitly disabled under `prefers-reduced-motion` (the global .01ms rule would make them flicker).
- **2026-10-24** — Repo renamed on GitHub to `jamesandnielisson.github.io` (site now at the root URL); local `origin` updated to match.
- **2026-10-24** — Feed posts can now be videos (`video:` field; optional `image:` = cover). Touched `feed-posts.js`, `main.js`
  (`postThumb`, `playBadge`, feed tiles + hero peek), `feed.js` (tiles, dialog video, `stopVideo`), `feed.html` (`#post-video`),
  `styles.css` (video sizing, `.feed-tile__play`), `content.js` (docs + first video post: Brazil vacation), README.
- **2026-10-24** — Removed the "More About Us" section entirely (owner request): section markup + menu link on both pages, `SITE_CONTENT.more` and `menu.more`, the cards code and `ICONS`/`icon()` in `main.js`, `.more*` CSS, the `.feed-preview { padding-top: 0 }` rule that depended on it, README docs, and `assets/images/more/` (2 photos). Recoverable from commit `3b38ebb`.
- **2026-10-24** — Added this `CLAUDE.md` handbook (project map, rules, open items, change log) so future sessions can resume quickly.
- **2026-10-24** (commit `de09c44` "maj") — Feed page now uses the full site menu (hamburger toggle in `feed.js`) instead of a "Back to home" link; added "Our Feed" to the menu on both pages (`menu.feed`); added a "Latest from our feed" peek card in the hero (`#hero-peek`, `main.js`, styles); removed `feed.page.backText`.
- **2026-10-24** (commit `9d20070` "all files") — Initial site: home page with hero, video, story, albums + lightbox, more-cards, feed preview, closing; `feed.html`; README guide.

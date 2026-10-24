# Our Story — a personal website

A simple, warm one-page website that introduces us through our words, photos, albums and an introduction video.
It is plain HTML, CSS and JavaScript. There is nothing to install and no build step, and it runs for free on **GitHub Pages**.

---

## 1. What's in each folder

```
index.html              The page itself (layout only — you rarely need to touch it)
css/styles.css          The design: colours, fonts, spacing
js/content.js           ★ ALL YOUR TEXT, PHOTOS, ALBUMS AND VIDEO — the file you edit
js/main.js              The code that builds the page and runs the albums (don't need to touch)
assets/
  images/
    hero/               The big photo at the top
    story/              Photos for the "Our Story" chapters
    albums/
      life-together/    One folder per album
      family-friends/
      travel/
      nature/
      animals/
      everyday-moments/
    OurPhotos/          Your original, full-size photos (not used by the site — see note below)
    feed/               Photos for your Feed posts (create it when you add your first one)
    closing/            Photos for the closing collage
  videos/               Your introduction video (and its poster image)
feed.html               The "Our Feed" page (all posts)
README.md               This guide
```

**Everything you'll ever want to change is in `js/content.js`.** Open it with any text editor. Notepad works, and the free [VS Code](https://code.visualstudio.com/) is nicer.

The photos on the site are resized copies (max 1600 px) of the originals in `assets/images/OurPhotos/`. The originals add up to about 180 MB, so **leave the `OurPhotos` folder out when uploading to GitHub**: it would make the site slow to upload, and it would publish your full-size originals.

All images named `placeholder-….svg` are temporary stand-ins. Each one shows the text *"Placeholder · replace …"* so you can spot it easily.

---

## 2. Changing the text

1. Open `js/content.js`.
2. Find the section you want (they're labelled `SECTION 1 — WELCOME`, `SECTION 2 — INTRODUCTION VIDEO` and so on).
3. Change the words **between the quotes**. Save the file and refresh the browser.

Things still waiting for your own words are marked `PLACEHOLDER`.

Paragraphs are written as a list, one paragraph per line:

```js
text: [
  "This is the first paragraph.",
  "This is a second paragraph.",
],
```

A few rules keep things working:

- Keep the quotes `"` around the text. If your text itself needs a double quote, write `\"`. Apostrophes (`we're`) are fine.
- Keep the comma `,` at the end of each line or item.
- If the page suddenly appears empty, you probably removed a comma or a quote. Undo your last change, or look closely at the line you just edited.

---

## 3. Adding and replacing photos

### Good photo habits
- Use **.jpg** for photos.
- Resize photos before adding them. About **2000 pixels** on the longest side is plenty, and keeps the site fast on phones. Phone photos straight from the camera are often 5–10 MB each; aim for under ~500 KB.
  Free tools: [squoosh.app](https://squoosh.app) in the browser, or Windows "Photos → Resize".
- Use simple file names: lowercase letters, numbers and dashes, with **no spaces**. For example `beach-day.jpg`, not `Beach Day!.JPG`.
- File names are **case-sensitive on GitHub Pages**. `Photo.JPG` and `photo.jpg` are different files, and the name in `content.js` must match exactly.

### Replacing a single photo (for example the big welcome photo)
1. Copy your photo into the matching folder, for example `assets/images/hero/us-at-the-lake.jpg`.
2. In `content.js`, change the path:
   ```js
   image: {
     src: "assets/images/hero/us-at-the-lake.jpg",
     alt: "The two of us smiling by a lake",
   },
   ```
3. The `alt` text describes the photo for people using screen readers. Write a short, honest description.
4. Delete the old `placeholder-….svg` file once nothing uses it any more.

### Adding photos to an album
1. Copy the photos into the album's folder, for example `assets/images/albums/travel/`.
2. In `content.js`, find that album and add the file names to its `photos` list:
   ```js
   photos: [
     "rome-2024.jpg",
     "mountain-hike.jpg",
     { file: "paris.jpg", caption: "Our first trip together" },  // with a caption
   ],
   ```
   You can write just the file name, or `{ file: ..., caption: ... }` to show a caption under the large photo.
3. Photos appear in the order they're listed. To reorder them, move the lines. To remove one, delete its line.
4. The **cover** of the album card is the first photo in the list. To pick a different one, add `cover: "rome-2024.jpg",` to the album.

### Creating a new album
1. Create a new folder, for example `assets/images/albums/garden/`.
2. Copy your photos into it.
3. In `content.js`, inside `albums → list`, add a new block (copy an existing one and change it):
   ```js
   {
     title: "Our Garden",
     description: "Where we spend most summer evenings.",
     folder: "assets/images/albums/garden/",
     photos: [
       { file: "roses.jpg", caption: "The first roses of the year" },
       "picnic.jpg",
     ],
   },
   ```
4. Albums appear in the order they're listed. To remove an album, delete its whole block, from `{` to `},`.

### Our Feed (Instagram-style posts)
Short posts about your everyday life. The Home page shows the newest few (below the Photo Albums), and the **Explore our feed** button opens `feed.html`, which shows them all.

1. Copy the photo into `assets/images/feed/` (create the folder the first time). Photos already used in an album can be reused too.
2. In `content.js`, find `feed → posts` and add a block anywhere in the list:
   ```js
   {
     image: "assets/images/feed/sunday-pancakes.jpg",
     alt: "A stack of pancakes with berries",
     date: "2026-10-26",          // year-month-day
     place: "Home",                // optional
     text: "Sunday pancakes are a non-negotiable in this house.",
   },
   ```
   **A video post** works the same way. Copy the `.mp4` into `assets/videos/` and write `video:` instead of `image:`:
   ```js
   {
     video: "assets/videos/our-trip.mp4",
     alt: "Short video of our trip to the mountains",
     date: "2026-11-02",
     text: "A few minutes of our favourite trip.",
   },
   ```
   Video posts show a small ▶ on their tile, and they only play when someone presses play. If you also add an `image:`, that photo is used as the cover. Otherwise the first frame of the video is shown. Keep feed videos small (ideally under 25 MB) so they load fast on phones.
3. Posts are sorted by `date`, newest first, so you never need to reorder them.
4. `previewCount` sets how many posts the Home page shows. **6** looks best: one row on computers, two rows of three on phones.

---

## 4. Adding or replacing the introduction video

Until you add a video, a friendly "coming soon" card is shown.

**Option A: your own video file (recommended)**
1. Export the video as **.mp4** (H.264). That format plays on every phone and computer.
2. Copy it into `assets/videos/`, for example `assets/videos/introduction.mp4`.
3. In `content.js`:
   ```js
   type: "file",
   src: "assets/videos/introduction.mp4",
   poster: "assets/videos/poster.jpg",   // optional still image shown before playing
   ```
   ⚠️ GitHub does not accept files larger than **100 MB**, and anything over 50 MB is slow for visitors. Keep the video short, or compress it (the free [HandBrake](https://handbrake.fr/) app's "Fast 1080p30" preset works well). If it's still too big, use option B.
   ⚠️ The **"Upload files" page on github.com only accepts files up to 25 MB**. For a bigger video, upload it with the free [GitHub Desktop](https://desktop.github.com/) app instead, which accepts up to 100 MB.

**Option B: YouTube or Vimeo**
Upload the video there. You can set it to "Unlisted" so it doesn't appear in search. Then:
```js
type: "youtube",                                   // or "vimeo"
src: "https://www.youtube.com/watch?v=XXXXXXXXXXX", // the normal link to your video
```

Videos never play automatically. Visitors press play themselves.

---

## 5. Previewing the website on your computer

Just **double-click `index.html`**. It opens in your browser and works fully, with no server needed.
After editing `content.js`, save it and press **F5** (refresh) in the browser.

YouTube and Vimeo videos may not play when the page is opened this way. They will work once the site is online.

---

## 6. Putting the website online with GitHub Pages (free)

### First time
1. Create a free account at [github.com](https://github.com).
2. Click the **+** at the top right, then **New repository**.
   - Give it a name, for example `our-story`.
   - Choose **Public**. Free GitHub Pages needs a public repository.
   - Click **Create repository**.
3. On the new repository page, click **"uploading an existing file"**. Or go to **Add file → Upload files**.
4. Open the website folder on your computer, select **everything inside it** (`index.html`, `feed.html`, `css`, `js`, `assets`, `README.md`), and drag it all into the browser window.
   Upload the *contents* of the folder, so that `index.html` sits at the top level of the repository, not inside another folder.
5. Click **Commit changes**.
6. Go to **Settings → Pages** (in the left sidebar).
7. Under **Build and deployment → Source**, choose **Deploy from a branch**.
   Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
8. Wait a minute or two, then refresh the page. Your address will appear at the top:
   `https://YOUR-USERNAME.github.io/our-story/`

> 🔒 **Privacy note:** a GitHub Pages site and its repository are public. Anyone with the link can see the site, and the files can be found on GitHub. Only publish photos and details you are comfortable sharing. Search engines rarely find small sites like this, but don't count on that.

### Updating later
- **To change text:** open `js/content.js` on GitHub, click the ✏️ pencil icon, make your edits and click **Commit changes**.
- **To add photos:** go into the right folder on GitHub (for example `assets/images/albums/travel`), click **Add file → Upload files**, drop the photos in and commit. Then add their names to `content.js` as described above.
- **To delete a file:** open it on GitHub, click the **⋯** menu, then **Delete file**.
- Changes appear online within a minute or two. If you don't see them, refresh with **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac).

Prefer working on your computer? The free [GitHub Desktop](https://desktop.github.com/) app lets you edit files locally and click "Push" to publish them.

---

## 7. Changing colours or fonts (optional)

Open `css/styles.css`. At the very top, under `:root`, you'll find every colour with a short note, for example `--sage-dark: #4c5f45; /* buttons, links */`.
Change a colour code and the whole site follows. Fonts are set in `--font-heading` and `--font-body`, and loaded from Google Fonts in `index.html`.

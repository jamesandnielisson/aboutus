/* =====================================================================
   MAIN SCRIPT — builds the page from js/content.js and runs the menu,
   album window and photo viewer. You should not need to edit this file;
   change your text and photos in js/content.js instead.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  if (!C) {
    // Usually means there is a typo (e.g. a missing comma or quote) in content.js
    document.getElementById("main").innerHTML =
      '<p style="padding:3rem 1.5rem;text-align:center">The website content could not be loaded. ' +
      "Please check <strong>js/content.js</strong> for a missing comma or quotation mark.</p>";
    console.error("SITE_CONTENT is missing — check js/content.js for a syntax error.");
    return;
  }

  /* ---------- Small helpers ---------- */
  var $ = function (id) { return document.getElementById(id); };

  // Create an element: el("p", { className: "x" }, ["text", childNode])
  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        if (key === "className") node.className = props[key];
        else if (key === "text") node.textContent = props[key];
        else node.setAttribute(key, props[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function setText(id, value) {
    var node = $(id);
    if (node) node.textContent = value || "";
  }

  // Accept either "one paragraph" or ["paragraph", "paragraph"]
  function paragraphs(container, value) {
    container.textContent = "";
    [].concat(value || []).forEach(function (text) {
      container.appendChild(el("p", { text: text }));
    });
  }

  // Create an <img>, lazy-loaded unless told otherwise
  function image(src, alt, props) {
    var img = el("img", Object.assign({ src: src, alt: alt || "", loading: "lazy", decoding: "async" }, props || {}));
    img.addEventListener("error", function () {
      console.warn("Image not found — check the file name and folder in content.js: " + src);
    });
    return img;
  }

  // A feed post's thumbnail: its photo, or else the first frame of its video
  function postThumb(post, alt, props) {
    if (post.src) return image(post.src, alt, props);
    return el("video", { src: post.video + "#t=0.1", muted: "", playsinline: "", preload: "metadata", "aria-hidden": "true" });
  }

  // Small ▶ badge shown on video posts
  function playBadge() {
    var badge = el("span", { className: "feed-tile__play", "aria-hidden": "true" });
    badge.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>';
    return badge;
  }

  /* =====================================================================
     BUILD THE PAGE
     ===================================================================== */

  /* ---------- General & menu ---------- */
  document.title = C.names ? C.names + " · Our Story" : "Our Story";
  if (C.description) document.querySelector('meta[name="description"]').setAttribute("content", C.description);
  document.querySelectorAll('[data-content="names"]').forEach(function (n) { n.textContent = C.names || ""; });
  document.querySelectorAll("[data-menu]").forEach(function (link) {
    link.textContent = (C.menu && C.menu[link.dataset.menu]) || link.dataset.menu;
  });

  /* ---------- 1. Hero ---------- */
  var hero = C.hero || {};
  setText("hero-eyebrow", hero.eyebrow);
  setText("hero-title", hero.title);
  paragraphs($("hero-intro"), hero.intro);
  $("hero-button").querySelector("span").textContent = hero.buttonText || "Explore our story";
  if (hero.image && hero.image.src) {
    $("hero-image").src = hero.image.src;
    $("hero-image").alt = hero.image.alt || "";
  } else {
    $("hero-image").closest("figure").hidden = true;
  }

  /* ---------- 2. Video ---------- */
  var video = C.video || {};
  setText("video-title", video.heading);
  setText("video-intro", video.intro);
  if (video.caption) { setText("video-caption", video.caption); $("video-caption").hidden = false; }
  renderVideo($("video-frame"), video);

  function renderVideo(frame, v) {
    var src = (v.src || "").trim();
    var type = (v.type || "file").toLowerCase();

    if (!src) {
      frame.appendChild(comingSoon(v.comingSoonText || "Our introduction video is coming soon."));
      return;
    }

    if (type === "youtube" || type === "vimeo") {
      var embed = embedUrl(type, src);
      if (!embed) {
        console.warn("Could not understand the " + type + " link in content.js: " + src);
        frame.appendChild(comingSoon(v.comingSoonText));
        return;
      }
      frame.appendChild(el("iframe", {
        src: embed,
        title: v.heading || "Introduction video",
        loading: "lazy",
        allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen",
        allowfullscreen: "",
        referrerpolicy: "strict-origin-when-cross-origin",
      }));
      return;
    }

    // Local video file. Never autoplays.
    var player = el("video", { controls: "", preload: "metadata", playsinline: "" });
    if (v.poster) player.setAttribute("poster", v.poster);
    player.src = src;
    player.appendChild(document.createTextNode("Your browser cannot play this video."));
    player.addEventListener("error", function () {
      console.warn("Video not found or not playable — check the path in content.js: " + src);
    });
    frame.appendChild(player);
  }

  function comingSoon(text) {
    var box = el("div", { className: "video__soon" }, [
      el("span", { className: "video__soon-icon", "aria-hidden": "true" }),
      el("p", { text: text }),
    ]);
    box.firstChild.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>';
    return box;
  }

  function embedUrl(type, url) {
    var m;
    if (type === "youtube") {
      m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
      return m ? "https://www.youtube-nocookie.com/embed/" + m[1] + "?rel=0" : null;
    }
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? "https://player.vimeo.com/video/" + m[1] + "?dnt=1" : null;
  }

  /* ---------- 3. Story ---------- */
  var story = C.story || {};
  setText("story-title", story.heading);
  setText("story-intro", story.intro);
  (story.chapters || []).forEach(function (ch, i) {
    var text = el("div", { className: "chapter__text" });
    paragraphs(text, ch.text);
    var media = ch.image && ch.image.src
      ? el("figure", { className: "chapter__media" }, [image(ch.image.src, ch.image.alt)])
      : null;
    $("story-chapters").appendChild(el("article", { className: "chapter reveal" }, [
      media,
      el("div", { className: "chapter__body" }, [
        el("span", { className: "chapter__number", text: String(i + 1).padStart(2, "0") }),
        el("h3", { className: "chapter__title", text: ch.title }),
        text,
      ]),
    ]));
  });

  /* ---------- 4. Albums ---------- */
  var albums = (C.albums && C.albums.list) || [];
  setText("albums-title", C.albums && C.albums.heading);
  setText("albums-intro", C.albums && C.albums.intro);

  // Turn each album's photo list into full paths: [{ src, caption, alt }]
  albums.forEach(function (album) {
    var folder = album.folder || "";
    if (folder && folder.slice(-1) !== "/") folder += "/";
    album._photos = (album.photos || []).map(function (p) {
      if (typeof p === "string") p = { file: p };
      return {
        src: folder + p.file,
        caption: p.caption || "",
        alt: p.alt || p.caption || album.title + " photo",
      };
    });
    album._cover = album.cover ? folder + album.cover : (album._photos[0] && album._photos[0].src);
  });

  albums.forEach(function (album, index) {
    var count = album._photos.length;
    var openBtn = el("button", { className: "album-card__open", type: "button" }, [
      (C.albums.viewText || "View album"),
      el("span", { className: "visually-hidden", text: ": " + album.title }),
    ]);
    openBtn.insertAdjacentHTML("beforeend", '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    openBtn.addEventListener("click", function () { openAlbum(index, openBtn); });

    $("albums-grid").appendChild(el("li", { className: "reveal" }, [
      el("article", { className: "album-card" }, [
        el("div", { className: "album-card__cover" }, [
          album._cover ? image(album._cover, "") : null,
          el("span", { className: "album-card__count", text: count + (count === 1 ? " photo" : " photos") }),
        ]),
        el("div", { className: "album-card__body" }, [
          el("h3", { className: "album-card__title", text: album.title }),
          el("p", { className: "album-card__desc", text: album.description }),
          openBtn,
        ]),
      ]),
    ]));
  });

  /* ---------- 5b. Feed preview ---------- */
  var feed = C.feed || {};
  var feedPosts = window.FEED_POSTS || [];
  setText("feed-title", feed.heading);
  setText("feed-intro", feed.intro);
  $("feed-button").querySelector("span").textContent = feed.buttonText || "Explore our feed";
  if (!feedPosts.length) $("feed").hidden = true;

  // Sneak peek of the newest post in the welcome section
  var latest = feedPosts[0];
  if (latest && feed.showLatestOnHome !== false) {
    var peek = $("hero-peek");
    peek.href = "feed.html#" + latest.id;
    [
      el("span", { className: "hero-peek__thumb" }, [postThumb(latest, "", { loading: "eager" })]),
      el("span", { className: "hero-peek__body" }, [
        el("span", { className: "hero-peek__label" }, [
          el("span", { className: "hero-peek__dot", "aria-hidden": "true" }),
          feed.latestLabel || "Latest from our feed",
        ]),
        el("span", { className: "hero-peek__text", text: latest.text[0] || latest.alt }),
        latest.dateText ? el("span", { className: "hero-peek__date", text: latest.dateText }) : null,
      ]),
    ].forEach(function (node) { peek.appendChild(node); });
    peek.insertAdjacentHTML("beforeend", '<svg class="hero-peek__arrow" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    peek.hidden = false;
  }
  feedPosts.slice(0, feed.previewCount || 6).forEach(function (post) {
    $("feed-grid").appendChild(el("li", { className: "reveal" }, [
      el("a", { className: "feed-tile", href: "feed.html#" + post.id, "aria-label": (post.video ? "Video: " : "") + post.alt }, [
        postThumb(post, post.alt),
        post.video ? playBadge() : null,
        el("span", { className: "feed-tile__overlay", "aria-hidden": "true" }, [
          post.dateText ? el("span", { className: "feed-tile__date", text: post.dateText }) : null,
          el("span", { className: "feed-tile__text", text: post.text[0] || "" }),
        ]),
      ]),
    ]));
  });

  /* ---------- 6. Closing ---------- */
  var closing = C.closing || {};
  setText("closing-title", closing.heading);
  paragraphs($("closing-text"), closing.text);
  setText("closing-signature", closing.signature);
  $("closing-button").querySelector("span").textContent = closing.buttonText || "Back to the top";
  (closing.images || []).slice(0, 3).forEach(function (img) {
    $("closing-collage").appendChild(image(img.src, img.alt));
  });
  if (!$("closing-collage").children.length) $("closing-collage").hidden = true;

  /* ---------- Footer ---------- */
  setText("footer-text", C.footer);
  setText("footer-year", String(new Date().getFullYear()));

  // The page was built after the browser looked for a "#section" in the address,
  // so jump there again now that the content exists.
  if (location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }

  /* =====================================================================
     MENU
     ===================================================================== */
  var header = $("site-header");
  var toggle = document.querySelector(".nav__toggle");
  var menu = $("nav-menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("click", function (e) {
    if (menu.classList.contains("is-open") && !e.target.closest(".nav")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });

  // Highlight the menu link of the section currently on screen
  var menuLinks = Array.prototype.slice.call(menu.querySelectorAll("a"));
  var tracked = menuLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      var line = window.innerHeight * 0.35;
      var current = 0;
      tracked.forEach(function (section, i) {
        if (section && section.getBoundingClientRect().top <= line) current = i;
      });
      menuLinks.forEach(function (a, i) {
        var active = i === current;
        a.classList.toggle("is-active", active);
        if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* =====================================================================
     GENTLE REVEAL ON SCROLL
     ===================================================================== */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (n) { n.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach(function (n) { io.observe(n); });
  }

  /* =====================================================================
     ALBUM WINDOW
     ===================================================================== */
  var albumDialog = $("album-dialog");
  var albumGrid = $("album-dialog-grid");
  var currentAlbum = null;
  var albumOpener = null;

  function lockScroll() { document.documentElement.style.overflow = "hidden"; }
  function unlockScroll() {
    if (!albumDialog.open && !viewer.open) document.documentElement.style.overflow = "";
  }

  function openAlbum(index, opener) {
    currentAlbum = albums[index];
    albumOpener = opener;
    setText("album-dialog-title", currentAlbum.title);
    setText("album-dialog-desc", currentAlbum.description);
    albumGrid.textContent = "";
    var total = currentAlbum._photos.length;
    currentAlbum._photos.forEach(function (photo, i) {
      var btn = el("button", {
        className: "thumb",
        type: "button",
        "aria-label": "Open photo " + (i + 1) + " of " + total + (photo.caption ? ": " + photo.caption : ""),
      }, [image(photo.src, "")]);
      btn.addEventListener("click", function () { openViewer(i, btn); });
      albumGrid.appendChild(el("li", { className: "album-photo" }, [
        btn,
        photo.caption ? el("p", { className: "album-photo__caption", text: photo.caption }) : null,
      ]));
    });
    albumGrid.scrollTop = 0;
    albumDialog.showModal();
    lockScroll();
    albumDialog.querySelector("[data-close-album]").focus();
  }

  albumDialog.querySelector("[data-close-album]").addEventListener("click", function () { albumDialog.close(); });
  // Clicking the dark area around the album closes it
  albumDialog.addEventListener("click", function (e) { if (e.target === albumDialog) albumDialog.close(); });
  albumDialog.addEventListener("close", function () {
    unlockScroll();
    if (albumOpener) albumOpener.focus();
  });

  /* =====================================================================
     PHOTO VIEWER
     ===================================================================== */
  var viewer = $("viewer");
  var viewerImg = $("viewer-img");
  var viewerStage = $("viewer-stage");
  var prevBtn = $("viewer-prev");
  var nextBtn = $("viewer-next");
  var viewerIndex = 0;
  var viewerOpener = null;

  function showPhoto(i) {
    var photos = currentAlbum._photos;
    viewerIndex = (i + photos.length) % photos.length; // wraps around at the ends
    var photo = photos[viewerIndex];
    viewerImg.classList.add("is-loading");
    viewerImg.onload = function () { viewerImg.classList.remove("is-loading"); };
    viewerImg.onerror = viewerImg.onload;
    viewerImg.src = photo.src;
    viewerImg.alt = photo.alt;
    setText("viewer-caption", photo.caption);
    setText("viewer-counter", (viewerIndex + 1) + " / " + photos.length);
    // Load the neighbouring photos in the background so browsing feels instant
    [viewerIndex + 1, viewerIndex - 1].forEach(function (n) {
      new Image().src = photos[(n + photos.length) % photos.length].src;
    });
  }

  function openViewer(i, opener) {
    viewerOpener = opener;
    var single = currentAlbum._photos.length < 2;
    prevBtn.hidden = single;
    nextBtn.hidden = single;
    showPhoto(i);
    viewer.showModal();
    lockScroll();
    (single ? viewer.querySelector("[data-close-viewer]") : nextBtn).focus();
  }

  prevBtn.addEventListener("click", function () { showPhoto(viewerIndex - 1); });
  nextBtn.addEventListener("click", function () { showPhoto(viewerIndex + 1); });
  viewer.querySelector("[data-close-viewer]").addEventListener("click", function () { viewer.close(); });
  viewer.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); showPhoto(viewerIndex - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showPhoto(viewerIndex + 1); }
  });
  viewer.addEventListener("close", function () {
    unlockScroll();
    if (viewerOpener) viewerOpener.focus();
  });
  // Clicking the empty dark area (not the photo) closes the viewer
  viewerStage.addEventListener("click", function (e) {
    if (e.target === viewerStage && !swiped) viewer.close();
  });

  // Swipe left/right on touch screens
  var startX = null, startY = null, swiped = false;
  viewerStage.addEventListener("pointerdown", function (e) {
    startX = e.clientX; startY = e.clientY; swiped = false;
  });
  viewerStage.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped = true;
      showPhoto(viewerIndex + (dx < 0 ? 1 : -1));
    }
  });
  viewerStage.addEventListener("pointercancel", function () { startX = null; });
})();

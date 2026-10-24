/* =====================================================================
   FEED PAGE SCRIPT — builds feed.html from js/content.js and runs the
   post window. You should not need to edit this file; change your
   posts in js/content.js instead.
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

  function image(src, alt) {
    var img = el("img", { src: src, alt: alt || "", loading: "lazy", decoding: "async" });
    img.addEventListener("error", function () {
      console.warn("Image not found — check the file name and folder in content.js: " + src);
    });
    return img;
  }

  // A post's thumbnail: its photo, or else the first frame of its video
  function postThumb(post) {
    if (post.src) return image(post.src, "");
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
  var feed = C.feed || {};
  var page = feed.page || {};
  var posts = window.FEED_POSTS || [];
  var avatar = feed.avatar || (C.hero && C.hero.image && C.hero.image.src) || "";

  document.title = (page.title || "Our Feed") + (C.names ? " · " + C.names : "");
  document.querySelectorAll('[data-content="names"]').forEach(function (n) { n.textContent = C.names || ""; });
  document.querySelectorAll("[data-menu]").forEach(function (link) {
    link.textContent = (C.menu && C.menu[link.dataset.menu]) || link.dataset.menu;
  });

  setText("feed-page-title", page.title || feed.heading || "Our Feed");
  setText("feed-page-intro", page.intro);
  setText("feed-count", posts.length + (posts.length === 1 ? " post" : " posts"));
  if (avatar) {
    $("feed-avatar").src = avatar;
    $("post-avatar").src = avatar;
  } else {
    $("feed-avatar").hidden = true;
    $("post-avatar").hidden = true;
  }

  $("feed-empty").hidden = posts.length > 0;
  posts.forEach(function (post, i) {
    var tile = el("button", {
      className: "feed-tile",
      type: "button",
      id: post.id,
      "aria-label": "Open " + (post.video ? "video " : "") + "post" + (post.dateText ? " from " + post.dateText : "") + ": " + post.alt,
    }, [
      postThumb(post),
      post.video ? playBadge() : null,
      el("span", { className: "feed-tile__overlay", "aria-hidden": "true" }, [
        post.dateText ? el("span", { className: "feed-tile__date", text: post.dateText }) : null,
        el("span", { className: "feed-tile__text", text: post.text[0] || "" }),
      ]),
    ]);
    tile.addEventListener("click", function () { openPost(i); });
    $("feed-page-grid").appendChild(el("li", null, [tile]));
  });

  setText("footer-text", C.footer);
  setText("footer-year", String(new Date().getFullYear()));

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

  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* =====================================================================
     POST WINDOW
     ===================================================================== */
  var dialog = $("post-dialog");
  var postImg = $("post-img");
  var postVideo = $("post-video");
  var prevBtn = $("post-prev");
  var nextBtn = $("post-next");
  var current = 0;

  function showPost(i) {
    current = (i + posts.length) % posts.length; // wraps around at the ends
    var post = posts[current];
    stopVideo();
    postImg.hidden = !!post.video;
    postVideo.hidden = !post.video;
    if (post.video) {
      // Never autoplays; the photo (if any) is shown until play is pressed
      if (post.src) postVideo.setAttribute("poster", post.src);
      else postVideo.removeAttribute("poster");
      postVideo.src = post.src ? post.video : post.video + "#t=0.1";
      postVideo.setAttribute("aria-label", post.alt);
    } else {
      postImg.classList.add("is-loading");
      postImg.onload = function () { postImg.classList.remove("is-loading"); };
      postImg.onerror = postImg.onload;
      postImg.src = post.src;
      postImg.alt = post.alt;
    }
    setText("post-place", post.place);
    $("post-place").hidden = !post.place;
    var text = $("post-text");
    text.textContent = "";
    post.text.forEach(function (p) { text.appendChild(el("p", { text: p })); });
    setText("post-date", post.dateText);
    if (post.isoDate) $("post-date").setAttribute("datetime", post.isoDate);
    setText("post-counter", (current + 1) + " / " + posts.length);
    // Remember the post in the address, so the link can be shared or reloaded
    history.replaceState(null, "", "#" + post.id);
    // Load the neighbouring photos in the background so browsing feels instant
    [current + 1, current - 1].forEach(function (n) {
      var src = posts[(n + posts.length) % posts.length].src;
      if (src) new Image().src = src;
    });
  }

  function stopVideo() {
    postVideo.pause();
    postVideo.removeAttribute("src");
    postVideo.load(); // stops the download too
  }

  postVideo.addEventListener("error", function () {
    if (postVideo.getAttribute("src")) console.warn("Video not found or not playable — check the path in content.js: " + postVideo.src);
  });

  function openPost(i) {
    var single = posts.length < 2;
    prevBtn.hidden = single;
    nextBtn.hidden = single;
    showPost(i);
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    dialog.querySelector("[data-close-post]").focus();
  }

  prevBtn.addEventListener("click", function () { showPost(current - 1); });
  nextBtn.addEventListener("click", function () { showPost(current + 1); });
  dialog.querySelector("[data-close-post]").addEventListener("click", function () { dialog.close(); });
  // Clicking the dark area around the post closes it
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", function (e) {
    if (posts.length < 2 || e.target === postVideo) return; // arrows on the video seek instead
    if (e.key === "ArrowLeft") { e.preventDefault(); showPost(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showPost(current + 1); }
  });
  dialog.addEventListener("close", function () {
    stopVideo();
    document.documentElement.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
    var tile = document.getElementById(posts[current].id);
    if (tile) tile.focus({ preventScroll: true });
  });

  // Swipe left/right on the photo on touch screens
  var media = $("post-media");
  var startX = null, startY = null;
  media.addEventListener("pointerdown", function (e) {
    if (e.target === postVideo) return; // dragging the video's timeline is not a swipe
    startX = e.clientX; startY = e.clientY;
  });
  media.addEventListener("pointerup", function (e) {
    if (startX === null || posts.length < 2) return;
    var dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showPost(current + (dx < 0 ? 1 : -1));
  });
  media.addEventListener("pointercancel", function () { startX = null; });

  // Coming from a Home page photo (feed.html#some-post): open that post
  if (location.hash.length > 1) {
    var id = decodeURIComponent(location.hash.slice(1));
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        document.getElementById(id).scrollIntoView({ block: "center", behavior: "instant" });
        openPost(i);
        break;
      }
    }
  }
})();

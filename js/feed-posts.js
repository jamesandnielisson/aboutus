/* =====================================================================
   FEED POSTS — prepares the posts from js/content.js for both the
   Home page preview and the Feed page: newest first, with a readable
   date and a stable id for links like feed.html#reading-corner.
   You should not need to edit this file.
   ===================================================================== */
(function () {
  "use strict";

  var feed = (window.SITE_CONTENT && window.SITE_CONTENT.feed) || {};

  // "2026-10-19" → a Date in local time (new Date("2026-10-19") would use UTC)
  function parseDate(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  var usedIds = {};
  function makeId(post) {
    var base = String(post.id || post.image.split("/").pop().replace(/\.[^.]+$/, ""))
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "post";
    var id = base, n = 2;
    while (usedIds[id]) id = base + "-" + n++;
    usedIds[id] = true;
    return id;
  }

  var posts = (feed.posts || []).filter(function (p) { return p && p.image; }).map(function (p, i) {
    var date = parseDate(p.date);
    if (p.date && !date) console.warn('Feed post date should look like "2026-10-19" — check content.js: ' + p.date);
    var text = [].concat(p.text || []);
    return {
      id: makeId(p),
      src: p.image,
      alt: p.alt || text[0] || "A post from our feed",
      text: text,
      place: p.place || "",
      date: date,
      isoDate: date ? p.date : "",
      dateText: date ? date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "",
      order: i,
    };
  });

  // Newest first; posts without a date go last, in the order they were written
  posts.sort(function (a, b) {
    return ((b.date || 0) - (a.date || 0)) || (a.order - b.order);
  });

  window.FEED_POSTS = posts;
})();

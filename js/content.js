/* =====================================================================
   CONTENT FILE — this is the ONLY file you need to edit.
   ---------------------------------------------------------------------
   Everything you read on the website (text, photos, albums, video)
   comes from this file. The layout and design are handled elsewhere.

   A few simple rules:
   • Text goes between quotes:  "like this"
   • If your text contains a double quote ("), write it as \"
     (apostrophes like we're are fine).
   • Every item in a list ends with a comma.
   • Paragraphs are written as a list:  ["First paragraph.", "Second one."]
   • Photo paths are relative to the main folder, e.g.
       "assets/images/hero/our-photo.jpg"
   • File names are case-sensitive on GitHub Pages:
       "Beach.JPG" is NOT the same as "beach.jpg".

   Everything marked "PLACEHOLDER" is waiting for your own words/photos.
   ===================================================================== */

window.SITE_CONTENT = {

  /* -------------------------------------------------------------------
     GENERAL
     ------------------------------------------------------------------- */
  // Your names, shown in the top menu and the browser tab.
  names: "James & Nielisson",

  // Short description used by search engines and link previews.
  description: "Get to know us — our story, our life together and our hopes for the future.",

  /* -------------------------------------------------------------------
     MENU — the labels of the links in the top bar
     ------------------------------------------------------------------- */
  menu: {
    home: "Home",
    story: "Our Story",
    albums: "Photo Albums",
    more: "More About Us",
  },

  /* -------------------------------------------------------------------
     SECTION 1 — WELCOME
     ------------------------------------------------------------------- */
  hero: {
    eyebrow: "Hello, and welcome",
    title: "We're James & Nielisson",
    intro: [
      // PLACEHOLDER — one or two warm sentences introducing yourselves.
      "Thank you for stopping by. We made this little website so you can get to know us a bit better — through our own words, our photos and a short video.",
    ],
    buttonText: "Explore our story",
    image: {
      src: "assets/images/hero/sunset-together.jpg",
      alt: "The two of us smiling together at sunset", // Describe the photo for people who can't see it.
    },
  },

  /* -------------------------------------------------------------------
     SECTION 2 — INTRODUCTION VIDEO
     -------------------------------------------------------------------
     Option A — your own video file (recommended):
       1. Copy your video into  assets/videos/  (MP4 format works everywhere)
       2. Set   type: "file"   and   src: "assets/videos/introduction.mp4"

     Option B — a YouTube or Vimeo video:
       Set  type: "youtube"  (or "vimeo") and paste the normal video link in src,
       e.g. src: "https://www.youtube.com/watch?v=XXXXXXXXXXX"

     While src is empty (""), a friendly "coming soon" card is shown instead.
     ------------------------------------------------------------------- */
  video: {
    heading: "A Little Introduction",
    intro: "We recorded this short video so you can see and hear us — it's the next best thing to meeting in person.",
    type: "file",                                  // "file", "youtube" or "vimeo"
    src: "assets/videos/OurIntro.mp4",
    poster: "assets/videos/poster.jpg",            // Image shown before the video plays (optional, file videos only)
    caption: "", // Optional text shown under the video, e.g. "Filmed at home, spring 2026."
    comingSoonText: "Our introduction video is coming soon.",
  },

  /* -------------------------------------------------------------------
     SECTION 3 — OUR STORY
     Each "chapter" is one photo + a short text. Photos alternate left/right
     automatically. Add, remove or reorder chapters freely.
     ------------------------------------------------------------------- */
  story: {
    heading: "Our Story",
    intro: "A few chapters about who we are and the life we've built together.",
    chapters: [
      {
        title: "Who we are",
        text: [
          // PLACEHOLDER
          "This is where we'll introduce ourselves — our names, where we live and a little about what each of us is like.",
        ],
        image: { src: "assets/images/story/who-we-are.jpg", alt: "A selfie of the two of us high above a bay" },
      },
      {
        title: "How we met",
        text: [
          // PLACEHOLDER
          "Here we'll share the story of how we first met, and the moment we knew we'd found something special.",
        ],
        image: { src: "assets/images/story/how-we-met.jpg", alt: "The two of us sitting in a heart-shaped arch in the water" },
      },
      {
        title: "Our life together",
        text: [
          // PLACEHOLDER
          "This is where we'll describe what our days look like — our home, our routines and the little things we love sharing.",
        ],
        image: { src: "assets/images/story/our-life.jpg", alt: "Relaxing on the porch at home with our cat and dog" },
      },
      {
        title: "What matters to us",
        text: [
          // PLACEHOLDER
          "Here we'll share the values that guide us, and the kind of family we hope to grow.",
        ],
        image: { src: "assets/images/story/our-values.jpg", alt: "A family selfie with a little one" },
      },
    ],
  },

  /* -------------------------------------------------------------------
     SECTION 4 — PHOTO ALBUMS
     -------------------------------------------------------------------
     Each album has:
       title        — the album name
       description  — one short sentence
       folder       — the folder holding the album's photos (ends with "/")
       cover        — (optional) file name of the cover photo;
                      if left out, the first photo is used
       photos       — the list of photos. Each photo is either just a
                      file name:  "beach.jpg",
                      or a file name with a caption / description:
                      { file: "beach.jpg", caption: "Our first trip", alt: "Us on a sandy beach" },

     ▶ EXAMPLE — adding a new album called "Our Garden":
       1. Create the folder  assets/images/albums/garden/
       2. Copy your photos into it, e.g. roses.jpg and picnic.jpg
       3. Add this block to the list below (don't forget the comma):

          {
            title: "Our Garden",
            description: "Where we spend most summer evenings.",
            folder: "assets/images/albums/garden/",
            photos: [
              { file: "roses.jpg", caption: "The first roses of the year" },
              "picnic.jpg",
            ],
          },
     ------------------------------------------------------------------- */
  albums: {
    heading: "Photo Albums",
    intro: "Little windows into our world. Choose an album to look through the photos.",
    viewText: "View album", // Text on each album card
    list: [
      {
        title: "Our Life Together",
        description: "The two of us, through the years.",
        folder: "assets/images/albums/life-together/",
        photos: [
          { file: "sunset-together.jpg", caption: "Golden hour, just the two of us.", alt: "The two of us at sunset" },
          { file: "above-the-bay.jpg", caption: "High above the bay, with the beaches stretched out below.", alt: "A selfie of us high above a bay and beaches" },
          { file: "beach-sunset.jpg", caption: "All smiles on the beach as the sun goes down.", alt: "Smiling together on the beach at sunset" },
          { file: "heart-arch.jpg", caption: "We found a heart-shaped arch in the water and had to sit in it.", alt: "Sitting together in a heart-shaped arch in the water" },
          { file: "clifftop-selfie.jpg", caption: "On top of the coastal cliffs.", alt: "A selfie of us on top of coastal cliffs" },
          { file: "fairy-light-heart.jpg", caption: "Inside a heart made of fairy lights.", alt: "Standing inside a heart made of fairy lights" },
          { file: "snowy-sunset.jpg", caption: "A snowy sunset together.", alt: "The two of us in the snow at sunset" },
          { file: "by-the-lake.jpg", caption: "A quiet moment by the lake.", alt: "The two of us by a lake" },
          { file: "trail-selfie.jpg", caption: "Checking the trail signs before the next walk.", alt: "A selfie of us next to wooden trail signs" },
          { file: "boat-day.jpg", caption: "A sunny day out on the boat.", alt: "A sunny selfie of us on a boat" },
        ],
      },
      {
        title: "Family & Friends",
        description: "The people who make our life full.",
        folder: "assets/images/albums/family-friends/",
        photos: [
          { file: "family-selfie.jpg", caption: "A family selfie with one of our favourite little people.", alt: "A family selfie with a little one" },
          { file: "picnic-with-baby.jpg", caption: "Baby cuddles at a picnic in the park.", alt: "Holding a baby at a picnic in the park" },
          { file: "garden-lunch.jpg", caption: "A long lunch in the garden with family.", alt: "Lunch in the garden with family" },
          { file: "beach-with-friend.jpg", caption: "A beach day with a good friend.", alt: "At the beach with a friend" },
          { file: "city-lookout.jpg", caption: "Taking in the city view with family.", alt: "With family at a city lookout" },
          { file: "dinner-out.jpg", caption: "Dinner out with family.", alt: "Dinner out with family" },
          { file: "family-meal.jpg", caption: "Around the table with the kids.", alt: "A family meal with the kids" },
          { file: "evening-walk.jpg", caption: "An evening stroll with the kids.", alt: "An evening walk with the kids" },
        ],
      },
      {
        title: "Travel & Adventures",
        description: "Places we've explored together.",
        folder: "assets/images/albums/travel/",
        photos: [
          { file: "top-of-the-world.jpg", caption: "On top of the world, high above the city.", alt: "Arms raised on a mountain top above the city" },
          { file: "mountain-view.jpg", caption: "Taking a break in front of the mountain peak.", alt: "The two of us on rocks in front of a mountain peak" },
          { file: "coastal-walk.jpg", caption: "Wind in our hair on a coastal walk.", alt: "A selfie of us on a coastal walk" },
          { file: "ocean-edge.jpg", caption: "Arms wide at the edge of the ocean.", alt: "Arms wide by the ocean" },
          { file: "ice-cave.jpg", caption: "Helmets on, exploring an ice cave.", alt: "The two of us in helmets inside an ice cave" },
          { file: "bamboo-bridge.jpg", caption: "Carefully crossing a bamboo bridge.", alt: "Crossing a bamboo bridge" },
          { file: "giant-fruit.jpg", caption: "Showing off a giant fruit sculpture.", alt: "Holding up a giant fruit sculpture" },
          { file: "flower-window.jpg", caption: "Peeking out of a window framed by flowers.", alt: "Peeking out of a window framed by flowers" },
          { file: "museum-visit.jpg", caption: "Wandering through a museum exhibition.", alt: "At a museum exhibition" },
        ],
      },
      {
        title: "Out in Nature",
        description: "Forests, mountains, snow and water. Our happy places.",
        folder: "assets/images/albums/nature/",
        photos: [
          { file: "above-the-clouds.jpg", caption: "Hiking above a sea of clouds.", alt: "A selfie of us on a hike above a sea of clouds" },
          { file: "giant-tree.jpg", caption: "Feeling tiny at the foot of a giant tree.", alt: "Standing at the foot of a giant tree" },
          { file: "forest-vines.jpg", caption: "Among the vines deep in the forest.", alt: "Among the vines in a forest" },
          { file: "rainforest-path.jpg", caption: "Following a rainforest path.", alt: "Walking a rainforest path" },
          { file: "rock-cave.jpg", caption: "Climbing out of a little rock cave.", alt: "Climbing out of a small rock cave" },
          { file: "jungle-ruins.jpg", caption: "An old stone tower hidden in the jungle.", alt: "An old stone tower in the jungle" },
          { file: "wild-sculpture.jpg", caption: "Making friends with a wooden sculpture in the park.", alt: "Sitting next to a wooden sculpture in a park" },
          { file: "canoe-paddle.jpg", caption: "Paddling our blue canoe across the lake.", alt: "Paddling a blue canoe on a lake" },
          { file: "snowy-park.jpg", caption: "A crisp walk through a snowy park.", alt: "A walk in a snowy park" },
          { file: "snowy-lookout.jpg", caption: "A snowy lookout among the trees.", alt: "At a snowy lookout among the trees" },
          { file: "wetlands-dusk.jpg", caption: "The wetlands at dusk.", alt: "Wetlands at dusk" },
          { file: "giant-fruit-together.jpg", caption: "Teamwork with a giant fruit sculpture.", alt: "The two of us holding up a giant fruit sculpture" },
        ],
      },
      {
        title: "Our Animal Friends",
        description: "Pets we love and the wildlife we've met along the way.",
        folder: "assets/images/albums/animals/",
        photos: [
          { file: "car-full-of-dogs.jpg", caption: "A car full of very happy dogs.", alt: "A car full of happy dogs" },
          { file: "dog-cuddle.jpg", caption: "Cuddles with a scruffy little dog.", alt: "Cuddling a scruffy little dog" },
          { file: "cat-on-lap.jpg", caption: "A white cat claiming a lap.", alt: "A white cat curled up on a lap" },
          { file: "cat-in-the-garden.jpg", caption: "Out on the grass with a cat.", alt: "Holding a cat on the grass" },
          { file: "curious-kangaroo.jpg", caption: "A curious kangaroo coming in for a closer look.", alt: "A curious kangaroo up close" },
          { file: "kangaroo-meeting.jpg", caption: "Thumbs up for meeting the kangaroos.", alt: "Giving a thumbs up next to kangaroos" },
          { file: "quokka-friend.jpg", caption: "Sitting with a friendly quokka.", alt: "Sitting with a quokka" },
          { file: "quokka-by-the-sea.jpg", caption: "Saying hello to a quokka by the sea.", alt: "Saying hello to a quokka by the sea" },
          { file: "monkey-in-the-trees.jpg", caption: "A small monkey watching us from the trees.", alt: "A small monkey in the trees" },
          { file: "curlews.jpg", caption: "A family of curlews visiting the garden.", alt: "A family of curlews in the garden" },
          { file: "iguana.jpg", caption: "An iguana sunbathing on a wall.", alt: "An iguana sunbathing on a wall" },
          { file: "tortoises.jpg", caption: "Two tortoises taking it slow.", alt: "Two tortoises" },
          { file: "crocodile.jpg", caption: "A crocodile resting on a rock (from a safe distance!).", alt: "A crocodile resting on a rock" },
        ],
      },
      {
        title: "Everyday Moments",
        description: "Ordinary days at home that we treasure.",
        folder: "assets/images/albums/everyday-moments/",
        photos: [
          { file: "porch-with-pets.jpg", caption: "Relaxing on the porch with our cat and dog.", alt: "Relaxing on the porch with a cat and a dog" },
          { file: "cat-and-dog-time.jpg", caption: "Cat and dog time at home.", alt: "Cat and dog time at home" },
          { file: "dogs-at-home.jpg", caption: "Lazy days at home with the dogs.", alt: "At home with the dogs" },
          { file: "reading-corner.jpg", caption: "Curled up with a book on the beanbag.", alt: "Reading on a cosy beanbag" },
          { file: "beach-clean-up.jpg", caption: "Volunteering together at a beach clean-up.", alt: "The two of us volunteering at a beach clean-up" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------
     SECTION 5 — MORE ABOUT US
     Small cards. Each card has an icon, a title, a short text and an
     optional photo. Available icons:
       heart, home, leaf, sun, book, compass, star, coffee, music, paw, gift, smile
     ------------------------------------------------------------------- */
  more: {
    heading: "More About Us",
    intro: "The little things that make us, us.",
    cards: [
      {
        icon: "leaf",
        title: "Our interests & hobbies",
        text: "This is where we'll share the hobbies and interests we each enjoy.", // PLACEHOLDER
      },
      {
        icon: "sun",
        title: "An ordinary weekend",
        text: "Here we'll describe what a typical weekend looks like for us.", // PLACEHOLDER
        image: { src: "assets/images/more/weekend.jpg", alt: "Paddling a canoe together on a lake" },
      },
      {
        icon: "heart",
        title: "Things that make us happy",
        text: "A few of the simple things that always bring us joy.", // PLACEHOLDER
      },
      {
        icon: "gift",
        title: "Family traditions",
        text: "The traditions we cherish and look forward to passing on.", // PLACEHOLDER
        image: { src: "assets/images/more/traditions.jpg", alt: "Christmas dinner with family, all wearing paper crowns" },
      },
      {
        icon: "coffee",
        title: "Our favourite activities",
        text: "The things we love doing together, at home and out in the world.", // PLACEHOLDER
      },
      {
        icon: "star",
        title: "Our hopes for the future",
        text: "Here we'll share what we're dreaming of for the years ahead.", // PLACEHOLDER
      },
    ],
  },

  /* -------------------------------------------------------------------
     SECTION 5b — OUR FEED
     -------------------------------------------------------------------
     Little Instagram-style posts about our everyday life. The Home page
     shows the most recent few; "feed.html" shows them all.

     Each post has:
       image  — the photo (any folder works; new photos can go in
                assets/images/feed/)
       alt    — a short description of the photo
       date   — written as "YYYY-MM-DD", e.g. "2026-10-19".
                Posts are sorted newest first automatically, so the
                order in this list doesn't matter.
       text   — the post itself (one sentence or a few)
       place  — (optional) where it was taken, e.g. "Lake Annecy"

     ▶ EXAMPLE — adding a new post (put it anywhere in the list):
          {
            image: "assets/images/feed/sunday-pancakes.jpg",
            alt: "A stack of pancakes with berries",
            date: "2026-10-26",
            place: "Home",
            text: "Sunday pancakes are a non-negotiable in this house.",
          },
     ------------------------------------------------------------------- */
  feed: {
    heading: "Our Feed",
    intro: "Little snapshots from our everyday life: what we've been up to lately.",
    previewCount: 6,                    // How many posts the Home page shows (6 fits neatly)
    buttonText: "Explore our feed",
    avatar: "assets/images/hero/sunset-together.jpg", // The round photo at the top of the Feed page
    page: {
      title: "Our Feed",
      intro: "Everyday moments, small adventures and the things that make us smile. Tap any photo to see the whole post.",
      backText: "Back to home",
    },
    // PLACEHOLDER — the dates and texts below are examples. Replace them with your own.
    posts: [
      {
        image: "assets/images/albums/everyday-moments/reading-corner.jpg",
        alt: "Reading on a cosy beanbag",
        date: "2026-10-19",
        text: "Slow Sunday. Tea, a good book and absolutely no plans.",
      },
      {
        image: "assets/images/albums/nature/canoe-paddle.jpg",
        alt: "Paddling a blue canoe on a lake",
        date: "2026-10-12",
        text: "Out on the water first thing this morning. So peaceful we barely talked.",
      },
      {
        image: "assets/images/albums/everyday-moments/porch-with-pets.jpg",
        alt: "Relaxing on the porch with a cat and a dog",
        date: "2026-10-05",
        text: "Porch time with our two shadows. They always find us.",
      },
      {
        image: "assets/images/albums/family-friends/garden-lunch.jpg",
        alt: "Lunch in the garden with family",
        date: "2026-09-27",
        text: "Long lunch in the garden with family. Nobody wanted to leave the table.",
      },
      {
        image: "assets/images/albums/everyday-moments/beach-clean-up.jpg",
        alt: "The two of us volunteering at a beach clean-up",
        date: "2026-09-20",
        text: "Spent the morning at a beach clean-up. Tired, sandy and very happy.",
      },
      {
        image: "assets/images/albums/travel/coastal-walk.jpg",
        alt: "A selfie of us on a coastal walk",
        date: "2026-09-13",
        text: "A windy coastal walk to clear our heads after a busy week.",
      },
      {
        image: "assets/images/albums/everyday-moments/dogs-at-home.jpg",
        alt: "At home with the dogs",
        date: "2026-09-06",
        text: "Movie night, dog-approved.",
      },
      {
        image: "assets/images/albums/family-friends/family-meal.jpg",
        alt: "A family meal with the kids",
        date: "2026-08-30",
        text: "Family dinner with the little ones. Loud, messy and our favourite kind of evening.",
      },
      {
        image: "assets/images/albums/animals/cat-on-lap.jpg",
        alt: "A white cat curled up on a lap",
        date: "2026-08-23",
        text: "When the cat picks your lap, you don't move. Those are the rules.",
      },
      {
        image: "assets/images/albums/life-together/by-the-lake.jpg",
        alt: "The two of us by a lake",
        date: "2026-08-16",
        text: "An evening by the lake. One of our favourite spots to just sit and talk.",
      },
      {
        image: "assets/images/albums/animals/curlews.jpg",
        alt: "A family of curlews in the garden",
        date: "2026-08-09",
        text: "Our garden visitors are back, and they brought the whole family.",
      },
      {
        image: "assets/images/albums/life-together/trail-selfie.jpg",
        alt: "A selfie of us next to wooden trail signs",
        date: "2026-08-02",
        text: "Picked a trail we'd never done before. No regrets (except maybe the hills).",
      },
    ],
  },

  /* -------------------------------------------------------------------
     SECTION 6 — CLOSING MESSAGE
     ------------------------------------------------------------------- */
  closing: {
    heading: "Thank you for getting to know us",
    text: [
      // PLACEHOLDER
      "We're so grateful you took the time to read our story and look through our photos. It means a great deal to us.",
    ],
    signature: "With warmth, James & Nielisson",
    images: [ // 0 to 3 photos — leave the list empty [] for none
      { src: "assets/images/closing/closing-1.jpg", alt: "Smiling together on the beach at sunset" },
      { src: "assets/images/closing/closing-2.jpg", alt: "A Christmas selfie by the tree" },
      { src: "assets/images/closing/closing-3.jpg", alt: "The two of us inside a heart of fairy lights" },
    ],
    buttonText: "Back to the top",
  },

  /* -------------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------------- */
  footer: "Made with love by James & Nielisson",
};

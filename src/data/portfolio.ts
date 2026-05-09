// ==========================================
// PORTFOLIO CONTENT CONFIGURATION
// Edit the values below to update your website
// ==========================================

export const HERO_CONTENT = {
  titleLine1: "Shoot",
  titleLine2: "& Cut",
  description: "I'm a director and editor focused on high-impact visuals. I don't just capture footage—I build stories that hit hard and stay with you."
};

export const PHILOSOPHY_CONTENT = {
  title: "Motion \n Capture \n Cut",
  paragraph1: "Good work isn't about the gear; it's about the gut. I focus on raw composition and the kind of pacing that keeps people from looking away.",
  paragraph2: "Whether it's a 15-second commercial or a full-length feature, every frame needs a reason to exist. If it doesn't add to the story, it's gone."
};

export const PARALLAX_IMAGES = {
  firstImage: "/images/optimized/Image-ree-3.webp",
  secondImage: "/images/building-parallax.png"
};

export const ABOUT_ME = {
  title: "The Director",
  bio: "I'm obsessed with the technical side of the craft—the lighting, the lenses, the frame rates—but I care more about the reaction. I've spent years learning how to piece together raw visuals into narratives that actually mean something. I don't do 'soft' edits. I do work that demands attention.",
  photos: [
    {
      url: "/images/optimized/Image-ree-2.webp",
      hoverText: "On Set"
    },
    {
      url: "https://images.unsplash.com/photo-1551373884-8a0750074df7?auto=format&fit=crop&q=80&w=800",
      hoverText: "The Kit"
    },
    {
      url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
      hoverText: "The Edit"
    }
  ]
};

export const ABOUT_PAGE_CONTENT = {
  header: "The Director",
  bioParagraphs: [
    "I started with a camera and a laptop, obsessed with why some shots feel like art and others just feel like footage. That obsession turned into a career in directing and editing.",
    "My style is built on structure and contrast. I like my visuals sharp and my cuts even sharper. I believe that a great edit is invisible until it hits you all at once.",
    "From high-energy commercial work to moody architectural photography, the goal is always the same: absolute clarity. No filler, no wasted frames, just pure visual impact."
  ],
  gear: [
    { category: "Cameras", items: ["Sony FX Series", "Blackmagic Design"] },
    { category: "Lenses", items: ["Vintage Primes", "G-Master Series"] },
    { category: "Software", items: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Lightroom"] }
  ],
  photos: [
    "/images/optimized/Image-15.webp",
    "/images/optimized/Image-3.webp",
    "/images/optimized/Image-9.webp"
  ]
};

export const GALLERY_PHOTOS = [
  { src: "/images/optimized/Image-1.webp", title: "Visual 01" },
  { src: "/images/optimized/Image-2.webp", title: "Visual 02" },
  { src: "/images/optimized/Image-3.webp", title: "Visual 03" },
  { src: "/images/optimized/Image-4.webp", title: "Visual 04" },
  { src: "/images/optimized/Image-7.webp", title: "Visual 05" },
  { src: "/images/optimized/Image-9.webp", title: "Visual 06" },
  { src: "/images/optimized/Image-13.webp", title: "Visual 07" },
  { src: "/images/optimized/Image-14.webp", title: "Visual 08" },
  { src: "/images/optimized/Image-15.webp", title: "Visual 09" },
  { src: "/images/optimized/Image-16.webp", title: "Visual 10" },
  { src: "/images/optimized/Image-re-1.webp", title: "Visual 11" },
  { src: "/images/optimized/Image-re-2.webp", title: "Visual 12" },
  { src: "/images/optimized/Image-re-3.webp", title: "Visual 13" }
];

export const PROJECTS = [
  {
    title: "The Run",
    role: "Lead Editor",
    description: "A fast-paced commercial project where the sound design drove the visuals. I focused on aggressive pacing and heavy color grading to match the energy.",
    tags: ["Premiere Pro", "Sound Design", "Color"],
    color: "bg-primary-red",
    decorationColor: "red" as const,
    shape: "circle" as const,
  },
  {
    title: "Concrete Jungle",
    role: "Cinematographer",
    description: "Documenting brutalist structures across the city. I used vintage glass to get a raw, textured feel that modern lenses just can't replicate.",
    tags: ["Sony FX3", "Vintage Lenses", "DaVinci"],
    color: "bg-primary-blue",
    decorationColor: "blue" as const,
    shape: "square" as const,
  },
  {
    title: "Night Shift",
    role: "Photographer",
    description: "A series exploring the high-contrast world of city nights. No soft gradients here—just harsh neon and deep blacks.",
    tags: ["Photography", "Lightroom", "Night"],
    color: "bg-primary-yellow",
    decorationColor: "yellow" as const,
    shape: "triangle" as const,
  },
  {
    title: "Vogue Edit",
    role: "Director / Editor",
    description: "Avant-garde fashion piece. I played with frame rates and disjointed sequences to create something that feels like a fever dream.",
    tags: ["Directing", "Experimental", "Edit"],
    color: "bg-black",
    decorationColor: "red" as const,
    shape: "circle" as const,
  }
];

export const PHOTOGRAPHY_GRID = [
  {
    src: "/images/optimized/Image-7.webp",
    title: "Architecture 01",
    decoration: "circle" as const,
    color: "red" as const
  },
  {
    src: "/images/optimized/Image-re-1.webp",
    title: "Geometry",
    decoration: "square" as const,
    color: "blue" as const
  },
  {
    src: "/images/optimized/Image-ree-3.webp",
    title: "Lines",
    decoration: "triangle" as const,
    color: "yellow" as const
  },
  {
    src: "/images/optimized/Image-ree-1.webp",
    title: "Contrast",
    decoration: "square" as const,
    color: "red" as const
  }
];

export const INSTAGRAM_STATS = {
  handle: "@aksh.ae_",
  link: "https://instagram.com/aksh.ae_",
  stats: [
    { label: "Followers", value: "13.3K", color: "bg-primary-red" },
    { label: "Monthly Reach", value: "3.7M", color: "bg-primary-blue" },
    { label: "Total Views", value: "15.6M", color: "bg-primary-yellow" },
    { label: "Total Likes", value: "1.25M", color: "bg-white" }
  ]
};

export const HOME_CONTACT_CTA = {
  title: "Let's Build It",
  description: "Have a project that needs a specific look or a better edit? Let's talk about how we can make it hit harder.",
  buttonText: "Get in Touch",
  resumeText: "Download Portfolio PDF",
  resumeLink: "/portfolio.pdf"
};

export const STICKY_MESSAGES = [
  "Want help?",
  "Let's connect",
  "Elevate your business",
  "Build something great",
  "Ready to start?"
];

// ==========================================
// PORTFOLIO CONTENT CONFIGURATION
// Edit the values below to update your website
// ==========================================

export const HERO_CONTENT = {
  titleLine1: "Photos",
  titleLine2: "& Motion",
  description: "I capture the world through brutalist geometry and motion. Photographer, Videographer, & Video Editor."
};

export const PHILOSOPHY_CONTENT = {
  title: "Capture \n Motion \n Cut",
  paragraph1: "I reject the superfluous. Unnecessary transitions and soft edits are distractions. My work focuses on raw, functional composition and uncompromising visual storytelling.",
  paragraph2: "Whether it's framing the perfect still, shooting dynamic videography, or cutting together a heavy, impactful sequence, the goal is absolute clarity."
};

export const PARALLAX_IMAGES = {
  firstImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
  secondImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600"
};

export const PARALLAX_VIDEO = "/Animate_add_camera_zoom_dust_202605071439.mp4";

export const ABOUT_ME = {
  title: "The Director",
  bio: "I am a visual architect obsessed with structure, light, and pacing. I love photography and videography, but my true passion lies in the edit—piecing together raw footage into high-impact narratives. Every frame serves a purpose. Every cut is calculated.",
  photos: [
    {
      url: "/images/optimized/Image-ree-2.webp",
      hoverText: "It's me!"
    },
    {
      url: "https://images.unsplash.com/photo-1551373884-8a0750074df7?auto=format&fit=crop&q=80&w=800",
      hoverText: "Behind the lens"
    },
    {
      url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
      hoverText: "In the edit"
    }
  ]
};

export const ABOUT_PAGE_CONTENT = {
  header: "The Director",
  bioParagraphs: [
    "I am a visual architect obsessed with structure, light, and pacing. Photography and videography are my mediums, but my true passion lies in the edit—piecing together raw footage into high-impact narratives.",
    "I reject the superfluous. Unnecessary transitions and soft edits are distractions. My work focuses on raw, functional composition and uncompromising visual storytelling. Every frame serves a purpose. Every cut is calculated.",
    "From framing the perfect still to shooting dynamic videography and cutting together a heavy, impactful sequence, my goal is absolute clarity. Brutal. Direct. Unapologetic."
  ],
  gear: [
    { category: "Cameras", items: ["Coming Soon"] },
    { category: "Lenses", items: ["Coming Soon"] },
    { category: "Software", items: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Lightroom"] }
  ],
  photos: [
    "/images/optimized/Image-15.webp",
    "/images/optimized/Image-3.webp",
    "/images/optimized/Image-9.webp"
  ]
};

export const GALLERY_PHOTOS = [
  { src: "/images/optimized/Image-1.webp", title: "Gallery 1" },
  { src: "/images/optimized/Image-2.webp", title: "Gallery 2" },
  { src: "/images/optimized/Image-3.webp", title: "Gallery 3" },
  { src: "/images/optimized/Image-4.webp", title: "Gallery 4" },
  { src: "/images/optimized/Image-7.webp", title: "Gallery 5" },
  { src: "/images/optimized/Image-9.webp", title: "Gallery 6" },
  { src: "/images/optimized/Image-13.webp", title: "Gallery 7" },
  { src: "/images/optimized/Image-14.webp", title: "Gallery 8" },
  { src: "/images/optimized/Image-15.webp", title: "Gallery 9" },
  { src: "/images/optimized/Image-16.webp", title: "Gallery 10" },
  { src: "/images/optimized/Image-re-1.webp", title: "Gallery 11" },
  { src: "/images/optimized/Image-re-2.webp", title: "Gallery 12" },
  { src: "/images/optimized/Image-re-3.webp", title: "Gallery 13" },
  { src: "/images/optimized/Image-re-5.webp", title: "Gallery 14" },
  { src: "/images/optimized/Image-ree-1.webp", title: "Gallery 15" },
  { src: "/images/optimized/Image-ree-2.webp", title: "Gallery 16" },
  { src: "/images/optimized/Image-ree-3.webp", title: "Gallery 17" }
];

export const PROJECTS = [
  {
    title: "Nike Commercial Cut",
    role: "Video Editor",
    description: "Fast-paced, brutalist edit for a high-energy athletic campaign. Focused on sharp cuts and heavy sound design.",
    tags: ["Premiere Pro", "After Effects", "Color Grading"],
    color: "bg-primary-red",
    decorationColor: "red" as const,
    shape: "circle" as const,
  },
  {
    title: "Urban Exploration Series",
    role: "Cinematographer",
    description: "A raw, high-contrast video series documenting brutalist architecture across Eastern Europe. Shot entirely on vintage lenses.",
    tags: ["Sony FX3", "Cinematography", "Davinci Resolve"],
    color: "bg-primary-blue",
    decorationColor: "blue" as const,
    shape: "square" as const,
  },
  {
    title: "Neon Nights",
    role: "Photographer",
    description: "A photographic study of cyber-punk aesthetics and harsh neon lighting in Tokyo. Zero soft gradients, pure contrast.",
    tags: ["Photography", "Lightroom", "Night Shoot"],
    color: "bg-primary-yellow",
    decorationColor: "yellow" as const,
    shape: "triangle" as const,
  },
  {
    title: "Vogue Fashion Film",
    role: "Director & Editor",
    description: "Avant-garde fashion film focusing on sharp angles, high contrast black-and-white visuals, and aggressive pacing.",
    tags: ["Directing", "Editing", "Sound Design"],
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
  title: "Let's Shoot",
  description: "Ready to capture a visual experience that defies the ordinary? Let's collaborate on your next big campaign or edit.",
  buttonText: "Book Me",
  resumeText: "Get my PORTFOLIO PDF",
  resumeLink: "/portfolio.pdf"
};

export const STICKY_MESSAGES = [
  "Want help?",
  "Let's connect",
  "Elevate your business",
  "Build something great",
  "Ready to start?"
];

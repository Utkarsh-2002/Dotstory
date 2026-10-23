// =====================================================================
//  SITE CONTENT  -  edit everything here (brand, text, images).
//
//  IMPORTANT: all names, numbers, case studies and testimonials below are
//  PLACEHOLDERS. Replace them with real, approved content before going live.
//  Service, resource and case-study content lives in lib/services.js,
//  lib/resources.js and lib/caseStudies.js instead of here.
//
//  IMAGES: the current images are designed placeholder artwork in
//  /public/images. To use your own photo, drop the file in /public/images and
//  change that slot's `src`, e.g.  src: "/images/my-photo.jpg"
//  (set `src: null` to show a plain coloured block instead).
// =====================================================================

import { CASE_STUDIES } from "./caseStudies";

export const brand = {
  name: "Dotstory",
  email: "hello@dotstory.io",
};

export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Results", href: "/results/" },
  { label: "Resources", href: "/resources/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
];

export const hero = {
  platformsLabel: "Channels we work across",
  // parts: plain text, and { i: "text" } for the italic serif accent
  title: ["Organic and paid growth, built for ", { i: "B2B tech" }],
  text: "We build organic and paid growth programs for tech companies above $10M ARR — brand, SEO/AEO/GEO, programmatic and paid media, planned and run end to end.",
  primary: { label: "See our work", href: "/results/" },
  secondary: { label: "How we work", href: "#process" },
  images: [
    { src: "/images/hero-1.jpg", tone: 0, alt: "" },
    { src: "/images/hero-2.jpg", tone: 1, alt: "" },
    { src: "/images/hero-3.jpg", tone: 2, alt: "" },
    { src: "/images/hero-4.jpg", tone: 3, alt: "" },
  ],
};

export const brands = {
  label: "Brands we've grown with.",
  items: [
    { name: "northline", style: "sans" },
    { name: "Elmore", style: "serif" },
    { name: "Kite&Co", style: "bold" },
    { name: "halden", style: "script" },
    { name: "Vesper", style: "serif" },
  ],
};

export const experience = {
  chip: "Experience",
  title: ["Years of ", { i: "organic and paid" }, " growth"],
  text: "Most agencies hand you a dashboard. We hand you results. Our team has spent years running organic and paid programs for tech companies, fine-tuning brand, content and media spend so budget goes where it counts.",
  stats: [
    {
      value: "3.2x",
      label: "Average pipeline growth",
      text: "Within the first two quarters of launching a new program.",
    },
    {
      value: "47%",
      label: "Lower cost per lead",
      text: "Through smarter targeting and creative across paid channels.",
    },
    {
      value: "156M",
      label: "Impressions & reach",
      text: "Across organic and paid content in the past year.",
    },
  ],
  images: [
    { src: "/images/bento-1.jpg", tone: 4, alt: "" },
    { src: "/images/bento-2.jpg", tone: 5, alt: "" },
  ],
};

export const services = {
  chip: "Expertise",
  title: ["What we ", { i: "build" }, " and run"],
  text: "One team for both sides of growth — organic and paid, planned and run together.",
  list: [
    "Organic: brand, content & SEO/AEO/GEO",
    "Paid: programmatic, social & search",
    "Personal brand for founders & execs",
    "Paid Launchpad for first campaigns",
  ],
  image: { src: "/images/services.jpg", tone: 6, alt: "" },
};

export const results = {
  chip: "Results",
  title: ["Campaigns that ", { i: "delivered" }],
  cases: CASE_STUDIES.map((c) => ({
    image: c.image,
    tags: c.tags,
    title: c.title,
    text: c.summary,
    metrics: c.metrics,
    href: `/results/${c.slug}/`,
  })),
  linkLabel: "View case study",
};

export const process = {
  chip: "Process",
  title: ["How we ", { i: "work" }],
  steps: [
    {
      title: "Audit and planning",
      text: "We review your goals, data and current setup, then map out the plan.",
      image: { src: "/images/process-1.jpg", tone: 1, alt: "" },
    },
    {
      title: "Setup and launch",
      text: "We build your campaigns and content systems, and go live.",
      image: { src: "/images/process-2.jpg", tone: 3, alt: "" },
    },
    {
      title: "Optimize and scale",
      text: "We measure, test and keep improving performance every single week.",
      image: { src: "/images/process-3.jpg", tone: 0, alt: "" },
    },
  ],
};

export const benefits = {
  chip: "Benefits",
  title: ["Growth you can ", { i: "measure" }],
  text: "No vanity metrics. We focus on the numbers that actually grow your business.",
  items: [
    {
      icon: "database",
      title: "Full-funnel tracking",
      text: "See exactly where your money goes and what it brings back. No guessing, no surprises.",
    },
    {
      icon: "chart",
      title: "Lower acquisition costs",
      text: "Smarter targeting helps your budget go further and speeds up your growth.",
    },
    {
      icon: "support",
      title: "Hands-on support",
      text: "We're not a vendor. We're invested in your success and work like we own the outcome.",
    },
  ],
};

export const testimonials = {
  avatars: [
    { src: "/images/avatar-1.jpg", tone: 0 },
    { src: "/images/avatar-2.jpg", tone: 7 },
    { src: "/images/avatar-3.jpg", tone: 4 },
  ],
  small: "Trusted by 100+ growing tech companies",
  title: ["Trusted by ", { i: "tech companies" }, " across industries"],
  primary: { label: "Work with us", href: "/contact/" },
  secondary: { label: "Leave a review", href: "/contact/" },
  items: [
    {
      quote:
        "We were skeptical about handing over our growth marketing. Dotstory made it painless and our pipeline improved within weeks.",
      name: "Alex Morgan",
      role: "Co-founder, Brand One",
      logo: "koat",
    },
    {
      quote:
        "We'd been spending for two years with little to show for it. Three months in, our cost per lead dropped by almost half.",
      name: "Sam Rivera",
      role: "Founder, Brand Two",
      logo: "MAQ.",
    },
    {
      quote:
        "The reporting is clear, the strategy is sharp, and they explain every decision. It feels like an in-house team.",
      name: "Jordan Lee",
      role: "Head of marketing, Brand Three",
      logo: "think",
    },
    {
      quote:
        "They exceeded our expectations. Planning, setup and optimization were all handled with real care.",
      name: "Taylor Quinn",
      role: "COO, Brand Four",
      logo: "ella",
    },
    {
      quote:
        "Our organic and paid efforts went from scattered to structured. Pipeline from both channels grew by more than half in one quarter.",
      name: "Casey Brooks",
      role: "Marketing manager, Brand Five",
      logo: "ZEN",
    },
    {
      quote:
        "We hired them for one service and ended up keeping them for everything. Easily the best partner we've had.",
      name: "Riley Carter",
      role: "Brand director, Brand Six",
      logo: "lumé",
    },
  ],
};

export const faq = {
  chip: "Questions",
  title: ["Answers to common ", { i: "questions" }, " you may have"],
  text: `Everything you need to know about working with ${brand.name}. See the full FAQ for more.`,
  items: [
    {
      q: "How long until we see results?",
      a: "Most clients see early signals within the first two to four weeks on paid, and one to two months on organic — with meaningful performance gains by the end of the first quarter.",
    },
    {
      q: "Do you handle both organic and paid?",
      a: "Yes. We run organic (brand, content, SEO/AEO/GEO, personal brand) and paid (programmatic, paid social & search, Paid Launchpad) as one connected program, or as standalone services.",
    },
    {
      q: "What is your minimum contract length?",
      a: "We keep things flexible. Most engagements start with a three month term so we have enough time to test, learn and optimize.",
    },
    {
      q: "Do you work with all industries?",
      a: "We focus on B2B tech companies above $10M ARR — SaaS, fintech, dev tools and similar. If you're unsure whether you're a fit, just ask.",
    },
    {
      q: "How do you measure success?",
      a: "We agree on clear goals up front, such as pipeline growth or cost per lead, and report on them every week.",
    },
    {
      q: "How can I get in touch?",
      a: "Use the contact page on this site or email us directly and we'll get back to you within one business day.",
    },
  ],
};

export const cta = {
  title: ["Ready to ", { i: "scale" }, " your growth?"],
  text: "Let's talk about your goals and build an organic and paid growth plan that works.",
  primary: { label: "Get in touch", href: `mailto:${brand.email}` },
  secondary: { label: "About us", href: "/about/" },
  reel: [
    { src: "/images/reel-1.jpg", tone: 2, icon: "share", value: "200K" },
    { src: "/images/reel-2.jpg", tone: 3, icon: "bookmark", value: "24.7K" },
    { src: "/images/reel-3.jpg", tone: 4, icon: "eye", value: "1.4M" },
    { src: "/images/reel-4.jpg", tone: 5, icon: "heart", value: "100K" },
    { src: "/images/reel-5.jpg", tone: 6, icon: "share", value: "83K" },
    { src: "/images/reel-6.jpg", tone: 1, icon: "eye", value: "8.1K" },
    { src: "/images/reel-7.jpg", tone: 0, icon: "heart", value: "62K" },
    { src: "/images/reel-8.jpg", tone: 7, icon: "bookmark", value: "15K" },
  ],
};

export const footer = {
  newsletter: "Get weekly tips, platform updates, and growth insights.",
  note: "We respect your inbox. Unsubscribe anytime.",
  sitemap: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Results", href: "/results/" },
    { label: "Resources", href: "/resources/" },
    { label: "Careers", href: "#" },
  ],
  company: [
    { label: "How we work", href: "/about/" },
    { label: "Services", href: "/services/" },
    { label: "Customers", href: "#testimonials" },
    { label: "FAQ", href: "/faq/" },
    { label: "Contact", href: "/contact/" },
  ],
  social: [
    { label: "X.com", icon: "x", href: "#" },
    { label: "LinkedIn", icon: "linkedin", href: "#" },
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "YouTube", icon: "youtube", href: "#" },
    { label: "Facebook", icon: "facebook", href: "#" },
  ],
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
    { label: "Cookie settings", href: "#" },
  ],
};

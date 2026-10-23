// =====================================================================
//  CASE STUDIES  -  drives the Home page carousel, /results/ and every
//  /results/[slug]/ page.
//
//  PLACEHOLDER CONTENT: every number, client description and quote
//  below is a placeholder. Replace with real, approved case studies
//  (the structure document calls for at least 3, ideally 5+) before
//  this goes live.
// =====================================================================

export const CASE_STUDIES = [
  {
    slug: "saas-pipeline-growth",
    title: "3.4x Pipeline Growth in 90 Days for a B2B SaaS Company",
    tags: ["B2B SaaS", "Organic + Paid"],
    image: { src: "/images/case-1.jpg", tone: 2, alt: "" },
    summary:
      "Rebuilt the content and audience strategy across organic and paid to cut wasted spend and compound what was already working.",
    metrics: ["+58% Pipeline", "-31% CPL", "3.4x Growth"],
    challenge:
      "A mid-market SaaS company had scattered content and paid efforts pulling in different directions, with no shared measurement across them.",
    whatWeDid:
      "We rebuilt the brand narrative, launched a connected SEO/AEO/GEO and content program, and restructured paid audiences to retarget around what organic content was already earning attention for.",
    quote: {
      text: "We'd been running organic and paid as two disconnected efforts for years. Three months in, both sides were finally pulling the same direction — and pipeline followed.",
      name: "Alex Morgan",
      role: "Co-founder, a B2B SaaS company",
    },
    relatedService: "seo-aeo-geo",
  },
  {
    slug: "devtools-paid-launchpad",
    title: "$112K in Attributed Pipeline in 30 Days for a Dev Tools Company",
    tags: ["Dev Tools", "Paid Launchpad"],
    image: { src: "/images/case-2.jpg", tone: 4, alt: "" },
    summary:
      "Launched a first-time paid program with clean conversion tracking from day one, instead of learning the expensive way.",
    metrics: ["+74% Revenue", "5.1x ROAS", "9.8M Views"],
    challenge:
      "A fast-growing dev tools company had never run paid media and needed its first campaigns to work without a long, expensive trial-and-error period.",
    whatWeDid:
      "Paid Launchpad covered account setup, tracking and an initial round of optimization across programmatic and paid search, with full-funnel attribution built in from the first campaign.",
    quote: {
      text: "We didn't know what we didn't know about paid media. Having the setup done right the first time saved us probably two quarters of expensive trial and error.",
      name: "Sam Rivera",
      role: "Head of Growth, a dev tools company",
    },
    relatedService: "paid-launchpad",
  },
  {
    slug: "fintech-personal-brand",
    title: "42% Lower Cost per Lead in 90 Days for a Fintech Company",
    tags: ["Fintech", "Personal Brand"],
    image: { src: "/images/case-3.jpg", tone: 6, alt: "" },
    summary:
      "Built a founder thought-leadership program alongside a programmatic refresh, consolidating spend into what was actually converting.",
    metrics: ["-42% CPL", "+120 Leads", "3.6M Reach"],
    challenge:
      "A fintech company's founder had no public presence, and paid spend was spread thin across too many fragmented campaigns to tell what was working.",
    whatWeDid:
      "We built a personal-brand program for the founder, consolidated fragmented programmatic line items, and moved budget toward the audiences the data showed were actually converting.",
    quote: {
      text: "The reporting is clear, the strategy is sharp, and they explain every decision. It feels like an in-house team that happens to also run our founder's LinkedIn.",
      name: "Jordan Lee",
      role: "Head of Marketing, a fintech company",
    },
    relatedService: "programmatic-advertising",
  },
];

export function getCaseBySlug(slug) {
  const clean = typeof slug === "string" ? slug.replace(/\/+$/, "") : slug;
  return CASE_STUDIES.find((c) => c.slug === clean);
}

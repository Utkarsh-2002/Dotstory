// =====================================================================
//  SERVICES CATALOG  -  drives /services/, the nav, and every
//  /services/[slug]/ subpage.
//
//  PLACEHOLDER CONTENT: intro, included[] and faqs[] below are
//  structural placeholders — real sentences, but written to be
//  replaced. A content writer should rewrite the copy in place
//  without touching the slugs, group keys or schema-relevant fields.
// =====================================================================

export const SERVICE_GROUPS = [
  {
    key: "organic",
    label: "Organic",
    blurb: "Brand, content and AI-search visibility that compounds over time.",
  },
  {
    key: "paid",
    label: "Paid",
    blurb: "Media buying across programmatic and standard ad platforms.",
  },
];

export const SERVICES = [
  {
    slug: "company-brand-content",
    group: "organic",
    name: "Company Brand & Content Strategy",
    short: "A clear brand narrative and the content system that carries it — not just a style guide.",
    metaTitle: "Company Brand & Content Strategy | Dotstory",
    metaDescription:
      "We build the brand positioning and content strategy B2B tech companies use to stand out — messaging, content systems and distribution, planned and run.",
    h1: "Company brand & content strategy, built to scale",
    intro:
      "A content calendar without a clear brand underneath it burns budget without building anything. We start with positioning and messaging, then build the content system that carries it — so the website, LinkedIn and every other channel say the same thing in the same voice.",
    included: [
      "Brand positioning & messaging framework",
      "Website and core page copy direction",
      "Content calendar and distribution plan",
      "Ongoing content production — written and visual",
    ],
    faqs: [
      {
        q: "Do you write the content yourselves, or just plan it?",
        a: "Both. We build the strategy and calendar, and we produce the content — working with your team wherever your own expertise needs to show up in it.",
      },
      {
        q: "How is this different from a normal content agency?",
        a: "We build organic and paid together, so content strategy connects directly to SEO/AEO/GEO and to what's working in paid — instead of three teams working from three different plans.",
      },
      {
        q: "How long before this shows results?",
        a: "Brand and content compound — expect early signals in the first one to two months, with the real payoff building over two to three quarters.",
      },
    ],
  },
  {
    slug: "personal-brand",
    group: "organic",
    name: "Personal Brand for Founders & Executives",
    short: "Thought leadership for the people behind the company — built and distributed, not just written.",
    metaTitle: "Personal Brand for Founders & Executives | Dotstory",
    metaDescription:
      "We build and run personal brand and thought-leadership programs for B2B tech founders and executives — ghostwriting, distribution and a consistent voice.",
    h1: "Personal brand, built for your founders and executives",
    intro:
      "Buyers trust people before they trust companies. We build a thought-leadership program around your founders and execs — finding their real point of view, writing in their voice, and getting it in front of the right audience consistently.",
    included: [
      "Voice and positioning for each executive",
      "Ghostwritten posts, drafted from real conversations",
      "A consistent publishing cadence, not sporadic posts",
      "Distribution strategy across the platforms that matter",
    ],
    faqs: [
      {
        q: "Whose personal brand does this cover?",
        a: "Typically founders and senior executives — whoever the market already looks to, or should look to, as the voice of the company.",
      },
      {
        q: "Will it actually sound like them, not like an agency?",
        a: "That's the standard we hold ourselves to. We start from real conversations and existing writing, not a generic template.",
      },
      {
        q: "Does this connect to the company brand work?",
        a: "Yes — personal and company brand are planned together, so an executive's posts and the company's content reinforce each other instead of competing.",
      },
    ],
  },
  {
    slug: "seo-aeo-geo",
    group: "organic",
    name: "SEO / AEO / GEO",
    short: "Search and AI-answer visibility — structured so Google and ChatGPT alike can find and cite you.",
    metaTitle: "SEO, AEO & GEO Services | Dotstory",
    metaDescription:
      "We structure sites and content for classic search rankings and for AI-answer visibility — SEO, AEO and GEO handled as one connected discipline, not three.",
    h1: "SEO, AEO and GEO, run as one connected program",
    intro:
      "Ranking in Google and getting cited by ChatGPT, Gemini and Perplexity rely on mostly the same fundamentals, done well — plus a few extra habits for how AI systems read a page. We handle both together: site structure, technical setup, and content built to be the clear, citable answer.",
    included: [
      "Site structure and information architecture audit",
      "Technical SEO — Core Web Vitals, crawlability, schema",
      "Content built around real buyer and AI-search questions",
      "Monthly tracking across Search Console and AI-answer visibility",
    ],
    faqs: [
      {
        q: "What's the difference between SEO, AEO and GEO?",
        a: "SEO is ranking in classic search results. AEO and GEO are about being the answer an AI tool gives or cites — ChatGPT, Gemini, Perplexity and Google's AI Overviews. The underlying work overlaps heavily, so we run them together.",
      },
      {
        q: "How do you measure GEO specifically?",
        a: "There's no single dashboard for it yet. We track it manually — asking the real questions your buyers would ask across the major AI tools, monthly, and logging whether you're named or cited.",
      },
      {
        q: "Do you need a full website rebuild to do this properly?",
        a: "Not always — a lot of this is structural fixes and content, not a rebuild. A full rebuild helps when the current site's architecture is fundamentally working against you.",
      },
    ],
  },
  {
    slug: "programmatic-advertising",
    group: "paid",
    name: "Programmatic Advertising",
    short: "Audience-targeted display, video and CTV media buying — planned, bought and optimized for you.",
    metaTitle: "Programmatic Advertising Services | Dotstory",
    metaDescription:
      "We plan, buy and optimize programmatic display, video and CTV campaigns for B2B tech companies — audience strategy, creative and reporting handled end to end.",
    h1: "Programmatic advertising, planned and run for you",
    intro:
      "Programmatic buying puts your ads in front of the right audience at scale, across display, video and connected TV — but only if the account structure, audiences and bidding are set up correctly from day one. We handle all of it, and report in plain numbers, not platform jargon.",
    included: [
      "Account structure and campaign setup",
      "Audience strategy and targeting",
      "Creative direction and asset management",
      "Bidding, optimization and weekly reporting",
    ],
    faqs: [
      {
        q: "Which platforms do you buy through?",
        a: "We work across the major demand-side platforms rather than locking you into one — the right platform depends on your audience and budget.",
      },
      {
        q: "What's the minimum budget to make this worthwhile?",
        a: "It depends on your market and goals — we'll tell you honestly if programmatic isn't the right first move for your budget.",
      },
      {
        q: "How is this different from paid social and search?",
        a: "Programmatic buys audience-targeted inventory across the open web, video and CTV — complementary to, not a replacement for, paid social and search.",
      },
    ],
  },
  {
    slug: "paid-social-search",
    group: "paid",
    name: "Paid Social & Search",
    short: "Standard paid channels — Google Ads, LinkedIn, Meta — run with the same rigor as programmatic.",
    metaTitle: "Paid Social & Search Advertising | Dotstory",
    metaDescription:
      "We plan and run paid search and paid social campaigns — Google Ads, LinkedIn, Meta — for B2B tech companies, with full-funnel tracking and weekly optimization.",
    h1: "Paid social and search, run with real rigor",
    intro:
      "Search and social are still where most buyers start looking. We build and run campaigns across Google Ads, LinkedIn and Meta with clean tracking from day one, so spend goes toward what's actually converting.",
    included: [
      "Campaign setup across Google Ads, LinkedIn and Meta",
      "Conversion tracking and attribution setup",
      "Creative and copy testing",
      "Weekly optimization and reporting",
    ],
    faqs: [
      {
        q: "Do you run all three platforms for every client?",
        a: "No — we recommend the mix that matches where your buyers actually are, which is often not all three at once.",
      },
      {
        q: "Can you work with an in-house marketing team?",
        a: "Yes, this is a common setup — we run paid media execution while your team owns brand and product positioning.",
      },
      {
        q: "How do you avoid wasted spend early on?",
        a: "Tight audience targeting and clean conversion tracking from the first day, plus a short testing phase before we scale budget into what's working.",
      },
    ],
  },
  {
    slug: "paid-launchpad",
    group: "paid",
    name: "Paid Launchpad",
    short: "A first-campaign setup — for a company launching paid media for the first time, start to finish.",
    metaTitle: "Paid Launchpad — First Campaign Setup | Dotstory",
    metaDescription:
      "Paid Launchpad gets a tech company's first paid campaigns built, tracked and live — account setup, tracking and an initial round of optimization, start to finish.",
    h1: "Paid Launchpad: your first paid campaigns, done right",
    intro:
      "Launching paid media for the first time means a lot of one-time setup — accounts, tracking, creative, the first round of targeting decisions. Paid Launchpad is that setup, done properly from the start, so your first campaigns aren't also your most expensive learning curve.",
    included: [
      "Ad account and conversion-tracking setup",
      "Initial audience and channel strategy",
      "First-campaign creative and copy",
      "Launch, monitor, and an initial round of optimization",
    ],
    faqs: [
      {
        q: "Is this a one-time project or ongoing?",
        a: "It's a focused, fixed-scope engagement to get your first campaigns live properly — many clients move into ongoing Programmatic or Paid Social & Search management afterward.",
      },
      {
        q: "We've never run paid media before — is that a problem?",
        a: "That's exactly who this is built for. We handle every piece of first-time setup, not just strategy.",
      },
      {
        q: "What do we need to have ready before starting?",
        a: "Mainly access to your website and ad accounts (or help creating them) and clarity on your ideal customer — we'll guide the rest.",
      },
    ],
  },
];

export function getServiceBySlug(slug) {
  const clean = typeof slug === "string" ? slug.replace(/\/+$/, "") : slug;
  return SERVICES.find((s) => s.slug === clean);
}

export function getServicesByGroup(key) {
  return SERVICES.filter((s) => s.group === key);
}

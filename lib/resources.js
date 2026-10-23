// =====================================================================
//  RESOURCES (BLOG) ARTICLES  -  drives /resources/ and every
//  /resources/[slug]/ article.
//
//  PLACEHOLDER CONTENT: intro, sections[] and faqs[] are structural
//  placeholders, written to the "answer first" template from the SEO
//  & GEO structure guide. A content writer replaces the copy without
//  touching the slug, dates or linked service.
// =====================================================================

export const RESOURCES = [
  {
    slug: "what-is-geo",
    title: "What Is GEO (Generative Engine Optimization)?",
    metaTitle: "What Is GEO? A Plain-English Guide | Dotstory",
    metaDescription:
      "GEO (Generative Engine Optimization) is the practice of structuring content so AI tools like ChatGPT, Gemini and Perplexity can find, understand and cite it. Here's how it works.",
    dek: "The short, plain-English answer — plus how it's different from classic SEO.",
    author: "Dotstory Editorial",
    datePublished: "2026-09-01",
    dateModified: "2026-10-01",
    intro:
      "GEO (Generative Engine Optimization) is the practice of structuring a website and its content so AI tools — ChatGPT, Gemini, Perplexity, Google's AI Overviews — can find it, understand it, and quote it as a source. It's a close cousin of SEO, not a replacement for it.",
    sections: [
      {
        h2: "How is GEO different from SEO?",
        body:
          "Classic SEO optimizes for ranking in a list of blue links a person scans and clicks. GEO optimizes for being the specific sentence or paragraph an AI tool lifts out and shows directly in its answer — often without the reader ever visiting the site. The underlying fundamentals (clear structure, real expertise, fast and crawlable pages) mostly overlap; GEO adds a few extra habits on top, like answering a question directly in the first few sentences and making every section stand on its own.",
      },
      {
        h2: "Why does it matter for a growing tech company?",
        body:
          "More buyers are starting their research in an AI tool instead of a search bar. A company that's invisible to those tools is invisible at the exact moment a prospect is forming their shortlist — regardless of how well that company ranks in classic search.",
      },
      {
        h2: "How do you measure GEO?",
        body:
          "There's no single analytics dashboard for it yet. The practical approach is manual and recurring: periodically ask the AI tools your buyers use the real questions they'd ask, and track whether your company is named or cited.",
      },
    ],
    faqs: [
      {
        q: "Do you need an agency to do GEO, or can an in-house team handle it?",
        a: "An in-house team can absolutely do this — it mainly takes the same content and technical discipline classic SEO already requires, applied consistently.",
      },
      {
        q: "Is GEO a passing trend?",
        a: "The specific tools will keep changing, but AI-assisted search is clearly a permanent part of how people research purchases now, not a fad.",
      },
    ],
    relatedService: "seo-aeo-geo",
  },
  {
    slug: "organic-vs-paid-growth",
    title: "Organic vs. Paid Growth: How B2B Tech Companies Should Split Budget",
    metaTitle: "Organic vs. Paid Growth for B2B Tech | Dotstory",
    metaDescription:
      "Organic and paid growth solve different problems on different timelines. Here's a practical way for a B2B tech company to decide how to split budget between them.",
    dek: "Neither one replaces the other — here's how to think about the split.",
    author: "Dotstory Editorial",
    datePublished: "2026-09-08",
    dateModified: "2026-10-01",
    intro:
      "Paid growth buys attention now; organic growth builds an asset that keeps paying off after the budget stops. Most B2B tech companies need both, in a ratio that shifts as the company matures — not a one-time choice between them.",
    sections: [
      {
        h2: "What paid is better at",
        body:
          "Paid media is the fastest lever for predictable, scalable pipeline — you can turn it on, measure it in weeks, and scale what's proven to work. The tradeoff is that performance stops the moment spend stops.",
      },
      {
        h2: "What organic is better at",
        body:
          "Organic — brand, content, SEO/AEO/GEO, personal brand — compounds. It's slower to show results, but a well-ranked article or a trusted founder voice keeps generating pipeline long after the work that built it is done.",
      },
      {
        h2: "A practical starting split",
        body:
          "Early-stage or newly entering a market: weight toward paid, to learn quickly what messaging and audiences convert. Once that's established: shift meaningfully toward organic, and let paid reinforce and retarget around what organic is already earning attention for.",
      },
    ],
    faqs: [
      {
        q: "Should a $10M+ ARR company still be spending on paid at all?",
        a: "Usually yes — paid remains the fastest way to test new segments or messaging, even once organic is a company's primary growth engine.",
      },
      {
        q: "How long before organic growth shows up in the numbers?",
        a: "Expect early signals in one to two months, with the compounding effect becoming clear over two to three quarters of consistent publishing.",
      },
    ],
    relatedService: "company-brand-content",
  },
  {
    slug: "what-is-programmatic-advertising",
    title: "What Is Programmatic Advertising, and How Does It Work?",
    metaTitle: "What Is Programmatic Advertising? | Dotstory",
    metaDescription:
      "Programmatic advertising is the automated buying of digital ad space through real-time bidding. Here's a plain-English explanation of how it actually works.",
    dek: "A plain-English explanation of automated, audience-targeted ad buying.",
    author: "Dotstory Editorial",
    datePublished: "2026-09-15",
    dateModified: "2026-10-01",
    intro:
      "Programmatic advertising is the automated buying of digital ad space — display, video, connected TV — through real-time bidding, rather than negotiating placements with publishers directly. It's what lets an advertiser target a specific audience across thousands of sites and apps from one platform.",
    sections: [
      {
        h2: "How does the buying actually happen?",
        body:
          "When a person loads a page with ad space available, that impression is auctioned in real time across a bidding platform. Advertisers set targeting rules and bid limits in advance; the platform's algorithm bids automatically within those rules, in the fraction of a second before the page finishes loading.",
      },
      {
        h2: "What makes a campaign actually work",
        body:
          "Account structure, audience definitions and creative quality matter far more than the bidding algorithm itself. A well-structured account with clear audiences and strong creative will outperform a sloppy one on the same budget, every time.",
      },
      {
        h2: "Who should use programmatic advertising?",
        body:
          "Companies that need to reach a specific, definable audience at scale across the open web — not just the handful of platforms paid social covers — are the best fit.",
      },
    ],
    faqs: [
      {
        q: "Is programmatic the same as paid social?",
        a: "No. Paid social runs within a platform like LinkedIn or Meta; programmatic buys audience-targeted inventory across the much wider open web, video and CTV.",
      },
      {
        q: "Do you need an agency to run programmatic campaigns?",
        a: "It's possible to self-serve, but the platforms are complex enough that most companies get meaningfully better results working with a team that runs them daily.",
      },
    ],
    relatedService: "programmatic-advertising",
  },
  {
    slug: "growth-agency-cost",
    title: "How Much Does a Growth Agency Cost for a $10M+ ARR Tech Company?",
    metaTitle: "Growth Agency Cost for $10M+ ARR Tech Companies | Dotstory",
    metaDescription:
      "What a growth agency actually costs for a B2B tech company above $10M ARR depends on scope — here's a realistic range and what drives it, broken down by organic and paid.",
    dek: "A realistic range, and what actually drives the cost up or down.",
    author: "Dotstory Editorial",
    datePublished: "2026-09-22",
    dateModified: "2026-10-01",
    intro:
      "There's no single number — a growth agency engagement for a company above $10M ARR typically ranges from a focused single-service retainer to a full organic-and-paid program, with cost driven mainly by scope and ad spend under management, not company size alone.",
    sections: [
      {
        h2: "What drives the cost",
        body:
          "Three things matter most: how many services are in scope (one service vs. the full organic-and-paid program), how much media spend is being managed, and how much original content production is included versus strategy alone.",
      },
      {
        h2: "What's usually included at each level",
        body:
          "A single-service engagement (just SEO/AEO/GEO, or just programmatic) covers strategy and execution for that one channel. A full program adds the other pillar, content production, and cross-channel reporting that ties organic and paid performance together.",
      },
      {
        h2: "Questions worth asking before you sign anything",
        body:
          "What's included in the retainer versus billed separately (ad spend, paid tools, content production)? Is reporting weekly or monthly? What's the minimum term, and what happens if it's not working after that term?",
      },
    ],
    faqs: [
      {
        q: "Is it cheaper to hire in-house instead?",
        a: "It depends on how many channels you need covered — an agency often costs less than hiring separate in-house specialists for organic and paid, especially below a certain spend threshold.",
      },
      {
        q: "What's a reasonable minimum contract length?",
        a: "Three months is a common starting point — enough time to test, learn and optimize before judging results.",
      },
    ],
    relatedService: "seo-aeo-geo",
  },
];

export function getResourceBySlug(slug) {
  const clean = typeof slug === "string" ? slug.replace(/\/+$/, "") : slug;
  return RESOURCES.find((r) => r.slug === clean);
}

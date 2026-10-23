// Generates /robots.txt — matches the policy in the SEO & GEO structure
// guide: allow everything by default, and explicitly list the AI answer
// engines worth welcoming in.
export default function robots() {
  const SITE_URL = "https://dotstory.io";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

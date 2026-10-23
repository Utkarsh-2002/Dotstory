import { SERVICES } from "../lib/services";
import { RESOURCES } from "../lib/resources";
import { CASE_STUDIES } from "../lib/caseStudies";

const SITE_URL = "https://dotstory.io";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: "/", priority: 1 },
    { url: "/services/", priority: 0.9 },
    { url: "/results/", priority: 0.8 },
    { url: "/resources/", priority: 0.8 },
    { url: "/about/", priority: 0.6 },
    { url: "/faq/", priority: 0.6 },
    { url: "/contact/", priority: 0.7 },
  ].map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const resultRoutes = CASE_STUDIES.map((cs) => ({
    url: `${SITE_URL}/results/${cs.slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const resourceRoutes = RESOURCES.map((r) => ({
    url: `${SITE_URL}/resources/${r.slug}/`,
    lastModified: r.dateModified ? new Date(r.dateModified) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...resultRoutes, ...resourceRoutes];
}

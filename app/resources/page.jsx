import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import JsonLd from "../../components/JsonLd";
import * as c from "../../lib/content";
import { RESOURCES } from "../../lib/resources";
import { breadcrumbSchema, collectionPageSchema } from "../../lib/schema";

export const metadata = {
  title: "Resources — Organic & Paid Growth Guides",
  description:
    "Plain-English guides on organic and paid growth, SEO/AEO/GEO and programmatic advertising for B2B tech companies.",
  alternates: { canonical: "/resources/" },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ResourcesPillar() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Resources" }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          collectionPageSchema({
            url: "/resources/",
            name: "Resources — Organic & Paid Growth Guides",
            description: metadata.description,
          }),
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker="Resources"
          title={["Plain-English guides to ", { i: "growth" }]}
          text="Straight answers to the questions prospects — and the AI tools they ask — are actually searching for."
        />

        <section className="section page-section">
          <div className="container">
            <div className="resource-grid">
              {RESOURCES.map((r) => (
                <a key={r.slug} href={`/resources/${r.slug}/`} className="card resource-card">
                  <h3>{r.title}</h3>
                  <p>{r.dek}</p>
                  <div className="article-meta">
                    <span>{r.author}</span>
                    <span>{formatDate(r.datePublished)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title={["Have a question we ", { i: "haven't" }, " answered?"]}
          primary={{ label: "Ask us directly", href: "/contact/" }}
          secondary={{ label: "See the full FAQ", href: "/faq/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

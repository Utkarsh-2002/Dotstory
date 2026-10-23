import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import JsonLd from "../../components/JsonLd";
import { Framed } from "../../components/ui";
import * as c from "../../lib/content";
import { CASE_STUDIES } from "../../lib/caseStudies";
import { breadcrumbSchema, collectionPageSchema } from "../../lib/schema";

export const metadata = {
  title: "Case Studies & Results",
  description:
    "Real organic and paid growth results for B2B tech companies — pipeline growth, lower cost per lead, and campaigns that delivered.",
  alternates: { canonical: "/results/" },
};

export default function ResultsPillar() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Results" }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          collectionPageSchema({
            url: "/results/",
            name: "Case Studies & Results",
            description: metadata.description,
          }),
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker="Results"
          title={["Campaigns that ", { i: "delivered" }]}
          text={`${CASE_STUDIES.length} client stories so far, across organic and paid, for tech companies above $10M ARR.`}
          primary={{ label: "Book a call", href: "/contact/" }}
        />

        <section className="section page-section">
          <div className="container">
            <div className="results-grid">
              {CASE_STUDIES.map((cs) => (
                <a key={cs.slug} href={`/results/${cs.slug}/`} className="result-card">
                  <Framed {...cs.image} className="case-img" />
                  <div className="tags">
                    {cs.tags.map((t, i) => (
                      <span key={t} className={`tag ${i === 0 ? "tag-dark" : ""}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3>{cs.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title={["Want results like ", { i: "these" }, "?"]}
          text="Tell us about your goals and we'll map out what an organic and paid program could look like for you."
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={{ label: "See our services", href: "/services/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

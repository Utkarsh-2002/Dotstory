import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import CtaBand from "../../../components/CtaBand";
import JsonLd from "../../../components/JsonLd";
import ScrollBg, { BgMark } from "../../../components/ScrollBg";
import ScrollZoom from "../../../components/ScrollZoom";
import * as c from "../../../lib/content";
import { CASE_STUDIES, getCaseBySlug } from "../../../lib/caseStudies";
import { getServiceBySlug } from "../../../lib/services";
import { breadcrumbSchema, articleSchema } from "../../../lib/schema";

// "+58% Pipeline" -> { value: "+58%", label: "Pipeline" }
function splitMetric(m) {
  const i = m.indexOf(" ");
  return i === -1 ? { value: m, label: "" } : { value: m.slice(0, i), label: m.slice(i + 1) };
}

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `/results/${cs.slug}/` },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCaseBySlug(slug);
  if (!cs) notFound();
  const relatedService = cs.relatedService ? getServiceBySlug(cs.relatedService) : null;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Results", href: "/results/" },
    { label: cs.title },
  ];
  const url = `/results/${cs.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({ headline: cs.title, description: cs.summary, url }),
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <BgMark color="#fbfcf8" />
        <PageHero breadcrumbs={breadcrumbs} kicker={cs.tags[0]} title={cs.title} text={cs.summary} />

        <BgMark color="#0a0d07" />
        <ScrollZoom eyebrow={cs.tags[0]} title={cs.title} image={cs.image} items={cs.metrics.map(splitMetric)} />

        <BgMark color="#ffffff" />
        <section className="section page-section">
          <div className="container">
            <div className="case-metrics-row">
              {cs.metrics.map((m) => (
                <span key={m} className="metric center">
                  {m}
                </span>
              ))}
            </div>

            <div className="case-detail-grid">
              <div>
                <h2>The challenge</h2>
                <p>{cs.challenge}</p>
              </div>
              <div>
                <h2>What we did</h2>
                <p>{cs.whatWeDid}</p>
              </div>
            </div>

            {cs.quote && (
              <div className="case-quote">
                <div className="quote">
                  <blockquote>
                    <span className="qmark">“</span>
                    {cs.quote.text}
                  </blockquote>
                  <figcaption>
                    <span className="who">
                      <strong>{cs.quote.name}</strong>
                      <span>{cs.quote.role}</span>
                    </span>
                  </figcaption>
                </div>
              </div>
            )}
          </div>
        </section>

        <BgMark color="#eef1e4" />
        <CtaBand
          title={["Want to talk through your ", { i: "own" }, " numbers?"]}
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={
            relatedService
              ? { label: `See ${relatedService.name}`, href: `/services/${relatedService.slug}/` }
              : { label: "See our services", href: "/services/" }
          }
        />
        <BgMark color="#fbfcf8" />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
      <ScrollBg />
    </>
  );
}

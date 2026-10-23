import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import CtaBand from "../../../components/CtaBand";
import Faq from "../../../components/Faq";
import JsonLd from "../../../components/JsonLd";
import * as c from "../../../lib/content";
import { RESOURCES, getResourceBySlug } from "../../../lib/resources";
import { getServiceBySlug } from "../../../lib/services";
import { breadcrumbSchema, articleSchema, faqSchema } from "../../../lib/schema";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = getResourceBySlug(slug);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/resources/${r.slug}/` },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ResourceArticle({ params }) {
  const { slug } = await params;
  const r = getResourceBySlug(slug);
  if (!r) notFound();
  const relatedService = r.relatedService ? getServiceBySlug(r.relatedService) : null;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources/" },
    { label: r.title },
  ];
  const url = `/resources/${r.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            headline: r.title,
            description: r.metaDescription,
            url,
            datePublished: r.datePublished,
            dateModified: r.dateModified,
            authorName: r.author,
          }),
          faqSchema(r.faqs),
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero breadcrumbs={breadcrumbs} title={r.title} text={r.intro} />
        <div className="container">
          <p className="article-meta center">
            <span>{r.author}</span>
            <span>Published {formatDate(r.datePublished)}</span>
            {r.dateModified && r.dateModified !== r.datePublished && <span>Updated {formatDate(r.dateModified)}</span>}
          </p>
        </div>

        <section className="section page-section">
          <div className="container">
            <div className="article-sections">
              {r.sections.map((s) => (
                <div className="article-section" key={s.h2}>
                  <h2>{s.h2}</h2>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq
          data={{
            chip: "Questions",
            title: ["Related ", { i: "questions" }],
            text: "A couple more things worth knowing.",
            items: r.faqs,
          }}
        />

        <CtaBand
          title={relatedService ? ["See how we do ", { i: relatedService.name.toLowerCase() }] : ["Want to talk this ", { i: "through" }, "?"]}
          primary={
            relatedService
              ? { label: `See ${relatedService.name}`, href: `/services/${relatedService.slug}/` }
              : { label: "Book a call", href: "/contact/" }
          }
          secondary={{ label: "More resources", href: "/resources/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

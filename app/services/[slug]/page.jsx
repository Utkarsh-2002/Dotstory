import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import CtaBand from "../../../components/CtaBand";
import Faq from "../../../components/Faq";
import JsonLd from "../../../components/JsonLd";
import { Icon } from "../../../components/ui";
import * as c from "../../../lib/content";
import { SERVICES, getServiceBySlug } from "../../../lib/services";
import { breadcrumbSchema, serviceSchema, faqSchema } from "../../../lib/schema";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServiceSubpage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const groupLabel = service.group === "organic" ? "Organic" : "Paid";
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: service.name },
  ];
  const url = `/services/${service.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          serviceSchema({ name: service.name, description: service.metaDescription, url }),
          faqSchema(service.faqs),
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker={groupLabel}
          title={service.h1}
          text={service.intro}
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={{ label: "All services", href: "/services/" }}
        />

        <section className="section page-section">
          <div className="container">
            <h2 className="h2">What's included</h2>
            <ul className="checklist included-grid">
              {service.included.map((item) => (
                <li key={item}>
                  <span className="check">
                    <Icon name="check" size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq
          data={{
            chip: "Questions",
            title: ["Common ", { i: "questions" }],
            text: `What clients usually ask before starting ${service.name}.`,
            items: service.faqs,
          }}
        />

        <CtaBand
          title={["Let's talk about ", { i: service.name.toLowerCase() }]}
          text="Book a short call — we'll tell you honestly whether this is the right fit before anything else."
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={{ label: "See results", href: "/results/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

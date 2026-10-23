import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import { Chip } from "../../components/ui";
import * as c from "../../lib/content";
import { SERVICE_GROUPS, getServicesByGroup } from "../../lib/services";
import { breadcrumbSchema, serviceSchema } from "../../lib/schema";

export const metadata = {
  title: "Organic & Paid Growth Services for Tech Companies",
  description:
    "We build organic and paid growth for tech companies above $10M ARR — brand, SEO/AEO/GEO, programmatic and paid media, planned and run end to end.",
  alternates: { canonical: "/services/" },
};

const PILLAR_FAQ = {
  chip: "Questions",
  title: ["Questions about our ", { i: "services" }],
  text: "The short version — see the full FAQ for everything else.",
  items: [
    {
      q: "Do we have to use both organic and paid?",
      a: "No — each service below works as a standalone engagement. Most clients eventually run both because they reinforce each other, but there's no bundling requirement.",
    },
    {
      q: "What does this cost?",
      a: "It depends on scope — how many services, and how much media spend is under management. See our growth agency cost guide in Resources, or just ask on a call.",
    },
    {
      q: "Who is this a fit for?",
      a: "B2B tech companies above $10M ARR — SaaS, fintech, dev tools and similar. If you're close to that but not sure, get in touch anyway.",
    },
  ],
};

export default function ServicesPillar() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Services" }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          ...SERVICE_GROUPS.flatMap((g) =>
            getServicesByGroup(g.key).map((s) =>
              serviceSchema({ name: s.name, description: s.metaDescription, url: `/services/${s.slug}/` })
            )
          ),
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker="Services"
          title={["Organic and paid growth, ", { i: "planned and run" }, " for you"]}
          text="Two sides of one growth program — brand, content and AI-search visibility on the organic side; programmatic, paid social and search on the paid side. Work with one, or both."
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={{ label: "See results", href: "/results/" }}
        />

        {SERVICE_GROUPS.map((group) => (
          <section className="section page-section" key={group.key}>
            <div className="container">
              <div className="service-group">
                <div className="service-group-head">
                  <Chip>{group.label}</Chip>
                  <p className="lead">{group.blurb}</p>
                </div>
                <div className="service-grid">
                  {getServicesByGroup(group.key).map((s) => (
                    <a key={s.slug} href={`/services/${s.slug}/`} className="card service-card">
                      <div>
                        <h3>{s.name}</h3>
                        <p>{s.short}</p>
                      </div>
                      <span className="link-u">Learn more →</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <Faq data={PILLAR_FAQ} />

        <CtaBand
          title={["Not sure where to ", { i: "start" }, "?"]}
          text="Tell us what you're trying to grow and we'll tell you honestly which service — or combination — makes sense."
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={{ label: "See our work", href: "/results/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import JsonLd from "../../components/JsonLd";
import { Media } from "../../components/ui";
import * as c from "../../lib/content";
import { TEAM } from "../../lib/team";
import { breadcrumbSchema, aboutPageSchema, organizationSchema } from "../../lib/schema";

export const metadata = {
  title: "About",
  description: "Who's behind Dotstory — our story, our team, and why we run organic and paid growth together.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "About" }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          aboutPageSchema({ url: "/about/" }),
          {
            ...organizationSchema(),
            employee: TEAM.map((t) => ({ "@type": "Person", name: t.name })),
          },
        ]}
      />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker="About"
          title={["Who's behind the ", { i: "work" }]}
          text={`${c.brand.name} is a growth team for B2B tech companies above $10M ARR — we run organic and paid together, instead of as two disconnected efforts.`}
        />

        <section className="section page-section">
          <div className="container">
            <h2 className="h2">Why organic and paid, together</h2>
            <p className="lead">
              Most agencies specialize in one side of growth and leave the other to someone else — which means no one
              is responsible for how they work together. We started Dotstory because that split was costing our own
              clients money: paid campaigns repeating messaging organic had already proven didn't work, and content
              teams with no visibility into which audiences paid media was actually converting. Running both under
              one roof fixes that.
            </p>

            <h2 className="h2" style={{ marginTop: 48 }}>
              Our team
            </h2>
            <div className="team-grid">
              {TEAM.map((t) => (
                <div className="card team-card" key={t.name}>
                  <Media tone={0} />
                  <h4>{t.name}</h4>
                  <p>{t.bio}</p>
                  <p className="tiny">{t.credentials}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title={["Want to ", { i: "work" }, " with us?"]}
          primary={{ label: "Book a call", href: "/contact/" }}
          secondary={{ label: "See our services", href: "/services/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

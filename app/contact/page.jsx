import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import JsonLd from "../../components/JsonLd";
import { Button } from "../../components/ui";
import * as c from "../../lib/content";
import { breadcrumbSchema, contactPageSchema } from "../../lib/schema";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Dotstory — tell us about your goals and we'll follow up within one business day.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), contactPageSchema({ url: "/contact/" })]} />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker="Contact"
          title={["Let's talk about your ", { i: "growth" }]}
          text="Tell us what you're trying to grow — we'll follow up within one business day."
        />

        <section className="section page-section">
          <div className="container">
            <div className="contact-grid">
              <div className="card contact-card">
                <p className="lead">
                  The fastest way to reach us is email — include a line on what you're hoping to grow (organic, paid,
                  or both) and roughly where you're at today.
                </p>
                <ul className="contact-list">
                  <li>
                    <span className="label">Email</span>
                    <a className="value link-u" href={`mailto:${c.brand.email}`}>
                      {c.brand.email}
                    </a>
                  </li>
                  <li>
                    <span className="label">Who this is for</span>
                    <span className="value">B2B tech companies above $10M ARR</span>
                  </li>
                </ul>
                <div className="btn-row" style={{ justifyContent: "flex-start", marginTop: 28 }}>
                  <Button href={`mailto:${c.brand.email}`}>Email us</Button>
                </div>
              </div>

              <div>
                <h2 className="h2" style={{ fontSize: 22, marginTop: 0 }}>
                  What happens after you reach out
                </h2>
                <p className="contact-next">
                  We'll reply within one business day to set up a short call. On that call we'll ask about your
                  current setup and goals, and tell you honestly whether — and how — we can help, before any proposal
                  gets written. No pressure, no generic pitch deck.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

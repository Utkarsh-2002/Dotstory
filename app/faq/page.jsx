import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import CtaBand from "../../components/CtaBand";
import FaqList from "../../components/FaqList";
import JsonLd from "../../components/JsonLd";
import * as c from "../../lib/content";
import { FAQ_CATEGORIES } from "../../lib/faqHub";
import { breadcrumbSchema, faqSchema } from "../../lib/schema";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about working with Dotstory — pricing, contracts, how we work, and organic vs. paid.",
  alternates: { canonical: "/faq/" },
};

export default function FaqHub() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "FAQ" }];
  const allItems = FAQ_CATEGORIES.flatMap((cat) => cat.items);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(allItems)]} />
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <PageHero
          breadcrumbs={breadcrumbs}
          kicker="FAQ"
          title={["Answers to common ", { i: "questions" }]}
          text="Service pages each carry their own FAQs too — this page is the catch-all for everything broader."
        />

        <section className="section page-section">
          <div className="container">
            {FAQ_CATEGORIES.map((cat) => (
              <div className="faq-hub-group" key={cat.category}>
                <h2>{cat.category}</h2>
                <FaqList items={cat.items} />
              </div>
            ))}
          </div>
        </section>

        <CtaBand
          title={["Still have a ", { i: "question" }, "?"]}
          primary={{ label: "Get in touch", href: "/contact/" }}
        />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

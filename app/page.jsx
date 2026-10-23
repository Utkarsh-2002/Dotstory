import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Brands from "../components/Brands";
import Experience from "../components/Experience";
import Services from "../components/Services";
import Results from "../components/Results";
import Process from "../components/Process";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import * as c from "../lib/content";

export default function Home() {
  return (
    <>
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <Hero data={c.hero} />
        <Brands data={c.brands} />
        <Experience data={c.experience} />
        <Services data={c.services} />
        <Results data={c.results} />
        <Process data={c.process} />
        <Benefits data={c.benefits} />
        <Testimonials data={c.testimonials} />
        <Faq data={c.faq} />
        <Cta data={c.cta} />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

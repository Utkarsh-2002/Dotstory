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
import ScrollBg, { BgMark } from "../components/ScrollBg";
import ScrollZoom from "../components/ScrollZoom";
import * as c from "../lib/content";

export default function Home() {
  return (
    <>
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <BgMark color="#fbfcf8" />
        <Hero data={c.hero} />
        <BgMark color="#0a0d07" />
        <ScrollZoom eyebrow={c.experience.chip} title={c.experience.title} image={c.hero.images[0]} items={c.experience.stats} />
        <BgMark color="#fbfcf8" />
        <Brands data={c.brands} />
        <BgMark color="#eef1e4" />
        <Experience data={c.experience} />
        <BgMark color="#ffffff" />
        <Services data={c.services} />
        <BgMark color="#eef1e4" />
        <Results data={c.results} />
        <BgMark color="#0a0d07" />
        <Process data={c.process} />
        <BgMark color="#ffffff" />
        <Benefits data={c.benefits} />
        <BgMark color="#eef1e4" />
        <Testimonials data={c.testimonials} />
        <BgMark color="#ffffff" />
        <Faq data={c.faq} />
        <BgMark color="#eef1e4" />
        <Cta data={c.cta} />
        <BgMark color="#fbfcf8" />
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
      <ScrollBg />
    </>
  );
}

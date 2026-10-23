import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Button } from "../components/ui";
import * as c from "../lib/content";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Nav brand={c.brand.name} links={c.nav} />
      <main>
        <section className="not-found">
          <div className="container center">
            <p className="small">404</p>
            <h1 className="h2" style={{ marginTop: 10 }}>
              That page doesn't exist.
            </h1>
            <p className="lead narrow" style={{ marginTop: 16 }}>
              The page you're looking for may have moved. Here are a few places to go instead.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Button href="/">Back home</Button>
              <Button href="/services/" variant="ghost">
                See services
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={c.brand.name} data={c.footer} />
    </>
  );
}

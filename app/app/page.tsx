import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <header className="hero">
        <div className="hero-bg">
          <img src="/hero_bg.png" alt="Tierarztpraxis Koston und van Dillen" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content animate-up">
          <div className="pill">Kleintiere &amp; Pferde</div>
          <h1>Ihr Tier in unseren Händen.</h1>
          <p>
            Die Gesundheit unserer Patienten und die Zufriedenheit ihrer
            Besitzer stehen bei uns an erster Stelle. Vertrauensvolle
            Tiermedizin in Emmerich am Rhein.
          </p>
          <div className="hero-actions">
            <a href="tel:028229818244" className="btn-primary">
              Jetzt Anrufen
            </a>
            <Link href="/leistungen" className="btn-ghost">
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="section-padding" id="about">
        <div className="container grid-2 fade-in">
          <div>
            <h2 className="section-title">Zeit für Sie und Ihr Tier</h2>
            <p>
              Wir nehmen uns Zeit für unsere Patienten und Ihre Besitzer. Egal
              ob Pferd, Hund, Katze, Kaninchen oder Reptilien – wir begegnen
              jedem Tier mit Ruhe, Fachwissen und viel Einfühlungsvermögen.
            </p>
            <p>
              Unsere moderne Praxisausstattung ermöglicht uns eine fundierte
              Diagnostik und optimale Behandlungsmöglichkeiten für kleine wie
              große Patienten.
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Notdienst Erreichbarkeit</span>
              </div>
            </div>
            <br />
            <Link href="/ueber-uns" className="btn-secondary">
              Lernen Sie unser Team kennen →
            </Link>
          </div>
          <div className="image-card glow-effect">
            <img src="/small_animal.png" alt="Tierarzt untersucht Hund" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="text-center fade-in">
            <h2 className="section-title">Unsere Expertise</h2>
            <p className="section-subtitle">
              Umfassende tiermedizinische Betreuung für Haus- und Nutztiere.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card fade-in delay-1">
              <div className="card-image">
                <img src="/small_animal.png" alt="Kleintierpraxis" />
              </div>
              <div className="card-content">
                <h3>Tierarzt für Kleintiere</h3>
                <p>
                  Von der Impfung bis zur komplexen Operation. Für Hunde,
                  Katzen, Heimtiere und Reptilien – mit Inhouse-Labor und modernster Diagnostik.
                </p>
                <Link href="/leistungen#kleintiere" className="link-arrow">
                  Mehr erfahren →
                </Link>
              </div>
            </div>
            <div className="service-card fade-in delay-2">
              <div className="card-image">
                <img src="/horse.png" alt="Pferdepraxis" />
              </div>
              <div className="card-content">
                <h3>Tierarzt für Pferde</h3>
                <p>
                  Ambulante Fahrpraxis für Pferde. Lahmheitsdiagnostik,
                  Zahnheilkunde und allgemeine Untersuchungen direkt bei Ihnen
                  im Stall.
                </p>
                <Link href="/leistungen#pferde" className="link-arrow">
                  Mehr erfahren →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Strip */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="contact-card">
            <div className="contact-info">
              <h2>Wir sind für Sie da.</h2>
              <ul className="contact-list">
                <li>
                  <div className="icon-wrap">📍</div>
                  <div>
                    <strong>Adresse</strong>
                    <span>Bremerweg 61, 46446 Emmerich am Rhein</span>
                  </div>
                </li>
                <li>
                  <div className="icon-wrap" style={{ background: "var(--clr-primary)", color: "white" }}>📞</div>
                  <div>
                    <strong>Telefon (auch im Notfall)</strong>
                    <a href="tel:028229818244">02822 / 98 18 244</a>
                  </div>
                </li>
                <li>
                  <div className="icon-wrap">✉️</div>
                  <div>
                    <strong>E-Mail</strong>
                    <a href="mailto:info@tierarztinemmerich.de">info@tierarztinemmerich.de</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="contact-map">
              <div className="map-placeholder">
                <div className="pulse-ring" />
                <p>Bremerweg 61<br />46446 Emmerich</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PraxisPage() {
  return (
    <>
      <Navbar />

      <section
        className="page-header"
        style={{
          backgroundImage: "linear-gradient(rgba(117, 26, 38, 0.8), rgba(20, 20, 20, 0.7)), url('/hero_bg.png')",
        }}
      >
        <div className="container fade-in">
          <h1>Unsere Praxis</h1>
          <p>Moderne Ausstattung für adäquate und schonende Versorgung</p>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container fade-in">
          <div className="text-center section-subtitle">
            <h2 className="section-title">Rundum gut versorgt</h2>
            <p>
              Um Ihnen für Ihr Haustier eine adäquate Versorgung gewährleisten
              zu können, ist unsere Praxis mit modernen diagnostischen Geräten
              ausgestattet.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Inhouse-Labor</h3>
              <p>
                Schnelle und präzise Blutuntersuchungen direkt bei uns in der
                Praxis für sofortige Resultate bei Notfällen und Check-Ups.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🩻</div>
              <h3>Digitales Röntgen & Ultraschall</h3>
              <p>
                Feinste Bildgebung zur Diagnostik von Weichteilen und
                Knochenstrukturen bei Pferden und Kleintieren.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🦷</div>
              <h3>Dentalchirurgie</h3>
              <p>
                Eine Dentale Spezialeinheit garantiert bestmögliche
                Zahnbehandlungen für Kleintiere sowie professionelles Einschleifen
                bei Pferden.
              </p>
            </div>
          </div>

          <div className="text-center mt-2" style={{ marginTop: "4rem" }}>
            <a href="tel:028229818244" className="btn-primary">
              Jetzt telefonisch einen Termin vereinbaren (02822 9818244)
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KontaktPage() {
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
          <h1>Kontakt</h1>
          <p>Wir freuen uns auf Ihre Anfrage. Auch im Notfall erreichbar.</p>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container fade-in">
          <div className="contact-card" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.1)" }}>
            <div className="contact-info">
              <h2>Nehmen Sie Kontakt auf</h2>
              <p>
                Für Terminvereinbarungen, Fragen zu unseren Leistungen oder in
                Notfällen zögern Sie nicht, uns direkt anzurufen.
              </p>

              <ul className="contact-list" style={{ marginTop: "2rem" }}>
                <li>
                  <div className="icon-wrap">📍</div>
                  <div>
                    <strong>Adresse</strong>
                    <span>
                      Tierarztpraxis Koston & van Dillen
                      <br />
                      Bremerweg 61
                      <br />
                      46446 Emmerich am Rhein
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    className="icon-wrap"
                    style={{ background: "var(--clr-primary)", color: "white" }}
                  >
                    📞
                  </div>
                  <div>
                    <strong>Telefon (Auch im Notfall)</strong>
                    <a
                      href="tel:028229818244"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "var(--clr-primary)",
                      }}
                    >
                      02822 / 98 18 244
                    </a>
                  </div>
                </li>
                <li>
                  <div className="icon-wrap">✉️</div>
                  <div>
                    <strong>E-Mail</strong>
                    <a href="mailto:info@tierarztinemmerich.de">
                      info@tierarztinemmerich.de
                    </a>
                  </div>
                </li>
                <li>
                  <div className="icon-wrap" style={{ background: "#E1306C", color: "white" }}>📸</div>
                  <div>
                    <strong>Instagram</strong>
                    <a href="https://www.instagram.com/tierarzt_in_emmerich/" target="_blank" rel="noopener noreferrer">
                      @tierarzt_in_emmerich
                    </a>
                  </div>
                </li>
              </ul>

              <div
                className="mt-2"
                style={{
                  background: "rgba(0,0,0,0.02)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  borderLeft: "4px solid var(--clr-gold)",
                }}
              >
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                  <strong>Wichtiger Hinweis:</strong>
                  <br />
                  Bitte beachten Sie, dass tierärztliche Notfälle oft ein
                  schnelles Handeln verlangen. Rufen Sie am besten direkt an,
                  bevor Sie unser Kontaktformular oder E-Mail nutzen.
                </p>
              </div>
            </div>
            <div className="contact-map" style={{ minHeight: "600px" }}>
              <div className="map-placeholder">
                <div className="pulse-ring" />
                <p>
                  Interaktive Google Maps Karte
                  <br />
                  (Hier wird die Karte nach Freigabe eingefügt)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

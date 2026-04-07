import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LeistungenPage() {
  return (
    <>
      <Navbar />

      <section
        className="page-header"
        style={{
          backgroundImage: "linear-gradient(rgba(117, 26, 38, 0.8), rgba(20, 20, 20, 0.7)), url('/horse.png')",
        }}
      >
        <div className="container fade-in">
          <h1>Unsere Leistungen</h1>
          <p>Umfassende tiermedizinische Betreuung für Kleintiere und Pferde</p>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container">
          {/* Kleintiere */}
          <div className="leistung-block fade-in" id="kleintiere">
            <div className="grid-2 align-start">
              <div className="leistung-text">
                <h2 className="section-title">Tierarzt für Kleintiere</h2>
                <p>
                  Als Tierarzt für Kleintiere betreuen wir in unserer Praxis vom
                  Hund über die Katze bis hin zum Kaninchen und Meerschweinchen
                  alle Vierbeiner. Schwerpunkte unserer Leistungen sind die
                  Allgemeine Veterinärmedizin, chirurgische Versorgung und
                  Dentalchirurgie.
                </p>

                <div className="detail-box mt-2">
                  <h3>Chirurgie & Narkose</h3>
                  <p>
                    Sofern erforderlich, führen wir chirurgische Eingriffe durch
                    und übernehmen die anschließende Nachbetreuung. Wir wenden
                    schonende Verfahren wie die Inhalationsnarkose an.
                  </p>
                </div>

                <div className="detail-box mt-2">
                  <h3>Diagnostik & On-Site Labor</h3>
                  <p>
                    Ultraschalldiagnostik und digitale Röntgendiagnostik kommen
                    direkt vor Ort zum Einsatz. Außerdem verfügen wir über ein
                    eigenes inhouse Labor zur schnellen Auswertung von Proben.
                  </p>
                </div>

                <div className="detail-box mt-2">
                  <h3>Vorsorge, Alter & Ernährung</h3>
                  <p>
                    Wir führen umfangreiche Check-ups durch und bieten eine
                    Betreuung für geriatrische Patienten an. Bei
                    Gewichtsproblemen unterstützt Sie unser Team durch eine
                    professionelle Ernährungsberatung.
                  </p>
                </div>

                <div className="detail-box mt-2">
                  <h3>Sachkundenachweis (LHundG NRW)</h3>
                  <p>
                    Wir sind Ihr Ansprechpartner, wenn Sie einen
                    Sachkundenachweis für Hundehalter gemäß Landeshundegesetz
                    NRW (§11 Abs. 3) benötigen.
                  </p>
                </div>
                
                <div className="mt-2 text-center" style={{ marginTop: '3rem' }}>
                    <p><em>Für Kleintiertermine kontaktieren Sie uns bitte telefonisch.</em></p>
                    <a href="tel:028229818244" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                      Jetzt anrufen (02822 9818244)
                    </a>
                </div>

              </div>
              <div className="image-card glow-effect sticky-img">
                <img src="/small_animal.png" alt="Kleintierpraxis" />
              </div>
            </div>
          </div>

          <hr className="section-divider" />

          {/* Pferde */}
          <div className="leistung-block fade-in" id="pferde">
            <div className="grid-2 align-start" style={{ direction: "rtl" }}>
              <div className="leistung-text" style={{ direction: "ltr" }}>
                <h2 className="section-title">Tierarzt für Pferde</h2>
                <p>
                  Mit modernster Ausstattung und jahrzehntelanger Erfahrung stehen wir Ihnen als Pferdetierarzt beratend und unterstützend zur Seite. In unserer Fahrpraxis betreuen wir Ihr Pferd direkt bei Ihnen vor Ort.
                </p>

                <div className="detail-box mt-2">
                  <h3>Dentale Spezialeinheit (Zahnheilkunde)</h3>
                  <p>
                    Unsere dentale Spezialeinheit erlaubt es uns, Zahnprobleme
                    wie Kanten, Haken oder Fehlstellungen sorgfältig zu
                    diagnostizieren und zu behandeln. Gesunde Zähne sind
                    essenziell für Wohlbefinden und Leistungsfähigkeit.
                  </p>
                </div>

                <div className="detail-box mt-2">
                  <h3>Sorgfältige Lahmheitsdiagnostik</h3>
                  <p>
                    Zur Erkennung von Lahmheitsursachen führen wir eine präzise
                    Lahmheitsdiagnostik durch, grenzen Bewegungsstörungen ein
                    und erstellen individuelle Therapiepläne.
                  </p>
                </div>

                <div className="detail-box mt-2">
                  <h3>Mobile Ultraschalldiagnostik</h3>
                  <p>
                    Mit der Ultraschalldiagnostik untersuchen wir Weichteile,
                    Sehnen und Organe detailliert, schonend und liefern direkt
                    wertvolle Informationen zur passenden Therapie.
                  </p>
                </div>
                 <div className="mt-2 text-center" style={{ marginTop: '3rem' }}>
                    <p><em>Für Pferdeterminen kontaktieren Sie uns bitte telefonisch.</em></p>
                    <a href="tel:028229818244" className="btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
                      02822 / 98 18 244
                    </a>
                </div>
              </div>
              <div className="image-card glow-effect sticky-img" style={{ direction: "ltr" }}>
                <img src="/horse.png" alt="Pferdepraxis" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

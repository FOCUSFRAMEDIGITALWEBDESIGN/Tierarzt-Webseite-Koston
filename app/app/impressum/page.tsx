export default function ImpressumPage() {
  return (
    <div style={{ backgroundColor: "var(--clr-bg)", minHeight: "100vh", paddingTop: "80px", color: "var(--clr-text-main)" }}>
      <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--clr-primary)" }}>Impressum</h1>
        
        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>Tierarztpraxis Koston & van Dillen</strong><br />
          Bremerweg 61<br />
          46446 Emmerich am Rhein
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Vertreten durch</h2>
        <p>
          Florian Koston<br />
          Kerstin van Dillen
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Kontakt</h2>
        <p>
          Telefon: 02822 / 98 18 244<br />
          E-Mail: info@tierarztinemmerich.de
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          <strong>Berufsbezeichnung:</strong> Tierarzt/Tierärztin<br />
          <strong>Zuständige Kammer:</strong> Tierärztekammer Nordrhein, St. Töniser Str. 15, 47906 Kempen<br />
          <strong>Verliehen in:</strong> Deutschland<br />
          <strong>Es gelten folgende berufsrechtliche Regelungen:</strong> Berufsordnung der Tierärztekammer Nordrhein; Heilberufsgesetz des Landes NRW. <br />Regelungen einsehbar unter: <a href="http://www.tknrw.de" target="_blank" rel="noopener noreferrer" style={{color: "var(--clr-primary)"}}>www.tknrw.de</a>
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE [Ihre Ust-ID hier eintragen]
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{color: "var(--clr-primary)"}}>https://ec.europa.eu/consumers/odr</a>.<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.<br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  );
}

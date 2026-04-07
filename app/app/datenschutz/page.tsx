export default function DatenschutzPage() {
  return (
    <div style={{ backgroundColor: "var(--clr-bg)", minHeight: "100vh", paddingTop: "80px", color: "var(--clr-text-main)" }}>
      <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--clr-primary)" }}>Datenschutzerklärung</h1>
        
        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>

        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          Tierarztpraxis Koston & van Dillen<br />
          Bremerweg 61<br />
          46446 Emmerich am Rhein
        </p>
        <p>
          Telefon: 02822 / 98 18 244<br />
          E-Mail: info@tierarztinemmerich.de
        </p>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>3. Datenerfassung auf dieser Website</h2>
        <h3>Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
        </p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", marginBottom: "1rem" }}>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h3>Online-Terminbuchung</h3>
        <p>
          Wenn Sie unser System für die Online-Terminbuchung nutzen, erheben und verarbeiten wir die von Ihnen eingegebenen personenbezogenen Daten (Name, E-Mail-Adresse, Telefonnummer sowie Angaben zum Tier) ausschließlich zum Zwecke der Terminvereinbarung und -verwaltung (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO bzgl. der Vorbereitung/Durchführung eines Behandlungsvertrages). Ohne die Bereitstellung dieser Daten ist eine Online-Buchung nicht möglich. Ihre Daten werden gelöscht, wenn sie für die Erreichung des Zweckes nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
        </p>

        <h3>Cookies</h3>
        <p>
          Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Die meisten der von uns verwendeten Cookies sind so genannte "Session-Cookies" (z.B. für den Admin-Login). Sie werden nach Ende Ihres Besuchs automatisch gelöscht.
        </p>
      </div>
    </div>
  );
}

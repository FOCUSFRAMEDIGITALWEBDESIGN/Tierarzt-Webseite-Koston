import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Koston & van Dillen</h3>
          <p>Ihre Tierarztpraxis in Emmerich am Rhein.</p>
          <p style={{ marginTop: 8, fontSize: "0.9rem" }}>
            Bremerweg 61, 46446 Emmerich am Rhein
          </p>
        </div>
        <div>
          <div className="footer-links" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link href="/kontakt">Kontakt</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/impressum">Impressum</Link>
            <a href="https://www.instagram.com/tierarzt_in_emmerich/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--clr-gold)", fontWeight: "600", marginTop: "0.25rem" }}>
              📸 Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tierarztpraxis Koston & van Dillen. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}

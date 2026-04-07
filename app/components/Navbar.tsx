"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change / outside click
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "/", label: "Startseite" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/praxis", label: "Praxis" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-text">Koston & van Dillen</span>
            <span className="logo-sub">Tierarztpraxis</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
            <a href="tel:028229818244" className="btn-outline-small">
              02822 9818244
            </a>
          </div>

          {/* Hamburger button */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}${scrolled ? " scrolled" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menü öffnen"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-header">
          <span className="logo-text" style={{ color: "var(--clr-primary)" }}>Koston & van Dillen</span>
          <span className="logo-sub">Tierarztpraxis</span>
        </div>
        <nav className="mobile-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <a href="tel:028229818244" className="btn-primary" style={{ width: "100%", textAlign: "center" }}>
            📞 02822 9818244
          </a>
        </div>
      </div>
    </>
  );
}

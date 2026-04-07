"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-text">Koston & van Dillen</span>
          <span className="logo-sub">Tierarztpraxis</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Startseite</Link>
          <Link href="/leistungen">Leistungen</Link>
          <Link href="/praxis">Praxis</Link>
          <Link href="/ueber-uns">Über uns</Link>
          <Link href="/kontakt">Kontakt</Link>
          <a href="tel:028229818244" className="btn-outline-small">
            02822 9818244
          </a>
        </div>
      </div>
    </nav>
  );
}

"use client";
import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already gave consent
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (level: "all" | "necessary") => {
    localStorage.setItem("cookie_consent", level);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-fixed fade-in">
      <div className="cookie-container">
        <div className="cookie-content">
          <div className="cookie-icon">🍪</div>
          <div className="cookie-text">
            <h4>Wir schätzen Ihre Privatsphäre</h4>
            <p>
              Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. 
              Wir nutzen essentielle Cookies für die Funktionalität (z.B. Terminbuchung). 
              Weitere Informationen finden Sie in unserer {" "}
              <a href="/datenschutz">Datenschutzerklärung</a>.
            </p>
          </div>
        </div>
        <div className="cookie-actions">
          <button className="btn-secondary-dark" onClick={() => handleConsent("necessary")}>
            Nur notwendige
          </button>
          <button className="btn-primary" onClick={() => handleConsent("all")}>
            Alle akzeptieren
          </button>
        </div>
      </div>

      <style jsx>{`
        .cookie-banner-fixed {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          background: #1C1C1C;
          color: white;
          padding: 1.75rem 2rem;
          border-radius: 20px;
          z-index: 9999;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cookie-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }
        .cookie-content {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }
        .cookie-icon { font-size: 2rem; }
        .cookie-text h4 { color: white; margin-bottom: 0.35rem; font-size: 1.1rem; }
        .cookie-text p { color: rgba(255,255,255,0.7); font-size: 0.875rem; margin-bottom: 0; line-height: 1.5; }
        .cookie-text a { color: var(--clr-gold); text-decoration: underline; }
        .cookie-actions { display: flex; gap: 1rem; flex-shrink: 0; }
        
        .btn-secondary-dark {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 0.65rem 1.25rem;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-secondary-dark:hover { background: rgba(255,255,255,0.1); border-color: white; }

        @keyframes slideUp {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .cookie-banner-fixed { bottom: 1rem; padding: 1.5rem; }
          .cookie-container { flex-direction: column; gap: 1.5rem; align-items: stretch; }
          .cookie-actions { flex-direction: column; }
          .cookie-actions button { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}

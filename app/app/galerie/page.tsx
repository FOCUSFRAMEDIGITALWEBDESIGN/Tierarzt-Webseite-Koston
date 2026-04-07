"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimateOnScroll from '@/components/AnimateOnScroll';

interface GalleryImage {
  id: number;
  url: string;
  description: string | null;
}

export default function GaleriePage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-surface-dark min-h-screen">
        {/* Responsive padding to clear fixed navbar and avoid title collision */}
        <section className="gallery-layout-section">
          <div className="container">
            <div className="section-header text-center mb-16">
              <span className="badge">Unsere Praxis</span>
              <h1 className="h1 mt-4 text-white title-responsive">Impressionen & Galerie</h1>
              <p className="p mt-4 mx-auto text-light gallery-desc" style={{ maxWidth: '700px' }}>
                Werfen Sie einen Blick in unsere Praxisräume und gewinnen Sie einen Eindruck von unserer täglichen Arbeit und unserer Ausstattung.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-white">Bilder werden geladen...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="p text-white/60">Aktuell sind noch keine Bilder in der Galerie vorhanden.</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {images.map((img, index) => (
                  <div key={img.id} className="visible-immediately">
                    <div 
                      className="gallery-card bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover-up transition-all cursor-pointer backdrop-blur-md"
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className="aspect-ratio-box">
                        <img 
                          src={img.url} 
                          alt={img.description || `Galerie Bild ${index + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          loading="lazy"
                        />
                        <div className="gallery-overlay">
                          <span>🔍 Vergrößern</span>
                        </div>
                      </div>
                      {img.description && (
                        <div className="p-5 border-t border-white/10">
                          <p className="description-text mb-0">{img.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-modal" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>&times;</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.description || "Galerie Ansicht"} />
            {selectedImage.description && (
              <div className="lightbox-caption">
                <p>{selectedImage.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .gallery-layout-section {
          padding-top: 14rem; /* Desktop default */
          padding-bottom: 5rem;
        }
        .title-responsive {
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
        }
        .aspect-ratio-box {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .description-text {
          font-size: 0.9rem;
          font-style: italic;
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
        }
        .gallery-card {
           position: relative;
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(117, 26, 38, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
          font-weight: 600;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .lightbox-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          backdrop-filter: blur(8px);
        }
        .lightbox-content {
          max-width: 90vw;
          max-height: 85vh;
          position: relative;
          background: white;
          padding: 0.5rem;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 75vh;
          display: block;
          object-fit: contain;
          border-radius: 8px;
        }
        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: none;
          border: none;
          color: white;
          font-size: 3rem;
          cursor: pointer;
          line-height: 1;
        }
        .lightbox-caption {
          padding: 1rem;
          text-align: center;
          color: var(--clr-text-main);
          font-weight: 500;
        }

        /* Responsive Fixes */
        @media (max-width: 1024px) {
          .gallery-layout-section { padding-top: 11rem; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        }
        @media (max-width: 768px) {
          .gallery-layout-section { padding-top: 9rem; }
          .gallery-grid { grid-template-columns: 1fr; }
          .title-responsive { font-size: clamp(2.2rem, 10vw, 3rem); }
          .gallery-desc { font-size: 1rem; }
        }
        @media (max-width: 480px) {
          .gallery-layout-section { padding-top: 8rem; }
          .aspect-ratio-box { aspect-ratio: 1 / 1; } /* More square on mobile looks better */
        }
      `}</style>
    </>
  );
}

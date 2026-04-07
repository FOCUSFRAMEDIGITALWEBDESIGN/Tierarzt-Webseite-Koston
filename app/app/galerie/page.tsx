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
      <main className="pt-24 pb-16">
        <section className="container section-padding">
          <div className="fade-in">
            <div className="section-header text-center mb-12">
              <span className="badge">Unsere Praxis</span>
              <h1 className="h1 mt-4">Impressionen & Galerie</h1>
              <p className="p mt-4 mx-auto" style={{ maxWidth: '700px' }}>
                Werfen Sie einen Blick in unsere Praxisräume und gewinnen Sie einen Eindruck von unserer täglichen Arbeit und unserer Ausstattung.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p>Bilder werden geladen...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-light rounded-2xl">
              <p className="p">Aktuell sind noch keine Bilder in der Galerie vorhanden.</p>
            </div>
          ) : (
            <div className="gallery-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {images.map((img, index) => (
                <div key={img.id} className="fade-in">
                  <div className="gallery-card bg-white rounded-2xl shadow-sm overflow-hidden hover-up transition-all">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={img.url} 
                        alt={img.description || `Galerie Bild ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    {img.description && (
                      <div className="p-4 border-t border-gray-100">
                        <p className="text-sm italic text-gray-600 mb-0">{img.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .gallery-card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .gallery-card img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}

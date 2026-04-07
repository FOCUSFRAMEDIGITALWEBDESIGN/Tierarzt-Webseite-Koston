"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type Education = {
  id: number;
  title: string;
  date: string;
  doctor: string;
  category: string;
};

export default function UeberUnsPage() {
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    fetch("/api/educations")
      .then((res) => res.json())
      .then((data) => setEducations(data))
      .catch((err) => console.error(err));
  }, []);

  const kostonEdu = educations.filter((e) => e.doctor === "Florian Koston");
  const vanDillenEdu = educations.filter((e) => e.doctor === "Kerstin van Dillen");

  return (
    <>
      <Navbar />

      <section
        className="page-header"
        style={{
          backgroundImage: "linear-gradient(rgba(117, 26, 38, 0.8), rgba(20, 20, 20, 0.7)), url('/small_animal.png')",
        }}
      >
        <div className="container fade-in">
          <h1>Über uns</h1>
          <p>Unser Team aus erfahrenen Tierärzten und Fachangestellten.</p>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container">
          {/* Tierarzt 1 */}
          <div className="grid-2 fade-in" style={{ marginBottom: "5rem" }}>
            <div className="profile-card">
              <img 
                src="https://www.tierarztinemmerich.de/.cm4all/uproc.php/0/.13.jpg/picture-1600?_=18e1d817458" 
                alt="Florian Koston" 
                style={{ width: "100%", borderRadius: "12px", marginBottom: "1.5rem", objectFit: "cover", maxHeight: "400px" }}
              />
              <h2 className="section-title">Florian Koston</h2>
              <p className="role-title">
                Tierarzt mag. med. vet. <br /> GPCert(SAS) Small Animal Surgery
              </p>
              <p>
                Zertifikation der Chirurgie nach den Richtlinien ISVPS
                (International School of Veterinary Postgraduate Studies).
              </p>

              <h3 className="mt-2">Schwerpunkte Kleintiermedizin</h3>
              <ul className="styled-list">
                <li>Zahnchirurgie</li>
                <li>Chirurgie</li>
                <li>Internistische Medizin</li>
              </ul>
            </div>
            <div className="fortbildungen-box">
              <h3>Fortbildungen Florian Koston</h3>
              <ul className="timeline-list">
                {kostonEdu.map((edu) => (
                  <li key={edu.id}>
                    <strong>{edu.date}</strong> - {edu.title}
                  </li>
                ))}
              </ul>
              <p className="certificate-note mt-2">
                Erlaubnis zur Abnahme der Sachkunde von
                Hundehalterinnen/Hundehaltern des Landes NRW (LHundG NRW)
              </p>
            </div>
          </div>

          {/* Tierarzt 2 */}
          <div
            className="grid-2 fade-in reverse-desktop"
            style={{ marginBottom: "5rem" }}
          >
            <div className="profile-card">
              <img 
                src="https://www.tierarztinemmerich.de/.cm4all/uproc.php/0/.DSC_0299.jpg/picture-1600?_=16f9f2771c0" 
                alt="Kerstin van Dillen" 
                style={{ width: "100%", borderRadius: "12px", marginBottom: "1.5rem", objectFit: "cover", maxHeight: "400px" }}
              />
              <h2 className="section-title">Kerstin van Dillen</h2>
              <p className="role-title">Tierärztin</p>

              <h3 className="mt-2">Schwerpunkte</h3>
              <ul className="styled-list">
                <li>Zahnbehandlung</li>
                <li>Lahmheitsdiagnostik</li>
                <li>Biologische Tiermedizin</li>
                <li>Geriatrische Tiere (Stoffwechsel)</li>
              </ul>
            </div>
            <div className="fortbildungen-box">
              <h3>Fortbildungen Kerstin van Dillen</h3>
              <ul className="timeline-list">
                {vanDillenEdu.map((edu) => (
                  <li key={edu.id}>
                    <strong>{edu.date}</strong> - {edu.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team */}
          <div className="team-section text-center fade-in">
            <h2 className="section-title">
              Unsere Tiermedizinischen Fachangestellten
            </h2>
            <div className="team-grid">
              <div className="team-member glow-effect">
                <img 
                  src="https://www.tierarztinemmerich.de/.cm4all/uproc.php/0/.IMG_8666.jpg/picture-1600?_=18d8cbe99f0" 
                  alt="Rabea Meisters" 
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem", objectFit: "cover", height: "250px" }}
                />
                <h4>Rabea Meisters</h4>
                <p>Tiermedizinische Fachangestellte</p>
              </div>
              <div className="team-member glow-effect">
                <img 
                  src="https://www.tierarztinemmerich.de/.cm4all/uproc.php/0/.7b79a831-ad49-4c4d-8e69-af7e7264b377.jpg/picture-1600?_=18d88125cf4" 
                  alt="Céline Lamers" 
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem", objectFit: "cover", height: "250px" }}
                />
                <h4>Céline Lamers</h4>
                <p>Tiermedizinische Fachangestellte</p>
              </div>
              <div className="team-member glow-effect">
                <img 
                  src="https://www.tierarztinemmerich.de/.cm4all/uproc.php/0/.WhatsApp%20Image%202026-02-24%20at%2017.57.13.jpeg/picture-1600?_=19c93bb97fb" 
                  alt="Raffaela Wehren" 
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem", objectFit: "cover", height: "250px" }}
                />
                <h4>Raffaela Wehren</h4>
                <p>Tiermedizinische Fachangestellte</p>
              </div>
              <div className="team-member glow-effect">
                <img 
                  src="https://www.tierarztinemmerich.de/.cm4all/uproc.php/0/.IMG_8675_1.jpg/picture-1600?_=18d8cbe9220" 
                  alt="Lena van Kampen" 
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem", objectFit: "cover", height: "250px" }}
                />
                <h4>Lena van Kampen</h4>
                <p>Tiermedizinische Fachangestellte</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

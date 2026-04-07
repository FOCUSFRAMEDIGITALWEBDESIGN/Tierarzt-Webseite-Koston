"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [educations, setEducations] = useState<any[]>([]);
  const [eduTitle, setEduTitle] = useState("");
  const [eduDate, setEduDate] = useState("");
  const [eduDoctor, setEduDoctor] = useState("Florian Koston");
  
  const [gallery, setGallery] = useState<any[]>([]);
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");
  const [gallerySort, setGallerySort] = useState("0");
  const [activeTab, setActiveTab] = useState<'edu' | 'gallery'>('edu');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Authentication check
  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
          fetchEducations();
          fetchGallery();
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      fetchEducations();
      fetchGallery();
    } else {
      const data = await res.json();
      setLoginError(data.error || "Falsches Passwort");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPassword("");
  };

  // Educations Fetch
  const fetchEducations = async () => {
    const res = await fetch(`/api/educations?t=${Date.now()}`);
    const data = await res.json();
    setEducations(data);
  };

  const fetchGallery = async () => {
    const res = await fetch(`/api/gallery?t=${Date.now()}`);
    const data = await res.json();
    setGallery(data);
  };

  // Educations Add
  const addEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduTitle || !eduDate) return;

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/educations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: eduTitle, date: eduDate, doctor: eduDoctor }),
      });

      if (res.ok) {
        setEduTitle("");
        setEduDate("");
        setStatusMsg({ type: 'success', text: 'Fortbildung erfolgreich hinzugefügt.' });
        fetchEducations();
      } else {
        const errorData = await res.json();
        const msg = errorData.error || "Fehler beim Speichern.";
        setStatusMsg({ type: 'error', text: `Fehler: ${msg}` });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Netzwerkfehler beim Speichern.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Educations Delete
  const deleteEducation = async (id: number) => {
    if (!confirm("Fortbildung wirklich löschen?")) return;
    await fetch(`/api/educations/${id}`, { method: "DELETE" });
    fetchEducations();
  };

  // Educations Reorder
  const moveEducation = async (id: number, direction: 'up' | 'down') => {
    const currentIndex = educations.findIndex(e => e.id === id);
    if (currentIndex < 0) return;
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === educations.length - 1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Create new array with swapped elements
    const newOrder = [...educations];
    const temp = newOrder[currentIndex];
    newOrder[currentIndex] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    // Apply sortOrders based on final index
    const updatePayload = newOrder.map((edu, index) => ({
      id: edu.id,
      sortOrder: index
    }));

    // Optimistic update
    setEducations(newOrder);

    // Save to DB
    await fetch("/api/educations/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: updatePayload }),
    });
  };

  const addGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUrl) return;

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: galleryUrl, description: galleryDesc, sortOrder: gallerySort }),
      });

      if (res.ok) {
        setGalleryUrl("");
        setGalleryDesc("");
        setGallerySort("0");
        setStatusMsg({ type: 'success', text: 'Bild erfolgreich zur Galerie hinzugefügt.' });
        fetchGallery();
      } else {
        setStatusMsg({ type: 'error', text: 'Fehler beim Speichern des Bildes.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Netzwerkfehler.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteGalleryImage = async (id: number) => {
    if (!confirm("Bild wirklich aus der Galerie löschen?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    fetchGallery();
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card animate-up">
          <h2>Admin Bereich</h2>
          <p>Bitte melden Sie sich an, um Inhalte zu verwalten.</p>
          {loginError && <div className="error-msg">{loginError}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admin-pass">Passwort</label>
              <input
                id="admin-pass"
                type="password"
                placeholder="Ihr Passwort..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                autoFocus
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              Sicher Einloggen
            </button>
          </form>
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link href="/" style={{ color: "var(--clr-primary)" }}>Zurück zur Startseite</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout animate-up">
      <header className="admin-header">
        <h1>Praxis Administration</h1>
        <div>
          <Link href="/" className="btn-outline-small" style={{ marginRight: "1rem" }}>Zur Webseite</Link>
          <button onClick={handleLogout} className="btn-secondary">Ausloggen</button>
        </div>
      </header>

      <main className="admin-content" style={{ display: "block" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          <button 
            onClick={() => { setActiveTab('edu'); setStatusMsg(null); }} 
            className={activeTab === 'edu' ? 'btn-primary' : 'btn-outline-small'}
          >
            Fortbildungen
          </button>
          <button 
            onClick={() => { setActiveTab('gallery'); setStatusMsg(null); }} 
            className={activeTab === 'gallery' ? 'btn-primary' : 'btn-outline-small'}
          >
            Bildergalerie
          </button>
        </div>

        {/* View 1: Fortbildungen */}
        <div className={`admin-panel ${activeTab === 'edu' ? 'active' : ''}`} style={{ maxWidth: "800px", margin: "0 auto", display: activeTab === 'edu' ? 'block' : 'none' }}>
          
          <div className="admin-card">
            <h3>Neue Fortbildung hinzufügen</h3>
            {statusMsg && (
              <div className={statusMsg.type === 'success' ? 'badge-confirmed' : 'error-msg'} style={{ marginBottom: "1rem", padding: "0.5rem 1rem", borderRadius: "8px" }}>
                {statusMsg.text}
              </div>
            )}
            <form onSubmit={addEducation} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div className="form-group mb-0" style={{ flex: "1 1 200px" }}>
                <label>Arzt/Ärztin</label>
                <select value={eduDoctor} onChange={(e) => setEduDoctor(e.target.value)} className="form-control">
                  <option value="Florian Koston">Florian Koston</option>
                  <option value="Kerstin van Dillen">Kerstin van Dillen</option>
                </select>
              </div>
              <div className="form-group mb-0" style={{ flex: "1 1 150px" }}>
                <label>Jahr/Datum</label>
                <input type="text" value={eduDate} onChange={(e) => setEduDate(e.target.value)} placeholder="z.B. 2024 oder 11/2024" className="form-control" />
              </div>
              <div className="form-group mb-0" style={{ flex: "2 1 300px" }}>
                <label>Titel der Fortbildung</label>
                <input type="text" value={eduTitle} onChange={(e) => setEduTitle(e.target.value)} placeholder="Bezeichnung..." className="form-control" />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ height: "45px", padding: "0 1.5rem", opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? "Wird gespeichert..." : "Hinzufügen"}
              </button>
            </form>
          </div>

          <div className="admin-card mt-2">
            <h3>Übersicht Fortbildungen (Sortierbar)</h3>
            
            <h4 style={{ color: "var(--clr-primary)", marginTop: "2rem" }}>Florian Koston</h4>
            <ul className="timeline-list">
              {educations.filter(e => e.doctor === "Florian Koston").length === 0 && <p>Keine Einträge.</p>}
              {educations.filter(e => e.doctor === "Florian Koston").map((edu) => (
                <li key={edu.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{edu.date}</strong> - {edu.title}
                  </div>
                  <div>
                    <button onClick={() => moveEducation(edu.id, 'up')} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", padding: "0 5px" }}>⬆️</button>
                    <button onClick={() => moveEducation(edu.id, 'down')} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", padding: "0 5px" }}>⬇️</button>
                    <button onClick={() => deleteEducation(edu.id)} style={{ background: "none", border: "none", color: "var(--clr-primary)", cursor: "pointer", marginLeft: "10px", fontSize: "0.8rem" }}>[löschen]</button>
                  </div>
                </li>
              ))}
            </ul>

            <h4 style={{ color: "var(--clr-primary)", marginTop: "2rem" }}>Kerstin van Dillen</h4>
            <ul className="timeline-list">
              {educations.filter(e => e.doctor === "Kerstin van Dillen").length === 0 && <p>Keine Einträge.</p>}
              {educations.filter(e => e.doctor === "Kerstin van Dillen").map((edu) => (
                <li key={edu.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{edu.date}</strong> - {edu.title}
                  </div>
                  <div>
                    <button onClick={() => moveEducation(edu.id, 'up')} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", padding: "0 5px" }}>⬆️</button>
                    <button onClick={() => moveEducation(edu.id, 'down')} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", padding: "0 5px" }}>⬇️</button>
                    <button onClick={() => deleteEducation(edu.id)} style={{ background: "none", border: "none", color: "var(--clr-primary)", cursor: "pointer", marginLeft: "10px", fontSize: "0.8rem" }}>[löschen]</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* View 2: Galerie */}
        <div className={`admin-panel ${activeTab === 'gallery' ? 'active' : ''}`} style={{ maxWidth: "800px", margin: "0 auto", display: activeTab === 'gallery' ? 'block' : 'none' }}>
          
          <div className="admin-card">
            <h3>Neues Bild hinzufügen</h3>
            {statusMsg && activeTab === 'gallery' && (
              <div className={statusMsg.type === 'success' ? 'badge-confirmed' : 'error-msg'} style={{ marginBottom: "1rem", padding: "0.5rem 1rem", borderRadius: "8px" }}>
                {statusMsg.text}
              </div>
            )}
            <form onSubmit={addGalleryImage} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div className="form-group mb-0" style={{ flex: "2 1 300px" }}>
                <label>Direkt-Link zum Bild (URL)</label>
                <input 
                  type="text" 
                  value={galleryUrl} 
                  onChange={(e) => setGalleryUrl(e.target.value)} 
                  placeholder="https://.../bild.jpg" 
                  className="form-control" 
                />
              </div>
              <div className="form-group mb-0" style={{ flex: "1 1 200px" }}>
                <label>Beschreibung (optional)</label>
                <input 
                  type="text" 
                  value={galleryDesc} 
                  onChange={(e) => setGalleryDesc(e.target.value)} 
                  placeholder="Kurze Info..." 
                  className="form-control" 
                />
              </div>
              <div className="form-group mb-0" style={{ flex: "0 1 100px" }}>
                <label>Prio (0-99)</label>
                <input 
                  type="number" 
                  value={gallerySort} 
                  onChange={(e) => setGallerySort(e.target.value)} 
                  className="form-control" 
                  pattern="[0-9]*"
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ height: "45px", padding: "0.15rem 1.5rem", opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? "Wird gespeichert..." : "Hinzufügen"}
              </button>
            </form>
          </div>

          <div className="admin-card mt-2">
            <h3>Übersicht Galerie</h3>
            {gallery.length === 0 && <p>Keine Bilder in der Galerie.</p>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
              {gallery.map((img) => (
                <div key={img.id} style={{ position: "relative", border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", background: "#f9f9f9" }}>
                  <img src={img.url} alt="Thumbnail" style={{ width: "100%", height: "100px", objectFit: "cover" }} />
                  <div style={{ padding: "0.5rem", fontSize: "0.8rem" }}>
                    <div style={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #{img.sortOrder} - {img.description || "Keine Info"}
                    </div>
                    <button 
                      onClick={() => deleteGalleryImage(img.id)}
                      style={{ color: "var(--clr-primary)", border: "none", background: "none", cursor: "pointer", padding: "5px 0", marginTop: "5px" }}
                    >
                      [löschen]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

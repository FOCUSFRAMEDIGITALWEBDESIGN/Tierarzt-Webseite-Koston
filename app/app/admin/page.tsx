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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Authentication check
  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
          fetchEducations();
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
        {/* Only one central view now: Fortbildungen */}
        <div className="admin-panel active" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
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
      </main>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Phone, MapPin, Clock3, Menu, X, PawPrint, Heart, Mail, Plus, Search, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { dateLabel, mediaUrl, type Media, type Training } from '@/lib/content';
import { PRACTICE_SOCIAL_LINKS } from '@/lib/site';
export function Brand({light=false,adminAccess=false}:{light?:boolean;adminAccess?:boolean}){return <a className={`brand ${light?'brand-light':''}`} href={adminAccess?'/admin':'/'} target={adminAccess?'_top':undefined} aria-label={adminAccess?'Koston und van Dillen – geschützte Praxisverwaltung':'Koston und van Dillen – Startseite'}><img src="/images/brand-mark.png" alt=""/><span><span className="brand-kicker">Tierarztpraxis in Emmerich</span><strong>Koston <em>&</em> van Dillen</strong></span></a>;}
export function SocialLinks() {
  return <div className="social-links" role="group" aria-label="Praxis in sozialen Medien">
    {PRACTICE_SOCIAL_LINKS.map(profile => <a key={profile.kind} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} der Praxis – öffnet in neuem Tab`}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {profile.kind === 'facebook'
          ? <path d="M15 21v-8h3l.5-4H15V7c0-1.2.5-2 2-2h2V1.5A25 25 0 0 0 16 1c-3 0-5 1.8-5 5v3H8v4h3v8"/>
          : <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>}
      </svg>
      <span>{profile.name}</span><ArrowUpRight size={14} aria-hidden="true"/>
    </a>)}
  </div>;
}

function LegalLinks({ onNavigate }: { onNavigate?: () => void }) {
  return <div className="legal-links"><a href="/impressum" onClick={onNavigate}>Impressum</a><a href="/datenschutz" onClick={onNavigate}>Datenschutz</a></div>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topline"><div className="wrap"><span><MapPin size={13}/> Bremerweg 61 · Emmerich am Rhein</span><a href="tel:+4928229818244"><Phone size={13}/> 02822 9818244 <span className="top-note">· Termine nach Vereinbarung</span></a></div></div>
    <header className="site-header"><div className="wrap nav">
      <Brand adminAccess/>
      <nav id="site-navigation" aria-label="Hauptnavigation" className={open ? 'navlinks is-open' : 'navlinks'}>
        {[['Leistungen','/#leistungen'],['Unser Team','/#team'],['Die Praxis','/#praxis'],['Fortbildungen','/fortbildungen'],['Kontakt','/#kontakt']].map(([text,url]) => <a key={url} href={url} onClick={() => setOpen(false)}>{text}</a>)}
        <div className="nav-extras">
          <LegalLinks onNavigate={() => setOpen(false)}/>
          <SocialLinks/>
        </div>
      </nav>
      <a className="button nav-cta" href="tel:+4928229818244">Termin vereinbaren <ArrowUpRight size={17}/></a>
      <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Menü schließen' : 'Menü öffnen'}>{open ? <X/> : <Menu/>}</button>
    </div></header>
  </>;
}

export function Footer() {
  return <footer>
    <div className="wrap footer-top"><Brand light/><p>Mit Zeit für Ihr Tier.<br/>Und einem offenen Ohr für Sie.</p><a href="tel:+4928229818244" className="footer-phone">02822 9818244 <ArrowUpRight size={22}/></a></div>
    <div className="wrap footer-bottom">
      <span>© {new Date().getFullYear()} Tierarztpraxis Koston & van Dillen GbR</span>
      <div className="footer-navigation"><SocialLinks/><nav aria-label="Rechtliche Informationen"><LegalLinks/></nav></div>
    </div>
  </footer>;
}
export function OpeningHours(){const weekdays=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag'];return <div className="hours-list">{weekdays.map((day,i)=><div key={day}><span>{day}</span><span>08:00–12:30</span><span>{i===2?'—':'15:00–18:00'}</span></div>)}<p>Termine nur nach vorheriger Vereinbarung.</p></div>;}
export function TrainingBrowser({trainings,compact=false}:{trainings:Training[];compact?:boolean}){const [person,setPerson]=useState('Alle');const [category,setCategory]=useState('Alle Bereiche');const [query,setQuery]=useState('');useEffect(()=>{if(compact)return;const hash=window.location.hash;if(hash==='#florian')setPerson('Florian Koston');if(hash==='#kerstin')setPerson('Kerstin van Dillen');},[compact]);const rows=[...trainings].filter(t=>(person==='Alle'||t.person===person)&&(category==='Alle Bereiche'||t.category===category)&&(`${t.title} ${t.person} ${t.provider} ${t.location}`.toLowerCase().includes(query.toLowerCase()))).sort((a,b)=>b.date.localeCompare(a.date));return <div className="training-browser">{!compact&&<><div className="filter-bar"><div className="segmented" aria-label="Nach Person filtern">{['Alle','Florian Koston','Kerstin van Dillen'].map(p=><button key={p} aria-pressed={person===p} className={person===p?'active':''} onClick={()=>setPerson(p)}>{p==='Alle'?'Alle Fortbildungen':p}</button>)}</div><label className="searchbox"><Search size={18}/><input aria-label="Fortbildungen durchsuchen" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Fortbildung suchen …"/></label></div><div className="filter-meta"><span>{rows.length} Fortbildungen und Qualifikationen</span><select aria-label="Nach Fachbereich filtern" value={category} onChange={e=>setCategory(e.target.value)}>{['Alle Bereiche',...new Set(trainings.map(t=>t.category))].map(c=><option key={c}>{c}</option>)}</select></div></>}{compact?<div className="training-preview">{rows.slice(0,3).map(t=><article key={t.id}><div className="training-date">{dateLabel(t.date)} <ArrowUpRight size={19}/></div><span className="tag">{t.category}</span><h3>{t.title}</h3><p>{t.person}{t.provider?` · ${t.provider}`:''}</p></article>)}</div>:<div className="training-rows">{rows.length?rows.map(t=><article key={t.id}><div className="training-when">{dateLabel(t.date)}{t.end_date&&<small>bis {dateLabel(t.end_date)}</small>}</div><div><span className="tag">{t.category}</span><h3>{t.title}</h3><p>{t.person}{t.provider?` · ${t.provider}`:''}{t.location?` · ${t.location}`:''}</p>{t.description&&<p className="training-description">{t.description}</p>}</div></article>):<div className="empty-state"><Search/><h3>Keine passenden Fortbildungen</h3><p>Versuchen Sie einen anderen Suchbegriff oder setzen Sie die Filter zurück.</p><button className="button" onClick={()=>{setPerson('Alle');setCategory('Alle Bereiche');setQuery('');}}>Filter zurücksetzen</button></div>}</div>}</div>;}
export function Gallery({images}:{images:Media[]}){const [selected,setSelected]=useState<number|null>(null);const [all,setAll]=useState(false);const dialog=useRef<HTMLDialogElement>(null);const launch=useRef<HTMLButtonElement|null>(null);useEffect(()=>{if(selected!==null&&!dialog.current?.open)dialog.current?.showModal();},[selected]);const close=()=>{dialog.current?.close();setSelected(null);launch.current?.focus();};const list=all?images:images.slice(0,6);if(!images.length)return null;return <><div className="gallery-grid">{list.map((m,i)=><button key={m.id} onClick={e=>{launch.current=e.currentTarget;setSelected(i);}} className="gallery-tile" aria-label={`${m.title} vergrößern`}><img src={mediaUrl(m)} alt={m.alt} loading="lazy"/><span>{m.title}<Plus size={20}/></span></button>)}</div>{images.length>6&&<div className="center"><button className="text-link" onClick={()=>setAll(!all)}>{all?'Weniger Bilder zeigen':`Alle ${images.length} Bilder ansehen`} <ArrowRight size={17}/></button></div>}<dialog className="lightbox" ref={dialog} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}}><button className="lightbox-close icon-button" aria-label="Bild schließen" onClick={close}><X/></button>{selected!==null&&<><img src={mediaUrl(images[selected])} alt={images[selected].alt}/><div className="lightbox-caption"><button className="icon-button" aria-label="Vorheriges Bild" onClick={()=>setSelected((selected+images.length-1)%images.length)}><ChevronLeft/></button><div><strong>{images[selected].title}</strong><p>{images[selected].alt}</p><small>{selected+1} / {images.length}</small></div><button className="icon-button" aria-label="Nächstes Bild" onClick={()=>setSelected((selected+1)%images.length)}><ChevronRight/></button></div></>}</dialog></>;}
export function ContactForm(){const [ready,setReady]=useState(false);function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const d=new FormData(e.currentTarget);const body=`Name: ${d.get('name')}\nE-Mail: ${d.get('email')}\nTelefon: ${d.get('phone')||'–'}\n\n${d.get('message')}`;window.location.href=`mailto:info@tierarztinemmerich.de?subject=${encodeURIComponent('Anfrage über die Praxiswebsite')}&body=${encodeURIComponent(body)}`;setReady(true);}return <form className="contact-form" onSubmit={submit}><h3>Schreiben Sie uns.</h3><p>Fragen zu unseren Leistungen, Methoden oder Kosten? Wir helfen Ihnen gern weiter.</p><label>Ihr Name *<input name="name" autoComplete="name" required maxLength={120} placeholder="Vor- und Nachname"/></label><div className="form-two"><label>E-Mail *<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="name@beispiel.de"/></label><label>Telefon<input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Optional"/></label></div><label>Ihre Nachricht *<textarea name="message" rows={4} required maxLength={3000} placeholder="Wie können wir Ihnen und Ihrem Tier helfen?"/></label><p className="form-hint">Öffnet Ihr E-Mail-Programm mit Ihrer Nachricht. Hinweise zum Umgang mit Ihren Daten finden Sie im <a href="/datenschutz">Datenschutz</a>.</p><button className="button" type="submit">E-Mail vorbereiten <ArrowUpRight size={18}/></button>{ready&&<p className="form-hint" role="status">Die Nachricht ist für Ihr E-Mail-Programm vorbereitet. Alternativ schreiben Sie direkt an <a href="mailto:info@tierarztinemmerich.de">info@tierarztinemmerich.de</a>.</p>}</form>;}

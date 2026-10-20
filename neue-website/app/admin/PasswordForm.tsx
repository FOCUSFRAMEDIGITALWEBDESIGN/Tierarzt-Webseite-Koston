'use client';
import { useState } from 'react';
import { LockKeyhole,Eye,EyeOff,ArrowRight,LoaderCircle,ArrowLeft,ShieldCheck } from 'lucide-react';
import { Brand } from '../components';
export function PasswordForm({mode,csrfToken}:{mode:'setup'|'login'|'change';csrfToken:string}){
 const [password,setPassword]=useState('');const [confirmation,setConfirmation]=useState('');const [current,setCurrent]=useState('');const [show,setShow]=useState(false);const [error,setError]=useState('');const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setError('');if(mode!=='login'&&password!==confirmation){setError('Die beiden neuen Passwörter stimmen nicht überein.');return;}setBusy(true);
  try{const response=await fetch(`/api/admin-access/${mode==='change'?'change-password':mode}`,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-Token':csrfToken},body:JSON.stringify({password,confirmation,current_password:current})});const result=await response.json() as {error?:string;code?:string};
   if(!response.ok){if(result.code==='admin_password_required')window.location.assign('/admin');throw new Error(result.error||'Die Anmeldung ist momentan nicht möglich.');}
   setPassword('');setConfirmation('');setCurrent('');window.location.assign(mode==='change'?'/admin?password=changed':'/admin');
  }catch(e){setError((e as Error).message);setBusy(false);}
 }
 return <form className="editor-form password-form" onSubmit={submit}>
 {mode==='change'&&<label>Bisheriges Admin-Passwort *<input type={show?'text':'password'} name="current_password" autoComplete="current-password" required maxLength={256} value={current} onChange={e=>setCurrent(e.target.value)} disabled={busy}/></label>}
 <label>{mode==='login'?'Admin-Passwort *':mode==='setup'?'Admin-Passwort festlegen *':'Neues Admin-Passwort *'}<input autoFocus type={show?'text':'password'} name="password" autoComplete={mode==='login'?'current-password':'new-password'} required minLength={mode==='login'?1:16} maxLength={256} value={password} onChange={e=>setPassword(e.target.value)} disabled={busy}/></label>
 {mode!=='login'&&<><label>Neues Passwort wiederholen *<input type={show?'text':'password'} name="confirmation" autoComplete="new-password" required minLength={16} maxLength={256} value={confirmation} onChange={e=>setConfirmation(e.target.value)} disabled={busy}/></label><p className="field-hint">Mindestens 16 Zeichen. Verwende eine lange Passphrase oder ein Passwort aus deinem Passwortmanager.</p></>}
 <button className="password-visibility text-link" type="button" onClick={()=>setShow(!show)} aria-pressed={show}>{show?<EyeOff size={15}/>:<Eye size={15}/>} {show?'Passwort verbergen':'Passwort anzeigen'}</button>
 {error&&<p className="error-box" role="alert">{error}</p>}
 <button className="button password-submit" disabled={busy} type="submit">{busy?<LoaderCircle className="spin" size={17}/>:<LockKeyhole size={17}/>} {busy?'Wird geprüft …':mode==='login'?'Adminbereich entsperren':mode==='setup'?'Passwort festlegen & entsperren':'Passwort ändern'}<ArrowRight size={17}/></button>
 <p className="password-session-note">{mode==='change'?'Andere Adminsitzungen werden nach der Änderung beendet.':'Die Entsperrung gilt für 30 Minuten. Dein angemeldetes, freigegebenes Konto bleibt zusätzlich erforderlich.'}</p>
 </form>;
}
export default function PasswordGate({mode,csrfToken}:{mode:'setup'|'login';csrfToken:string}){return <main className="password-page"><div className="password-page-brand"><Brand/></div><section className="password-card"><div className="password-heading"><span className="password-icon"><LockKeyhole size={25}/></span><span className="eyebrow">Geschützte Praxisverwaltung</span><h1>{mode==='setup'?'Dein Admin-Passwort.':'Bitte entsperren.'}</h1><p>{mode==='setup'?'Lege dein persönliches Admin-Passwort fest. Erst danach lassen sich Praxisinhalte und Bilder verwalten.':'Gib dein zusätzliches Admin-Passwort ein, um die Praxisverwaltung zu öffnen.'}</p></div><PasswordForm mode={mode} csrfToken={csrfToken}/><div className="password-foot"><ShieldCheck size={15}/><span>Konto und Admin-Passwort sind erforderlich.</span></div></section><a className="text-link password-back" href="/"><ArrowLeft size={16}/> Zur Praxiswebsite</a></main>;}

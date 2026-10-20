import { headers } from 'next/headers';
import { requireChatGPTUser, chatGPTSignOutPath } from '../chatgpt-auth';
import { database, initializeOwner, isAdmin } from '@/lib/server';
import type { Media, Training } from '@/lib/content';
import Admin from './Admin';
import PasswordGate from './PasswordForm';
import { createCsrfToken } from '@/lib/security';
import { getPasswordRecord, getPasswordSession } from '@/lib/password';
export const dynamic='force-dynamic';
export const metadata={title:'Praxisverwaltung',robots:{index:false,follow:false}};
export default async function Page(){
 const user=await requireChatGPTUser('/admin');
 if(!await isAdmin(user))return <main className="access-page"><span className="eyebrow">Geschützter Bereich</span><h1>Kein Adminzugriff.</h1><p>Dieses Konto ist nicht für die Praxisverwaltung freigeschaltet.</p><a className="button" href="/">Zur Praxiswebsite</a></main>;
 const csrfToken=await createCsrfToken(user);const password=await getPasswordRecord(user.userId);
 if(!password)return <PasswordGate mode="setup" csrfToken={csrfToken}/>;
 const session=await getPasswordSession(user,(await headers()).get('cookie'));
 if(!session)return <PasswordGate mode="login" csrfToken={csrfToken}/>;
 await initializeOwner(user);
 const db=database();const [t,m]=await Promise.all([db.prepare('SELECT * FROM trainings ORDER BY date DESC,created_at DESC').all<Training>(),db.prepare('SELECT * FROM images ORDER BY created_at DESC,position').all<Media>()]);
 return <Admin initialTrainings={t.results} initialImages={m.results} csrfToken={csrfToken} sessionExpiresAt={session.expires_at} displayName={user.displayName} signOutPath={chatGPTSignOutPath('/')}/>;
}

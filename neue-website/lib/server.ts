import { env } from 'cloudflare:workers';
import { getChatGPTUser, type ChatGPTUser } from '@/app/chatgpt-auth';
import { initialImages, initialTrainings, type Media, type Training } from './content';
import { InputError, str } from './validation';
import { validPasswordSession } from './password';
import { matchesOwner, verifyCsrfToken, hasTrustedOrigin, readBoundedBytes, BodyLimitError, MAX_JSON_BYTES } from './security';
export function database(){if(!env.DB)throw new Error('Der Inhaltsspeicher ist momentan nicht verfügbar.');return env.DB;}
export async function readContent(){const db=database();const initialized=await db.prepare("SELECT value FROM settings WHERE key = 'content_initialized'").first<{value:string}>();if(!initialized)return {trainings:initialTrainings,images:initialImages};const [t,m]=await Promise.all([db.prepare('SELECT * FROM trainings WHERE published = 1 ORDER BY date DESC, created_at DESC').all<Training>(),db.prepare('SELECT * FROM images WHERE published = 1 ORDER BY position, created_at DESC').all<Media>()]);return {trainings:t.results,images:m.results};}
export async function isAdmin(user:ChatGPTUser|null){if(!matchesOwner(user))return false;const found=await database().prepare('SELECT user_id FROM administrators WHERE user_id = ?').bind(user!.userId).first();return !!found;}
export async function initializeOwner(user:ChatGPTUser){
 if(!await isAdmin(user))return false;
 const db=database();
 const seeded=await db.prepare("SELECT value FROM settings WHERE key = 'content_initialized'").first();
 if(!seeded){const batch=[...initialTrainings.map(t=>db.prepare('INSERT OR IGNORE INTO trainings (id,person,category,title,provider,location,date,end_date,description,published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(t.id,t.person,t.category,t.title,t.provider,t.location,t.date,t.end_date,t.description,t.published,t.created_at,t.updated_at)),...initialImages.map(m=>db.prepare('INSERT OR IGNORE INTO images (id,storage_key,source,title,alt,category,person,position,published,content_type,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(m.id,m.storage_key,m.source,m.title,m.alt,m.category,m.person,m.position,m.published,m.content_type,m.created_at)),db.prepare("INSERT OR IGNORE INTO settings (key,value) VALUES ('content_initialized','1')")];await db.batch(batch);}
 return true;
}
export class ApiError extends Error { constructor(message:string,public status=400,public code?:string){super(message);} }
export async function authorizeAccount(request:Request,write=true){
 const user=await getChatGPTUser();if(!user)throw new ApiError('Bitte zuerst anmelden.',401);
 if(!await isAdmin(user))throw new ApiError('Für dieses Konto besteht kein Adminzugriff.',403);
 if(write){
  if(!hasTrustedOrigin(request))throw new ApiError('Die Anfrage konnte nicht bestätigt werden. Bitte laden Sie die Seite neu.',403);
  if(!await verifyCsrfToken(request.headers.get('x-csrf-token'),user))throw new ApiError('Die Sicherheitsprüfung ist abgelaufen. Bitte laden Sie die Seite neu.',403);
  await rateLimit(user.userId+':writes',60);
 }
 return user;
}
export async function authorize(request:Request,write=true){
 const user=await authorizeAccount(request,write);
 if(!await validPasswordSession(user,request.headers.get('cookie')))throw new ApiError('Bitte den Adminbereich mit deinem Passwort entsperren.',401,'admin_password_required');
 return user;
}
export async function rateLimit(scope:string,maximum:number,now=Date.now(),windowMs=60000){
 const window=Math.floor(now/windowMs);
 const row=await database().prepare('INSERT INTO request_limits (scope,window_start,count) VALUES (?,?,1) ON CONFLICT(scope) DO UPDATE SET count=CASE WHEN request_limits.window_start=excluded.window_start THEN request_limits.count+1 ELSE 1 END, window_start=excluded.window_start RETURNING count').bind(scope,window).first<{count:number}>();
 if(!row||row.count>maximum)throw new ApiError(windowMs===60000?'Zu viele Änderungen in kurzer Zeit. Bitte warten Sie eine Minute.':'Zu viele Anmeldeversuche. Bitte nach spätestens 15 Minuten erneut versuchen.',429);
}
export async function mutateAudited(statement:D1PreparedStatement,user:ChatGPTUser,action:string,targetId:string){
 const audit=database().prepare('INSERT INTO admin_events (id,user_id,action,target_id,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),user.userId,action,targetId,new Date().toISOString());
 return (await database().batch([statement,audit]))[0];
}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
export function failure(error:unknown){if(error instanceof ApiError)return json({error:error.message,...(error.code?{code:error.code}:{})},error.status);if(error instanceof BodyLimitError)return json({error:'Die hochgeladene Datei oder Anfrage ist zu groß.'},413);if(error instanceof InputError)return json({error:error.message},400);console.error('Praxis API:',error instanceof Error?error.message:'Unbekannter Fehler');return json({error:'Das Speichern ist momentan nicht möglich. Bitte versuchen Sie es erneut.'},500);}
export async function bodyJson(request:Request){
 if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')throw new ApiError('Bitte die Anfrage als JSON senden.',415);
 const bytes=await readBoundedBytes(request,MAX_JSON_BYTES);
 try{const data=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));if(!data||Array.isArray(data)||typeof data!=='object')throw new Error();return data as Record<string,unknown>;}catch{throw new InputError('Die Eingaben konnten nicht gelesen werden.');}
}
export function imageMeta(data:Record<string,unknown>){const category=str(data.category??'Praxis','Bildbereich',50,true);if(!['Praxis','Startbild','Pferde','Team','Gebäude','Patienten'].includes(category))throw new InputError('Unbekannter Bildbereich.');const person=str(data.person??'','Person',100);if(category==='Team'&&!['Florian Koston','Kerstin van Dillen','Rabea Meisters','Lena van Kampen','Raffaela Wehren','Ida Reintjes'].includes(person))throw new InputError('Bitte ein Teammitglied auswählen.');return {title:str(data.title,'Titel',150,true),alt:str(data.alt,'Bildbeschreibung',300,true),category,person,published:data.published===true||data.published===1||data.published==='true'?1:0};}

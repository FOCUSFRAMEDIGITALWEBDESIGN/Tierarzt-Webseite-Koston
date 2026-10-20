import { env } from 'cloudflare:workers';
import type { ChatGPTUser } from '@/app/chatgpt-auth';
const encoder = new TextEncoder();
export const MAX_JSON_BYTES = 16 * 1024;
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_UPLOAD_BYTES = MAX_IMAGE_BYTES + 64 * 1024;
const TOKEN_LIFETIME = 60 * 60 * 1000;
function encode64(bytes:Uint8Array){return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');}
function decode64(value:string){if(!/^[A-Za-z0-9_-]+$/.test(value))throw new Error('Invalid base64');return Uint8Array.from(atob(value.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-value.length%4)%4)),c=>c.charCodeAt(0));}
async function signingKey(){if(!env.ADMIN_CSRF_SECRET||env.ADMIN_CSRF_SECRET.length<40)throw new Error('Admin security is not configured.');return crypto.subtle.importKey('raw',encoder.encode(env.ADMIN_CSRF_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
export function matchesOwner(user:ChatGPTUser|null){return !!user&&!!env.ADMIN_OWNER_USER_ID&&!!env.ADMIN_OWNER_EMAIL&&user.userId===env.ADMIN_OWNER_USER_ID&&user.email.trim().toLowerCase()===env.ADMIN_OWNER_EMAIL.trim().toLowerCase();}
export async function createCsrfToken(user:ChatGPTUser,now=Date.now()){
 if(!matchesOwner(user))throw new Error('Admin access denied.');
 const payload=encode64(encoder.encode(JSON.stringify({u:user.userId,e:now+TOKEN_LIFETIME,n:encode64(crypto.getRandomValues(new Uint8Array(18)))})));
 const signature=await crypto.subtle.sign('HMAC',await signingKey(),encoder.encode(payload));
 return payload+'.'+encode64(new Uint8Array(signature));
}
export async function verifyCsrfToken(token:string|null,user:ChatGPTUser,now=Date.now()){
 if(!token||token.length>1024||!matchesOwner(user))return false;
 try{const parts=token.split('.');if(parts.length!==2)return false;const [payload,signature]=parts;
  if(!await crypto.subtle.verify('HMAC',await signingKey(),decode64(signature),encoder.encode(payload)))return false;
  const data=JSON.parse(new TextDecoder().decode(decode64(payload)));
  return data.u===user.userId&&typeof data.n==='string'&&data.n.length>=20&&Number.isSafeInteger(data.e)&&data.e>now&&data.e<=now+TOKEN_LIFETIME;
 }catch{return false;}
}
export function hasTrustedOrigin(request:Request){
 const configured=env.SITE_ORIGIN;if(!configured)return false;
 const origin=request.headers.get('origin');
 if(!origin||new URL(request.url).origin!==origin||request.headers.get('sec-fetch-site')==='cross-site')return false;
 const allowed=[configured,...(env.SITE_ADDITIONAL_ORIGINS||'').split(',').map(value=>value.trim()).filter(Boolean)];
 return allowed.includes(origin);
}
export async function readBoundedBytes(request:Request,maxBytes:number){
 const claimed=Number(request.headers.get('content-length')||0);if(claimed>maxBytes)throw new BodyLimitError();
 if(!request.body)return new Uint8Array();
 const reader=request.body.getReader();const chunks:Uint8Array[]=[];let total=0;
 try{while(true){const part=await reader.read();if(part.done)break;total+=part.value.length;if(total>maxBytes){await reader.cancel();throw new BodyLimitError();}chunks.push(part.value);}}
 finally{reader.releaseLock();}
 const result=new Uint8Array(total);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length;}return result;
}
export class BodyLimitError extends Error{}
export function applySecurityHeaders(response:Response,request:Request,adminPolicy?:string){
 const path=new URL(request.url).pathname;const sensitive=path==='/admin'||path.startsWith('/admin/')||path.startsWith('/api/')||path.startsWith('/media/');
 const headers=new Headers(response.headers);headers.set('X-Content-Type-Options','nosniff');headers.set('Referrer-Policy','no-referrer');headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 if(new URL(request.url).protocol==='https:')headers.set('Strict-Transport-Security','max-age=31536000');
 if(sensitive){headers.set('Cache-Control','no-store');headers.set('X-Robots-Tag','noindex, nofollow, noarchive');headers.set('X-Frame-Options','DENY');headers.set('Cross-Origin-Resource-Policy','same-origin');
  const vary=new Set((headers.get('Vary')||'').split(',').map(s=>s.trim()).filter(Boolean));for(const key of ['Cookie','Origin','Sec-Fetch-Site'])vary.add(key);headers.set('Vary',[...vary].join(', '));}
 if(adminPolicy)headers.set('Content-Security-Policy',adminPolicy);
 else if(!headers.has('Content-Security-Policy'))headers.set('Content-Security-Policy',"object-src 'none'; base-uri 'self'; frame-ancestors 'self' https://chatgpt.com");
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
export async function withSecurity(request:Request,respond:(request:Request)=>Promise<Response>){
 const path=new URL(request.url).pathname;const admin=path==='/admin'||path.startsWith('/admin/');let policy:string|undefined;
 let secured=request;
 if(admin){const nonce=encode64(crypto.getRandomValues(new Uint8Array(24)));policy=`default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'`;
  const headers=new Headers(request.headers);headers.set('Content-Security-Policy',policy);secured=new Request(request,{headers});}
 return applySecurityHeaders(await respond(secured),request,policy);
}

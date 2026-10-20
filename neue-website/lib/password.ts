import { env } from 'cloudflare:workers';
import { Buffer } from 'node:buffer';
import { scrypt, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import type { ChatGPTUser } from '@/app/chatgpt-auth';
import { matchesOwner } from './security';
export const ADMIN_COOKIE='__Host-practice-admin';
export const UNLOCK_DURATION=30*60*1000;
const COST={N:32768,r:8,p:3,maxmem:64*1024*1024};
function db(){if(!env.DB)throw new Error('Admin storage is unavailable.');return env.DB;}
function pepper(){if(!env.ADMIN_PASSWORD_PEPPER||env.ADMIN_PASSWORD_PEPPER.length<40)throw new Error('Admin password security is not configured.');return env.ADMIN_PASSWORD_PEPPER;}
function derive(password:string,salt:Uint8Array){return new Promise<Buffer>((resolve,reject)=>scrypt(password,salt,32,COST,(error,key)=>error?reject(error):resolve(key)));}
export function passwordInput(value:unknown){if(typeof value!=='string'||value.length<16||value.length>256)throw new Error('Das Passwort muss zwischen 16 und 256 Zeichen lang sein.');return value;}
export async function hashPassword(password:string){passwordInput(password);const salt=randomBytes(24);const key=await derive(password,salt);const digest=createHmac('sha256',pepper()).update(key).digest('base64url');return JSON.stringify({algorithm:'scrypt',N:COST.N,r:COST.r,p:COST.p,salt:salt.toString('base64url'),digest});}
export async function verifyPassword(password:unknown,stored:string){
 if(typeof password!=='string'||password.length<1||password.length>256)return false;
 try{const data=JSON.parse(stored);if(data.algorithm!=='scrypt'||data.N!==COST.N||data.r!==COST.r||data.p!==COST.p||typeof data.salt!=='string'||typeof data.digest!=='string')return false;
  const salt=Buffer.from(data.salt,'base64url');const expected=Buffer.from(data.digest,'base64url');if(salt.length!==24||expected.length!==32)return false;
  const key=await derive(password,salt);const actual=createHmac('sha256',pepper()).update(key).digest();return timingSafeEqual(actual,expected);
 }catch{return false;}
}
export type PasswordRecord={user_id:string;password_hash:string;version:number;updated_at:string};
export async function getPasswordRecord(userId:string){return db().prepare('SELECT * FROM admin_passwords WHERE user_id=?').bind(userId).first<PasswordRecord>();}
export function sessionCookie(token:string){return `${ADMIN_COOKIE}=${token}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${UNLOCK_DURATION/1000}`;}
export function clearSessionCookie(){return `${ADMIN_COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0`;}
function tokenFromCookie(header:string|null){const values=(header||'').split(';').map(x=>x.trim()).filter(x=>x.startsWith(ADMIN_COOKIE+'='));if(values.length!==1)return null;const token=values[0].slice(ADMIN_COOKIE.length+1);return /^[A-Za-z0-9_-]{43}$/.test(token)?token:null;}
export async function sessionDigest(token:string){return Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))).toString('hex');}
export async function getPasswordSession(user:ChatGPTUser|null,cookieHeader:string|null,now=Date.now()){
 if(!matchesOwner(user))return null;const token=tokenFromCookie(cookieHeader);if(!token)return null;
 return db().prepare('SELECT s.expires_at FROM admin_sessions s JOIN admin_passwords p ON p.user_id=s.user_id AND p.version=s.password_version WHERE s.token_hash=? AND s.user_id=? AND s.expires_at>?').bind(await sessionDigest(token),user!.userId,now).first<{expires_at:number}>();
}
export async function validPasswordSession(user:ChatGPTUser|null,cookieHeader:string|null,now=Date.now()){return !!await getPasswordSession(user,cookieHeader,now);}
export async function newPasswordSession(user:ChatGPTUser,version:number,now=Date.now()){
 const token=randomBytes(32).toString('base64url');const digest=await sessionDigest(token);
 return {token,statement:db().prepare('INSERT INTO admin_sessions (token_hash,user_id,password_version,expires_at,created_at) VALUES (?,?,?,?,?)').bind(digest,user.userId,version,now+UNLOCK_DURATION,now)};
}
export async function revokePasswordSession(user:ChatGPTUser,cookieHeader:string|null){const token=tokenFromCookie(cookieHeader);if(token)await db().prepare('DELETE FROM admin_sessions WHERE token_hash=? AND user_id=?').bind(await sessionDigest(token),user.userId).run();}

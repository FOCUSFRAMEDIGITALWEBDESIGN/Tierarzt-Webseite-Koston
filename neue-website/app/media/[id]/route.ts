import { env } from 'cloudflare:workers';
import { database,isAdmin } from '@/lib/server';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { validPasswordSession } from '@/lib/password';
export const dynamic='force-dynamic';
export async function GET(request:Request,context:{params:Promise<{id:string}>}){const {id}=await context.params;const data=await database().prepare('SELECT storage_key,published,content_type FROM images WHERE id=?').bind(id).first<{storage_key:string;published:number;content_type:string}>();if(!data||!data.storage_key||!env.BUCKET)return new Response('Bild nicht gefunden',{status:404});if(!data.published){const user=await getChatGPTUser();if(!await isAdmin(user)||!await validPasswordSession(user,request.headers.get('cookie')))return new Response('Bild nicht gefunden',{status:404});}const object=await env.BUCKET.get(data.storage_key);if(!object)return new Response('Bild nicht gefunden',{status:404});return new Response(object.body,{headers:{'Content-Type':data.content_type,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox",'ETag':object.httpEtag}});}

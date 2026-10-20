import { env } from 'cloudflare:workers';
import { imageSize } from 'image-size';
import { authorize, database, json, failure, ApiError, imageMeta, mutateAudited, rateLimit } from '@/lib/server';
import { imageKind } from '@/lib/validation';
import { readBoundedBytes, MAX_IMAGE_BYTES, MAX_UPLOAD_BYTES } from '@/lib/security';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{await authorize(request,false);const data=await database().prepare('SELECT * FROM images ORDER BY created_at DESC, position').all();return json(data.results);}catch(e){return failure(e);}}
export async function POST(request:Request){try{
 const user=await authorize(request);await rateLimit(user.userId+':uploads',10);
 if(!env.BUCKET)throw new ApiError('Der Bildspeicher ist momentan nicht verfügbar.',503);
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('multipart/form-data;'))throw new ApiError('Bitte eine Bilddatei hochladen.',415);
 const body=await readBoundedBytes(request,MAX_UPLOAD_BYTES);
 const form=await new Response(body,{headers:{'Content-Type':request.headers.get('content-type')!}}).formData();
 const file=form.get('file');if(!file||typeof file==='string'||form.getAll('file').length!==1)throw new ApiError('Bitte genau ein Bild auswählen.');
 if(file.size===0||file.size>MAX_IMAGE_BYTES)throw new ApiError('Bilder müssen zwischen 1 Byte und 8 MB groß sein.',413);
 const bytes=new Uint8Array(await file.arrayBuffer());const type=imageKind(bytes);
 if(!type)throw new ApiError('Bitte ein JPEG-, PNG- oder WebP-Bild auswählen.');
 const extensions:Record<string,string[]>={'image/jpeg':['jpg','jpeg'],'image/png':['png'],'image/webp':['webp']};
 const extension=file.name.split('.').pop()?.toLowerCase()||'';
 if(file.type!==type||!extensions[type].includes(extension)||file.name.length>200)throw new ApiError('Dateiformat, Dateiendung und Bildinhalt müssen zusammenpassen.');
 try{const size=imageSize(bytes);if(!Number.isSafeInteger(size.width)||!Number.isSafeInteger(size.height)||size.width<1||size.height<1||size.width>10000||size.height>10000||size.width*size.height>40000000)throw new Error();}
 catch{throw new ApiError('Das Bild konnte nicht geprüft werden oder ist zu groß. Maximal 40 Megapixel und 10.000 Pixel pro Seite.');}
 const meta=imageMeta(Object.fromEntries(['title','alt','category','person','published'].map(k=>[k,form.get(k)])));
 const id=crypto.randomUUID();const key=`practice/${id}.${type==='image/jpeg'?'jpg':type.split('/')[1]}`;const now=new Date().toISOString();
 await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:type}});
 try{const statement=database().prepare('INSERT INTO images (id,storage_key,source,title,alt,category,person,position,published,content_type,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(id,key,'',meta.title,meta.alt,meta.category,meta.person,0,meta.published,type,now);await mutateAudited(statement,user,'image.create',id);}
 catch(e){await env.BUCKET.delete(key);throw e;}
 return json({id,storage_key:key,source:'',...meta,position:0,content_type:type,created_at:now},201);
 }catch(e){return failure(e);}}

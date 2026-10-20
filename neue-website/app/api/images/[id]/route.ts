import { env } from 'cloudflare:workers';
import { authorize,database,json,failure,bodyJson,imageMeta,ApiError,mutateAudited } from '@/lib/server';
export const dynamic='force-dynamic';
type Context={params:Promise<{id:string}>};
export async function PUT(request:Request,context:Context){try{
 const user=await authorize(request);const {id}=await context.params;const meta=imageMeta(await bodyJson(request));
 const statement=database().prepare('UPDATE images SET title=?,alt=?,category=?,person=?,published=? WHERE id=?').bind(meta.title,meta.alt,meta.category,meta.person,meta.published,id);
 const result=await mutateAudited(statement,user,'image.update',id);if(!result.meta.changes)throw new ApiError('Das Bild wurde nicht gefunden.',404);return json({id,...meta});
 }catch(e){return failure(e);}}
export async function DELETE(request:Request,context:Context){try{
 const user=await authorize(request);const {id}=await context.params;const image=await database().prepare('SELECT storage_key FROM images WHERE id=?').bind(id).first<{storage_key:string|null}>();
 if(!image)throw new ApiError('Das Bild wurde nicht gefunden.',404);
 await mutateAudited(database().prepare('DELETE FROM images WHERE id=?').bind(id),user,'image.delete',id);
 if(image.storage_key&&env.BUCKET)await env.BUCKET.delete(image.storage_key);return json({success:true});
 }catch(e){return failure(e);}}

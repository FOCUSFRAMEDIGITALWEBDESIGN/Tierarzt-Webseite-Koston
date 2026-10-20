import { authorize, database, json, failure, bodyJson, ApiError, mutateAudited } from '@/lib/server';
import { validateTraining } from '@/lib/validation';
export const dynamic='force-dynamic';
type Context={params:Promise<{id:string}>};
export async function PUT(request:Request,context:Context){try{
 const user=await authorize(request);const {id}=await context.params;const t=validateTraining(await bodyJson(request));const now=new Date().toISOString();
 const statement=database().prepare('UPDATE trainings SET person=?,category=?,title=?,provider=?,location=?,date=?,end_date=?,description=?,published=?,updated_at=? WHERE id=?').bind(t.person,t.category,t.title,t.provider,t.location,t.date,t.end_date,t.description,t.published,now,id);
 const result=await mutateAudited(statement,user,'training.update',id);if(!result.meta.changes)throw new ApiError('Die Fortbildung wurde nicht gefunden.',404);return json({id,...t,updated_at:now});
 }catch(e){return failure(e);}}
export async function DELETE(request:Request,context:Context){try{
 const user=await authorize(request);const {id}=await context.params;
 const result=await mutateAudited(database().prepare('DELETE FROM trainings WHERE id=?').bind(id),user,'training.delete',id);
 if(!result.meta.changes)throw new ApiError('Die Fortbildung wurde nicht gefunden.',404);return json({success:true});
 }catch(e){return failure(e);}}

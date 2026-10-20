import { authorize, database, json, failure, bodyJson, mutateAudited } from '@/lib/server';
import { validateTraining } from '@/lib/validation';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{await authorize(request,false);const data=await database().prepare('SELECT * FROM trainings ORDER BY date DESC, created_at DESC').all();return json(data.results);}catch(e){return failure(e);}}
export async function POST(request:Request){try{
 const user=await authorize(request);const t=validateTraining(await bodyJson(request));const id=crypto.randomUUID();const now=new Date().toISOString();
 const statement=database().prepare('INSERT INTO trainings (id,person,category,title,provider,location,date,end_date,description,published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,t.person,t.category,t.title,t.provider,t.location,t.date,t.end_date,t.description,t.published,now,now);
 await mutateAudited(statement,user,'training.create',id);return json({id,...t,created_at:now,updated_at:now},201);
 }catch(e){return failure(e);}}

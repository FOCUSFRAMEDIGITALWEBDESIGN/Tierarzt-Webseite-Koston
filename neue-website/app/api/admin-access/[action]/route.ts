import { authorizeAccount,authorize,database,json,failure,bodyJson,ApiError,rateLimit,mutateAudited } from '@/lib/server';
import { getPasswordRecord,hashPassword,verifyPassword,passwordInput,newPasswordSession,sessionCookie,clearSessionCookie,revokePasswordSession } from '@/lib/password';
export const dynamic='force-dynamic';
export async function POST(request:Request,context:{params:Promise<{action:string}>}){try{
 const {action}=await context.params;if(!['setup','login','logout','change-password'].includes(action))throw new ApiError('Nicht gefunden.',404);
 const user=action==='change-password'?await authorize(request):await authorizeAccount(request);
 if(action==='logout'){
  await revokePasswordSession(user,request.headers.get('cookie'));
  const audit=database().prepare('INSERT INTO admin_events (id,user_id,action,target_id,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),user.userId,'password.lock',user.userId,new Date().toISOString());await audit.run();
  const response=json({success:true});response.headers.set('Set-Cookie',clearSessionCookie());return response;
 }
 await rateLimit(user.userId+':password-attempts',5,Date.now(),15*60*1000);
 const data=await bodyJson(request);const existing=await getPasswordRecord(user.userId);const now=new Date().toISOString();
 if(action==='login'){
  if(!existing||!await verifyPassword(data.password,existing.password_hash))throw new ApiError('Das Admin-Passwort ist falsch.',401);
  const session=await newPasswordSession(user,existing.version);
  await mutateAudited(session.statement,user,'password.login',user.userId);
  await database().prepare('DELETE FROM admin_sessions WHERE expires_at<=?').bind(Date.now()).run();
  const response=json({success:true});response.headers.set('Set-Cookie',sessionCookie(session.token));return response;
 }
 if(action==='setup'&&existing)throw new ApiError('Ein Admin-Passwort wurde bereits festgelegt. Bitte neu laden und anmelden.',409);
 if(action==='change-password'&&(!existing||!await verifyPassword(data.current_password,existing.password_hash)))throw new ApiError('Das bisherige Admin-Passwort ist falsch.',401);
 let password:string;try{password=passwordInput(data.password);}catch(e){throw new ApiError((e as Error).message);}
 if(password!==data.confirmation)throw new ApiError('Die beiden neuen Passwörter stimmen nicht überein.');
 const hash=await hashPassword(password);const version=(existing?.version||0)+1;const session=await newPasswordSession(user,version);
 const credential=action==='setup'?database().prepare('INSERT INTO admin_passwords (user_id,password_hash,version,updated_at) VALUES (?,?,?,?)').bind(user.userId,hash,version,now):database().prepare('UPDATE admin_passwords SET password_hash=?,version=?,updated_at=? WHERE user_id=?').bind(hash,version,now,user.userId);
 const audit=database().prepare('INSERT INTO admin_events (id,user_id,action,target_id,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),user.userId,action==='setup'?'password.setup':'password.change',user.userId,now);
 await database().batch([credential,database().prepare('DELETE FROM admin_sessions WHERE user_id=?').bind(user.userId),session.statement,audit]);
 const response=json({success:true});response.headers.set('Set-Cookie',sessionCookie(session.token));return response;
 }catch(e){return failure(e);}}

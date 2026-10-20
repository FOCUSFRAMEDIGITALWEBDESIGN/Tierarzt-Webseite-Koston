import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { readFileSync,writeFileSync,mkdirSync,readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const esbuildDir=readdirSync('node_modules/.pnpm').find(p=>p.startsWith('esbuild@0.28.'));
const esbuild=require(resolve(`node_modules/.pnpm/${esbuildDir}/node_modules/esbuild`));
const miniflareDir=readdirSync('node_modules/.pnpm').find(p=>p.startsWith('miniflare@'));
const {Miniflare}=require(resolve(`node_modules/.pnpm/${miniflareDir}/node_modules/miniflare`));
const dir=resolve('.sites-runtime/password-runtime');mkdirSync(dir,{recursive:true});
writeFileSync(dir+'/worker.ts',`import {hashPassword,verifyPassword} from '../../lib/password';export default {async fetch(){const start=Date.now();const password='Runtime test password only 9!';const hash=await hashPassword(password);const valid=await verifyPassword(password,hash);const wrong=await verifyPassword('A different wrong password',hash);return Response.json({valid,wrong,duration_ms:Date.now()-start});}};`);
await esbuild.build({entryPoints:[dir+'/worker.ts'],outfile:dir+'/worker.mjs',bundle:true,format:'esm',platform:'neutral',external:['node:*','cloudflare:workers'],logLevel:'silent'});
const mf=new Miniflare({modules:true,script:readFileSync(dir+'/worker.mjs','utf8'),compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],bindings:{ADMIN_PASSWORD_PEPPER:'test-only-worker-runtime-secret-not-for-production-00000000'}});
try{const response=await mf.dispatchFetch('http://localhost/');assert.equal(response.status,200);const result=await response.json();assert.equal(result.valid,true);assert.equal(result.wrong,false);console.log('PASS Native password hashing and verification in the Cloudflare Worker runtime');console.log('Hashing and two verifications:',result.duration_ms,'ms');}
finally{await mf.dispose();}

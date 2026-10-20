import { readContent } from '@/lib/server';
import Home from './Home';
export const dynamic='force-dynamic';
export default async function Page(){const content=await readContent();return <Home {...content}/>;}

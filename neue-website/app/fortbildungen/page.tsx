import { readContent } from '@/lib/server';
import { Header, Footer, TrainingBrowser } from '../components';
import { ArrowLeft } from 'lucide-react';
export const dynamic='force-dynamic';
export const metadata={title:'Fortbildungen & Qualifikationen'};
export default async function Page(){const {trainings}=await readContent();return <><Header/><main className="wrap archive-page"><a className="text-link back-link" href="/"><ArrowLeft size={17}/> Zurück zur Praxis</a><div className="eyebrow">Unsere Qualifikationen</div><h1>Gute Medizin<br/>bleibt <em>neugierig.</em></h1><p className="archive-intro">Hier finden Sie die Fortbildungen und Qualifikationen von Florian Koston und Kerstin van Dillen – von der Chirurgie bis zur Pferdezahnmedizin.</p><TrainingBrowser trainings={trainings}/></main><Footer/></>;}

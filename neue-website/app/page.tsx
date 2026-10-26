import type { Metadata } from 'next';
import { readContent } from '@/lib/server';
import { PRACTICE_DESCRIPTION, PRACTICE_STRUCTURED_DATA } from '@/lib/site';
import Home from './Home';
export const dynamic='force-dynamic';
const title = 'Kleintier- & Pferdemedizin Emmerich | Koston & van Dillen';
export const metadata: Metadata = {
  title: { absolute: title },
  description: PRACTICE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: PRACTICE_DESCRIPTION,
    siteName: 'Tierarztpraxis Koston & van Dillen',
    locale: 'de_DE',
    type: 'website',
    url: '/',
  },
};
export default async function Page(){
  const content=await readContent();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(PRACTICE_STRUCTURED_DATA).replace(/</g,'\\u003c')}}/><Home {...content}/></>;
}

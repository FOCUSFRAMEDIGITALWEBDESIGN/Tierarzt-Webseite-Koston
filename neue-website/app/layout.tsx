import type { Metadata } from 'next';
import './globals.css';
import { PUBLIC_SITE_ORIGIN, PRACTICE_DESCRIPTION } from '@/lib/site';
export const metadata:Metadata={metadataBase:new URL(PUBLIC_SITE_ORIGIN),title:{default:'Tierarzt in Emmerich · Koston & van Dillen',template:'%s · Koston & van Dillen'},description:PRACTICE_DESCRIPTION,icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body>{children}</body></html>;}

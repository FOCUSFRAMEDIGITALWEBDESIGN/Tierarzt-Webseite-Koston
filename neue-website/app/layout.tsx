import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://koston-van-dillen.hey1233767.chatgpt.site'),title:{default:'Koston & van Dillen · Tierarztpraxis in Emmerich',template:'%s · Koston & van Dillen'},description:'Persönliche Tiermedizin für Kleintiere und Pferde in Emmerich am Rhein. Lernen Sie unser Team und unsere Leistungen kennen. Bremerweg 61 · 02822 9818244.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body>{children}</body></html>;}

export type Training = {id:string;person:string;category:string;title:string;provider:string;location:string;date:string;end_date:string;description:string;published:number;created_at:string;updated_at:string};
export type Media = {id:string;storage_key:string|null;source:string;title:string;alt:string;category:string;person:string;position:number;published:number;content_type:string;created_at:string};
export const PEOPLE = ['Florian Koston','Kerstin van Dillen'];
export const CATEGORIES = ['Zahnmedizin','Chirurgie','Biologische Tiermedizin','Allgemeine Tiermedizin'];
const stamp='2026-10-20T06:00:00.000Z';
const rows: [string,string,string,string,string?,string?,string?,string?][] = [
 ['Florian Koston','Chirurgie','General Practitioner Certificate in Small Animal Surgery','2020-08','ISVPS','','2023-01','GPCert(SAS) – Zertifizierung der Chirurgie nach den Richtlinien der International School of Veterinary Postgraduate Studies.'],
 ['Florian Koston','Allgemeine Tiermedizin','Berechtigung zur Abnahme des Sachkundenachweises für Hundehalter','','LHundG NRW'],
 ['Florian Koston','Zahnmedizin','Dentalchirurgische Techniken bei Hund und Katze','2025-01','Improve International'],
 ['Florian Koston','Chirurgie','Kreuzbandrisse: extrakapsuläre Verfahren und Osteotomien einschließlich TTA Rapid','2026-07','Rita Leibinger'],
 ['Kerstin van Dillen','Zahnmedizin','Mehrtägige Praktika bei einem IGFP-geprüften Mitglied','2016','IGFP'],
 ['Kerstin van Dillen','Zahnmedizin','Zahnbehandlung von Pferden und die passende Sedation','2017-02','IGFP','Selters-Eisenbach'],
 ['Kerstin van Dillen','Zahnmedizin','Extraktionsworkshop: Segmentieren von Backenzähnen','2018-06','IGFP','Großwallstadt'],
 ['Kerstin van Dillen','Zahnmedizin','Zahnbehandlung von alten Pferden','2019-03','IGFP','Schmallenberg'],
 ['Kerstin van Dillen','Zahnmedizin','Zahnbehandlung von alten Pferden','2020-06','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Röntgen 1: Schneide- und Hengstzähne','2020-07','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Röntgen 2: Backenzähne','2020-08','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Röntgen 3: Sinuserkrankungen, Veränderungen und Frakturen im Kopfbereich','2020-09','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Backenzahnextraktionen beim Pferd und mögliche Komplikationen','2021-02','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','EOTRH – Zellen außer Rand und Band','2021-05','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Kiefergelenk und Zungenbein: Anatomie und Biomechanik','2021-07','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Kopfnervenausfälle beim Pferd','','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Indikationen für endodontische Behandlungen','2021-09','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','EOTRH','2022-02','IGFP','Online'],
 ['Kerstin van Dillen','Zahnmedizin','Horse-Dental-School – Ausbildung, Kurs 1','2022-08-29','Horse-Dental-School','Bensheim','2022-09-02'],
 ['Kerstin van Dillen','Zahnmedizin','Praktischer Workshop EOTRH','2022-11','Horse-Dental-School','Koblenz'],
 ['Kerstin van Dillen','Zahnmedizin','Balance im Pferdemaul – praktischer Workshop','2023-02','Holger Rosenberg','Westerwald'],
 ['Kerstin van Dillen','Zahnmedizin','Anatomischer Samstag mit Prof. Dr. Carsten Staszyk','','JLU Gießen','Gießen'],
 ['Kerstin van Dillen','Zahnmedizin','Horse-Dental-School – Ausbildung, Kurs 2','2023-09-04','Horse-Dental-School','Bensheim','2023-09-08'],
 ['Kerstin van Dillen','Biologische Tiermedizin','Homotoxikologie / Bioregulatorische Tiermedizin – Kurs B','2016-04','','Kassel','','Zweitägiger Kurs.'],
 ['Kerstin van Dillen','Biologische Tiermedizin','Homotoxikologie / Bioregulatorische Tiermedizin – Kurs C','2016-10','','Bühl','','Zweitägiger Kurs.'],
 ['Kerstin van Dillen','Biologische Tiermedizin','Homotoxikologie / Bioregulatorische Tiermedizin – Kurs D','2017-04','','Kassel','','Zweitägiger Kurs.'],
 ['Kerstin van Dillen','Biologische Tiermedizin','Homotoxikologie / Bioregulatorische Tiermedizin – Kurs A','2017-10','','Wetzlar','','Zweitägiger Kurs.'],
 ['Kerstin van Dillen','Biologische Tiermedizin','Organotherapie A','2018-01','','Gießen','','Zweitägiger Kurs.'],
 ['Kerstin van Dillen','Biologische Tiermedizin','Organotherapie B','2019-01','','Gießen','','Zweitägiger Kurs.'],
];
export const initialTrainings: Training[] = rows.map((r,i)=>({id:`original-${i+1}`,person:r[0],category:r[1],title:r[2],date:r[3],provider:r[4]||'',location:r[5]||'',end_date:r[6]||'',description:r[7]||'',published:1,created_at:stamp,updated_at:stamp}));
export const team = [
 {name:'Florian Koston',title:'Mag. med. vet. · GPCert(SAS)',role:'Tierarzt · Kleintiermedizin',photo:'/images/page1-photo0.jpg',focus:'Zahnchirurgie, Chirurgie und Innere Medizin',description:'Zertifizierung in der Kleintierchirurgie nach den Richtlinien der ISVPS. Ihr Ansprechpartner für die chirurgische und internistische Versorgung sowie die Zahnmedizin Ihres Kleintieres.'},
 {name:'Kerstin van Dillen',title:'Tierärztin',role:'Tierärztin · Pferdemedizin',photo:'/images/page1-photo1.jpg',focus:'Zahnbehandlung, Lahmheitsdiagnostik, biologische Tiermedizin und geriatrische Tiere mit Stoffwechselerkrankungen',description:'Ihr Ansprechpartner für die Pferdemedizin – mit Schwerpunkten in der Zahnbehandlung, Lahmheitsdiagnostik und der Begleitung älterer Pferde.'},
 {name:'Rabea Meisters',role:'Tiermedizinische Fachangestellte',photo:'/images/page1-photo2.jpg'},
 {name:'Lena van Kampen',role:'Tiermedizinische Fachangestellte',photo:'/images/page1-photo3.jpg'},
 {name:'Raffaela Wehren',role:'Tiermedizinische Fachangestellte',photo:'/images/page1-photo4.jpg'},
 {name:'Ida Reintjes',role:'Auszubildende',photo:'/images/page1-photo5.jpg'},
];
export const smallServices = ['Innere Medizin','Chirurgie mit Inhalationsnarkose','Zahnheilkunde und Zahnchirurgie','Dentalröntgen','Digitale Röntgendiagnostik','Ultraschalldiagnostik','Endoskopie','Eigenes Inhouse-Labor','Biologische Tiermedizin','Ernährungsberatung','Betreuung geriatrischer Patienten','Check-ups','Sachkundenachweis für Hundehalter (§ 11 Abs. 3 LHundG NRW)'];
export const horseServices = ['Zahnheilkunde','Ambulante Operationen','Lahmheitsdiagnostik','Gynäkologie und Andrologie','Ultraschalldiagnostik','Digitale und mobile Röntgendiagnostik','Ernährungsberatung','Betreuung geriatrischer Patienten','Check-ups','Allgemeine Medizin','Biologische Tiermedizin','Eigenes Inhouse-Labor','Endoskopie'];
const galleryTitles=['Augenuntersuchung beim Hund','Ein kleiner Patient','Untersuchung beim Pferd','Unsere Pferdepatienten','Zahnbehandlung beim Pferd','Kerstin van Dillen mit Pferden','Ein neugieriger Patient','Ein Blick in die Pferdemedizin','Florian Koston mit einem Greifvogel'];
export const initialImages:Media[]=[
 ...team.filter(p=>p.name!=='Ida Reintjes').map((p,i)=>({id:`team-${i}`,source:p.photo,title:p.name,alt:`${p.name} – ${p.role}`,category:'Team',person:p.name,position:i})),
 ...galleryTitles.map((title,i)=>({id:`praxis-${i}`,source:`/images/page3-photo${i}.jpg`,title,alt:title,category:'Praxis',person:'',position:i+10})),
 ...['Unser Team am Empfang','Willkommen in unserer Praxis'].map((title,i)=>({id:`empfang-${i}`,source:`/images/page4-photo${i}.jpg`,title,alt:title,category:'Praxis',person:'',position:7+i})),
 {id:'hero-original',source:'/images/page0-photo1.jpg',title:'Für kleine Pfoten',alt:'Ein Hund ruht entspannt mit dem Kopf auf seinen Pfoten.',category:'Startbild',person:'',position:30},
 {id:'horse-original',source:'/images/page0-photo0.jpg',title:'Für große Freunde',alt:'Ein Pferd schaut über seine Stalltür.',category:'Pferde',person:'',position:31},
 {id:'building-original',source:'/images/page0-photo2.jpg',title:'Unsere Praxis am Bremerweg',alt:'Außenansicht der Tierarztpraxis am Bremerweg 61.',category:'Gebäude',person:'',position:32},
 ...[0,3,4,5].map((i)=>({id:`patient-${i}`,source:`/images/page2-photo${i}.jpg`,title:'Einblicke in die Tiermedizin',alt:i===5?'Ein Vogel wird in die Freiheit entlassen.':'Einblicke in die Pferdemedizin.',category:'Patienten',person:'',position:i+40})),
].map(x=>({...x,storage_key:null,published:1,content_type:'image/jpeg',created_at:stamp}));
export function mediaUrl(image:Media){return image.storage_key?`/media/${image.id}`:image.source;}
export function dateLabel(date:string){if(!date)return 'Ohne Datumsangabe';if(date.length===4)return date;return new Intl.DateTimeFormat('de-DE',{month:'long',year:'numeric',...(date.length===10?{day:'numeric' as const}:{})}).format(new Date(`${date.length===7?date+'-01':date}T12:00:00`));}

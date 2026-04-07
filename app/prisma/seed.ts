import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');
  
  // Appoinment Types
  const appointmentTypes = [
    { name: 'Allgemeine Untersuchung', durationMin: 30 },
    { name: 'Impfung', durationMin: 15 },
    { name: 'Chirurgie / Vorgespräch', durationMin: 45 },
    { name: 'Zahnbehandlung', durationMin: 60 },
    { name: 'Lahmheitsdiagnostik', durationMin: 45 },
    { name: 'Ultraschall', durationMin: 30 },
  ];

  for (const t of appointmentTypes) {
    await prisma.appointmentType.create({
      data: t
    });
  }

  // Availability Rules (Mon-Fri 09:00 - 18:00)
  for (let i = 1; i <= 5; i++) {
    await prisma.availabilityRule.create({
      data: {
        dayOfWeek: i,
        startTime: '09:00',
        endTime: '18:00',
      }
    });
  }

  // Educations
  const educations = [
    { title: 'Dentalchirurgische Techniken bei Hund und Katze', date: '01/2025', doctor: 'Florian Koston', category: 'Chirurgie' },
    { title: 'General Practitioner Certificate in Small Animal Surgery', date: '08/2020 - 01/2023', doctor: 'Florian Koston', category: 'Chirurgie' },
    
    // Kerstin van Dillen - Zahnheilkunde
    { date: '2016', title: 'Mehrtägige Praktika bei einem IGFP geprüften Mitglied', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '02/2017', title: 'IGFP Workshop: Zahnbehandlung von Pferden und die passende Sedation (Selters-Eisenbach)', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '06/2018', title: 'IGFP Workshop: Extraktion Workshop-Segmentieren von Backenzähnen (Großwallstadt)', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '03/2019', title: 'IGFP Workshop: Zahnbehandlung von alten Pferden (Schmallenberg)', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '06/2020', title: 'IGFP (online): Zahnbehandlung von alten Pferden', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '07/2020', title: 'IGFP (online): Röntgen 1 - Schneidezähne, Hengstzähne', doctor: 'Kerstin van Dillen', category: 'Radiologie' },
    { date: '08/2020', title: 'IGFP (online): Röntgen 2 - Backenzähne', doctor: 'Kerstin van Dillen', category: 'Radiologie' },
    { date: '09/2020', title: 'IGFP (online): Röntgen 3 - Sinuserkrankungen, Veränderungen und Frakturen im Kopfbereich', doctor: 'Kerstin van Dillen', category: 'Radiologie' },
    { date: '02/2021', title: 'IGFP (online): Backenzahnextraktionen beim Pferd & potentielle Komplikationen', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '05/2021', title: 'IGFP (online): EOTRH - Zellen außer Rand und Band', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '07/2021', title: 'IGFP (online): Kiefergelenk und Zungenbein: Anatomie und Biomechanik', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '07/2021', title: 'IGFP (online): Kopfnervenausfälle beim Pferd', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '09/2021', title: 'IGFP (online): Indikationen für endodontische Behandlungen', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '02/2022', title: 'IGFP (online): EOTRH', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '09/2022', title: 'Horse-Dental-School (Bensheim): Kurs 1', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '11/2022', title: 'Horse-Dental-School (Koblenz): Praktischer Workshop EOTRH', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '02/2023', title: 'Praktischer Workshop: Balance im Pferdemaul (Holger Rosenberg, Westerwald)', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { date: '02/2023', title: 'Anatomischer Samstag mit Prof.Dr. Carsten Staszyk (JLU Giessen)', doctor: 'Kerstin van Dillen', category: 'Anatomie' },
    { date: '09/2023', title: 'Horse-Dental-School (Bensheim): Kurs 2', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },

    // Kerstin van Dillen - Biologische Tiermedizin
    { date: '04/2016', title: 'Homotoxilogie/Bioregulatorische Tiermedizin Kurs B (Kassel)', doctor: 'Kerstin van Dillen', category: 'Biologische Tiermedizin' },
    { date: '10/2016', title: 'Homotoxilogie/Bioregulatorische Tiermedizin Kurs C (Bühl)', doctor: 'Kerstin van Dillen', category: 'Biologische Tiermedizin' },
    { date: '04/2017', title: 'Homotoxilogie/Bioregulatorische Tiermedizin Kurs D (Kassel)', doctor: 'Kerstin van Dillen', category: 'Biologische Tiermedizin' },
    { date: '10/2017', title: 'Homotoxilogie/Bioregulatorische Tiermedizin Kurs A (Wetzlar)', doctor: 'Kerstin van Dillen', category: 'Biologische Tiermedizin' },
    { date: '01/2018', title: 'Organotherapie A (Giessen)', doctor: 'Kerstin van Dillen', category: 'Biologische Tiermedizin' },
    { date: '01/2019', title: 'Organotherapie B (Giessen)', doctor: 'Kerstin van Dillen', category: 'Biologische Tiermedizin' },
  ];

  for (const ed of educations) {
    await prisma.education.create({
      data: ed
    });
  }

  // Gallery
  const gallery = [
    { 
      url: 'https://tierarztinemmerich.de/.cm4all/uproc.php/0/.WhatsApp%20Bild%202025-12-05%20um%2014.53.25_6c35e697.jpg/picture-1600?_=19aeecc33c7', 
      description: 'Handgefertigte Gebisse und moderne Ausstattung' 
    }
  ];

  for (const img of gallery) {
    await prisma.galleryImage.create({
      data: img
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing detailed Fortbildungen for Kerstin van Dillen...');

  const educations = [
    // Zahnheilkunde
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

    // Biologische Tiermedizin
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

  console.log('Successfully imported all detailed records.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

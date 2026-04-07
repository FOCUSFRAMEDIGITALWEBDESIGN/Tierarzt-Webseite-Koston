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
    { title: 'Dentalchirurgische Techniken bei Hund und Katze Improve International', date: '01/2025', doctor: 'Florian Koston', category: 'Chirurgie' },
    { title: 'General Practitioner Certificate in Small Animal Surgery', date: '08/2020 - 01/2023', doctor: 'Florian Koston', category: 'Chirurgie' },
    { title: 'Ausbildung der Horse-Dental-School (Kurs 2)', date: '09/2023', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { title: 'Workshop „Balance im Pferdemaul“', date: '02/2023', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { title: 'Ausbildung der Horse-Dental-School (Kurs 1)', date: '09/2022', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { title: 'Seminare zu EOTRH', date: '02/2022 & 05/2021', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { title: 'Kiefergelenk und Zungenbein (IGFP)', date: '07/2021', doctor: 'Kerstin van Dillen', category: 'Zahnheilkunde' },
    { title: 'Div. Röntgenkurse (IGFP)', date: '07/2020 - 09/2020', doctor: 'Kerstin van Dillen', category: 'Radiologie' },
    { title: 'Organotherapie A & B', date: '2018 - 2019', doctor: 'Kerstin van Dillen', category: 'Allgemein' },
    { title: 'Homotoxilogie/Bioregulatorische Tiermedizin (Kurse A-D)', date: '2016 - 2017', doctor: 'Kerstin van Dillen', category: 'Allgemein' },
  ];

  for (const ed of educations) {
    await prisma.education.create({
      data: ed
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

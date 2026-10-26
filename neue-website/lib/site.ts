export const PUBLIC_SITE_ORIGIN = 'https://koston-van-dillen.hey1233767.chatgpt.site';

export const PRACTICE_DESCRIPTION = 'Kleintiermedizin und Pferdemedizin in Emmerich am Rhein: Tierarztpraxis Koston & van Dillen mit Vorsorge, Diagnostik und Zahnmedizin. Termine: 02822 9818244.';

export const PRACTICE_SOCIAL_LINKS = [
  { name: 'Facebook', kind: 'facebook', href: 'https://www.facebook.com/tierarztinemmerich/' },
  { name: 'Instagram', kind: 'instagram', href: 'https://www.instagram.com/tierarzt_in_emmerich/' },
] as const;

export const PRACTICE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryCare',
  '@id': `${PUBLIC_SITE_ORIGIN}/#praxis`,
  name: 'Tierarztpraxis Koston & van Dillen GbR',
  url: PUBLIC_SITE_ORIGIN,
  description: PRACTICE_DESCRIPTION,
  telephone: '+49 2822 9818244',
  email: 'info@tierarztinemmerich.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bremerweg 61',
    postalCode: '46446',
    addressLocality: 'Emmerich am Rhein',
    addressCountry: 'DE',
  },
  areaServed: { '@type': 'City', name: 'Emmerich am Rhein' },
  knowsAbout: ['Kleintiermedizin', 'Pferdemedizin', 'Zahnmedizin'],
  sameAs: PRACTICE_SOCIAL_LINKS.map(profile => profile.href),
};

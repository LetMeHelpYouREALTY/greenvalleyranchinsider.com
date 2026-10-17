/**
 * Enhanced Schema Markup for SEO, GEO, and E-E-A-T
 */

import { CONTACT_INFO, SITE_CONFIG } from '@/lib/constants';

const SITE_URL = SITE_CONFIG.url;

export const AGENT_ID = `${SITE_URL}/#agent`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const GVR_PLACE_ID = `${SITE_URL}/#green-valley-ranch-place`;

const hendersonCity = {
  '@type': 'City' as const,
  name: 'Henderson',
  addressRegion: 'NV',
  addressCountry: 'US',
  sameAs: 'https://en.wikipedia.org/wiki/Henderson,_Nevada',
};

export const greenValleyRanchPlaceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  '@id': GVR_PLACE_ID,
  name: 'Green Valley Ranch',
  description:
    'Master-planned community in Henderson, Nevada, including neighborhoods such as Mystic Bay and The Cottages.',
  containedInPlace: hendersonCity,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.0397,
    longitude: -115.0632,
  },
};

export const realEstateAgentSchema = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'LocalBusiness'],
  '@id': AGENT_ID,
  name: 'Dr. Jan Duffy',
  alternateName: 'Green Valley Ranch Insider',
  description:
    'Henderson NV real estate expert specializing in Green Valley Ranch, Mystic Bay, and The Cottages.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/dr-jan-duffy.jpg`,
  telephone: ['+1-702-500-1955', '+1-702-222-1964'],
  email: CONTACT_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    addressRegion: CONTACT_INFO.address.state,
    postalCode: CONTACT_INFO.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.0397,
    longitude: -115.0632,
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'Green Valley Ranch',
      containedInPlace: hendersonCity,
    },
    {
      '@type': 'Place',
      name: 'Mystic Bay',
      containedInPlace: {
        '@type': 'Place',
        name: 'Green Valley Ranch',
        containedInPlace: hendersonCity,
      },
    },
    {
      '@type': 'Place',
      name: 'The Cottages',
      containedInPlace: {
        '@type': 'Place',
        name: 'Green Valley Ranch',
        containedInPlace: hendersonCity,
      },
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/drjanduffy',
    'https://www.facebook.com/drjanduffy',
    'https://www.instagram.com/drjanduffy',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Real Estate License',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Nevada Real Estate Division',
    },
    name: `Nevada Real Estate License #${CONTACT_INFO.license}`,
  },
  memberOf: {
    '@type': 'Organization',
    name: CONTACT_INFO.brokerage,
    url: 'https://www.berkshirehathawayhs.com/',
  },
  knowsAbout: [
    'Green Valley Ranch Real Estate',
    'Henderson NV Homes',
    'Mystic Bay Henderson',
    'The Cottages Henderson',
    'Las Vegas Valley Real Estate',
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Dr. Jan Duffy',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/dr-jan-duffy.jpg`,
  jobTitle: 'Real Estate Agent',
  worksFor: {
    '@id': AGENT_ID,
  },
  sameAs: [
    'https://www.linkedin.com/in/drjanduffy',
    'https://www.facebook.com/drjanduffy',
    'https://www.instagram.com/drjanduffy',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Green Valley Ranch Insider',
  url: SITE_URL,
  description: 'Insider guide to Green Valley Ranch real estate in Henderson, NV',
  publisher: {
    '@id': AGENT_ID,
  },
  about: {
    '@id': GVR_PLACE_ID,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessRefSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: 'Green Valley Ranch Insider — Dr. Jan Duffy',
  url: SITE_URL,
  telephone: '+1-702-222-1964',
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.city,
    addressRegion: CONTACT_INFO.address.state,
    postalCode: CONTACT_INFO.address.zip,
    addressCountry: 'US',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: CONTACT_INFO.brokerage,
  },
  mainEntityOfPage: {
    '@id': WEBSITE_ID,
  },
};

export function locationWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/location#webpage`,
    url: `${SITE_URL}/location`,
    name: 'Office Location | Dr. Jan Duffy | Green Valley Ranch Insider',
    description:
      'Visit Dr. Jan Duffy at 360 Mike Koizumi Way, Henderson, NV 89011. Directions, hours, and contact for Green Valley Ranch real estate.',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': AGENT_ID },
  };
}

export function faqWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/faq#webpage`,
    url: `${SITE_URL}/faq`,
    name: 'Frequently Asked Questions | Green Valley Ranch Insider',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': GVR_PLACE_ID },
  };
}

export function homeWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Green Valley Ranch Henderson Home Sales | Dr. Jan Duffy',
    description:
      'Green Valley Ranch Henderson homes: Mystic Bay, The Cottages & GVR. Dr. Jan Duffy helps buyers and sellers with search, valuations, and local insight.',
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about: {
      '@id': GVR_PLACE_ID,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/og-image.jpg`,
    },
  };
}

type NeighborhoodPath = '/green-valley-ranch' | '/mystic-bay' | '/the-cottages';

export function buildNeighborhoodPageJsonLd({
  path,
  placeName,
  placeDescription,
  pageTitle,
  pageDescription,
}: {
  path: NeighborhoodPath;
  placeName: string;
  placeDescription: string;
  pageTitle: string;
  pageDescription: string;
}) {
  const placeId = `${SITE_URL}${path}#place`;
  const containedInPlace =
    path === '/green-valley-ranch'
      ? hendersonCity
      : {
          '@type': 'Place',
          '@id': GVR_PLACE_ID,
          name: 'Green Valley Ranch',
          containedInPlace: hendersonCity,
        };

  const place = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': placeId,
    name: placeName,
    description: placeDescription,
    containedInPlace,
  };

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': placeId },
    mainEntity: { '@id': placeId },
    author: { '@id': PERSON_ID },
  };

  return [place, webpage];
}

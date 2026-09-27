/**
 * Green Valley Ranch community map center and curated nearby places.
 * Map center: The District at Green Valley Ranch (community retail hub).
 * Coordinates source: Wikipedia 36°01′17″N 115°05′12″W (36.021418, -115.086749).
 */

import { SITE_CONFIG } from '@/lib/constants';

export const COMMUNITY_MAP = {
  name: 'Green Valley Ranch',
  city: 'Henderson',
  state: 'NV',
  zip: '89052',
  center: {
    lat: 36.021418,
    lng: -115.086749,
  },
  centerLabel: 'Green Valley Ranch',
  centerAddress: 'The District at Green Valley Ranch, Henderson, NV 89052',
  searchRadiusMeters: 8000,
  embedZoom: 14,
} as const;

export type AmenityCategoryId =
  | 'restaurants'
  | 'cafes'
  | 'grocery'
  | 'parks'
  | 'golf'
  | 'healthcare'
  | 'pharmacies'
  | 'shopping'
  | 'parking'
  | 'fitness'
  | 'schools';

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places API (New) primary types for searchNearby */
  placeTypes: string[];
  ariaLabel: string;
};

/** Master-planned family community — standard category order per spec */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: 'restaurants',
    label: 'Restaurants',
    placeTypes: ['restaurant'],
    ariaLabel: 'Show restaurants near Green Valley Ranch',
  },
  {
    id: 'cafes',
    label: 'Cafes',
    placeTypes: ['cafe', 'coffee_shop'],
    ariaLabel: 'Show cafes near Green Valley Ranch',
  },
  {
    id: 'grocery',
    label: 'Grocery',
    placeTypes: ['grocery_store', 'supermarket'],
    ariaLabel: 'Show grocery stores near Green Valley Ranch',
  },
  {
    id: 'parks',
    label: 'Parks',
    placeTypes: ['park'],
    ariaLabel: 'Show parks near Green Valley Ranch',
  },
  {
    id: 'golf',
    label: 'Golf',
    placeTypes: ['golf_course'],
    ariaLabel: 'Show golf courses near Green Valley Ranch',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    placeTypes: ['hospital', 'doctor'],
    ariaLabel: 'Show healthcare near Green Valley Ranch',
  },
  {
    id: 'pharmacies',
    label: 'Pharmacies',
    placeTypes: ['pharmacy', 'drugstore'],
    ariaLabel: 'Show pharmacies near Green Valley Ranch',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    placeTypes: ['shopping_mall', 'department_store'],
    ariaLabel: 'Show shopping near Green Valley Ranch',
  },
  {
    id: 'parking',
    label: 'Parking',
    placeTypes: ['parking'],
    ariaLabel: 'Show parking near Green Valley Ranch',
  },
  {
    id: 'fitness',
    label: 'Fitness',
    placeTypes: ['gym', 'fitness_center'],
    ariaLabel: 'Show fitness centers near Green Valley Ranch',
  },
  {
    id: 'schools',
    label: 'Schools',
    placeTypes: ['school', 'primary_school', 'secondary_school'],
    ariaLabel: 'Show schools near Green Valley Ranch',
  },
];

export type CuratedPlace = {
  name: string;
  address: string;
  category: AmenityCategoryId;
  schemaType: string;
  note?: string;
};

/** Verified places for static HTML, fallback list, and ItemList schema */
export const CURATED_NEARBY_PLACES: CuratedPlace[] = [
  {
    name: 'The District at Green Valley Ranch',
    address: '2240 Village Walk Dr, Henderson, NV 89052',
    category: 'shopping',
    schemaType: 'ShoppingCenter',
    note: 'Open-air shopping, dining, and entertainment in the heart of Green Valley Ranch.',
  },
  {
    name: 'Green Valley Ranch Resort, Spa and Casino',
    address: '2300 Paseo Verde Pkwy, Henderson, NV 89074',
    category: 'shopping',
    schemaType: 'Resort',
    note: 'Resort with dining, spa, and entertainment options for residents.',
  },
  {
    name: 'Henderson Multigenerational Center',
    address: '250 S Green Valley Pkwy, Henderson, NV 89012',
    category: 'parks',
    schemaType: 'SportsActivityLocation',
    note: 'City recreation center with pools, fitness, and community programs.',
  },
  {
    name: 'St. Rose Dominican Hospital, Siena Campus',
    address: '3001 St Rose Pkwy, Henderson, NV 89052',
    category: 'healthcare',
    schemaType: 'Hospital',
  },
  {
    name: 'Coronado High School',
    address: '1001 Coronado Center Dr, Henderson, NV 89052',
    category: 'schools',
    schemaType: 'School',
  },
  {
    name: 'Neil C. Twitchell Elementary School',
    address: '3925 E Patrick Ln, Henderson, NV 89014',
    category: 'schools',
    schemaType: 'School',
  },
  {
    name: 'Bob Miller Middle School',
    address: '2400 Cozy Hill St, Henderson, NV 89014',
    category: 'schools',
    schemaType: 'School',
  },
  {
    name: 'DragonRidge Country Club',
    address: '552 S Stephanie St, Henderson, NV 89012',
    category: 'golf',
    schemaType: 'GolfCourse',
  },
  {
    name: 'Greenspun Junior High School',
    address: '1000 N Green Valley Pkwy, Henderson, NV 89074',
    category: 'schools',
    schemaType: 'School',
  },
];

export const AMENITIES_PAGE_FAQ = [
  {
    question: 'What grocery stores are near Green Valley Ranch?',
    answer:
      'Residents typically shop at grocery stores along Green Valley Parkway and Horizon Ridge Parkway, including major chains within a short drive of The District at Green Valley Ranch.',
  },
  {
    question: 'How far is Green Valley Ranch from the Las Vegas Strip?',
    answer:
      'The Las Vegas Strip is approximately 17 miles northwest of Green Valley Ranch, often about 25–35 minutes by car depending on traffic and your starting neighborhood.',
  },
  {
    question: 'Are there hospitals near Green Valley Ranch?',
    answer:
      'Yes. St. Rose Dominican Hospital, Siena Campus on St Rose Parkway serves the Green Valley area, with additional medical offices and urgent care options nearby.',
  },
  {
    question: 'What schools serve Green Valley Ranch?',
    answer:
      'Green Valley Ranch is in the Clark County School District; area schools include Neil C. Twitchell Elementary, Bob Miller Middle School, Coronado High School, and Greenspun Junior High—verify attendance zones for your address.',
  },
  {
    question: 'How far is Harry Reid International Airport from Green Valley Ranch?',
    answer:
      'Harry Reid International Airport is approximately 10–12 miles from Green Valley Ranch, typically about 20–30 minutes by car in normal traffic.',
  },
  {
    question: 'Where do people shop and dine in Green Valley Ranch?',
    answer:
      'The District at Green Valley Ranch is the primary walkable shopping and dining destination, with additional restaurants and services along Green Valley Parkway.',
  },
  {
    question: 'Is there golf near Green Valley Ranch?',
    answer:
      'Yes. DragonRidge Country Club and the course at Green Valley Ranch Resort are among the golf options in and around the Green Valley area.',
  },
  {
    question: 'How do I get downtown Summerlin or Downtown Henderson from Green Valley Ranch?',
    answer:
      'Downtown Henderson is roughly 6 miles east via I-215; Downtown Summerlin is approximately 15–20 miles northwest via I-215 and the 215 belt—drive times vary with traffic.',
  },
];

export function getMapEmbedUrl(): string {
  const { lat, lng } = COMMUNITY_MAP.center;
  return `https://www.google.com/maps?q=${lat},${lng}&z=${COMMUNITY_MAP.embedZoom}&output=embed`;
}

export function getDirectionsUrl(placeName: string, address: string): string {
  const query = encodeURIComponent(`${placeName}, ${address}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export function getPlaceDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function buildAmenitiesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Nearby amenities in ${COMMUNITY_MAP.name}, ${COMMUNITY_MAP.city}`,
    itemListElement: CURATED_NEARBY_PLACES.map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': place.schemaType,
        name: place.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: place.address.split(',')[0]?.trim(),
          addressLocality: COMMUNITY_MAP.city,
          addressRegion: COMMUNITY_MAP.state,
          addressCountry: 'US',
        },
      },
    })),
  };
}

export function buildCommunityPlaceSchema() {
  return {
    '@type': 'Place',
    name: COMMUNITY_MAP.name,
    description: `Master-planned community in ${COMMUNITY_MAP.city}, Nevada`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMMUNITY_MAP.center.lat,
      longitude: COMMUNITY_MAP.center.lng,
    },
    containedInPlace: {
      '@type': 'City',
      name: COMMUNITY_MAP.city,
      addressRegion: COMMUNITY_MAP.state,
    },
  };
}

export const AMENITIES_PAGE_URL = `${SITE_CONFIG.url}/amenities`;

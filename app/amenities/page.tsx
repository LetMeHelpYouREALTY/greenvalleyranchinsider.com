import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BreadcrumbStructuredData } from '@/components/BreadcrumbStructuredData';
import { AmenityMap } from '@/components/amenity-map/AmenityMap';
import { WhyChooseReasons } from '@/components/WhyChooseReasons';
import {
  AMENITIES_PAGE_FAQ,
  AMENITIES_PAGE_URL,
  COMMUNITY_MAP,
  CURATED_NEARBY_PLACES,
  buildAmenitiesItemListSchema,
  buildCommunityPlaceSchema,
} from '@/lib/community-amenities';
import { CONTACT_INFO } from '@/lib/constants';
import { generateFAQSchema } from '@/lib/seo';
import { localBusinessSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `Nearby Amenities in ${COMMUNITY_MAP.name}, Henderson NV`,
  description:
    'Interactive map and local guide to restaurants, parks, golf, healthcare, shopping, and schools near Green Valley Ranch in Henderson, Nevada.',
  keywords: [
    'Green Valley Ranch amenities',
    'restaurants near Green Valley Ranch',
    'Henderson NV shopping',
    'schools Green Valley Ranch',
    'The District Green Valley Ranch',
    'things to do Henderson',
  ],
  alternates: {
    canonical: AMENITIES_PAGE_URL,
  },
  openGraph: {
    title: `Nearby Amenities in ${COMMUNITY_MAP.name}, Henderson NV`,
    description:
      'Explore dining, recreation, healthcare, and shopping around Green Valley Ranch with an interactive map and hyperlocal guide.',
    type: 'website',
    url: AMENITIES_PAGE_URL,
  },
};

const categorySections = [
  {
    id: 'dining',
    title: 'Dining & Cafes',
    body: `The District at Green Valley Ranch is the main dining and nightlife hub for ${COMMUNITY_MAP.name}, with national chains and local favorites along Village Walk Drive. Additional restaurants line Green Valley Parkway and Horizon Ridge Parkway within a few minutes of most GVR neighborhoods.`,
  },
  {
    id: 'parks',
    title: 'Parks & Recreation',
    body: `Parks and trails are woven through the master-planned community. The Henderson Multigenerational Center on South Green Valley Parkway offers pools, fitness, and community programs. Neighborhood parks and walking paths are common throughout Mystic Bay, The Cottages, and surrounding villages.`,
  },
  {
    id: 'golf',
    title: 'Golf',
    body: `Golf is a major draw in the Green Valley area. DragonRidge Country Club sits just south of the community, and Green Valley Ranch Resort includes course access and resort amenities for members and guests.`,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    body: `St. Rose Dominican Hospital, Siena Campus on St Rose Parkway provides hospital care minutes from Green Valley Ranch. Urgent care, primary care, and specialty offices cluster along St Rose Parkway and Eastern Avenue.`,
  },
  {
    id: 'shopping',
    title: 'Shopping',
    body: `Beyond The District, residents shop at grocery and retail centers along Green Valley Parkway and Horizon Ridge. Big-box stores, services, and everyday errands are typically within a 5–10 minute drive.`,
  },
  {
    id: 'schools',
    title: 'Schools',
    body: `${COMMUNITY_MAP.name} is served by the Clark County School District. Area schools frequently referenced by families include Neil C. Twitchell Elementary, Bob Miller Middle School, Greenspun Junior High, and Coronado High School—confirm your assigned zone with the district for your exact address.`,
  },
  {
    id: 'commute',
    title: 'Commute & Key Destinations',
    body: `I-215 and I-15 provide freeway access from Green Valley Ranch. Approximate drives (traffic-dependent): Las Vegas Strip ~17 miles; Harry Reid International Airport ~10–12 miles; Downtown Henderson ~6 miles east; Downtown Summerlin ~15–20 miles northwest via the 215 belt.`,
  },
];

export default function AmenitiesPage() {
  const faqSchema = generateFAQSchema(AMENITIES_PAGE_FAQ);
  const itemListSchema = buildAmenitiesItemListSchema();

  const agentSchema = {
    ...localBusinessSchema,
    areaServed: [
      ...(Array.isArray(localBusinessSchema.areaServed) ? localBusinessSchema.areaServed : []),
      {
        '@type': 'Place',
        name: COMMUNITY_MAP.name,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: COMMUNITY_MAP.center.lat,
          longitude: COMMUNITY_MAP.center.lng,
        },
      },
    ],
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Nearby Amenities', href: '/amenities' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <section className="relative bg-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ name: 'Nearby Amenities', href: '/amenities' }]} />
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-[#C5A059]" aria-hidden="true" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Nearby Amenities in {COMMUNITY_MAP.name}, Henderson
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
            Interactive map and local guide to dining, recreation, healthcare, shopping, and schools
            around {COMMUNITY_MAP.name} (zip {COMMUNITY_MAP.zip}).
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Interactive amenity map</h2>
          <p className="text-slate-600 mb-8">
            Use the category filters to explore places near the center of {COMMUNITY_MAP.name} (mapped
            at The District). Map data loads when you scroll here; without a Google Maps API key, a
            static map and curated list still display.
          </p>
          <AmenityMap showCuratedList />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-8 text-center">
            Living in {COMMUNITY_MAP.name}
          </h2>
          {categorySections.map((section) => (
            <div key={section.id} className="mb-8">
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">{section.title}</h3>
              <p className="text-slate-700 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="amenities-faq">
        <div className="max-w-4xl mx-auto">
          <h2 id="amenities-faq" className="text-3xl font-bold text-[#0F172A] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {AMENITIES_PAGE_FAQ.map((faq) => (
              <div key={faq.question} className="border-b border-slate-200 pb-6">
                <dt className="text-lg font-semibold text-[#0F172A] mb-2">{faq.question}</dt>
                <dd className="text-slate-700 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Your {COMMUNITY_MAP.name} real estate expert
          </h2>
          <p className="text-slate-300 mb-6">
            {CONTACT_INFO.name} helps buyers and sellers in Mystic Bay, The Cottages, and all of{' '}
            {COMMUNITY_MAP.name}. {CONTACT_INFO.brokerage}. Nevada License #{CONTACT_INFO.license}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.marketingPhoneLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A059] text-[#0F172A] rounded-lg font-semibold hover:bg-[#B8914F] transition-colors"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call {CONTACT_INFO.marketingPhone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#C5A059] text-[#C5A059] rounded-lg font-semibold hover:bg-[#C5A059]/10 transition-colors"
            >
              Contact Dr. Duffy
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            {CONTACT_INFO.address.full} ·{' '}
            <a href={CONTACT_INFO.emailLink} className="text-[#C5A059] hover:underline">
              {CONTACT_INFO.email}
            </a>
          </p>
        </div>
      </section>

      <WhyChooseReasons variant="condensed" showCTA={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [buildCommunityPlaceSchema(), agentSchema],
          }),
        }}
      />

      {/* Server-rendered place names for crawlers */}
      <section className="sr-only" aria-hidden="true">
        <h2>Featured places near {COMMUNITY_MAP.name}</h2>
        <ul>
          {CURATED_NEARBY_PLACES.map((p) => (
            <li key={p.name}>{p.name}, {p.address}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

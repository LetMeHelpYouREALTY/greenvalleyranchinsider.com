import type { Metadata } from 'next';
import { Home, Users, Heart, MapPin, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RealScoutOfficeListings } from '@/components/RealScoutOfficeListings';
import { WhyChooseReasons } from '@/components/WhyChooseReasons';
import { NeighborhoodAtAGlance } from '@/components/NeighborhoodAtAGlance';
import { NeighborhoodPageJsonLd } from '@/components/NeighborhoodPageJsonLd';
import { mysticBayLeadAnswers } from '@/lib/neighborhood-aeo';

const PAGE_PATH = '/mystic-bay';
const PAGE_TITLE = 'Mystic Bay Henderson NV | Green Valley Ranch | Dr. Jan Duffy';
const PAGE_DESCRIPTION =
  'Mystic Bay is a gated Green Valley Ranch subdivision in Henderson, NV with Mediterranean-style homes. Neighborhood guide and real estate from Dr. Jan Duffy.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'Mystic Bay Henderson NV',
    'Mystic Bay neighborhood',
    'Henderson Nevada neighborhoods',
    'Green Valley Ranch',
    'Mystic Bay homes for sale',
  ],
  alternates: {
    canonical: 'https://www.greenvalleyranchinsider.com/mystic-bay',
  },
  openGraph: {
    title: 'Mystic Bay Henderson NV | Neighborhood Spotlight',
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: 'https://www.greenvalleyranchinsider.com/mystic-bay',
  },
};

export default function MysticBayPage() {
  // Data from Nextdoor.com/neighborhood/mysticbaynv--henderson--nv/
  const neighborhoodData = {
    name: 'Mystic Bay',
    city: 'Henderson',
    state: 'NV',
    description:
      'Mystic Bay is a gated subdivision within the Green Valley Ranch master-planned community in Henderson, NV. Developed with American Nevada Corporation and regional builders, Mystic Bay features larger Mediterranean-style homes, often above 2,500 sq. ft., with access to Green Valley Ranch amenities and The District.',
    highlights: [
      { label: 'Setting', value: 'Gated subdivision' },
      { label: 'Home style', value: 'Mediterranean-style, larger floor plans' },
      { label: 'Location', value: 'Green Valley Ranch, Henderson, NV' },
      { label: 'ZIP code', value: '89052 (typical for GVR)' },
    ],
    topInterests: [
      'Dogs',
      'Hiking & Trails',
      'Home Improvement & DIY',
      'Volunteering',
      'Walking',
      'Bob Miller Middle School',
      'Books',
      'Cards & Board Games',
      'Gardening & Landscape',
      'Travel',
    ],
    topReasons: [
      'Beautiful',
      'Clean',
      'Community',
      'Dog Friendly',
      'Peaceful',
      'Proximity',
      'Quiet',
      'Walking',
    ],
    location: 'North-east of Silverado Ranch and south-west of Green Valley South',
    nearbyNeighborhoods: [
      'Green Valley South',
      'Silverado Ranch',
      'The Cottages',
      'Green Valley Estates',
      'Carriage Club',
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NeighborhoodPageJsonLd
        path={PAGE_PATH}
        placeName="Mystic Bay"
        placeDescription={PAGE_DESCRIPTION}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
      />
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { name: 'Green Valley Ranch', href: '/green-valley-ranch' },
            { name: 'Mystic Bay', href: '/mystic-bay' }
          ]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Home className="w-8 h-8 text-[#C5A059]" />
            <TrendingUp className="w-8 h-8 text-[#C5A059]" />
            <Shield className="w-8 h-8 text-[#C5A059]" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#C5A059]">Mystic Bay</span><br />
            Henderson, Nevada
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            {neighborhoodData.description}
          </p>

          <div className="mt-10">
            <Link
              href="/#valuation-form"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-[#C5A059] text-[#0F172A] rounded-lg hover:bg-[#B8914F] transition-colors shadow-lg hover:shadow-xl"
            >
              Get Your Home Valuation
            </Link>
          </div>
        </div>
      </section>

      <NeighborhoodAtAGlance heading="Mystic Bay at a glance" items={mysticBayLeadAnswers} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">Neighborhood highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoodData.highlights.map((item) => (
              <div
                key={item.label}
                className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl p-6 text-white border border-slate-700"
              >
                <p className="text-[#C5A059] text-sm font-semibold mb-2">{item.label}</p>
                <p className="text-lg font-bold leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Residents Love Mystic Bay */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">
            Why Residents Love Mystic Bay
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {neighborhoodData.topReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Heart className="w-6 h-6 text-[#C5A059] mx-auto mb-2" />
                <p className="font-semibold text-[#0F172A]">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Interests */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">
            Popular Activities & Interests
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {neighborhoodData.topInterests.map((interest, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-4 border border-slate-200 text-center hover:border-[#C5A059] transition-colors"
              >
                <p className="text-slate-700 font-medium">{interest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Nearby */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Details */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#C5A059]" />
                Location & Builder Information
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {neighborhoodData.location}
              </p>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-[#0F172A] mb-3">Community Details:</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <div>
                      <strong>Gated Subdivision:</strong> Within Green Valley Ranch master-planned community
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <div>
                      <strong>Primary Developer:</strong> American Nevada Corporation (master developer of Green Valley Ranch)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <div>
                      <strong>Home Builders:</strong> High-end regional builders in partnership with American Nevada Corporation
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <div>
                      <strong>Home Size:</strong> Typically over 2,500 sq. ft.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <div>
                      <strong>Architectural Style:</strong> Custom, Mediterranean feel
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-[#0F172A] mb-3">Nearby Neighborhoods:</h3>
                <ul className="space-y-2">
                  {neighborhoodData.nearbyNeighborhoods.map((neighborhood, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-600">
                      <span className="text-[#C5A059]">•</span>
                      {neighborhood}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Walkability & Community Features */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                Community Features
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#C5A059] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">Walkable Neighborhood</p>
                    <p className="text-slate-600 text-sm">Mystic Bay is considered a walkable neighborhood by residents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-[#C5A059] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">Well-Maintained Homes</p>
                    <p className="text-slate-600 text-sm">Known for beautiful, well-kept properties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#C5A059] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">Friendly Community</p>
                    <p className="text-slate-600 text-sm">Active neighborhood with strong community bonds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#C5A059] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">Easy Access to Amenities</p>
                    <p className="text-slate-600 text-sm">Close to shopping, dining, and recreational facilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Interested in Mystic Bay?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get your custom home valuation or learn more about available properties in this desirable neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#valuation-form"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-[#C5A059] text-[#0F172A] rounded-lg hover:bg-[#B8914F] transition-colors shadow-lg"
            >
              Get Your Home Valuation
            </Link>
            <Link
              href="/location"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-[#C5A059] text-[#C5A059] rounded-lg hover:bg-[#C5A059]/10 transition-colors"
            >
              Visit Our Office
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Dr. Jan Duffy - Condensed */}
      <WhyChooseReasons variant="condensed" showCTA={true} />

      {/* Office Listings Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              Featured Listings
            </h2>
            <p className="text-lg text-slate-600">
              Explore available properties in Henderson and Las Vegas
            </p>
          </div>
          <RealScoutOfficeListings />
        </div>
      </section>

      {/* Related Communities */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Explore More of Green Valley Ranch</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/green-valley-ranch"
                className="px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-[#1e293b] transition-colors text-sm font-semibold"
              >
                Green Valley Ranch Guide
              </Link>
              <Link
                href="/the-cottages"
                className="px-4 py-2 bg-slate-200 text-[#0F172A] rounded-lg hover:bg-slate-300 transition-colors text-sm font-semibold"
              >
                The Cottages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Source Attribution */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-500">
          <p>
            Neighborhood data sourced from{' '}
            <a
              href="https://nextdoor.com/neighborhood/mysticbaynv--henderson--nv/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] hover:underline"
            >
              Nextdoor.com
            </a>
            {' '}and US Census Data
          </p>
        </div>
      </section>
    </main>
  );
}

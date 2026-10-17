import type { Metadata } from 'next';
import { GraduationCap, Book, Users, MapPin, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Link from 'next/link';
import { RealScoutOfficeListings } from '@/components/RealScoutOfficeListings';
import { WhyChooseReasons } from '@/components/WhyChooseReasons';
import { GuidePageJsonLd } from '@/components/GuidePageJsonLd';
import { NeighborhoodAtAGlance } from '@/components/NeighborhoodAtAGlance';
import { schoolsLeadAnswers } from '@/lib/guide-aeo';
import { jsonLdStringify } from '@/lib/json-ld';
import { schoolsItemListSchema } from '@/lib/schema';

const PAGE_PATH = '/schools';
const PAGE_TITLE = 'Schools Near Green Valley Ranch | Henderson NV | Dr. Jan Duffy';
const PAGE_DESCRIPTION =
  'Clark County School District schools serving Green Valley Ranch, Mystic Bay, and The Cottages. Verify attendance zones with CCSD — guide by Dr. Jan Duffy.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'Green Valley Ranch schools',
    'Henderson schools',
    'Vanderburg Elementary',
    'Glen Taylor Elementary',
    'Coronado High School',
    'CCSD Green Valley Ranch',
    '89052 schools',
  ],
  alternates: {
    canonical: `https://www.greenvalleyranchinsider.com${PAGE_PATH}`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: `https://www.greenvalleyranchinsider.com${PAGE_PATH}`,
  },
};

const schools = [
  {
    level: 'Elementary',
    name: 'Vanderburg Elementary School',
    description:
      'CCSD elementary school serving portions of the Green Valley Ranch area. Confirm current attendance boundaries on the district website.',
    features: ['CCSD elementary programs', 'On-site staff and support', 'District extracurricular options'],
    distance: 'Green Valley Ranch area',
  },
  {
    level: 'Elementary',
    name: 'Glen Taylor Elementary School',
    description:
      'CCSD elementary school near Green Valley Ranch. Enrollment and boundaries are assigned by address — verify with CCSD.',
    features: ['CCSD curriculum', 'Student services', 'Community programs'],
    distance: 'Near Green Valley Ranch',
  },
  {
    level: 'Elementary',
    name: 'Neil C. Twitchell Elementary',
    description:
      'CCSD elementary school within the Green Valley Ranch master-planned area for many addresses.',
    features: ['On-community access for many residents', 'CCSD programs', 'Parent resources via CCSD'],
    distance: 'Within Green Valley Ranch',
  },
  {
    level: 'Middle',
    name: 'Bob Miller Middle School',
    description:
      'CCSD middle school serving many Green Valley Ranch students. Check CCSD zoning for your specific street address.',
    features: ['Middle school curriculum', 'Athletics and activities', 'CCSD college prep pathways'],
    distance: 'Serves Green Valley Ranch',
  },
  {
    level: 'High',
    name: 'Coronado High School',
    description:
      'CCSD high school serving Henderson including Green Valley Ranch. Review AP, athletics, and programs on the school and district sites.',
    features: ['AP and honors options', 'Athletics', 'College counseling via CCSD'],
    distance: 'Serves Green Valley Ranch',
  },
];

const schoolDistrict = {
  name: 'Clark County School District',
  description:
    'Green Valley Ranch is served by Clark County School District (CCSD). Attendance zones and enrollment change — confirm assignments on ccsd.net before making a purchase decision.',
  website: 'https://www.ccsd.net',
};

export default function SchoolsPage() {
  const itemListSchema = schoolsItemListSchema(schools);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <GuidePageJsonLd path={PAGE_PATH} pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(itemListSchema) }}
      />
      <section className="relative bg-[#0F172A] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ name: 'Schools', href: '/schools' }]} />
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-[#C5A059]" />
              <Book className="w-8 h-8 text-[#C5A059]" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">School Information</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              CCSD schools serving Green Valley Ranch, Mystic Bay, and The Cottages — verify zones with the
              district
            </p>
          </div>
        </div>
      </section>

      <NeighborhoodAtAGlance heading="Schools near GVR at a glance" items={schoolsLeadAnswers} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Schools and Green Valley Ranch addresses</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Public school assignments in Nevada depend on your street address and current Clark County School
            District boundaries. This page lists schools buyers and sellers often research for Green Valley
            Ranch — it is not a rating or ranking.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Dr. Jan Duffy can discuss location and commute; always confirm enrollment with{' '}
            <a
              href={schoolDistrict.website}
              className="text-[#C5A059] font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              CCSD
            </a>{' '}
            before you rely on a school assignment in your purchase decision.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-12 text-center">
            Schools Serving Green Valley Ranch
          </h2>
          <div className="space-y-6">
            {schools.map((school) => (
              <div
                key={school.name}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#C5A059] rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-[#0F172A]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold mb-2">
                      {school.level}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{school.name}</h3>
                    <p className="text-slate-600 mb-4">{school.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{school.distance}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {school.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-xs border border-slate-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 rounded-xl p-8 text-white border border-slate-700">
            <h2 className="text-2xl font-bold mb-4">{schoolDistrict.name}</h2>
            <p className="text-slate-300 mb-4 leading-relaxed">{schoolDistrict.description}</p>
            <a
              href={schoolDistrict.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C5A059] hover:text-[#B8914F] transition-colors font-semibold"
            >
              <LinkIcon className="w-4 h-4" />
              Visit CCSD Website
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-8 text-center">Why buyers ask about schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <Users className="w-8 h-8 text-[#C5A059] mb-4" />
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Attendance zones</h3>
              <p className="text-slate-600">
                CCSD assigns schools by address. Tour neighborhoods you like, then verify the assigned schools
                for each property before you write an offer.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <TrendingUp className="w-8 h-8 text-[#C5A059] mb-4" />
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Location planning</h3>
              <p className="text-slate-600">
                Commute time, activities, and daily logistics matter alongside home features. Dr. Jan Duffy can
                help you compare Green Valley Ranch neighborhoods on those practical factors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseReasons variant="condensed" showCTA={true} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">Featured Listings</h2>
            <p className="text-lg text-slate-600">Explore available properties in Henderson and Las Vegas</p>
          </div>
          <RealScoutOfficeListings />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Find a home near your preferred schools</h2>
          <p className="text-xl text-slate-300 mb-8">
            Dr. Jan Duffy can help you search Green Valley Ranch by address, layout, and location — then verify
            school assignments with CCSD.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C5A059] text-[#0F172A] rounded-lg font-semibold hover:bg-[#B8914F] transition-colors shadow-lg"
            >
              Contact Dr. Jan Duffy
            </Link>
            <Link
              href="/buyers-guide"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#C5A059] text-[#C5A059] rounded-lg font-semibold hover:bg-[#C5A059]/10 transition-colors"
            >
              View Buyer&apos;s Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

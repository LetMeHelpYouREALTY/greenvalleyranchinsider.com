import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Link from 'next/link';
import { RealScoutOfficeListings } from '@/components/RealScoutOfficeListings';
import { WhyChooseReasons } from '@/components/WhyChooseReasons';
import { jsonLdStringify } from '@/lib/json-ld';
import { faqPageFaqs } from '@/lib/faq-content';
import { generateFAQSchema } from '@/lib/seo';
import { faqWebPageSchema } from '@/lib/schema';

const FAQ_URL = 'https://www.greenvalleyranchinsider.com/faq';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Green Valley Ranch Insider',
  description:
    'Answers about buying and selling in Green Valley Ranch, Mystic Bay, and The Cottages. Home valuations, HOA communities, and working with Dr. Jan Duffy in Henderson, NV.',
  keywords: [
    'Green Valley Ranch FAQ',
    'Henderson real estate questions',
    'selling home FAQ',
    'home valuation questions',
  ],
  alternates: {
    canonical: FAQ_URL,
  },
  openGraph: {
    title: 'Frequently Asked Questions | Green Valley Ranch Insider',
    description:
      'Answers about buying and selling in Green Valley Ranch, Mystic Bay, and The Cottages with Dr. Jan Duffy.',
    type: 'website',
    url: FAQ_URL,
    images: [
      {
        url: 'https://www.greenvalleyranchinsider.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green Valley Ranch Insider FAQ',
      },
    ],
  },
};

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqPageFaqs, { pageUrl: FAQ_URL });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqWebPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(faqSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ name: 'FAQ', href: '/faq' }]} />
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-[#C5A059]" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Common questions about buying and selling in Green Valley Ranch
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqPageFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-bold text-[#0F172A] mb-3 flex items-start gap-3">
                  <span className="text-[#C5A059] flex-shrink-0 mt-1">Q{index + 1}.</span>
                  <span>{faq.question}</span>
                </h2>
                <p className="text-slate-700 leading-relaxed pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseReasons variant="condensed" showCTA={true} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Still Have Questions?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Contact Dr. Jan Duffy for answers about your Green Valley Ranch property
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-[#C5A059] text-[#0F172A] rounded-lg hover:bg-[#B8914F] transition-colors shadow-lg"
            >
              Contact Us
            </Link>
            <a
              href="tel:+17025001955"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-[#C5A059] text-[#C5A059] rounded-lg hover:bg-[#C5A059]/10 transition-colors"
            >
              Call (702) 500-1955
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

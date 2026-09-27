import Link from 'next/link';
import { homePageFaqs } from '@/lib/faq-content';
import { generateFAQSchema } from '@/lib/seo';

export function HomePageFaq() {
  const faqSchema = generateFAQSchema(homePageFaqs);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="home-faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 id="home-faq-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            Green Valley Ranch FAQ
          </h2>
          <p className="text-lg text-slate-600">
            Quick answers about buying, selling, and living in Green Valley Ranch, Henderson
          </p>
        </div>
        <div className="space-y-6">
          {homePageFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200"
            >
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{faq.question}</h3>
              <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-slate-600">
          <Link href="/faq" className="text-[#C5A059] font-semibold hover:underline">
            View more frequently asked questions →
          </Link>
        </p>
      </div>
    </section>
  );
}

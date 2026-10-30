import Link from 'next/link';

/**
 * Extractable lead answers for AEO — direct responses under H2/H3 (visible + quotable).
 */
export function HomeLeadAnswers() {
  return (
    <section
      className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100"
      aria-labelledby="gvr-lead-answers-heading"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="gvr-lead-answers-heading"
          className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-8 text-center"
        >
          Green Valley Ranch at a glance
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">
              Where is Green Valley Ranch?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Green Valley Ranch is a master-planned community in{' '}
              <strong>Henderson, Nevada</strong>, in the Las Vegas Valley. It includes
              neighborhoods such as{' '}
              <Link href="/mystic-bay" className="text-[#C5A059] font-semibold hover:underline">
                Mystic Bay
              </Link>{' '}
              and{' '}
              <Link href="/the-cottages" className="text-[#C5A059] font-semibold hover:underline">
                The Cottages
              </Link>
              , with ZIP code <strong>89052</strong> common for many GVR addresses.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">
              Who helps with Green Valley Ranch home sales?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              <strong>Dr. Jan Duffy</strong> assists buyers and sellers
              in Green Valley Ranch with pricing, showings, offers, and closings. Office:{' '}
              <Link href="/location" className="text-[#C5A059] font-semibold hover:underline">
                360 Mike Koizumi Way, Henderson, NV 89011
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">
              How do I search homes or get a value estimate?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Use the property search and home value tools on this site, or contact Dr. Jan Duffy
              at{' '}
              <a href="tel:+17025001955" className="text-[#C5A059] font-semibold hover:underline">
                (702) 500-1955
              </a>{' '}
              (text &quot;GVR&quot; for updates). Sellers can{' '}
              <a
                href="https://calendly.com/drjanduffy/listing-consultation?utm_source=greenvalleyranchinsider.com&utm_medium=website&utm_content=home-lead-answers"
                className="text-[#C5A059] font-semibold hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                book a listing consultation
              </a>{' '}
              online.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

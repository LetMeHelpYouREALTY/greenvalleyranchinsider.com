/**
 * Shared FAQ content for visible copy and FAQPage JSON-LD.
 * Keep answers general and accurate — no invented fees, prices, or ratings.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

/** Short FAQs for the homepage (living in / buying in Green Valley Ranch). */
export const homePageFaqs: FaqItem[] = [
  {
    question: 'Where is Green Valley Ranch located?',
    answer:
      'Green Valley Ranch is a master-planned community in Henderson, Nevada, in the Las Vegas Valley. It includes distinct neighborhoods such as Mystic Bay and The Cottages, with convenient access to shopping, parks, and major roads.',
  },
  {
    question: 'How do I search for homes in Green Valley Ranch?',
    answer:
      'Use the property search on this site to browse active listings in Henderson and Green Valley Ranch. You can also contact Dr. Jan Duffy for help narrowing neighborhoods, price range, and home features.',
  },
  {
    question: 'Do you help both buyers and sellers in Green Valley Ranch?',
    answer:
      'Yes. Dr. Jan Duffy assists buyers and sellers throughout Green Valley Ranch and nearby Henderson communities, including guidance on pricing, showings, offers, and the closing process.',
  },
  {
    question: 'How can I get a home value estimate?',
    answer:
      'Request a home valuation using the valuation tool on this site or reach out by phone or text. Estimates consider your property details and recent market activity in your area.',
  },
];

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

/** Full FAQ page — single source for visible copy and FAQPage JSON-LD on /faq */
export const faqPageFaqs: FaqItem[] = [
  {
    question: 'How do I get a home valuation for my Green Valley Ranch property?',
    answer:
      'Request a valuation on the homepage or contact page. Dr. Jan Duffy reviews your property details, recent comparable sales in your neighborhood (such as Mystic Bay or The Cottages), and current Henderson market conditions.',
  },
  {
    question: 'What makes Mystic Bay different from The Cottages?',
    answer:
      'Mystic Bay tends toward larger custom-style homes (often above 2,500 sq. ft.) in a gated setting, while The Cottages offers more compact floor plans (often roughly 1,500–1,900 sq. ft.). Both are subdivisions within Green Valley Ranch and serve different price points and layout preferences.',
  },
  {
    question: 'How long does it typically take to sell a home in Green Valley Ranch?',
    answer:
      'Days on market vary with list price, property condition, season, and overall Henderson inventory. Dr. Jan Duffy can review recent activity in your specific neighborhood when you discuss timing and pricing strategy.',
  },
  {
    question: 'What should I know about selling a home in a gated community?',
    answer:
      'Gated communities such as Mystic Bay and The Cottages often have HOA rules, access procedures, and disclosure requirements. Dr. Jan Duffy helps you prepare documentation buyers need and explains community amenities that matter in marketing.',
  },
  {
    question: 'Do you work with buyers as well as sellers?',
    answer:
      'Yes. Dr. Jan Duffy assists buyers and sellers across Green Valley Ranch, Mystic Bay, The Cottages, and nearby Henderson areas.',
  },
  {
    question: 'What are the benefits of living in Green Valley Ranch?',
    answer:
      'Green Valley Ranch offers proximity to The District shopping area, Green Valley Ranch Resort & Spa, I-215 access, parks, and recreation. Nearby public schools include Neil C. Twitchell Elementary, Bob Miller Middle School, and Coronado High School. The area is a master-planned community with multiple distinct neighborhoods.',
  },
  {
    question: 'How do you determine the right listing price for my home?',
    answer:
      'Pricing starts with comparable sales in your neighborhood, your home’s condition and upgrades, and current buyer demand in Henderson. Dr. Jan Duffy uses local Green Valley Ranch experience to recommend a list price and adjustment plan if needed.',
  },
  {
    question: 'What renovations or improvements should I consider before selling?',
    answer:
      'Recommendations depend on your home and competition nearby. Kitchen and bath updates, paint, and curb appeal often help first impressions in Green Valley Ranch. Dr. Jan Duffy can suggest improvements with the strongest return for your specific property.',
  },
];

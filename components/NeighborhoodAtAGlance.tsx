import type { LeadAnswerItem } from '@/lib/neighborhood-aeo';

type NeighborhoodAtAGlanceProps = {
  heading: string;
  items: LeadAnswerItem[];
};

/** Visible H2/H3 answers for answer engines and featured snippets. */
export function NeighborhoodAtAGlance({ heading, items }: NeighborhoodAtAGlanceProps) {
  return (
    <section
      className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100"
      aria-labelledby="neighborhood-at-a-glance"
    >
      <div className="max-w-3xl mx-auto">
        <h2 id="neighborhood-at-a-glance" className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-8 text-center">
          {heading}
        </h2>
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{item.question}</h3>
              <p className="text-slate-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

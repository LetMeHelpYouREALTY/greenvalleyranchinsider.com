import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AmenityMap } from '@/components/amenity-map/AmenityMap';
import { COMMUNITY_MAP } from '@/lib/community-amenities';

type NearbyAmenitiesSectionProps = {
  /** Section heading — defaults to "Life Near Green Valley Ranch" */
  title?: string;
  /** Show full curated list under map (false for homepage teaser) */
  showFullList?: boolean;
  className?: string;
};

export function NearbyAmenitiesSection({
  title = `Life Near ${COMMUNITY_MAP.name}`,
  showFullList = false,
  className = '',
}: NearbyAmenitiesSectionProps) {
  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="w-7 h-7 text-[#C5A059]" aria-hidden="true" />
          </div>
          <h2 id="nearby-amenities-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore restaurants, parks, schools, healthcare, and shopping around{' '}
            {COMMUNITY_MAP.name} in {COMMUNITY_MAP.city}, Nevada.
          </p>
          <Link
            href="/amenities"
            className="inline-block mt-4 text-[#C5A059] font-semibold hover:text-[#B8914F] hover:underline"
          >
            View full nearby amenities guide →
          </Link>
        </div>
        <AmenityMap showCuratedList={showFullList} />
      </div>
    </section>
  );
}

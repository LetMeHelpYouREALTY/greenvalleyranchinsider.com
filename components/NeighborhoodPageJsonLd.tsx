import { buildNeighborhoodPageJsonLd } from '@/lib/schema';
import { jsonLdStringify } from '@/lib/json-ld';

type NeighborhoodPageJsonLdProps = {
  path: '/green-valley-ranch' | '/mystic-bay' | '/the-cottages';
  placeName: string;
  placeDescription: string;
  pageTitle: string;
  pageDescription: string;
};

export function NeighborhoodPageJsonLd({
  path,
  placeName,
  placeDescription,
  pageTitle,
  pageDescription,
}: NeighborhoodPageJsonLdProps) {
  const blocks = buildNeighborhoodPageJsonLd({
    path,
    placeName,
    placeDescription,
    pageTitle,
    pageDescription,
  });

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(block) }}
        />
      ))}
    </>
  );
}

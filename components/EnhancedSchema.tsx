import {
  greenValleyRanchPlaceSchema,
  localBusinessRefSchema,
  personSchema,
  realEstateAgentSchema,
  websiteSchema,
} from '@/lib/schema';
import { jsonLdStringify } from '@/lib/json-ld';

/**
 * Site-wide JSON-LD: agent, person, website, business, and GEO place entities.
 */
export function EnhancedSchema() {
  const blocks = [
    realEstateAgentSchema,
    personSchema,
    websiteSchema,
    localBusinessRefSchema,
    greenValleyRanchPlaceSchema,
  ];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdStringify(block),
          }}
        />
      ))}
    </>
  );
}

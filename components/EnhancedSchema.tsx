import { realEstateAgentSchema, websiteSchema } from '@/lib/schema';

/**
 * Site-wide JSON-LD: single RealEstateAgent entity and WebSite publisher reference.
 */
export function EnhancedSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

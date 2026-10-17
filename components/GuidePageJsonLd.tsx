import { buildGuidePageJsonLd } from '@/lib/schema';
import { jsonLdStringify } from '@/lib/json-ld';

type GuidePath = '/services' | '/sellers-guide' | '/buyers-guide' | '/schools';

type GuidePageJsonLdProps = {
  path: GuidePath;
  pageTitle: string;
  pageDescription: string;
};

export function GuidePageJsonLd({ path, pageTitle, pageDescription }: GuidePageJsonLdProps) {
  const block = buildGuidePageJsonLd({ path, pageTitle, pageDescription });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdStringify(block) }}
    />
  );
}

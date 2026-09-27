import { splitFullName, type FollowUpBossLeadInput, type FubInquiryType } from '@/lib/fub';
import { SITE_DOMAIN } from '@/lib/site';
import type { NewsletterBodySchema, SubmitBodySchema } from '@/lib/types';

const FORM_TYPE_TO_FUB: Record<
  SubmitBodySchema['formType'],
  { type: FubInquiryType; formName: string }
> = {
  general: { type: 'General Inquiry', formName: 'Contact Form' },
  seller: { type: 'Seller Inquiry', formName: 'Home Valuation Form' },
  property: { type: 'Property Inquiry', formName: 'Property Inquiry Form' },
};

function resolveSourceUrl(sourceUrl?: string, referer?: string | null): string {
  if (sourceUrl && sourceUrl.startsWith('http')) {
    return sourceUrl;
  }
  if (referer && referer.startsWith('http')) {
    return referer;
  }
  return `https://www.${SITE_DOMAIN}/contact`;
}

export function mapSubmitBodyToFub(
  data: SubmitBodySchema,
  referer?: string | null
): FollowUpBossLeadInput {
  const mapping = FORM_TYPE_TO_FUB[data.formType];
  const { firstName, lastName } = splitFullName(data.name);
  const sourceUrl = resolveSourceUrl(data.sourceUrl, referer);

  const extraLines: string[] = [];
  if (data.company) {
    extraLines.push(`Company/Address: ${data.company}`);
  }
  if (data.phone) {
    extraLines.push(`Phone: ${data.phone}`);
  }

  const message =
    extraLines.length > 0
      ? `${data.message}\n\n${extraLines.join('\n')}`
      : data.message;

  return {
    type: mapping.type,
    formName: mapping.formName,
    sourceUrl,
    message,
    description: `${mapping.formName} | ${sourceUrl}`,
    firstName,
    lastName,
    email: data.email,
    phone: data.phone || undefined,
    tags: [mapping.formName],
  };
}

export function mapNewsletterToFub(
  data: NewsletterBodySchema,
  referer?: string | null
): FollowUpBossLeadInput {
  const sourceUrl = resolveSourceUrl(data.sourceUrl, referer);

  return {
    type: 'Registration',
    formName: 'Newsletter',
    sourceUrl,
    message: 'Newsletter signup from greenvalleyranchinsider.com',
    description: `Newsletter Signup | ${sourceUrl}`,
    firstName: 'Newsletter',
    lastName: 'Subscriber',
    email: data.email,
    tags: ['Newsletter'],
  };
}

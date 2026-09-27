import { SITE_DOMAIN } from '@/lib/site';

export type FubInquiryType =
  | 'General Inquiry'
  | 'Seller Inquiry'
  | 'Property Inquiry'
  | 'Registration';

export type FollowUpBossLeadInput = {
  type: FubInquiryType;
  formName: string;
  sourceUrl: string;
  message: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags: string[];
};

export type FollowUpBossResult =
  | { ok: true }
  | { ok: false; status: 'missing_key' | 'fub_error' | 'network_error'; httpStatus?: number };

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: 'Visitor', lastName: '' };
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

export function buildFollowUpBossEventBody(input: FollowUpBossLeadInput) {
  const phones =
    input.phone && input.phone.replace(/\D/g, '').length >= 10
      ? [{ value: input.phone }]
      : [];

  return {
    source: SITE_DOMAIN,
    system: SITE_DOMAIN,
    type: input.type,
    message: input.message,
    description: input.description,
    sourceUrl: input.sourceUrl,
    person: {
      firstName: input.firstName,
      lastName: input.lastName,
      emails: [{ value: input.email }],
      phones,
      tags: [SITE_DOMAIN, ...input.tags],
    },
  };
}

export async function sendFollowUpBossEvent(
  input: FollowUpBossLeadInput,
  fetchImpl: typeof fetch = fetch
): Promise<FollowUpBossResult> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) {
    console.error(
      'FOLLOW_UP_BOSS_API_KEY is not configured; cannot send lead to Follow Up Boss.'
    );
    return { ok: false, status: 'missing_key' };
  }

  const body = buildFollowUpBossEventBody(input);
  const authorization = `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`;

  try {
    const response = await fetchImpl('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        'X-System': SITE_DOMAIN,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return { ok: true };
    }

    console.error(`Follow Up Boss API returned HTTP ${response.status}`);
    return { ok: false, status: 'fub_error', httpStatus: response.status };
  } catch {
    console.error('Follow Up Boss API request failed');
    return { ok: false, status: 'network_error' };
  }
}

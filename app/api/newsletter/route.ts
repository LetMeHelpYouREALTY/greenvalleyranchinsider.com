import { sendFollowUpBossEvent } from '@/lib/fub';
import { mapNewsletterToFub } from '@/lib/map-lead-to-fub';
import { newsletterBodySchema } from '@/lib/types';
import { checkBotId } from 'botid/server';

function fubFailureStatus(result: { status: string }): number {
  return result.status === 'missing_key' ? 503 : 502;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsedBody = newsletterBodySchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json(
      { error: 'Invalid form data', details: parsedBody.error.message },
      { status: 400 }
    );
  }

  try {
    const verification = await checkBotId();

    if (verification.isBot) {
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }

    const referer = request.headers.get('referer');
    const fubInput = mapNewsletterToFub(parsedBody.data, referer);
    const fubResult = await sendFollowUpBossEvent(fubInput);

    if (!fubResult.ok) {
      return Response.json(
        { error: 'Failed to deliver signup to CRM' },
        { status: fubFailureStatus(fubResult) }
      );
    }

    return Response.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in newsletter route:', error);
    return Response.json(
      { error: 'Internal server error', message: 'Failed to process newsletter signup' },
      { status: 500 }
    );
  }
}

import { sendFollowUpBossEvent } from '@/lib/fub';
import { mapSubmitBodyToFub } from '@/lib/map-lead-to-fub';
import { formSchema, submitBodySchema } from '@/lib/types';
import { checkBotId } from 'botid/server';
import { start } from 'workflow/api';
import { workflowInbound } from '@/workflows/inbound';

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

  const parsedBody = submitBodySchema.safeParse(body);
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
    const fubInput = mapSubmitBodyToFub(parsedBody.data, referer);
    const fubResult = await sendFollowUpBossEvent(fubInput);

    if (!fubResult.ok) {
      return Response.json(
        { error: 'Failed to deliver lead to CRM' },
        { status: fubFailureStatus(fubResult) }
      );
    }

    const workflowPayload = formSchema.parse({
      email: parsedBody.data.email,
      name: parsedBody.data.name,
      phone: parsedBody.data.phone ?? '',
      company: parsedBody.data.company ?? '',
      message: parsedBody.data.message,
    });

    void start(workflowInbound, [workflowPayload]).catch((error) => {
      console.error('Optional inbound workflow failed (lead already saved to FUB):', error);
    });

    return Response.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in submit route:', error);
    return Response.json(
      { error: 'Internal server error', message: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}

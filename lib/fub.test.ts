import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import {
  buildFollowUpBossEventBody,
  sendFollowUpBossEvent,
  splitFullName,
} from '@/lib/fub';

describe('splitFullName', () => {
  it('splits first and last name', () => {
    assert.deepEqual(splitFullName('Jan Duffy'), {
      firstName: 'Jan',
      lastName: 'Duffy',
    });
  });
});

describe('buildFollowUpBossEventBody', () => {
  it('builds registration payload with tags', () => {
    const body = buildFollowUpBossEventBody({
      type: 'Registration',
      formName: 'Newsletter',
      sourceUrl: 'https://www.greenvalleyranchinsider.com/',
      message: 'Newsletter signup',
      description: 'Newsletter Signup | Homepage',
      firstName: 'Newsletter',
      lastName: 'Subscriber',
      email: 'test@example.com',
      tags: ['Newsletter'],
    });

    assert.equal(body.type, 'Registration');
    assert.equal(body.person.tags?.includes('Newsletter'), true);
    assert.equal(body.person.emails[0].value, 'test@example.com');
  });
});

describe('sendFollowUpBossEvent', () => {
  it('returns missing_key when env var is unset', async () => {
    const original = process.env.FOLLOW_UP_BOSS_API_KEY;
    delete process.env.FOLLOW_UP_BOSS_API_KEY;

    const result = await sendFollowUpBossEvent({
      type: 'General Inquiry',
      formName: 'Contact',
      sourceUrl: 'https://www.greenvalleyranchinsider.com/contact',
      message: 'Hello',
      description: 'Contact | Contact',
      firstName: 'Jan',
      lastName: 'Duffy',
      email: 'jan@example.com',
      tags: ['Contact Form'],
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 'missing_key');
    }

    if (original) {
      process.env.FOLLOW_UP_BOSS_API_KEY = original;
    }
  });

  it('succeeds when mocked fetch returns 201', async () => {
    process.env.FOLLOW_UP_BOSS_API_KEY = 'test-key-only';

    const mockFetch = mock.fn(async () => ({
      status: 201,
    })) as typeof fetch;

    const result = await sendFollowUpBossEvent(
      {
        type: 'General Inquiry',
        formName: 'Contact',
        sourceUrl: 'https://www.greenvalleyranchinsider.com/contact',
        message: 'Hello',
        description: 'Contact | Contact',
        firstName: 'Jan',
        lastName: 'Duffy',
        email: 'jan@example.com',
        tags: ['Contact Form'],
      },
      mockFetch
    );

    assert.equal(result.ok, true);
    assert.equal(mockFetch.mock.calls.length, 1);
    const [, init] = mockFetch.mock.calls[0].arguments as [string, RequestInit];
    assert.match(String(init?.headers && (init.headers as Record<string, string>).Authorization), /^Basic /);
    assert.equal(init?.method, 'POST');

    delete process.env.FOLLOW_UP_BOSS_API_KEY;
  });
});

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
};

const CONTACT_SUBJECT = 'Nova poruka sa web stranice';
const MIN_FORM_FILL_TIME_MS = 1200;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT = new Map<string, number[]>();

function getEndpointList(): string[] {
  const primary = process.env.FORMSPREE_ENDPOINT ?? process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';
  const fallback = process.env.FORMSPREE_FALLBACK_ENDPOINT ?? '';

  return [primary, fallback].filter((value, index, all) => Boolean(value) && all.indexOf(value) === index);
}

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return requestHeaders.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const requestTimestamps = RATE_LIMIT.get(clientIp) ?? [];
  const recentRequests = requestTimestamps.filter((timestamp) => now - timestamp <= RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    RATE_LIMIT.set(clientIp, recentRequests);
    return true;
  }

  recentRequests.push(now);
  RATE_LIMIT.set(clientIp, recentRequests);
  return false;
}

function validatePayload(payload: ContactPayload): { sanitized: { name: string; phone: string; message: string }; errorCode?: string } {
  const name = normalizeText(payload.name);
  const phone = normalizeText(payload.phone);
  const message = normalizeText(payload.message);

  if (!name || name.length < 2 || name.length > 80) {
    return { sanitized: { name, phone, message }, errorCode: 'INVALID_NAME' };
  }

  const phonePattern = /^[+0-9][0-9\s/().-]{5,24}$/;
  const digitsOnly = phone.replace(/\D/g, '');
  if (!phonePattern.test(phone) || digitsOnly.length < 6) {
    return { sanitized: { name, phone, message }, errorCode: 'INVALID_PHONE' };
  }

  if (!message || message.length < 10 || message.length > 2000) {
    return { sanitized: { name, phone, message }, errorCode: 'INVALID_MESSAGE' };
  }

  return { sanitized: { name, phone, message } };
}

async function submitToFormspree(endpoint: string, data: { name: string; phone: string; message: string }) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...data,
      _subject: CONTACT_SUBJECT,
    }),
  });
}

export async function POST(request: Request) {
  const clientIp = await getClientIp();

  if (isRateLimited(clientIp)) {
    return NextResponse.json({ errorCode: 'RATE_LIMITED' }, { status: 429 });
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch (error) {
    console.error('[contact] Invalid JSON payload.', error);
    return NextResponse.json({ errorCode: 'INVALID_PAYLOAD' }, { status: 400 });
  }

  const website = normalizeText(payload.website);
  if (website) {
    console.warn('[contact] Honeypot triggered.', { clientIp });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const formStartedAt = Number(payload.formStartedAt);
  const elapsedMs = Number.isFinite(formStartedAt) ? Date.now() - formStartedAt : 0;
  if (elapsedMs < MIN_FORM_FILL_TIME_MS) {
    console.warn('[contact] Submitted too quickly.', { clientIp, elapsedMs });
    return NextResponse.json({ errorCode: 'SPAM_DETECTED' }, { status: 400 });
  }

  const { sanitized, errorCode } = validatePayload(payload);
  if (errorCode) {
    return NextResponse.json({ errorCode }, { status: 400 });
  }

  const endpoints = getEndpointList();
  if (!endpoints.length) {
    console.error('[contact] Missing FORMSPREE_ENDPOINT/FORMSPREE_FALLBACK_ENDPOINT configuration.');
    return NextResponse.json({ errorCode: 'CONFIGURATION_ERROR' }, { status: 503 });
  }

  const failedEndpoints: { endpoint: string; status: number | null; body: string }[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await submitToFormspree(endpoint, sanitized);

      if (response.ok) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }

      failedEndpoints.push({
        endpoint,
        status: response.status,
        body: (await response.text()).slice(0, 500),
      });
    } catch (error) {
      failedEndpoints.push({
        endpoint,
        status: null,
        body: error instanceof Error ? error.message : 'Unknown fetch error',
      });
    }
  }

  console.error('[contact] All provider submissions failed.', failedEndpoints);
  return NextResponse.json({ errorCode: 'SUBMISSION_FAILED' }, { status: 502 });
}

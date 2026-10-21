import { bookingSchema, fieldErrors } from "@/lib/booking";
import { buildBookingEmail, replyToFor } from "@/lib/booking-email";

// light spam protection: honeypot, size cap, and a small per-ip limit.
// the limit lives in memory, so it resets on cold starts and is per server instance.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 20_000) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: "bad_json" }, { status: 400 });
  }

  // bots fill every field. pretend it worked and send nothing.
  if (
    typeof data === "object" &&
    data !== null &&
    "website" in data &&
    typeof data.website === "string" &&
    data.website.trim() !== ""
  ) {
    return Response.json({ ok: true });
  }

  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("booking form: RESEND_API_KEY and BOOKING_TO_EMAIL must both be set");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyRequests(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const { subject, text } = buildBookingEmail(parsed.data);
  const replyTo = replyToFor(parsed.data.contact);

  try {
    const res = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL ?? "nebula nails bookings <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("booking email was rejected by the email service, status", res.status);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("booking email could not be sent:", err instanceof Error ? err.name : "unknown");
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

import { NextResponse } from "next/server";
import { sendContactEmail, type ContactPayload } from "@/lib/email";

const REQUIRED_FIELDS: (keyof ContactPayload)[] = [
  "name",
  "email",
  "projectType",
  "budget",
  "message",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Very small in-memory rate limiter (per server instance) to blunt
// obvious spam/bot bursts. Not a substitute for a real WAF/captcha,
// but keeps the free tier of an email provider safe by default.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(key: string) {
  const now = Date.now();
  const history = (submissions.get(key) || []).filter((t) => now - t < WINDOW_MS);
  history.push(now);
  submissions.set(key, history);
  return history.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload> & { website?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot field — real users never fill a visually hidden input.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.toString().trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(body.email!.trim())) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: body.name!.trim().slice(0, 200),
    company: body.company?.trim().slice(0, 200),
    email: body.email!.trim().slice(0, 200),
    phone: body.phone?.trim().slice(0, 60),
    projectType: body.projectType!.trim().slice(0, 120),
    budget: body.budget!.trim().slice(0, 120),
    message: body.message!.trim().slice(0, 5000),
  };

  try {
    await sendContactEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact form] failed to send email:", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try WhatsApp instead." },
      { status: 502 }
    );
  }
}

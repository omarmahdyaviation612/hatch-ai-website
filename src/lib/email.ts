/**
 * Email delivery for the contact form.
 * ---------------------------------------------------------------
 * Provider: Resend (https://resend.com) — called directly over HTTPS
 * so we don't need to add their SDK as a dependency. All secrets are
 * read from environment variables and never touch the client bundle
 * (this file only runs on the server, inside the API route).
 *
 * To swap providers (e.g. Postmark, SendGrid, plain SMTP via
 * nodemailer), replace the body of `sendContactEmail` — the shape
 * of `ContactPayload` and the calling code in
 * `src/app/api/contact/route.ts` do not need to change.
 */
import { CONTACT_RECEIVER_EMAIL } from "@/lib/site-config";

export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailContent(payload: ContactPayload) {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Company", payload.company || "—"],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Project type", payload.projectType],
    ["Budget", payload.budget],
  ];

  const text = [
    "New project inquiry from hatch.ai",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="margin:0 0 16px;">New project inquiry — HATCH.AI</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top;">${escapeHtml(
              label
            )}</td>
            <td style="padding:6px 0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#666;font-size:14px;">Message</p>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(
        payload.message
      )}</p>
    </div>
  `;

  return { text, html };
}

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL || "HATCH.AI Website <onboarding@resend.dev>";

  const { text, html } = buildEmailContent(payload);

  // No API key configured yet (e.g. local dev before setup) — log
  // the submission instead of failing, so the form still "works"
  // end-to-end while you finish provider setup.
  if (!apiKey) {
    console.warn(
      "[contact form] RESEND_API_KEY is not set — logging submission instead of emailing.\n" +
        "See README.md 'Configure the inbox' section.\n" +
        text
    );
    return { delivered: false as const };
  }

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [CONTACT_RECEIVER_EMAIL],
      reply_to: payload.email,
      subject: `New project inquiry — ${payload.name}${
        payload.company ? ` (${payload.company})` : ""
      }`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Resend API error (${res.status}): ${errorBody}`);
  }

  return { delivered: true as const };
}

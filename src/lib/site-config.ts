/**
 * HATCH.AI — central site configuration
 * ---------------------------------------------------------------
 * This is the ONE file you should touch to rebrand contact details.
 * Everything else in the app (metadata, footer, WhatsApp button,
 * contact form) reads from here or from environment variables.
 *
 * Values that can change between environments (production domain,
 * inbox address, API keys) are read from `process.env` with safe
 * fallbacks so the site still runs locally without a `.env.local`.
 * See `.env.example` for the full list of variables.
 */

// 1. PRODUCTION DOMAIN
// -----------------------------------------------------------------
// Do NOT hard-code your future domain anywhere in the app.
// Once you buy a domain, set NEXT_PUBLIC_SITE_URL in your
// .env.local (local) and in your hosting provider's environment
// variables (production). Used for canonical URLs, Open Graph tags,
// and the sitemap/robots files.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

// 2. CONTACT / WHATSAPP
// -----------------------------------------------------------------
// WhatsApp number in international format, no spaces or symbols.
// Change ONLY this constant to update every WhatsApp link/button
// on the site (floating button, footer, contact section).
export const WHATSAPP_NUMBER = "201101190931";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = "+20 110 119 0931";

// Inbox that receives project inquiries submitted through the
// contact form. Override with CONTACT_RECEIVER_EMAIL in your env
// vars — see README "Configure the inbox" section.
export const CONTACT_RECEIVER_EMAIL =
  process.env.CONTACT_RECEIVER_EMAIL || "info@HatchAi.net";

export const CONTACT_DISPLAY_EMAIL = CONTACT_RECEIVER_EMAIL;

// 3. BRAND / SOCIAL
// -----------------------------------------------------------------
export const SITE_NAME = "HATCH.AI";
export const SITE_TAGLINE = "Ideas Hatch. Solutions Scale.";
export const SITE_DESCRIPTION =
  "HATCH.AI is a creative and AI solutions agency for startups — marketing, branding, AI automation, and web & mobile product development, all under one roof.";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/hatch.ai.agency",
  linkedin: "https://linkedin.com/company/hatch-ai-agency",
  facebook: "https://facebook.com/hatch.ai.agency",
  x: "https://x.com/hatchai_agency",
};

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Hatch" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

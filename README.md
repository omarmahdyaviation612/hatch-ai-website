# HATCH.AI — Website

A premium, production-ready marketing site for HATCH.AI, a creative and AI
solutions agency for startups. Built with Next.js (App Router), TypeScript,
and Tailwind CSS.

---

## 1. How to run the website

**Requirements:** Node.js 20+ and npm.

```bash
# from the project folder
npm install
npm run dev
```

Open **http://localhost:3000** in your browser. The dev server supports hot
reload — edit any file in `src/` and the browser updates automatically.

To run it the way it runs in production (a good final check before
deploying):

```bash
npm run build
npm run start -- -p 3000
```

---

## 2. Where to change the domain

Open **`.env.local`** (create it by copying `.env.example` if it doesn't
exist yet) and set:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Don't include a trailing slash. This single variable feeds:
- Canonical URLs and Open Graph / Twitter card metadata (`src/app/layout.tsx`)
- `robots.txt` and `sitemap.xml` (`src/app/robots.ts`, `src/app/sitemap.ts`)

If you don't set it, the site falls back to `http://localhost:3000` so local
development still works. **In production**, set the same variable in your
hosting provider's dashboard (see the Vercel steps in section 5) — don't
just rely on `.env.local`, since that file is never committed to git.

---

## 3. Where to configure the inbox (contact form emails)

The contact form posts to `src/app/api/contact/route.ts`, which calls a
small email helper at `src/lib/email.ts`. That helper talks to
**[Resend](https://resend.com)** over a plain HTTPS request — no SDK
dependency, and your API key never reaches the browser.

**Setup (~5 minutes):**

1. Create a free account at [resend.com](https://resend.com).
2. Add and verify a sending domain (Resend walks you through adding a couple
   of DNS records). Until you do this, you can still test using their shared
   `onboarding@resend.dev` sender address — good enough for local testing,
   not for production.
3. Generate an API key at [resend.com/api-keys](https://resend.com/api-keys).
4. In `.env.local` (and in your hosting provider's environment variables for
   production), set:

   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_FROM_EMAIL=HATCH.AI Website <hello@yourdomain.com>
   CONTACT_RECEIVER_EMAIL=hello@hatch.ai
   ```

   - `RESEND_API_KEY` — your secret key. Server-only, never exposed to the client.
   - `CONTACT_FROM_EMAIL` — must be on a domain you've verified in Resend.
   - `CONTACT_RECEIVER_EMAIL` — the inbox that should receive inquiries. This also
     appears on the site itself (footer + contact section) via `src/lib/site-config.ts`.

That's it — no other code changes needed. Submissions include name, company,
email, phone, project type, budget and message, and set `reply_to` to the
submitter's email so you can hit "Reply" directly.

**If you don't set `RESEND_API_KEY` yet:** the form still works end-to-end —
it validates input and returns success — but instead of sending an email it
logs the submission to your server console. This is intentional so the site
never "breaks" for visitors while you finish email setup; just remember to
set the key before you rely on the form in production.

**Want a different provider?** (Postmark, SendGrid, plain SMTP via
nodemailer, etc.) You only need to edit `src/lib/email.ts` — replace the
body of `sendContactEmail`. Nothing else in the app needs to change.

A basic honeypot field and a per-IP rate limit (5 submissions / 10 minutes)
are already built into the API route to cut down on obvious spam.

---

## 4. Where to change the WhatsApp number

Open **`src/lib/site-config.ts`** and edit:

```ts
export const WHATSAPP_NUMBER = "201101190931"; // international format, no + or spaces
export const WHATSAPP_DISPLAY = "+20 110 119 0931"; // how it's shown to visitors
```

That's the only place it lives — the floating WhatsApp button, the footer
link, and the contact section link all read from these two constants.

---

## 5. How to deploy it

The site is a standard Next.js app, so any Next.js-compatible host works.
**Vercel** (made by the Next.js team) is the simplest:

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Before the first deploy (or right after, then redeploy), add these
   environment variables under **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` → `https://yourdomain.com`
   - `RESEND_API_KEY` → your Resend key
   - `CONTACT_FROM_EMAIL` → your verified sender
   - `CONTACT_RECEIVER_EMAIL` → your inbox
4. Deploy. Vercel builds with `npm run build` automatically.
5. Once you own the domain, add it under **Project → Settings → Domains**
   and point your DNS at Vercel per their instructions.

Other hosts (Netlify, Render, a Node server, Docker, etc.) work too — the
build command is `npm run build` and the start command is `npm run start`;
just make sure the same environment variables are set there.

---

## 6. Project structure

```
hatch-ai/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          Root layout: fonts, SEO/OG metadata
│  │  ├─ page.tsx             Home page — assembles all sections
│  │  ├─ globals.css          Design tokens (colors, fonts, animations)
│  │  ├─ robots.ts            Dynamic robots.txt
│  │  ├─ sitemap.ts           Dynamic sitemap.xml
│  │  ├─ icon.png / apple-icon.png   App icons (generated from brand mark)
│  │  └─ api/
│  │     └─ contact/route.ts  Contact form endpoint (validation + email)
│  ├─ components/
│  │  ├─ Navbar.tsx           Sticky nav + mobile menu
│  │  ├─ Hero.tsx             Hero section
│  │  ├─ Services.tsx         5-service bento grid
│  │  ├─ WhyHatch.tsx         "Why HATCH.AI" section
│  │  ├─ StartupSection.tsx   Startup-focused positioning + stats
│  │  ├─ Work.tsx             Selected work / project placeholders
│  │  ├─ Process.tsx          Idea → Hatch → Build → Launch → Scale
│  │  ├─ Contact.tsx          Project inquiry form (client component)
│  │  ├─ Footer.tsx           Site footer
│  │  ├─ WhatsAppFloat.tsx    Floating WhatsApp button (every page)
│  │  ├─ Doodles.tsx          Hand-drawn-style SVG icons (brand motif)
│  │  ├─ ServiceIcons.tsx     Line icons for the services grid
│  │  └─ ui.tsx                Shared primitives (Container, buttons, etc.)
│  └─ lib/
│     ├─ site-config.ts       ← Central config: domain, WhatsApp, email, nav links
│     └─ email.ts             Resend-based email sending (provider-swappable)
├─ public/
│  ├─ brand/                  Brand images actually used on the site
│  ├─ og-image.png            Open Graph share image
│  ├─ favicon.ico
│  └─ site.webmanifest
├─ brand-source-assets/       Full-resolution reference brand sheets (not served)
├─ .env.example               Documented list of all environment variables
└─ README.md                  This file
```

**Key idea:** almost everything you'd want to customize — domain, WhatsApp
number, contact email, nav links, social links — lives in one file:
`src/lib/site-config.ts`. Secrets (API keys) live only in environment
variables, never in code.

### Replacing the placeholder project cards

`src/components/Work.tsx` has a `PROJECTS` array at the top with a comment
explaining how to swap the gradient placeholders for real screenshots —
just drop an image in `/public/work/` and add an `image` field to the
relevant entry.

### Design system quick reference

- **Colors** — `src/app/globals.css`, in the `:root` block (`--color-gold`,
  `--color-cyan`, `--color-ink`, etc.)
- **Fonts** — Sora (display/headings), Inter (body), JetBrains Mono (the
  terminal-style ">" labels, echoing the mascot's cursor-eyes) — all
  self-hosted via `@fontsource` so the site has zero third-party font
  requests.

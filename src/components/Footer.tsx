import Image from "next/image";
import Link from "next/link";
import { Container, WhatsAppLink } from "./ui";
import {
  CONTACT_DISPLAY_EMAIL,
  NAV_LINKS,
  SITE_NAME,
  SOCIAL_LINKS,
  WHATSAPP_DISPLAY,
} from "@/lib/site-config";

const SERVICES = [
  "Marketing & Advertising",
  "AI Solutions",
  "Web App Development",
  "Mobile App Development",
  "Branding & Social Media",
];

const SOCIALS: { label: string; href: string }[] = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Facebook", href: SOCIAL_LINKS.facebook },
  { label: "X", href: SOCIAL_LINKS.x },
];

export default function Footer({ homePath = "", contactEmail = CONTACT_DISPLAY_EMAIL }: { homePath?: string; contactEmail?: string }) {
  return (
    <footer className="relative border-t border-line bg-ink-soft">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href={`${homePath}#top`} className="flex items-center gap-2.5" aria-label="Hatch.ai home">
              <Image src="/icon.png" alt="" width={34} height={34} className="h-8 w-8 rounded-full" />
              <span className="font-display text-[18px] font-bold text-paper">
                Hatch<span className="text-gold">.ai</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-muted">
              Creative and AI solutions agency for startups. Ideas hatch. Solutions scale.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link href={`${homePath}#services`} className="text-[14px] text-muted transition-colors hover:text-paper">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
              Site
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={`${homePath}${link.href}`} className="text-[14px] text-muted transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
              <li>
                <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-paper">
                  {contactEmail}
                </a>
              </li>
              <li>
                <WhatsAppLink className="transition-colors hover:text-paper">
                  {WHATSAPP_DISPLAY} (WhatsApp)
                </WhatsAppLink>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-muted transition-colors hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="font-mono text-[12px] text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-[12px] text-muted">
            <span className="text-gold">$</span> ideas hatch. solutions scale.
          </p>
        </div>
      </Container>
    </footer>
  );
}

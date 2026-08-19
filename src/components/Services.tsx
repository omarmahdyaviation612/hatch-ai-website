"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, SectionHeading } from "./ui";
import {
  IconMegaphone,
  IconChip,
  IconCode,
  IconMobile,
  IconBrand,
  IconArrowUpRight,
} from "./ServiceIcons";

const SERVICES = [
  {
    tag: "marketing",
    title: "Marketing & Advertising",
    description:
      "Paid, organic and lifecycle campaigns built around a clear growth number, not vanity metrics.",
    icon: IconMegaphone,
  },
  {
    tag: "ai-solutions",
    title: "AI Solutions",
    description:
      "Custom copilots, automations and AI-generated content pipelines that remove busywork from your team.",
    icon: IconChip,
  },
  {
    tag: "web-apps",
    title: "Web App Development",
    description:
      "Fast, accessible product and marketing sites — from landing pages to full web platforms.",
    icon: IconCode,
  },
  {
    tag: "mobile-apps",
    title: "Mobile App Development",
    description:
      "iOS and Android apps designed and shipped by one team, from first wireframe to app store.",
    icon: IconMobile,
  },
  {
    tag: "branding",
    title: "Branding & Social Media",
    description:
      "Identity systems, content and always-on social management that keep the brand consistent everywhere.",
    icon: IconBrand,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex items-start justify-between gap-6">
          <SectionHeading
            eyebrow="what we do"
            title="Five disciplines. One accountable team."
            description="No hand-offs between agencies, freelancers and dev shops. HATCH.AI runs strategy, creative, AI and engineering under a single roof."
          />

          {/* mascot: busy "at the terminal" building the five disciplines */}
          <motion.div
            initial={{ opacity: 0, y: -16, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative hidden shrink-0 sm:block"
          >
            <motion.div
              animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-16 w-16 overflow-hidden rounded-full border border-line-hi bg-ink shadow-lg shadow-black/40 lg:h-20 lg:w-20"
            >
              <Image
                src="/brand/hatch-logo-mark.png"
                alt="Hatch.ai mascot building things"
                fill
                sizes="80px"
                className="scale-[1.06] object-cover"
              />
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-3 rounded-full border border-line-hi bg-panel-hi px-2.5 py-1 font-mono text-[10px] text-gold shadow-md shadow-black/30"
            >
              building...
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const spanClass =
              i === 0
                ? "lg:col-span-3"
                : i === 1
                ? "lg:col-span-3"
                : "lg:col-span-2";
            return (
              <div
                key={service.title}
                className={`group relative overflow-hidden rounded-2xl border border-line bg-panel/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-hi hover:bg-panel-hi sm:p-8 ${spanClass}`}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/0 blur-2xl transition-colors duration-500 group-hover:bg-gold/15" />

                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-hi bg-ink text-gold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <IconArrowUpRight className="h-5 w-5 -translate-x-1 translate-y-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100" />
                </div>

                <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
                  ./{service.tag}
                </p>
                <h3 className="mt-2 font-display text-[20px] font-semibold leading-snug text-paper">
                  {service.title}
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[14.5px] leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

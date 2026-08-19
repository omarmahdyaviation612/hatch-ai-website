"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, SectionHeading } from "./ui";
import { IconArrowUpRight } from "./ServiceIcons";

const PROJECTS: {
  name: string;
  category: string;
  summary: string;
  accent: string;
  image?: string;
}[] = [
  {
    name: "Nomo Finance",
    category: "Brand + Web App",
    summary:
      "Full identity system and investor-facing web app for a fintech startup's public launch.",
    accent: "from-gold/35 via-gold/10 to-transparent",
    image: "/work/nomo.png",
  },
  {
    name: "Verdant Health",
    category: "AI Solutions",
    summary:
      "AI intake assistant and automated reporting pipeline for a telehealth network.",
    accent: "from-cyan/35 via-cyan/10 to-transparent",
    image: "/work/verdance.png",
  },
  {
    name: "Kiln & Co.",
    category: "Marketing + Social",
    summary:
      "Always-on content engine and paid growth campaigns for a DTC home goods brand.",
    accent: "from-gold/30 via-cyan/10 to-transparent",
    image: "/work/Kiln.png",
  },
  {
    name: "Ridewell",
    category: "Mobile App",
    summary:
      "iOS and Android booking app shipped in eight weeks for a regional mobility startup.",
    accent: "from-cyan/25 via-gold/15 to-transparent",
    image: "/work/ridewell.png",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="selected work"
            title="A few things we've hatched."
            description="A snapshot of recent work across brand, product and AI. Full case studies available on request."
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 14,
              delay: 0.1,
            }}
            className="relative hidden shrink-0 sm:block"
          >
            <motion.div
              animate={{
                rotate: [0, -8, 8, -8, 0],
                y: [0, -6, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
              className="relative h-16 w-16 overflow-hidden rounded-full border border-line-hi bg-ink shadow-lg shadow-black/40 lg:h-20 lg:w-20"
            >
              <Image
                src="/brand/hatch-logo-mark.png"
                alt="Hatch.ai mascot celebrating the work"
                fill
                sizes="80px"
                className="scale-[1.06] object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <motion.a
              key={project.name}
              href="#contact"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-panel/60 transition-all duration-300 hover:-translate-y-1 hover:border-line-hi"
            >
              <div
                className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
              >
                {/* Background grid */}
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

                {/* Project image */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="relative font-display text-[15vw] font-bold leading-none text-paper/10 sm:text-[6vw]">
                    {project.name.charAt(0)}
                  </span>
                )}

                {/* Optional dark overlay for visual consistency */}
                {project.image && (
                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
                )}
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
                      {project.category}
                    </p>

                    <h3 className="mt-1.5 font-display text-[19px] font-semibold text-paper">
                      {project.name}
                    </h3>
                  </div>

                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-hi text-muted transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                    <IconArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {project.summary}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
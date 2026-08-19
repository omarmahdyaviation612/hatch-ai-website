"use client";

import { motion } from "framer-motion";
import { Container, Cursor, Eyebrow, PrimaryButton, SecondaryButton } from "./ui";
import { DoodleBulb, DoodleRocket, DoodleGrowth, DoodleUsers } from "./Doodles";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[136px] pb-20 sm:pt-[152px] sm:pb-28">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_10%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gold/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[130px]" />

      {/* doodles, echoing the reference poster's hand-drawn brand marks */}
      <DoodleRocket className="pointer-events-none absolute right-[6%] top-[18%] hidden w-16 -rotate-12 text-paper/25 sm:block lg:right-[38%] animate-float-slow" />
      <DoodleBulb className="pointer-events-none absolute right-[4%] top-[42%] hidden w-14 text-gold/30 md:block lg:right-[8%] animate-float" />
      <DoodleGrowth className="pointer-events-none absolute right-[10%] bottom-[10%] hidden w-16 text-cyan/25 md:block lg:right-[14%]" />
      <DoodleUsers className="pointer-events-none absolute left-[3%] bottom-[8%] hidden w-14 text-paper/20 lg:block animate-float-slow" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <Eyebrow>creative_agency --mode=ai</Eyebrow>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.4vw,4.5rem)] font-bold leading-[1.03] tracking-tight text-paper">
            Ideas hatch.
            <br />
            <span className="text-gradient-gold">Solutions scale.</span>
            <Cursor className="ml-1 h-[0.8em] w-[5px]" />
          </h1>

          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted sm:text-[18px]">
            HATCH.AI pairs sharp creative marketing with AI-powered product
            development. One agency for the brand, the campaign, and the
            software your startup needs to grow — from first sketch to
            shipped product.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <PrimaryButton href="#contact">Start a Project</PrimaryButton>
            <SecondaryButton href="#services">See What We Do</SecondaryButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-7 font-mono text-[12.5px] uppercase tracking-[0.12em] text-muted">
            <span>smart ideas</span>
            <span className="text-gold">×</span>
            <span>ai powered</span>
            <span className="text-gold">×</span>
            <span>real impact</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40%] bg-gold/15 blur-[90px]" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[430/530] w-full"
            style={{
              maskImage:
                "radial-gradient(ellipse 78% 82% at 50% 42%, black 62%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 78% 82% at 50% 42%, black 62%, transparent 100%)",
            }}
          >
            <video
              src="/brand/mascot-hero.mp4"
              poster="/brand/mascot-standalone.png"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              aria-label="Hatch.ai mascot — a chick with glowing terminal-cursor eyes, hatching from its egg"
            />
          </motion.div>
          <div className="absolute -bottom-2 left-1/2 h-10 w-3/5 -translate-x-1/2 rounded-full bg-gold/25 blur-2xl" />
        </motion.div>
      </Container>
    </section>
  );
}

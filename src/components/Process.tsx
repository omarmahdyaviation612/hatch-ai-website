"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, SectionHeading } from "./ui";

const STEPS = [
  {
    step: "01",
    title: "Idea",
    description: "We dig into your goals, audience and market to find the sharpest version of the idea worth building.",
  },
  {
    step: "02",
    title: "Hatch",
    description: "Strategy becomes a concrete plan — brand direction, product scope, and the AI where it actually helps.",
  },
  {
    step: "03",
    title: "Build",
    description: "Design and engineering move in parallel: identity, content, and the web or mobile product itself.",
  },
  {
    step: "04",
    title: "Launch",
    description: "We ship — campaign live, product deployed, channels active — with everything QA'd and measured.",
  },
  {
    step: "05",
    title: "Scale",
    description: "We stay close post-launch, iterating on what the data shows and expanding what's working.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative border-y border-line bg-ink-soft py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="how we work"
          title="From idea to scale, in five stages."
          description="The same arc every time — because it's the same arc as our mascot: crack the shell, and grow from there."
        />

        {/* mascot: cracks the shell at step 01 and grows across the timeline */}
        <div className="relative mt-24 sm:mt-16">
          <motion.div
            initial={{ left: "2%", scale: 0.55, opacity: 0 }}
            whileInView={{ left: "84%", scale: 1.1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
            className="absolute -top-[64px] hidden h-14 w-14 overflow-hidden rounded-full border border-line-hi bg-ink shadow-lg shadow-black/40 sm:block"
          >
            <Image
              src="/brand/hatch-logo-mark.png"
              alt="Hatch.ai mascot growing through the process"
              fill
              sizes="56px"
              className="scale-[1.06] object-cover"
            />
          </motion.div>

          <ol className="grid grid-cols-1 gap-0 sm:grid-cols-5">
            {STEPS.map((item, i) => (
              <li key={item.step} className="relative flex flex-col gap-4 border-t border-line px-0 pt-7 sm:border-t-0 sm:px-5 sm:pt-0 sm:first:pl-0 sm:last:pr-0">
                <div className="flex items-center gap-3 sm:block">
                  <span className="font-mono text-[13px] text-gold/80">{item.step}</span>
                  <span
                    className={`hidden h-px flex-1 bg-line sm:mt-5 sm:block ${i === 0 ? "sm:opacity-0" : ""}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-display text-[19px] font-semibold text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

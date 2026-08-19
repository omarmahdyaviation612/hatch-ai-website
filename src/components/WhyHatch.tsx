import Image from "next/image";
import { Container, Eyebrow } from "./ui";

const PILLARS = [
  {
    tag: "creative",
    title: "Creative that's built to convert",
    description:
      "Every campaign, brand and piece of content starts from a business goal — not a mood board.",
  },
  {
    tag: "technology",
    title: "Engineering that ships",
    description:
      "Production-grade web and mobile products, built with the same team that designed them — no lost-in-translation hand-offs.",
  },
  {
    tag: "ai",
    title: "AI woven in, not bolted on",
    description:
      "Automation and AI-generated content are used where they save real time — research, drafts, ops — never as a gimmick.",
  },
];

export default function WhyHatch() {
  return (
    <section id="why" className="relative overflow-hidden border-y border-line bg-ink-soft py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_0%,transparent_75%)]" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 mx-auto w-full max-w-[380px] lg:order-1 lg:max-w-none">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cyan/10 blur-[100px]" />
          <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full border border-line-hi bg-ink">
            <Image
              src="/brand/hatch-logo-mark.png"
              alt="The Hatch.ai mascot logo mark"
              fill
              sizes="(min-width: 1024px) 420px, 80vw"
              className="scale-[1.06] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 rounded-2xl border border-line-hi bg-panel-hi px-5 py-4 font-mono text-[12px] text-muted shadow-2xl shadow-black/40 sm:px-6 sm:py-4.5">
            <span className="text-gold">$</span> strategy + design + code
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Eyebrow>why hatch.ai</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-paper">
            Creativity and AI, working the{" "}
            <span className="text-gradient-gold">same problem</span>.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-muted">
            Most teams get a design studio, a separate dev shop, and an AI
            vendor bolted on top. HATCH.AI collapses that into one loop: the
            people who understand your brand also build the product and the
            automation behind it — so decisions stay consistent from the
            first idea to the shipped release.
          </p>

          <dl className="mt-9 space-y-6">
            {PILLARS.map((pillar) => (
              <div key={pillar.tag} className="flex gap-4 border-t border-line pt-6 first:border-t-0 first:pt-0">
                <dt className="shrink-0 pt-0.5 font-mono text-[12px] uppercase tracking-[0.14em] text-gold/80">
                  {pillar.tag}
                </dt>
                <dd>
                  <p className="font-display text-[16.5px] font-semibold text-paper">
                    {pillar.title}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

import { Container, Eyebrow, PrimaryButton } from "./ui";
import { DoodleTarget } from "./Doodles";

const STATS = [
  { value: "0→1", label: "brands launched from scratch" },
  { value: "1 team", label: "creative, AI & engineering" },
  { value: "Weeks", label: "not quarters, to first release" },
];

export default function StartupSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line-hi bg-panel px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
          <DoodleTarget className="pointer-events-none absolute right-8 top-8 hidden w-16 text-gold/25 sm:block" />

          <div className="relative mx-auto max-w-2xl text-center">
            <Eyebrow>built for startups</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-paper">
              We help early ideas become brands, campaigns and{" "}
              <span className="text-gradient-gold">real products</span>.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              You don&apos;t need six vendors to go from idea to launch. HATCH.AI
              plugs in as your creative and technical team — sized to move at
              startup speed, structured to scale as you raise, hire and grow.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryButton href="#contact">Start a Project</PrimaryButton>
            </div>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-6 border-t border-line pt-10 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-[2.1rem] font-bold text-gold">
                  {stat.value}
                </p>
                <p className="mt-1 text-[14px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

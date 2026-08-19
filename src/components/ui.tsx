import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site-config";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1220px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Small mono-font label with the mascot's terminal ">" motif + blinking cursor. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line-hi bg-panel/60 px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-gold">
      <span aria-hidden="true">&gt;</span>
      <span>{children}</span>
      <Cursor />
    </div>
  );
}

export function Cursor({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[1em] w-[2px] translate-y-[1px] animate-blink bg-gold ${className}`}
    />
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-6 py-3.5 font-display text-[15px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-line-hi bg-transparent px-6 py-3.5 font-display text-[15px] font-semibold text-paper transition-colors duration-300 hover:border-gold hover:text-gold ${className}`}
    >
      {children}
    </Link>
  );
}

export function WhatsAppLink({
  children,
  className = "",
  message,
}: {
  children: ReactNode;
  className?: string;
  message?: string;
}) {
  const href = message
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_URL;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-paper">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

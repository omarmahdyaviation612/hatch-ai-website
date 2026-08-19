import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconMegaphone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 16v8h4l14 8V8L10 16H6Z" />
      <path d="M24 15c2 1.2 2 6.8 0 8" />
      <path d="M29 12c3.2 2.4 3.2 11.6 0 14" />
      <path d="M11 24l2 8" />
    </svg>
  );
}

export function IconChip(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="12" y="12" width="16" height="16" rx="2.4" />
      <rect x="16.5" y="16.5" width="7" height="7" rx="1" />
      <path d="M12 17H6M12 23H6M34 17h-6M34 23h-6M17 12V6M23 12V6M17 34v-6M23 34v-6" />
    </svg>
  );
}

export function IconCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="8" width="30" height="24" rx="3" />
      <path d="M15 16l-5 4 5 4M25 16l5 4-5 4M22 15l-4 10" />
    </svg>
  );
}

export function IconMobile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="11" y="5" width="18" height="30" rx="3.4" />
      <path d="M11 10h18M11 30h18" />
      <circle cx="20" cy="32.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconBrand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6c8 0 14 6 14 12.5 0 4-2.5 6-6 6h-2.6c-1.5 0-2.4 1.7-1.5 3l.6.9c.9 1.3 0 3.1-1.6 3.1H20C12.3 31.5 6 25.3 6 18.5 6 12 12 6 20 6Z" />
      <circle cx="14.5" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="20" cy="13.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="26" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

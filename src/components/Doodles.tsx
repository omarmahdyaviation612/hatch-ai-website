/**
 * Loose, hand-drawn line icons that echo the dashed-doodle motifs in the
 * HATCH.AI reference brand poster (rocket / bulb / growth / users).
 * Redrawn as simple original line art — used sparingly as ambient
 * background texture, never as the focal content.
 */
import type { SVGProps } from "react";

export function DoodleRocket(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M32 6c8 6 10 16 8 28l-16 0c-2-12 0-22 8-28Z" strokeLinejoin="round" />
      <circle cx="32" cy="22" r="3.2" />
      <path d="M24 34c-6 2-8 8-8 14 5-1 10-4 12-9" strokeLinejoin="round" />
      <path d="M40 34c6 2 8 8 8 14-5-1-10-4-12-9" strokeLinejoin="round" />
      <path d="M28 46l-2 10 6-4 6 4-2-10" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleBulb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M32 8c-9 0-16 7-16 15 0 6 3 9.5 6 12.5 1.7 1.7 2.5 3 2.5 5.5h15c0-2.5.8-3.8 2.5-5.5 3-3 6-6.5 6-12.5 0-8-7-15-16-15Z" />
      <path d="M25 48h14M27 53h10" strokeLinecap="round" />
      <path d="M32 16v10M26 24l4 3M38 24l-4 3" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleGrowth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M8 52h48" strokeLinecap="round" />
      <rect x="14" y="36" width="7" height="16" rx="1" />
      <rect x="27" y="26" width="7" height="26" rx="1" />
      <rect x="40" y="16" width="7" height="36" rx="1" />
      <path d="M14 20l10-8 8 6 12-10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 8h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleUsers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="24" cy="20" r="7" />
      <path d="M10 46c1-9 6-14 14-14s13 5 14 14" strokeLinecap="round" />
      <circle cx="44" cy="24" r="5.5" />
      <path d="M40 46c0-6.5 3-11 9-12" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleTarget(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="12" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      <path d="M46 8l4 4-8 8-4-4Z" strokeLinejoin="round" />
    </svg>
  );
}

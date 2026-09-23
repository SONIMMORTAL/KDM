import { extendTailwindMerge } from "tailwind-merge";

import { siteConfig } from "@/config/site";

// Register our custom utilities (globals.css) so tailwind-merge doesn't mistake
// `font-soft` for a font family or `text-gold-foil` for a text color and drop the real ones.
const twMerge = extendTailwindMerge<"font-axes" | "text-fill">({
  extend: {
    classGroups: {
      "font-axes": ["font-soft", "font-wonk"],
      "text-fill": ["text-gold-foil", "text-outline-gold"],
    },
  },
});

/** Join class names; later Tailwind classes win conflicts (e.g. `relative` → `absolute`). */
export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

/** 300 -> "$3", 350 -> "$3.50" */
export function formatPrice(cents: number) {
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}

export const telHref = `tel:${siteConfig.phone.e164}`;

/** `?&body=` is the form both iOS Messages and Android accept. */
export function smsHref(body = "Hi KDM! I'd like to order: ") {
  return `sms:${siteConfig.phone.e164}?&body=${encodeURIComponent(body)}`;
}

/**
 * Scalloped circle path: the empanada's crimped edge as a shape.
 * Drawn in a 200×200 viewBox by default.
 */
export function crimpPath({ cx = 100, cy = 100, r = 90, bumps = 36, depth = 4 } = {}) {
  const step = (Math.PI * 2) / bumps;
  const pt = (angle: number, radius: number) =>
    `${(cx + radius * Math.cos(angle)).toFixed(2)} ${(cy + radius * Math.sin(angle)).toFixed(2)}`;
  let d = `M ${pt(0, r)}`;
  for (let i = 0; i < bumps; i++) {
    d += ` Q ${pt(i * step + step / 2, r + depth * 2)} ${pt((i + 1) * step, r)}`;
  }
  return `${d} Z`;
}

/** Short radial "fork marks" centered on each crimp bump. */
export function crimpMarks({ cx = 100, cy = 100, r = 90, bumps = 36, depth = 4 } = {}) {
  const step = (Math.PI * 2) / bumps;
  return Array.from({ length: bumps }, (_, i) => {
    const a = i * step + step / 2;
    const inner = r - depth * 1.6;
    const outer = r + depth * 0.7;
    return `M ${(cx + inner * Math.cos(a)).toFixed(2)} ${(cy + inner * Math.sin(a)).toFixed(2)} L ${(cx + outer * Math.cos(a)).toFixed(2)} ${(cy + outer * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

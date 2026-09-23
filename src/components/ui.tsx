import type { ComponentProps, ReactNode } from "react";

import { cn, crimpMarks, crimpPath } from "@/lib/utils";

const buttonVariants = {
  gold: "bg-[linear-gradient(180deg,#ffe29c_0%,#f5b93f_55%,#dc9723_100%)] text-night shadow-[0_12px_32px_-12px_rgba(255,170,50,0.75),inset_0_1px_0_rgba(255,255,255,0.65)] hover:shadow-[0_18px_48px_-10px_rgba(255,170,50,0.9),inset_0_1px_0_rgba(255,255,255,0.65)] hover:-translate-y-0.5",
  ghost: "border border-cream/25 text-cream hover:border-cream/50 hover:bg-cream/[0.07]",
  cream: "bg-cream text-crimson-deep shadow-[0_12px_32px_-14px_rgba(0,0,0,0.6)] hover:bg-white hover:-translate-y-0.5",
  outline: "border border-cream/40 text-cream hover:border-cream/70 hover:bg-cream/10",
  dark: "bg-night text-cream hover:bg-char hover:-translate-y-0.5",
} as const;

const buttonSizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
} as const;

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function ButtonLink({ variant = "gold", size = "md", className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-extrabold tracking-tight whitespace-nowrap transition duration-300 ease-out",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-extrabold tracking-[0.28em] uppercase", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** The crimped pastry edge as a badge: gold scallops, fork marks, content in the middle. */
export function CrimpBadge({
  children,
  className,
  fill = "url(#crimp-gold)",
}: {
  children: ReactNode;
  className?: string;
  fill?: string;
}) {
  return (
    <span className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]">
        <path d={crimpPath({ r: 86, bumps: 22, depth: 5 })} fill={fill} />
        <path d={crimpMarks({ r: 86, bumps: 22, depth: 5 })} stroke="#8a5a12" strokeOpacity="0.45" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/** Shared SVG gradient defs, rendered once in the layout. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <linearGradient id="crimp-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe8a8" />
          <stop offset="0.45" stopColor="#f5bd45" />
          <stop offset="1" stopColor="#c7841d" />
        </linearGradient>
        <linearGradient id="crimp-crust" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="0.5" stopColor="#e9a23a" />
          <stop offset="1" stopColor="#b8701a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

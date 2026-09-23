import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 21.2 3.9 13.3C1.6 11 1.6 7.4 3.9 5.2a5.1 5.1 0 0 1 7.2 0l.9.9.9-.9a5.1 5.1 0 0 1 7.2 7.2L12 21.2Z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.6} />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12.3 2.5c.5 2.9 2.3 4.6 3.9 6.2 1.6 1.6 3 3.2 3 6A7.2 7.2 0 0 1 12 21.8a7.2 7.2 0 0 1-7.2-7.1c0-2.2 1-3.9 2.3-5.1-.1 1.7.6 3 1.9 3.6-.4-3.9 1.2-7.6 3.3-10.7Zm-.2 10.1c-1.6 1.4-2.6 2.8-2.6 4.4a2.6 2.6 0 0 0 5.2 0c0-1.6-1.1-2.9-2.6-4.4Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 2.5c.6 4.6 2.7 7.4 7.5 9.5-4.8 2.1-6.9 4.9-7.5 9.5-.6-4.6-2.7-7.4-7.5-9.5 4.8-2.1 6.9-4.9 7.5-9.5Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** Dominican Republic flag, simplified (no coat of arms) for small sizes. */
export function DrFlag(props: IconProps) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#fff" />
      <rect width="13" height="8.5" fill="#002D62" />
      <rect x="17" width="13" height="8.5" fill="#CE1126" />
      <rect y="11.5" width="13" height="8.5" fill="#CE1126" />
      <rect x="17" y="11.5" width="13" height="8.5" fill="#002D62" />
    </svg>
  );
}

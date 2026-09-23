"use client";

import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";

type Link = { href: string; label: string };

export function MobileNav({ links, children }: { links: readonly Link[]; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="grid size-11 place-items-center rounded-full border border-cream/20 text-cream transition hover:bg-cream/10 md:hidden"
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-cream/10 bg-night px-6 pt-8 pb-12 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-cream/10 py-4 font-display text-4xl font-bold text-cream font-soft"
                >
                  <span className="font-sans text-xs font-bold text-gold">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10" onClick={() => setOpen(false)}>
          {children}
        </div>
      </div>
    </>
  );
}

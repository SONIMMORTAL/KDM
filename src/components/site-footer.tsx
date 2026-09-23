import Image from "next/image";

import logo from "@/assets/brand/logo.png";
import { ChatIcon, HeartIcon, InstagramIcon, PhoneIcon } from "@/components/icons";
import { navLinks, siteConfig } from "@/config/site";
import { smsHref, telHref } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-cream/10 bg-soot pt-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
          <Image src={logo} alt={`${siteConfig.name} logo`} sizes="128px" className="h-32 w-auto shrink-0 sm:h-36" />
          <div>
            <p className="font-display text-3xl leading-none font-black text-cream font-soft">KDM</p>
            <p className="mt-1.5 text-[11px] font-extrabold tracking-[0.3em] text-gold uppercase">Tasty Temptations</p>
            <p className="mt-5 max-w-xs leading-relaxed text-cream/65">
              Dominican-style empanadas. Food made with love, straight from the DR.
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-extrabold tracking-[0.24em] text-cream/45 uppercase">Explore</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-semibold text-cream/80 transition hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-extrabold tracking-[0.24em] text-cream/45 uppercase">Order &amp; say hi</p>
          <ul className="mt-5 space-y-3 font-semibold text-cream/80">
            <li>
              <a href={smsHref()} className="inline-flex items-center gap-2.5 transition hover:text-gold">
                <ChatIcon className="size-4 text-gold" /> Text {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a href={telHref} className="inline-flex items-center gap-2.5 transition hover:text-gold">
                <PhoneIcon className="size-4 text-gold" /> Call {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition hover:text-gold"
              >
                <InstagramIcon className="size-4 text-gold" /> @{siteConfig.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-16 pr-[2vw] text-center font-display text-[14.5vw] leading-[0.8] font-black tracking-[-0.045em] whitespace-nowrap text-gold-foil italic select-none font-wonk"
      >
        Pull up. Eat up.
      </p>

      <div className="relative border-t border-cream/10 bg-night">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-cream/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            {siteConfig.tagline} <HeartIcon className="size-3.5 text-crimson" />
          </p>
        </div>
      </div>
    </footer>
  );
}

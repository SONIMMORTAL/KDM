import Image from "next/image";

import logo from "@/assets/brand/logo.png";
import { ArrowRightIcon, ChatIcon, PhoneIcon } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { ButtonLink } from "@/components/ui";
import { navLinks, siteConfig } from "@/config/site";
import { smsHref, telHref } from "@/lib/utils";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-crimson text-cream">
      <a
        href={smsHref()}
        className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2.5 text-center text-[13px] font-semibold tracking-tight hover:underline"
      >
        <span className="hidden sm:inline">Online ordering is on the way.</span>
        <span>
          Text <span className="font-extrabold whitespace-nowrap">{siteConfig.phone.display}</span> to order now
        </span>
        <ArrowRightIcon className="size-3.5" />
      </a>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${siteConfig.name}: back to top`}>
          <Image
            src={logo}
            alt=""
            sizes="48px"
            className="h-13 w-auto drop-shadow-[0_4px_14px_rgba(255,120,40,0.35)] transition duration-500 group-hover:rotate-[-4deg]"
            loading="eager"
          />
          <span className="leading-none">
            <span className="block font-display text-2xl font-black tracking-tight text-cream font-soft">KDM</span>
            <span className="mt-1 block text-[10px] font-extrabold tracking-[0.3em] text-gold uppercase">
              Tasty Temptations
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-bold text-cream/80 transition hover:bg-cream/[0.07] hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={smsHref()} size="sm" className="hidden sm:inline-flex">
            <ChatIcon className="size-4" />
            Text to order
          </ButtonLink>
          <MobileNav links={navLinks}>
            <div className="grid gap-3">
              <ButtonLink href={smsHref()} size="lg">
                <ChatIcon className="size-5" /> Text {siteConfig.phone.display}
              </ButtonLink>
              <ButtonLink href={telHref} size="lg" variant="ghost">
                <PhoneIcon className="size-5" /> Call us
              </ButtonLink>
            </div>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";

import heroBeef from "@/assets/food/hero-beef.jpg";
import heroChickenBroccoli from "@/assets/food/hero-chicken-broccoli.jpg";
import { ArrowDownIcon, ChatIcon, DrFlag, FlameIcon, HeartIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { flavors, getFlavor, priceRange } from "@/data/menu";
import { cn, crimpMarks, crimpPath, formatPrice, smsHref } from "@/lib/utils";

// Deterministic "random" embers so server and client markup always match.
const embers = [
  { x: "6%", s: 5, d: 9, delay: 0 },
  { x: "14%", s: 3, d: 12, delay: 3 },
  { x: "23%", s: 6, d: 10, delay: 6 },
  { x: "31%", s: 3, d: 13, delay: 1.5 },
  { x: "42%", s: 4, d: 11, delay: 4.5 },
  { x: "51%", s: 3, d: 14, delay: 8 },
  { x: "58%", s: 5, d: 9.5, delay: 2 },
  { x: "66%", s: 4, d: 12.5, delay: 5.5 },
  { x: "74%", s: 6, d: 10.5, delay: 0.8 },
  { x: "81%", s: 3, d: 13.5, delay: 7 },
  { x: "88%", s: 5, d: 11.5, delay: 3.6 },
  { x: "95%", s: 3, d: 12, delay: 9 },
];

export function Hero() {
  const oxtail = getFlavor("oxtail-mac-n-cheese");
  const jerk = getFlavor("jerk-chicken");

  return (
    <section id="top" className="relative isolate -mt-18 overflow-hidden pt-18">
      {/* Fire-glow backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow absolute top-[-18%] right-[-22%] size-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,110,30,0.42),rgba(200,16,46,0.22)_45%,transparent_72%)] blur-2xl" />
        <div className="absolute bottom-[-45%] left-[-25%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(200,16,46,0.3),transparent_70%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-night" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {embers.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={
              {
                "--x": e.x,
                "--s": `${e.s}px`,
                "--d": `${e.d}s`,
                "--delay": `${e.delay}s`,
                "--drift": `${(i % 2 ? -1 : 1) * (12 + (i % 4) * 9)}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-10 pb-20 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/[0.06] py-1.5 pr-4 pl-2 text-xs font-bold tracking-[0.2em] text-cream/90 uppercase backdrop-blur">
            <DrFlag className="h-4 w-6 rounded-[3px] shadow" />
            {siteConfig.heritage}
          </p>

          <h1 className="mt-7 font-display leading-[0.84] font-black tracking-[-0.035em] text-cream font-soft">
            <span className="hero-rise block text-[clamp(4.5rem,21vw,9.5rem)] [animation-delay:80ms] lg:text-[clamp(7rem,15.5vw,11rem)]">
              Pull up.
            </span>
            <span className="hero-rise block pb-3 text-[clamp(4.5rem,21vw,9.5rem)] italic text-gold-foil font-wonk [animation-delay:180ms] lg:text-[clamp(7rem,15.5vw,11rem)]">
              Eat up.
            </span>
          </h1>

          <p className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-cream/80 [animation-delay:280ms] md:text-xl">
            Golden, crispy empanadas stuffed with everything from oxtail &amp; mac n cheese to jerk chicken.{" "}
            <span className="font-bold text-cream">Food made with love.</span>
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-3 [animation-delay:380ms] sm:flex-row">
            <ButtonLink href={smsHref()} size="lg">
              <ChatIcon className="size-5" />
              Text your order
            </ButtonLink>
            <ButtonLink href="#menu" size="lg" variant="ghost">
              See the menu
              <ArrowDownIcon className="size-4" />
            </ButtonLink>
          </div>

          <dl className="hero-rise mt-12 grid grid-cols-[repeat(3,auto)] justify-start gap-x-7 border-t border-cream/10 pt-7 [animation-delay:480ms] sm:gap-x-10">
            <Stat value={String(flavors.length)} label="Flavors" />
            <Stat value={`${formatPrice(priceRange.min)}–${formatPrice(priceRange.max)}`} label="Each" />
            <Stat value={<HeartIcon className="size-7 text-crimson" />} label="Made with love" />
          </dl>
        </div>

        <div className="lg:col-span-5">
          <HeroPlate
            tags={[
              { name: oxtail.name, price: oxtail.priceCents, className: "top-[6%] -left-[3%] rotate-[-7deg] sm:-left-[8%]" },
              { name: jerk.name, price: jerk.priceCents, heat: true, className: "bottom-[14%] -right-[2%] rotate-[5deg] [animation-delay:-3s] sm:-right-[6%]" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 mt-1 text-[11px] font-bold tracking-[0.16em] text-cream/55 uppercase sm:text-xs sm:tracking-[0.2em]">
        {label}
      </dt>
      <dd className="order-1 flex h-9 items-center font-display text-3xl font-black whitespace-nowrap text-cream font-soft sm:text-4xl">
        {value}
      </dd>
    </div>
  );
}

type Tag = { name: string; price: number | null; heat?: boolean; className: string };

function HeroPlate({ tags }: { tags: Tag[] }) {
  return (
    <div className="hero-rise relative mx-auto aspect-square w-full max-w-[34rem] [animation-delay:250ms]">
      {/* Rotating ring of type */}
      <svg viewBox="0 0 200 200" aria-hidden="true" className="spin-slow absolute inset-0 size-full font-sans">
        <defs>
          <path id="ring-path" d="M 100,100 m -93,0 a 93,93 0 1,1 186,0 a 93,93 0 1,1 -186,0" />
        </defs>
        <text className="fill-gold/90 text-[7px] font-extrabold tracking-[0.2em] uppercase">
          <textPath href="#ring-path" textLength="580" lengthAdjust="spacing">
            Food made with love ✦ Pull up ✦ Eat up ✦ Straight from the DR ✦
          </textPath>
        </text>
      </svg>

      {/* Crimped crust framing the photo */}
      <div className="absolute inset-[9%]">
        <div className="absolute inset-[-6%] rounded-full bg-[radial-gradient(closest-side,rgba(255,140,40,0.5),transparent)] blur-2xl" />
        <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <path d={crimpPath({ r: 91, bumps: 40, depth: 3.4 })} fill="url(#crimp-crust)" />
          <path d={crimpMarks({ r: 91, bumps: 40, depth: 3.4 })} stroke="#7a4410" strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-[9%] overflow-hidden rounded-full shadow-[inset_0_0_0_3px_rgba(122,68,16,0.35)]">
          <Image
            src={heroChickenBroccoli}
            alt="Chicken and broccoli empanada broken open to show the filling"
            fill
            sizes="(min-width: 1024px) 420px, 76vw"
            quality={85}
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            className="scale-[1.12] object-cover object-[60%_45%]"
          />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(40,15,0,0.45)]" />
        </div>
      </div>

      {/* Second plate */}
      <div className="absolute bottom-[-3%] left-[-2%] w-[33%] sm:left-[-5%]">
        <div className="relative aspect-square">
          <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)]">
            <path d={crimpPath({ r: 88, bumps: 24, depth: 5 })} fill="url(#crimp-crust)" />
          </svg>
          <div className="absolute inset-[11%] overflow-hidden rounded-full">
            <Image
              src={heroBeef}
              alt="Beef empanada broken open to show the filling"
              fill
              sizes="180px"
              placeholder="blur"
              className="scale-125 object-cover object-[45%_40%]"
            />
          </div>
        </div>
      </div>

      {tags.map((tag) => (
        <div key={tag.name} className={cn("float-y absolute", tag.className)}>
          <div className="flex items-center gap-3 rounded-2xl bg-cream py-2.5 pr-3 pl-4 text-cocoa shadow-[0_20px_40px_-12px_rgba(0,0,0,0.65)]">
            <div className="leading-tight">
              <p className="flex items-center gap-1 text-[10px] font-extrabold tracking-[0.18em] text-crimson uppercase">
                {tag.heat ? <FlameIcon className="size-3" /> : <HeartIcon className="size-3" />}
                {tag.heat ? "Brings the heat" : "Top of the menu"}
              </p>
              <p className="font-display text-base font-bold font-soft">{tag.name}</p>
            </div>
            {tag.price !== null && (
              <span className="grid size-11 place-items-center rounded-full bg-night font-display text-lg font-black text-gold">
                {formatPrice(tag.price)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

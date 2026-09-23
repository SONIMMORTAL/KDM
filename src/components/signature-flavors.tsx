import Image from "next/image";

import { FlameIcon, SparkleIcon } from "@/components/icons";
import { CrimpBadge, Eyebrow } from "@/components/ui";
import { type Flavor, getFlavor } from "@/data/menu";
import { cn, formatPrice } from "@/lib/utils";

export function SignatureFlavors() {
  const [chickenBroccoli, beef, jerk, mango] = ["chicken-broccoli", "beef", "jerk-chicken", "mango-habanero"].map(getFlavor);
  const more = ["shrimp-broccoli", "sausage-onions", "chicken"].map(getFlavor);

  return (
    <section id="flavors" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-gold">The signatures</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] font-black tracking-[-0.03em] text-cream font-soft">
              Flavors worth <em className="text-gold-foil font-wonk">pulling up</em> for.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-cream/70">
            Crispy, crimped and golden on the outside. Loaded on the inside. New here? Start with these.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12">
          <FlavorTile flavor={chickenBroccoli} className="md:col-span-7 md:row-span-2 md:min-h-[38rem]" sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw" large />
          <FlavorTile flavor={beef} className="md:col-span-5 md:row-span-2" sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw" large />
          <FlavorTile flavor={jerk} className="md:col-span-7" sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw" />
          <FlavorTile flavor={mango} className="md:col-span-5" sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw" />
        </div>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {more.map((flavor) => (
            <li key={flavor.id} className="reveal">
              <FlavorChip flavor={flavor} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tags({ flavor }: { flavor: Flavor }) {
  if (!flavor.tags?.length) return null;
  return (
    <div className="flex gap-2">
      {flavor.tags.includes("new") && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-crimson px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] text-cream uppercase">
          <SparkleIcon className="size-3" /> New
        </span>
      )}
      {flavor.tags.includes("heat") && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] text-flame uppercase backdrop-blur">
          <FlameIcon className="size-3" /> Heat
        </span>
      )}
    </div>
  );
}

function FlavorTile({
  flavor,
  className,
  sizes,
  large,
}: {
  flavor: Flavor;
  className?: string;
  sizes: string;
  large?: boolean;
}) {
  return (
    <article
      className={cn(
        "reveal group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-char ring-1 ring-cream/10",
        className,
      )}
    >
      {flavor.image && (
        <Image
          src={flavor.image}
          alt={flavor.imageAlt ?? flavor.name}
          fill
          sizes={sizes}
          quality={85}
          placeholder="blur"
          className="-z-10 object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-night via-night/55 to-transparent to-75%" />

      {flavor.priceCents !== null && (
        <CrimpBadge className="absolute top-5 right-5 size-20 rotate-[10deg] transition duration-500 group-hover:rotate-[-6deg]">
          <span className="font-display text-2xl font-black text-night font-soft">{formatPrice(flavor.priceCents)}</span>
        </CrimpBadge>
      )}

      <div className="p-7 md:p-9">
        <Tags flavor={flavor} />
        <h3
          className={cn(
            "mt-3 font-display leading-[0.95] font-black tracking-[-0.02em] text-cream font-soft",
            large ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
          )}
        >
          {flavor.name}
        </h3>
        {flavor.description && <p className="mt-3 max-w-md text-base leading-relaxed text-cream/80 md:text-lg">{flavor.description}</p>}
      </div>
    </article>
  );
}

function FlavorChip({ flavor }: { flavor: Flavor }) {
  return (
    <article className="group flex h-full items-center gap-5 rounded-[1.75rem] bg-char/80 p-4 pr-6 ring-1 ring-cream/10 transition hover:bg-char hover:ring-gold/30">
      {flavor.image && (
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 md:size-28">
          <Image
            src={flavor.image}
            alt={flavor.imageAlt ?? flavor.name}
            fill
            sizes="112px"
            placeholder="blur"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight font-black text-cream font-soft">{flavor.name}</h3>
          {flavor.priceCents !== null && (
            <span className="font-display text-xl font-black text-gold">{formatPrice(flavor.priceCents)}</span>
          )}
        </div>
        {flavor.description && <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{flavor.description}</p>}
      </div>
    </article>
  );
}

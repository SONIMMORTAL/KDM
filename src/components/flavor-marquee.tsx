import { HeartIcon, SparkleIcon } from "@/components/icons";
import { flavors } from "@/data/menu";
import { cn } from "@/lib/utils";

/** Two crossed "tapes" of flavor names. Decorative: the full menu below carries the same content. */
export function FlavorMarquee() {
  const names = flavors.map((f) => f.name);
  const half = Math.ceil(names.length / 2);

  return (
    <section aria-hidden="true" className="relative h-60 overflow-hidden md:h-72">
      <Tape
        items={[...names.slice(half), ...names.slice(0, half)]}
        reverse
        className="top-[34%] rotate-[7deg] bg-gold text-night md:top-1/2 md:rotate-[3.5deg]"
        separator={<SparkleIcon className="size-5 text-crimson" />}
      />
      <Tape
        items={names}
        className="top-[64%] -rotate-[5deg] bg-crimson text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] md:top-1/2 md:-rotate-[3deg]"
        separator={<HeartIcon className="size-5 text-gold" />}
      />
    </section>
  );
}

function Tape({
  items,
  reverse,
  className,
  separator,
}: {
  items: string[];
  reverse?: boolean;
  className: string;
  separator: React.ReactNode;
}) {
  // Rendered twice so a -50% translate loops seamlessly.
  const run = (
    <div className="flex shrink-0 items-center gap-7 pr-7">
      {items.map((name) => (
        <span key={name} className="flex items-center gap-7">
          <span className="font-display text-3xl font-black whitespace-nowrap italic font-wonk md:text-[2.6rem]">{name}</span>
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("absolute top-1/2 left-[-5%] w-[110%] -translate-y-1/2 py-4 md:py-5", className)}>
      <div className={cn("marquee flex w-max", reverse && "marquee-reverse")}>
        {run}
        {run}
      </div>
    </div>
  );
}

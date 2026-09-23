import { ChatIcon, FlameIcon, HeartIcon, SparkleIcon } from "@/components/icons";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { flavors, menuTiers } from "@/data/menu";
import { formatPrice, smsHref } from "@/lib/utils";

/** The printed-menu moment: cream paper, crimped edges, big prices. */
export function MenuBoard() {
  return (
    <section id="menu" className="crimp-edges paper relative py-28 text-cocoa md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <header className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow className="text-crimson">The full lineup</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(3.25rem,9vw,7rem)] leading-[0.88] font-black tracking-[-0.035em] font-soft">
              The Menu
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-cocoa/75 md:text-right">
            {flavors.length} flavors, one crispy golden crust. Prices are per empanada.
          </p>
        </header>

        <div className="mt-12 border-t-2 border-cocoa/80">
          {menuTiers.map((tier) => (
            <div
              key={tier.priceCents ?? "ask"}
              className="reveal grid gap-5 border-b border-dashed border-cocoa/25 py-8 md:grid-cols-[11rem_1fr] md:gap-10 md:py-10"
            >
              <div className="flex items-baseline gap-2 md:flex-col md:gap-0">
                <span className="font-display text-7xl leading-none font-black tracking-tight text-crimson font-soft md:text-8xl">
                  {tier.priceCents === null ? "Ask" : formatPrice(tier.priceCents)}
                </span>
                <span className="text-xs font-extrabold tracking-[0.22em] text-cocoa/75 uppercase md:mt-2">
                  {tier.priceCents === null ? "Text for price" : "Each"}
                </span>
              </div>

              <ul className="grid content-center gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {tier.items.map((flavor) => (
                  <li key={flavor.id} className="flex items-baseline gap-3">
                    <HeartIcon className="size-3.5 shrink-0 translate-y-px text-crimson/80" />
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="font-display text-xl leading-snug font-bold font-soft md:text-[1.35rem]">{flavor.name}</span>
                      {flavor.tags?.includes("new") && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-crimson px-2 py-0.5 text-[10px] font-extrabold tracking-[0.16em] text-cream uppercase">
                          <SparkleIcon className="size-2.5" /> New
                        </span>
                      )}
                      {flavor.tags?.includes("heat") && (
                        <FlameIcon className="size-4 shrink-0 text-ember-deep" aria-label="Spicy" role="img" aria-hidden={false} />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-cocoa px-7 py-7 text-cream md:flex-row md:items-center md:px-10">
          <div>
            <p className="font-display text-3xl font-black font-soft">Know what you want?</p>
            <p className="mt-1 text-cream/75">Text us your flavors and how many. We&rsquo;ll confirm your order and total.</p>
          </div>
          <ButtonLink href={smsHref()} size="lg">
            <ChatIcon className="size-5" />
            Text your order
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

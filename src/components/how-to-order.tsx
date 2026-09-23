import { ChatIcon, InstagramIcon, PhoneIcon, SparkleIcon } from "@/components/icons";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { smsHref, telHref } from "@/lib/utils";

const steps = [
  { title: "Pick your flavors", body: "Scroll the menu and make your list. Take your time, it’s a long one." },
  { title: "Text or call us", body: `Hit ${siteConfig.phone.display} with your flavors and how many of each.` },
  { title: "Pull up & eat up", body: "We’ll confirm your order by text. Then come get it while it’s hot." },
];

export function HowToOrder() {
  return (
    <section id="order" className="relative isolate overflow-hidden bg-crimson-deep py-24 text-cream md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-40%] left-1/2 size-[90vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,40,50,0.55),transparent_70%)]" />
        <div className="absolute right-[-10%] bottom-[-50%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,120,30,0.35),transparent_70%)] blur-xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center text-gold">Order now</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] font-black tracking-[-0.03em] font-soft">
            Hungry? Here&rsquo;s how to <em className="text-gold-foil font-wonk">get yours.</em>
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal relative overflow-hidden rounded-[2rem] bg-night/25 p-8 ring-1 ring-cream/15 backdrop-blur-sm">
              <span aria-hidden="true" className="text-outline-gold absolute -top-4 right-4 font-display text-[7.5rem] leading-none font-black italic">
                {i + 1}
              </span>
              <p className="relative text-xs font-extrabold tracking-[0.24em] text-gold uppercase">Step {i + 1}</p>
              <h3 className="relative mt-3 font-display text-3xl font-black font-soft">{step.title}</h3>
              <p className="relative mt-2 leading-relaxed text-cream/80">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={smsHref()} size="lg" variant="cream" className="w-full sm:w-auto">
            <ChatIcon className="size-5" /> Text {siteConfig.phone.display}
          </ButtonLink>
          <ButtonLink href={telHref} size="lg" variant="outline" className="w-full sm:w-auto">
            <PhoneIcon className="size-5" /> Call us
          </ButtonLink>
          <ButtonLink href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" size="lg" variant="outline" className="w-full sm:w-auto">
            <InstagramIcon className="size-5" /> DM @{siteConfig.instagram.handle}
          </ButtonLink>
        </div>

        {!siteConfig.features.onlineOrdering && (
          <p className="reveal mx-auto mt-10 max-w-xl text-center text-sm font-semibold text-balance text-cream/75">
            <SparkleIcon className="mr-2 inline size-4 -translate-y-px text-gold" />
            Coming soon: online ordering and order tracking, right here.
          </p>
        )}
      </div>
    </section>
  );
}

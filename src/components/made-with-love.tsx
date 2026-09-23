import Image, { type StaticImageData } from "next/image";

import realCloseup from "@/assets/photos/real-closeup.jpg";
import realFoil from "@/assets/photos/real-foil-closeup.jpg";
import realTray from "@/assets/photos/real-tray.jpg";
import { DrFlag, FlameIcon, HeartIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui";
import { cn } from "@/lib/utils";

// Stacked top-to-bottom (first = highest) so every caption stays visible.
const photos: { src: StaticImageData; alt: string; caption: string; className: string }[] = [
  {
    src: realTray,
    alt: "A foil tray lined with paper towel, piled with golden fried KDM empanadas",
    caption: "fresh batch ♥",
    className: "left-0 top-0 z-30 w-[54%] rotate-[-5deg]",
  },
  {
    src: realFoil,
    alt: "Close-up of golden, bubbly KDM empanadas in a foil-lined container",
    caption: "golden & crispy",
    className: "right-0 top-[9%] z-20 w-[52%] rotate-[4deg]",
  },
  {
    src: realCloseup,
    alt: "Overhead close-up of crimped KDM empanadas with blistered, crispy crust",
    caption: "pull up!",
    className: "left-[24%] bottom-0 z-10 w-[46%] rotate-[2deg]",
  },
];

const pillars = [
  {
    icon: <HeartIcon className="size-5" />,
    title: "Food made with love",
    body: "It’s written on the chef’s hat for a reason.",
  },
  {
    icon: <DrFlag className="h-4 w-6 rounded-[2px]" />,
    title: "Straight from the DR",
    body: "Dominican roots in every fold and crimp.",
  },
  {
    icon: <FlameIcon className="size-5" />,
    title: "Pull up, eat up",
    body: "Grab a few. Or a dozen. We won’t judge.",
  },
];

export function MadeWithLove() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 left-[-20%] -z-10 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(200,16,46,0.2),transparent_70%)] blur-2xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative mx-auto aspect-[1/1.12] w-full max-w-xl">
          {photos.map((photo) => (
            <figure
              key={photo.caption}
              className={cn(
                "absolute bg-cream p-2.5 pb-11 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] transition duration-500 hover:scale-[1.03] hover:rotate-0",
                photo.className,
                "hover:z-40",
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-char">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 320px, 50vw" placeholder="blur" className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-display text-lg text-cocoa italic font-wonk">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
          <p className="absolute top-[44%] -left-2 z-50 -rotate-[8deg] rounded-full bg-crimson px-4 py-2 text-[11px] font-extrabold tracking-[0.2em] text-cream uppercase shadow-xl sm:-left-6">
            Real photos. Real empanadas.
          </p>
        </div>

        <div className="reveal">
          <Eyebrow className="text-gold">About KDM</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.92] font-black tracking-[-0.03em] text-cream font-soft">
            Straight from the DR. <em className="text-gold-foil font-wonk">Made with love.</em>
          </h2>
          <div className="mt-7 space-y-5 text-lg leading-relaxed text-cream/75">
            <p>
              Every KDM empanada gets folded, crimped and fried until the crust bubbles up golden and crisp, Dominican
              style.
            </p>
            <p>
              Then we fill it with whatever you&rsquo;re craving: oxtail &amp; mac n cheese, Philly cheese steak, garlic
              salmon &amp; butter shrimp, jerk chicken, lasagna, and a whole lot more.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="rounded-3xl bg-char/70 p-5 ring-1 ring-cream/10">
                <span className="grid size-10 place-items-center rounded-full bg-gold/15 text-gold">{pillar.icon}</span>
                <p className="mt-4 font-display text-lg leading-tight font-bold text-cream font-soft">{pillar.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/65">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

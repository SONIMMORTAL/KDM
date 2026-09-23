import { FlavorMarquee } from "@/components/flavor-marquee";
import { Hero } from "@/components/hero";
import { HowToOrder } from "@/components/how-to-order";
import { MadeWithLove } from "@/components/made-with-love";
import { MenuBoard } from "@/components/menu-board";
import { SignatureFlavors } from "@/components/signature-flavors";
import { AnnouncementBar, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import { menuTiers } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

// schema.org data so search engines can read the menu and contact info.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: siteConfig.name,
  slogan: siteConfig.tagline,
  servesCuisine: ["Dominican", "Caribbean"],
  telephone: siteConfig.phone.e164,
  url: siteConfig.url,
  sameAs: [siteConfig.instagram.url],
  hasMenu: {
    "@type": "Menu",
    name: "Empanadas",
    hasMenuSection: menuTiers
      .filter((tier) => tier.priceCents !== null)
      .map((tier) => ({
        "@type": "MenuSection",
        name: `${formatPrice(tier.priceCents!)} empanadas`,
        hasMenuItem: tier.items.map((flavor) => ({
          "@type": "MenuItem",
          name: `${flavor.name} Empanada`,
          ...(flavor.description && { description: flavor.description }),
          offers: { "@type": "Offer", price: (tier.priceCents! / 100).toFixed(2), priceCurrency: "USD" },
        })),
      })),
  },
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-night"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <FlavorMarquee />
        <SignatureFlavors />
        <MenuBoard />
        <MadeWithLove />
        <HowToOrder />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        // Static data defined above; `<` escaped so the JSON can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

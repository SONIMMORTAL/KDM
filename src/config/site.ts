/**
 * Business details: the single source of truth for contact info and feature flags.
 * Sources: KDM's "Empanadas Menu" flyer (phone, @handle, "Pull up!! Eat up!!",
 * "Straight from DR") and the official logo ("Food made with love").
 */
export const siteConfig = {
  name: "KDM Tasty Temptations",
  shortName: "KDM",
  tagline: "Food made with love",
  slogan: "Pull up. Eat up.",
  heritage: "Straight from the DR",
  // TODO(launch): set NEXT_PUBLIC_SITE_URL to the real domain so share cards and the sitemap use it.
  // On Vercel it falls back to the project's production URL; locally, to localhost.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  phone: {
    display: "(516) 673-7899",
    e164: "+15166737899",
  },
  instagram: {
    handle: "kdmtastytemptations",
    url: "https://www.instagram.com/kdmtastytemptations/",
  },
  features: {
    /**
     * Flip on when Stripe checkout + order tracking ship.
     * Until then every order CTA routes to text / call / Instagram DM.
     */
    onlineOrdering: false,
  },
} as const;

export const navLinks = [
  { href: "#flavors", label: "Flavors" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#order", label: "Order" },
] as const;

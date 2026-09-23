/**
 * Canonical site URL for metadata, sitemap and structured data.
 * Blank values count as unset (Vercel keeps empty variables, e.g. one imported from
 * .env.example), and a bare domain like "kdm.com" gets https:// added.
 */
function resolveSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    "http://localhost:3000";
  try {
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be a full URL like https://example.com (got "${raw}")`);
  }
}

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
  heritage: "DR’s Finest", // hero badge; KDM's pick
  // TODO(launch): set NEXT_PUBLIC_SITE_URL to the real domain so share cards and the sitemap use it.
  // Until then: Vercel's production URL on Vercel, localhost locally.
  url: resolveSiteUrl(),
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

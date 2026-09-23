import type { StaticImageData } from "next/image";

import beefImg from "@/assets/food/beef.jpg";
import chickenImg from "@/assets/food/chicken.jpg";
import chickenBroccoliImg from "@/assets/food/chicken-broccoli.jpg";
import jerkChickenImg from "@/assets/food/jerk-chicken.jpg";
import mangoHabaneroImg from "@/assets/food/mango-habanero.jpg";
import sausageOnionsImg from "@/assets/food/sausage-onions.jpg";
import shrimpBroccoliImg from "@/assets/food/shrimp-broccoli.jpg";

export type FlavorTag = "new" | "heat";

export type Flavor = {
  /** Stable slug. Keys Stripe products/prices once online ordering ships. */
  id: string;
  name: string;
  /** Price per empanada in cents. `null` = not on the printed flyer yet; shown as "Ask". */
  priceCents: number | null;
  /** Copy lifted from KDM's own menus. Anything else is marked COPY below. */
  description?: string;
  tags?: FlavorTag[];
  image?: StaticImageData;
  imageAlt?: string;
};

/*
 * Source of truth: the "Empanadas Menu" flyer (17 flavors + prices), plus two flavors that
 * appear only on KDM's other menus (Chicken & Broccoli, Mango Habanero).
 * ASSUMPTION: flyer numbers (4 / 3 / 2) are USD per empanada. Confirm with KDM.
 */
export const flavors: Flavor[] = [
  { id: "oxtail-mac-n-cheese", name: "Oxtail & Mac N Cheese", priceCents: 400 },
  { id: "philly-cheese-steak", name: "Philly Cheese Steak", priceCents: 400 },
  { id: "garlic-salmon-butter-shrimp", name: "Garlic Salmon & Butter Shrimp", priceCents: 400 },
  { id: "lasagna", name: "Lasagna", priceCents: 400 },
  { id: "cheeseburger", name: "Cheeseburger", priceCents: 300 },
  { id: "pepper-steak", name: "Pepper Steak", priceCents: 300 },
  { id: "jerk-pork", name: "Jerk Pork", priceCents: 300 },
  {
    id: "jerk-chicken",
    name: "Jerk Chicken",
    priceCents: 300,
    description: "Jamaican-style jerk chicken. Smoky Caribbean heat with pimento, habanero and thyme.",
    tags: ["heat"],
    image: jerkChickenImg,
    imageAlt: "Jerk chicken empanadas broken open in a foil tray, next to red chili peppers",
  },
  { id: "vegetables", name: "Vegetables", priceCents: 300 },
  { id: "chicken-shrimp", name: "Chicken & Shrimp", priceCents: 300 },
  {
    id: "shrimp-broccoli",
    name: "Shrimp & Broccoli",
    priceCents: 300,
    description: "Succulent shrimp and fresh broccoli florets.",
    image: shrimpBroccoliImg,
    imageAlt: "Shrimp and broccoli empanada cut open on a wooden board",
  },
  { id: "franks-beans", name: "Franks & Beans", priceCents: 300 },
  {
    id: "beef",
    name: "Beef",
    priceCents: 300,
    // KDM's menus disagree (shredded with olives vs. ground); this line keeps to what both say.
    description: "Seasoned beef with traditional spices.",
    image: beefImg,
    imageAlt: "Beef empanada broken open to show seasoned beef filling with green olives",
  },
  {
    id: "chicken",
    name: "Chicken",
    priceCents: 300,
    // COPY (not from KDM materials): confirm or replace.
    description: "Savory chicken, golden crust. A classic for a reason.",
    image: chickenImg,
    imageAlt: "Chicken empanada cut open beside a swoosh of creamy herb dip",
  },
  { id: "barbecue", name: "Barbecue", priceCents: 300 },
  {
    // The flyer lists "Sausages"; KDM's other two menus call it Sausage & Onions.
    id: "sausage-onions",
    name: "Sausage & Onions",
    priceCents: 300,
    description: "Zesty sausage with sweet caramelized onions.",
    image: sausageOnionsImg,
    imageAlt: "A pile of golden sausage and onion empanadas with caramelized onion relish",
  },
  { id: "pizza", name: "Pizza", priceCents: 200 },
  {
    id: "chicken-broccoli",
    name: "Chicken & Broccoli",
    priceCents: null, // Not on the flyer: needs a price from KDM.
    description: "Tender chicken and crisp broccoli in a savory sauce.",
    image: chickenBroccoliImg,
    imageAlt: "Chicken and broccoli empanada broken open to show shredded chicken and broccoli",
  },
  {
    id: "mango-habanero",
    name: "Mango Habanero",
    priceCents: null, // "New featured flavor" card has no price: needs one from KDM.
    description: "Sweet mango, habanero heat, and mango chutney for dipping.",
    tags: ["new", "heat"],
    image: mangoHabaneroImg,
    imageAlt: "Mango habanero empanada glazed with golden sauce, with a swipe of mango chutney",
  },
];

export function getFlavor(id: string): Flavor {
  const flavor = flavors.find((f) => f.id === id);
  if (!flavor) throw new Error(`Unknown flavor: ${id}`);
  return flavor;
}

/** Menu board rows: one per price point (highest first), then flavors still waiting on a price. */
export const menuTiers: { priceCents: number | null; items: Flavor[] }[] = [
  ...[...new Set(flavors.map((f) => f.priceCents).filter((p): p is number => p !== null))]
    .sort((a, b) => b - a)
    .map((priceCents) => ({ priceCents, items: flavors.filter((f) => f.priceCents === priceCents) })),
  { priceCents: null, items: flavors.filter((f) => f.priceCents === null) },
].filter((tier) => tier.items.length > 0);

const prices = flavors.map((f) => f.priceCents).filter((p): p is number => p !== null);
export const priceRange = { min: Math.min(...prices), max: Math.max(...prices) };

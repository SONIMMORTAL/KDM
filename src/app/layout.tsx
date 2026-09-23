import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { SvgDefs } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { flavors } from "@/data/menu";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const description = `Golden, crispy Dominican-style empanadas made with love. ${flavors.length} flavors, from oxtail & mac n cheese to jerk chicken. Text ${siteConfig.phone.display} to order.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Dominican-Style Empanadas`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  keywords: ["empanadas", "Dominican empanadas", "KDM Tasty Temptations", "oxtail empanadas", "jerk chicken empanadas"],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name}: Pull up. Eat up.`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}: Pull up. Eat up.`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0805",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <body>
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}

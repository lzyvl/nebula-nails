import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/figtree";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "nebula nails | gel nail artist in redditch",
  description:
    "hand-painted gel nails in redditch by nebula nails. gel manicures, overlays and sets with custom nail art, plus custom press-on nail kits posted to your door. book online.",
  openGraph: {
    title: "nebula nails | gel nail artist in redditch",
    description:
      "hand-painted gel nails in redditch, plus custom press-on nail kits. book online.",
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "pink floral french nails by nebula nails" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fffafb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ballet focus:px-5 focus:py-3 focus:font-bold"
        >
          skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

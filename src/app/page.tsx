import Link from "next/link";
import { Doodle } from "@/components/Doodle";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.name,
  description: "gel nail artist in Redditch. hand-painted gel sets and custom press-on kits.",
  areaServed: site.town,
  sameAs: [site.instagram],
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery preview />
      <Reviews />
      <section className="mx-auto max-w-6xl px-5 py-16 text-center md:py-24">
        <div className="flex items-end justify-center gap-3" aria-hidden="true">
          <Doodle name="moon" className="sway h-12 w-12 md:h-16 md:w-16" />
          <Doodle name="planet" className="bob h-16 w-16 md:h-24 md:w-24" />
          <Doodle name="star" className="twinkle h-10 w-10 md:h-14 md:w-14" style={{ animationDelay: "1.2s" }} />
        </div>
        <h2 className="display mt-6 text-[clamp(2.2rem,5vw,3.4rem)]">ready for a new set?</h2>
        <p className="mx-auto mt-4 max-w-[40ch]">
          send a booking request and she&apos;ll message you back to confirm a slot.
        </p>
        <p className="mt-8">
          <Link href="/book" className="sticker">
            book your set
          </Link>
        </p>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

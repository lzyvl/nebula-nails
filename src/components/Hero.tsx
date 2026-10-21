import Image from "next/image";
import Link from "next/link";
import { photo } from "@/data/gallery";
import { Doodle } from "./Doodle";

// three fingers' worth of nails: the photos are cropped into nail shapes
const nails = [
  { slug: "pink-flowers-french", shape: "nail", offset: "mt-10 md:mt-14", pos: "50% 38%" },
  { slug: "milky-stiletto", shape: "nail-stiletto", offset: "mt-0", pos: "50% 45%" },
  { slug: "hot-pink-floral", shape: "nail", offset: "mt-16 md:mt-24", pos: "50% 40%" },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-8 md:pb-24 md:pt-16"
    >
      <div>
        <h1 className="display text-[clamp(2.5rem,6.6vw,4.6rem)]">
          gel nails, <span className="whitespace-nowrap">hand-painted</span> in redditch.
        </h1>
        <p className="mt-6 max-w-[38ch] text-[1.1rem] leading-snug text-mauve">
          gel specialist, no acrylic. sets from £33, custom nail art, and press-on kits posted to
          your door.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/book" className="sticker">
            book your set
          </Link>
          <Link href="/prices" className="sticker sticker-quiet">
            see prices
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[34rem]">
        <div
          aria-hidden="true"
          className="absolute inset-x-[4%] top-[6%] aspect-square rounded-full bg-petal"
        />

        <Doodle name="planet" className="bob absolute -left-3 top-[-2%] z-10 h-16 w-16 md:h-24 md:w-24" style={{ "--r": "-8deg" } as React.CSSProperties} />
        <Doodle name="comet" className="drift absolute right-[2%] top-[-6%] z-10 h-12 w-12 md:h-16 md:w-16" />
        <Doodle name="moon" className="sway absolute bottom-[4%] left-[8%] z-10 h-12 w-12 md:h-16 md:w-16" style={{ animationDelay: "0.8s" }} />
        <Doodle name="star" className="twinkle absolute bottom-[12%] right-[2%] z-10 h-10 w-10 md:h-14 md:w-14" style={{ animationDelay: "1.6s" }} />
        <Doodle name="planet2" className="bob absolute left-[40%] top-[-8%] z-10 h-9 w-9 md:h-12 md:w-12" style={{ "--r": "12deg", animationDelay: "2s" } as React.CSSProperties} />

        <div className="relative grid grid-cols-3 items-start gap-3 md:gap-4">
          {nails.map((n, i) => {
            const p = photo(n.slug);
            return (
              <div
                key={n.slug}
                className={`rise relative aspect-[3/5] border-2 border-plum ${n.shape} ${n.offset}`}
                style={{ animationDelay: `${150 + i * 140}ms` }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 16rem, 30vw"
                  className="object-cover"
                  style={{ objectPosition: n.pos }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

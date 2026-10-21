import { Doodle } from "./Doodle";
import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/data/gallery";

// the three sets shown in the hero aren't repeated here
const inHero = new Set(["pink-flowers-french", "milky-stiletto", "hot-pink-floral"]);

export function Gallery({ preview = false }: { preview?: boolean }) {
  // the home page shows a few sets (not the hero ones); /work shows everything
  const photos = preview ? gallery.filter((p) => !inHero.has(p.slug)).slice(0, 6) : gallery;
  const Heading = preview ? "h2" : "h1";

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Heading className="display text-[clamp(2.2rem,5vw,3.4rem)]">{preview ? "recent sets" : "our sets"}<Doodle name="planet" className="bob ml-3 inline-block h-[0.85em] w-[0.85em] -translate-y-[0.08em]" /></Heading>
      <p className="mt-4 max-w-[46ch] text-mauve">
        every set is done in gel and hand-painted. found a design you love? bring a photo and she
        will take it from there.
      </p>

      <ul className="mt-10 columns-2 gap-4 md:columns-3 md:gap-6">
        {photos.map((p) => (
          <li key={p.slug} className="mb-4 break-inside-avoid md:mb-6">
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 1152px) 360px, (min-width: 768px) 30vw, 48vw"
              className="h-auto w-full rounded-[1.5rem] border-2 border-plum"
            />
          </li>
        ))}
      </ul>
      {preview ? (
        <p className="mt-10">
          <Link href="/work" className="sticker sticker-quiet">
            see all sets
          </Link>
        </p>
      ) : null}
    </section>
  );
}

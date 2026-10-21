import { Doodle } from "./Doodle";
import { reviews } from "@/data/reviews";
import Link from "next/link";
import { site } from "@/data/site";

export function Reviews({ all = false }: { all?: boolean }) {
  const Heading = all ? "h1" : "h2";
  const list = all ? reviews : reviews.slice(0, 4);
  return (
    <section id="reviews" className="scallop-top bg-petal">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Heading className="display text-[clamp(2.2rem,5vw,3.4rem)]">kind words<Doodle name="star" className="twinkle ml-3 inline-block h-[0.85em] w-[0.85em] -translate-y-[0.08em]" /></Heading>
        <p className="mt-4 max-w-[46ch]">
          messages from clients after their appointments, shared with their names left off.
        </p>

        <ul className="mt-10 columns-1 gap-x-12 md:columns-2">
          {list.map((r) => (
            <li key={r} className="mb-4 break-inside-avoid">
              <p className="bubble bubble-in bg-milk">{r}</p>
            </li>
          ))}
          <li className="mb-4 break-inside-avoid">
            <p className="bubble bubble-out">thank you so much, appreciate you lots x</p>
          </li>
        </ul>

        <p className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          {all ? null : (
            <Link href="/reviews" className="font-bold underline decoration-peony decoration-[3px] underline-offset-[6px]">
              read more kind words
            </Link>
          )}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline decoration-peony decoration-[3px] underline-offset-[6px]"
          >
            see more on instagram
          </a>
        </p>
      </div>
    </section>
  );
}

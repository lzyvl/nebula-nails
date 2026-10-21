import { Doodle } from "./Doodle";
import Link from "next/link";
import { site } from "@/data/site";

const pages = [
  { href: "/work", label: "our sets" },
  { href: "/prices", label: "prices" },
  { href: "/press-ons", label: "press-ons" },
  { href: "/reviews", label: "reviews" },
  { href: "/book", label: "book" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-dotted border-peony">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display display-italic flex items-center gap-3 text-[1.8rem]">
            <Doodle name="planet" className="bob h-8 w-8" />
            {site.name.toLowerCase()}
          </p>
          <p className="mt-3 max-w-[32ch] text-[0.98rem] text-mauve">
            gel nail artist in {site.town.toLowerCase()}. hand-painted sets and custom press-on
            kits.
          </p>
        </div>
        <nav aria-label="footer">
          <p className="font-bold">pages</p>
          <ul className="mt-3 space-y-2">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-mauve hover:text-plum">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-bold">say hello</p>
          <p className="mt-3 text-mauve">
            dm{" "}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-plum underline decoration-peony decoration-[3px] underline-offset-[6px]"
            >
              @{site.handle}
            </a>{" "}
            on instagram, or send a booking request.
          </p>
        </div>
      </div>
    </footer>
  );
}

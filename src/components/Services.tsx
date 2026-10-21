import { Doodle, type DoodleName } from "./Doodle";
import Link from "next/link";
import { formatGbp, gelServices, pressOnLengths } from "@/data/prices";

const services: {
  doodle: DoodleName;
  title: string;
  body: string;
  price: string;
  href: string;
  cta: string;
}[] = [
  {
    doodle: "planet",
    title: "gel sets",
    body: "hand-painted gel overlays and sets in five lengths. gel only, no acrylic.",
    price: `from ${formatGbp(Math.min(...gelServices.map((s) => s.price)))}`,
    href: "/prices",
    cta: "see prices",
  },
  {
    doodle: "moon",
    title: "custom press-ons",
    body: "made to your measurements and posted to your door, with everything you need to apply them.",
    price: `from ${formatGbp(pressOnLengths[0].plain)}`,
    href: "/press-ons",
    cta: "see kits",
  },
  {
    doodle: "star",
    title: "nail art",
    body: "bring an inspiration photo and she'll take it from there. nail art is quoted for you.",
    price: "quoted for you",
    href: "/work",
    cta: "see our sets",
  },
];

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 pt-4 md:pb-16">
      <ul className="grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <li
            key={s.title}
            className="flex flex-col rounded-[1.75rem] border-2 border-plum bg-milk p-7"
          >
            <Doodle name={s.doodle} className="bob h-14 w-14" style={{ animationDelay: `${i * 0.8}s` }} />
            <h2 className="display mt-5 text-[1.7rem]">{s.title}</h2>
            <p className="mt-2 flex-1 text-[0.98rem] text-mauve">{s.body}</p>
            <p className="mt-6 flex items-center justify-between gap-3">
              <span className="font-semibold">{s.price}</span>
              <Link
                href={s.href}
                className="font-bold underline decoration-peony decoration-[3px] underline-offset-[6px]"
              >
                {s.cta}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

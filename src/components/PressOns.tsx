import { Doodle } from "./Doodle";
import {
  formatGbp,
  pressOnKitIncludes,
  pressOnLengths,
} from "@/data/prices";
import { site } from "@/data/site";
import { SizeChart } from "./SizeChart";

const orderSteps = [
  {
    title: "pick your set",
    body: "choose a design (or a few), your length, and your nail measurements, then send them to her dms.",
  },
  {
    title: "photo your hands",
    body: "send a clear photo of both hands next to any uk coin, so she can match your sizes properly.",
  },
  {
    title: "pay",
    body: "she'll talk you through payment. once it has gone through, she starts making your set.",
  },
  {
    title: "wait for the post",
    body: "your kit is packaged and posted, and should reach you in approximately 3 business days.",
  },
];

const steps = "list-decimal space-y-2.5 pl-6 marker:font-bold marker:text-rosewater";
const priceFont =
  "font-display text-[1.3rem] font-semibold [font-variation-settings:'SOFT'_100]";

export function PressOns() {
  return (
    <section id="press-ons" className="scallop-top bg-petal [--leader:var(--peony)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h1 className="display text-[clamp(2.2rem,5vw,3.4rem)]">custom press-on kits<Doodle name="comet" className="drift ml-3 inline-block h-[0.85em] w-[0.85em] -translate-y-[0.08em]" /></h1>
        <p className="mt-4 max-w-[48ch]">
          made to your measurements and posted to your door. every kit has what you need to put
          them on.
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <div>
            <table className="w-full text-left">
              <caption className="sr-only">press-on kit prices by length</caption>
              <thead>
                <tr className="text-sm text-mauve">
                  <th scope="col" className="pb-3 font-semibold">
                    length
                  </th>
                  <th scope="col" className="pb-3 text-right font-semibold">
                    plain set
                  </th>
                  <th scope="col" className="pb-3 pl-4 text-right font-semibold">
                    french tips
                  </th>
                </tr>
              </thead>
              <tbody>
                {pressOnLengths.map((l) => (
                  <tr key={l.label} className="border-t-2 border-dotted border-peony">
                    <th scope="row" className="py-3.5 pr-3 text-left font-semibold">
                      <span className="text-[1.1rem]">{l.label}</span>
                      <span className="block text-sm font-normal text-mauve">{l.mm}</span>
                    </th>
                    <td className={`py-3.5 text-right ${priceFont}`}>{formatGbp(l.plain)}</td>
                    <td className={`py-3.5 pl-4 text-right ${priceFont}`}>{formatGbp(l.french)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-mauve">
              nail art adds £5 to £10. postage is added to your total.
            </p>
          </div>

          <div>
            <h3 className="display text-[2.2rem]">what&apos;s in the kit</h3>
            <ul className="mt-5 space-y-3">
              {pressOnKitIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Doodle name="star" className="mt-[0.2rem] h-6 w-6 flex-none" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="display mt-16 text-[2.2rem] md:mt-20">how to order</h3>
        <ol className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {orderSteps.map((s, i) => (
            <li key={s.title}>
              <span
                aria-hidden="true"
                className="display block text-[3.6rem] leading-none text-rosewater"
              >
                {i + 1}
              </span>
              <h4 className="mt-2 text-[1.15rem] font-bold">{s.title}</h4>
              <p className="mt-1.5 text-[0.98rem]">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-9 flex flex-wrap items-center gap-4">
          <a href={site.instagram} className="sticker" target="_blank" rel="noopener noreferrer">
            dm to order
          </a>
          <span className="text-sm text-mauve">press-on kits are ordered by dm on instagram.</span>
        </p>

        <div className="mt-14 space-y-4">
          <details className="fold">
            <summary>how to measure your size</summary>
            <div className="fold-body">
              <ol className={steps}>
                <li>hold measuring or sticky tape flat across the widest part of your nail.</li>
                <li>mark each side with a pen, then peel the tape off.</li>
                <li>
                  stick it on a ruler and note the width in mm. no tape? hold a ruler straight
                  across the widest part of the nail instead.
                </li>
              </ol>
              <p className="mt-5 max-w-[52ch] text-[0.98rem]">
                the chart shows each size at its real width, so you can compare your measurement by
                eye.
              </p>
              <div className="mt-6">
                <SizeChart />
              </div>
            </div>
          </details>

          <details className="fold">
            <summary>how to put them on</summary>
            <div className="fold-body">
              <ol className={steps}>
                <li>push back your cuticles with the wooden cuticle stick.</li>
                <li>lightly buff your nails to take the shine off.</li>
                <li>wipe your nails with an alcohol wipe.</li>
                <li>apply nail glue or nail stickers to your nails.</li>
                <li>
                  press a press-on nail on and hold it in place for a few seconds, then repeat on
                  every nail.
                </li>
              </ol>
            </div>
          </details>

          <details className="fold">
            <summary>how to take them off</summary>
            <div className="fold-body">
              <ol className={steps}>
                <li>
                  gently push the cuticle stick around the edge of the nail so the press-on lifts.
                </li>
                <li>soak your hands in warm water, soap and olive oil for 10 to 15 minutes.</li>
                <li>
                  gently push the cuticle stick between the press-on and your natural nail until it
                  pops off.
                </li>
              </ol>
              <p className="mt-5 max-w-[52ch] text-[0.98rem]">
                taking them off should not hurt. if a nail doesn&apos;t come off after soaking and
                lifting, repeat the process.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

import { Doodle, type DoodleName } from "./Doodle";
import { formatGbp } from "@/data/prices";
import { site } from "@/data/site";

const icons: DoodleName[] = ["star", "moon", "planet", "comet"];
const items = [
  {
    title: `${formatGbp(site.depositGbp)} deposit`,
    body: `a ${formatGbp(site.depositGbp)} deposit confirms your appointment. you pay the rest at the appointment.`,
  },
  {
    title: "cancelling",
    body: "cancel 4 or more days before your appointment and your deposit is refunded. cancel within 3 days and it isn't.",
  },
  {
    title: "under 16s",
    body: "please bring proof of parental consent to your appointment.",
  },
  {
    title: "removals and infills",
    body: "tell her beforehand if you need a removal or an infill, so she has enough time.",
  },
];

export function Policy() {
  return (
    <section id="policy" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="display text-[clamp(2.2rem,5vw,3.4rem)]">before you book<Doodle name="planet2" className="bob ml-3 inline-block h-[0.85em] w-[0.85em] -translate-y-[0.08em]" /></h2>
      <p className="mt-4 max-w-[44ch] text-mauve">
        a few things that help every appointment run smoothly.
      </p>

      <dl className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
        {items.map((item, i) => (
          <div key={item.title} className="border-t-2 border-dotted border-peony pt-5">
            <dt className="display flex items-center gap-3 text-[1.9rem]">
              <Doodle name={icons[i]} className="h-9 w-9 flex-none" />
              {item.title}
            </dt>
            <dd className="mt-2 max-w-[42ch]">{item.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

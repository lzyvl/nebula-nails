import { formatGbp } from "@/data/prices";
import { site } from "@/data/site";

const steps = [
  { title: "send a request", body: "choose your set and a date that suits you." },
  { title: "get a reply", body: "she messages you to confirm your slot." },
  {
    title: `pay the ${formatGbp(site.depositGbp)} deposit`,
    body: "this secures your appointment. you pay the rest on the day.",
  },
  { title: "enjoy your set", body: "gel nails, hand-painted just for you." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="display text-[clamp(2.2rem,5vw,3.4rem)]">how booking works</h2>
      <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => (
          <li key={s.title} className="border-t-2 border-dotted border-peony pt-5">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full border-2 border-plum bg-ballet text-[0.95rem] font-bold"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-[1.1rem] font-bold">{s.title}</h3>
            <p className="mt-1.5 text-[0.98rem] text-mauve">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

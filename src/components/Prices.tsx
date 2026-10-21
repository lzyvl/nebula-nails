import { Doodle } from "./Doodle";
import {
  FRENCH_TIP_ADD,
  REMOVAL_PRICE,
  REPAIR_PRICE,
  formatGbp,
  gelServices,
} from "@/data/prices";

export function Prices() {
  return (
    <section id="prices" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <h1 className="display text-[clamp(2.2rem,5vw,3.4rem)]">prices<Doodle name="moon" className="sway ml-3 inline-block h-[0.85em] w-[0.85em] -translate-y-[0.08em]" /></h1>
          <p className="mt-4 max-w-[44ch] text-mauve">
            gel only, no acrylic. sets are priced by length, and a french tip adds{" "}
            {formatGbp(FRENCH_TIP_ADD)} to any of them.
          </p>

          <ul className="mt-9 space-y-5">
            {gelServices.map((s) => (
              <li key={s.id} className="menu-row">
                <span>
                  <span className="text-[1.15rem] font-semibold">{s.label}</span>
                  {s.detail ? <span className="ml-2 text-sm text-mauve">{s.detail}</span> : null}
                </span>
                <span className="leader" aria-hidden="true" />
                <span className="price">{formatGbp(s.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="self-start rounded-[2rem] bg-petal p-7 md:p-9 [--leader:var(--peony)]">
          <h3 className="display text-[2.2rem]">extras</h3>
          <ul className="mt-6 space-y-5">
            <li className="menu-row">
              <span className="text-[1.1rem] font-semibold">removal</span>
              <span className="leader" aria-hidden="true" />
              <span className="price">{formatGbp(REMOVAL_PRICE)}</span>
            </li>
            <li className="menu-row">
              <span className="text-[1.1rem] font-semibold">nail repair, each</span>
              <span className="leader" aria-hidden="true" />
              <span className="price">{formatGbp(REPAIR_PRICE)}</span>
            </li>
            <li className="menu-row">
              <span className="text-[1.1rem] font-semibold">nail art</span>
              <span className="leader" aria-hidden="true" />
              <span className="price text-[1.05rem]">quoted for you</span>
            </li>
          </ul>
          <p className="mt-7 text-[0.98rem]">
            need a removal or an infill? tell her before your appointment so she can set aside
            enough time.
          </p>
        </aside>
      </div>
    </section>
  );
}

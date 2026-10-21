import { pressOnSizes } from "@/data/prices";

// each nail is drawn at its real width (4px per mm) so the sizes can be compared by eye
const PX_PER_MM = 4;

export function SizeChart() {
  return (
    <ul className="flex flex-wrap items-end gap-x-4 gap-y-6" aria-label="press-on sizes by nail width">
      {pressOnSizes.map(({ size, mm }) => (
        <li key={size} className="flex flex-col items-center gap-2 text-center">
          <span
            aria-hidden="true"
            className="nail block border-2 border-plum bg-ballet"
            style={{ width: mm * PX_PER_MM, height: mm * PX_PER_MM * 1.6 }}
          />
          <span className="leading-tight">
            <span className="block font-bold">size {size}</span>
            <span className="block text-sm text-mauve">{mm}mm</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

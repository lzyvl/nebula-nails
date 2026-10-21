// little space doodles for the nebula theme: plum outline, pastel fill. decorative only.
const S = { stroke: "#3b2531", strokeWidth: 3.2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

const art = {
  planet: (
    <>
      <ellipse {...S} cx="32" cy="32" rx="28" ry="8" fill="none" transform="rotate(-20 32 32)" />
      <circle {...S} cx="32" cy="32" r="14" fill="#f9c6d6" />
      <circle cx="27" cy="28" r="3" fill="#e8789f" />
      <circle cx="37" cy="37" r="2" fill="#e8789f" />
      <path {...S} fill="none" d="M7 35a28 8 0 0 0 50 0" transform="rotate(-20 32 32)" />
    </>
  ),
  planet2: (
    <>
      <circle {...S} cx="30" cy="34" r="17" fill="#fdeaf0" />
      <path {...S} strokeWidth={2.6} fill="none" d="M14 30c10 4 22 4 32-1M15 40c10 4 20 4 29 0" stroke="#e8789f" />
      <circle {...S} cx="50" cy="14" r="5" fill="#ffe9a3" />
    </>
  ),
  moon: (
    <>
      <path {...S} fill="#f9c6d6" d="M42 8C26 10 16 22 16 36c0 14 12 22 26 20-10-4-14-12-14-22 0-10 5-20 14-26z" />
      <circle cx="50" cy="22" r="2.6" fill="#3b2531" />
      <circle cx="54" cy="40" r="1.8" fill="#3b2531" />
    </>
  ),
  star: (
    <path
      {...S}
      fill="#ffe9a3"
      d="M32 10l6.5 15.1 16.3 1.5-12.3 10.8 3.6 16-14.1-8.4-14.1 8.4 3.6-16L9.2 26.6l16.3-1.5z"
    />
  ),
  comet: (
    <>
      <path {...S} fill="none" d="M38 28L10 54M30 20L7 30M46 36L30 58" stroke="#e8789f" />
      <circle {...S} cx="44" cy="22" r="11" fill="#ffe9a3" />
      <circle cx="41" cy="19" r="2.4" fill="#fffafb" />
    </>
  ),
} as const;

export type DoodleName = keyof typeof art;

export function Doodle({
  name,
  className = "",
  style,
}: {
  name: DoodleName;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
      fill="none"
    >
      {art[name]}
    </svg>
  );
}

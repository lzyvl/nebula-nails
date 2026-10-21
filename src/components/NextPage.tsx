import Link from "next/link";

// closes each page and leads into the next one
export function NextPage({ href, title, cta }: { href: string; title: string; cta: string }) {
  return (
    <section className="border-t-2 border-dotted border-peony">
      <Link
        href={href}
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-10 md:py-14"
      >
        <span>
          <span className="block text-[0.95rem] text-mauve">next</span>
          <span className="display text-[clamp(1.9rem,4.5vw,3rem)]">{title}</span>
        </span>
        <span className="sticker flex-none">{cta}</span>
      </Link>
    </section>
  );
}

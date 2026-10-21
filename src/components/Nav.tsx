"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Doodle } from "./Doodle";

const links = [
  { href: "/work", label: "our sets" },
  { href: "/prices", label: "prices" },
  { href: "/press-ons", label: "press-ons" },
  { href: "/reviews", label: "reviews" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ballet bg-milk/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="nebula nails, home">
          <Doodle name="planet" className="bob h-7 w-7" />
          <span className="display display-italic text-[1.6rem] leading-none">nebula nails</span>
        </Link>

        <nav aria-label="main" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className="font-semibold underline decoration-ballet decoration-[3px] underline-offset-[7px] hover:decoration-peony aria-[current=page]:decoration-peony"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="sticker min-h-11 px-5 py-2 text-[0.95rem]">
            book now
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link href="/book" className="sticker min-h-11 px-5 py-2 text-[0.95rem]">
            book
          </Link>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "close menu" : "open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-plum bg-milk"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="main"
        hidden={!open}
        className="border-t-2 border-ballet bg-milk px-5 pb-6 pt-3 md:hidden"
      >
        <ul>
          {links.map((l) => (
            <li key={l.href} className="border-b-2 border-ballet last:border-0">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className="display block py-3 text-[2rem]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

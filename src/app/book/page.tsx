import { Doodle } from "@/components/Doodle";
import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "book your set | nebula nails",
  description: "send a booking request to nebula nails in redditch.",
};

export default function Book() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h1 className="display text-[clamp(2.2rem,5vw,3.4rem)]">book your set<Doodle name="planet" className="bob ml-3 inline-block h-[0.85em] w-[0.85em] -translate-y-[0.08em]" /></h1>
      <p className="mb-10 mt-4 max-w-[48ch]">
        fill this in and she&apos;ll message you back to confirm a slot. prefer instagram? you can
        dm her instead.
      </p>
      <BookingForm />
    </section>
  );
}

import type { Metadata } from "next";
import { NextPage } from "@/components/NextPage";
import { Reviews } from "@/components/Reviews";

export const metadata: Metadata = {
  title: "kind words | nebula nails",
  description: "messages from nebula nails clients after their appointments.",
};

export default function ReviewsPage() {
  return (
    <>
      <Reviews all />
      <NextPage href="/book" title="book your set" cta="book now" />
    </>
  );
}

import type { Metadata } from "next";
import { NextPage } from "@/components/NextPage";
import { PressOns } from "@/components/PressOns";

export const metadata: Metadata = {
  title: "custom press-on kits | nebula nails",
  description: "custom press-on nail kits made to your measurements and posted to your door.",
};

export default function PressOnsPage() {
  return (
    <>
      <PressOns />
      <NextPage href="/reviews" title="kind words" cta="read reviews" />
    </>
  );
}

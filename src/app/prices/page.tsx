import type { Metadata } from "next";
import { HowItWorks } from "@/components/HowItWorks";
import { NextPage } from "@/components/NextPage";
import { Policy } from "@/components/Policy";
import { Prices } from "@/components/Prices";

export const metadata: Metadata = {
  title: "prices | nebula nails",
  description: "gel set prices, extras and booking policy for nebula nails in redditch.",
};

export default function PricesPage() {
  return (
    <>
      <Prices />
      <HowItWorks />
      <Policy />
      <NextPage href="/press-ons" title="custom press-on kits" cta="see kits" />
    </>
  );
}

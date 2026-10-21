import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { NextPage } from "@/components/NextPage";

export const metadata: Metadata = {
  title: "our sets | nebula nails",
  description: "recent hand-painted gel sets by nebula nails in redditch.",
};

export default function Work() {
  return (
    <>
      <Gallery />
      <NextPage href="/prices" title="prices" cta="see prices" />
    </>
  );
}

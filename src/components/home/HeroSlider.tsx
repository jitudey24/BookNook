"use client";

import dynamic from "next/dynamic";

const HeroSliderContent = dynamic(
  () => import("./HeroSliderContent"),
  {
    ssr: false,
    loading: () => (
      <section className="w-full">
        <div className="min-h-[430px] animate-pulse rounded-3xl bg-gray-200 md:min-h-[500px]" />
      </section>
    ),
  }
);

export default function HeroSlider() {
  return <HeroSliderContent />;
}

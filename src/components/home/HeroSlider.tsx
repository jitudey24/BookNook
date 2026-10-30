"use client";

import dynamic from "next/dynamic";

const HeroSliderContent = dynamic(
  () => import("./HeroSliderContent"),
  {
    ssr: false,
    loading: () => (
      <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <div className="min-h-[430px] animate-pulse rounded-3xl bg-gray-200 md:min-h-[500px]" />
      </section>
    ),
  }
);

export default function HeroSlider() {
  return <HeroSliderContent />;
}

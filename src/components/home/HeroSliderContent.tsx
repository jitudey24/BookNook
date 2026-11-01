
"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "/sliderImg1.jpg",
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of amazing books, discover new authors, and find your next great read.",
    number: "01",
  },
  {
    id: 2,
    image: "/sliderImg2.jpg",
    subtitle: "EXPLORE NEW STORIES",
    title: "Every Book Opens a New World",
    description:
      "From exciting fiction to inspiring biographies, there is always a new story waiting for you.",
    number: "02",
  },
  {
    id: 3,
    image: "/sliderImg3.jpg",
    subtitle: "READ. LEARN. GROW.",
    title: "Build Your Own Reading Journey",
    description:
      "Find knowledge, inspiration, and unforgettable adventures with our growing book collection.",
    number: "03",
  },
];

// Hydration-safe mounted flag: server renders false, client renders true —
// same behavior as the old setState-in-effect pattern, without the lint error.
const emptySubscribe = () => () => {};

export default function HeroSlider() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">
      {!mounted ? (
        <div className="min-h-[430px] animate-pulse rounded-3xl bg-gray-200 md:min-h-[500px]" />
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative isolate flex min-h-[430px] items-center overflow-hidden rounded-3xl px-7 py-14 text-white md:min-h-[500px] md:px-16 lg:px-20">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="z-0 object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 z-[1] bg-black/55" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] backdrop-blur-sm">
                    <BookOpen className="h-4 w-4" />
                    {slide.subtitle}
                  </div>

                  <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-white/90 md:text-base md:leading-8">
                    {slide.description}
                  </p>

                  <Link
                    href="/all-books"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
                  >
                    Browse Books
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Slide Number */}
                <span className="absolute bottom-8 right-8 z-10 hidden text-6xl font-black text-white/30 md:block">
                  {slide.number}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

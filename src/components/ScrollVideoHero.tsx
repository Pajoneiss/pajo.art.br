"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/content/data";

export default function ScrollVideoHero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Text fading effect as you scroll down
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      opacity: 0,
      y: -150,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center pointer-events-none">
      {/* Hero Text */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mix-blend-difference mt-20">
        <Image 
          src="/media/pajo-logo.png" 
          alt="PAJÔ" 
          width={600} 
          height={200} 
          className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-4"
          priority
        />
        <h2 className="font-mono text-brand text-sm md:text-xl tracking-[0.5em] uppercase font-bold drop-shadow-md">
          {t.subtitle}
        </h2>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xs uppercase tracking-widest animate-pulse">
        Scroll to Explore
      </div>
    </section>
  );
}

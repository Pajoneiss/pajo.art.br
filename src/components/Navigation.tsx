"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, Language } from "@/context/LanguageContext";
import { translations, socials } from "@/content/data";

export default function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/media/pajo-logo.png" 
            alt="PAJÔ" 
            width={120} 
            height={40} 
            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </Link>

        {/* Links e Language Switcher */}
        <div className="flex items-center gap-8 text-sm tracking-[0.2em] font-medium text-white/80">
          <div className="hidden md:flex gap-8">
            <Link href="#about" className="hover:text-white transition-colors">
              {t.about}
            </Link>
            <Link href="#portfolio" className="hover:text-white transition-colors">
              {t.portfolio}
            </Link>
            <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t.contact}
            </a>
            <a href="https://ladderlabs.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
              {t.agency}
            </a>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs font-mono ml-4 border-l border-white/20 pl-6">
            {(["pt-BR", "en-US", "es-ES"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`transition-colors ${language === lang ? "text-brand font-bold" : "text-white/40 hover:text-white"}`}
              >
                {lang.split("-")[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

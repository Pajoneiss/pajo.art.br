"use client";

import Image from "next/image";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import EmbedWidget from "@/components/EmbedWidget";
import { socials, portfolio, musicEmbeds, mediaEmbeds, visualEmbeds, translations } from "@/content/data";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen selection:bg-brand selection:text-white pb-32">
      {/* 1. Hero Text Overlay */}
      <ScrollVideoHero />

      {/* 2. Manifesto / About Section */}
      <section id="about" className="relative py-32 px-6 z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video 
              src="/media/Stop Time.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
            <div className="inline-block px-4 py-1 rounded-full border border-brand/30 bg-brand/10 w-fit">
              <span className="text-brand font-mono text-sm tracking-widest uppercase">{t.about.tag}</span>
            </div>
            <div className="space-y-6 text-white/70 font-sans text-lg leading-relaxed drop-shadow-md">
              <p className="pl-4 border-l-2 border-brand/50">
                {t.about.text1}
                <br /><br />
                <span className="text-white/50 italic text-sm font-serif">
                  {t.about.text2}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-8 font-mono uppercase text-sm tracking-widest">
              <a 
                href={`mailto:${socials.booking}`}
                className="px-8 py-4 bg-brand text-white hover:bg-white hover:text-black transition-colors"
              >
                Booking
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Selected Work (Dynamic Widgets) */}
      <section id="work" className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-16 text-center text-white drop-shadow-lg">
            {t.work.title} <span className="text-white/50">{t.work.subtitle}</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {portfolio.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <EmbedWidget url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 z-10 relative bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20 text-center text-white drop-shadow-lg">
            {t.portfolio.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {musicEmbeds.map((item) => (
              <div key={`embed-${item.id}`} className="w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden">
                <EmbedWidget url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Media Section */}
      <section id="media" className="py-32 px-6 z-10 relative bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20 text-center text-white drop-shadow-lg">
            {t.portfolio.media}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {mediaEmbeds.map((item) => (
              <div key={`media-${item.id}`} className="w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden">
                <EmbedWidget url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Visuals Section */}
      <section id="visuals" className="py-32 px-6 z-10 relative bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20 text-center text-white drop-shadow-lg">
            {t.portfolio.visuals}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {visualEmbeds.map((item) => (
              <div 
                key={`visual-${item.id}`} 
                className={`w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden ${
                  item.url.includes("behance") ? "md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <EmbedWidget url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10 text-center font-mono text-xs uppercase tracking-widest text-white/50 mt-16">
        <p>© {new Date().getFullYear()} PAJÔ. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <a href={socials.instagram} target="_blank" className="hover:text-brand transition-colors">Instagram</a>
          <a href={socials.soundcloud} target="_blank" className="hover:text-brand transition-colors">SoundCloud</a>
          <a href={socials.audius} target="_blank" className="hover:text-brand transition-colors">Audius</a>
          <a href={socials.spotify} target="_blank" className="hover:text-brand transition-colors">Spotify</a>
          <a href={socials.behance} target="_blank" className="hover:text-brand transition-colors">Behance</a>
          <a href={socials.whatsapp} target="_blank" className="hover:text-brand transition-colors">WhatsApp</a>
          <a href={socials.youtube} target="_blank" className="hover:text-brand transition-colors">YouTube</a>
          <a href={socials.website} target="_blank" className="hover:text-brand transition-colors">Old Site</a>
        </div>
      </footer>
    </main>
  );
}

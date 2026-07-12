"use client";

import { useState } from "react";
import EmbedWidget from "@/components/EmbedWidget";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import { socials, portfolio, musicEmbeds, mediaEmbeds, visualEmbeds, translations } from "@/content/data";
import { useLanguage } from "@/context/LanguageContext";

// Expandable Section Component to save performance
function ExpandableSection({ 
  title, 
  items, 
  renderItem,
  defaultShowCount = 3 
}: { 
  title: string, 
  items: any[], 
  renderItem: (item: any) => React.ReactNode,
  defaultShowCount?: number 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  return (
    <section className="py-4 px-6 z-10 relative bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Accordion Header / Beautiful Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full overflow-hidden rounded-2xl border transition-all duration-700 group
            ${isOpen 
              ? 'bg-black/80 border-brand/50 shadow-[0_0_40px_rgba(255,85,0,0.15)] scale-[1.01]' 
              : 'bg-black/30 border-white/10 hover:bg-black/60 hover:border-brand/40 backdrop-blur-md'
            }`}
        >
          {/* Cyberpunk Shimmer / Scanline effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          
          <div className="relative px-8 py-10 md:py-14 flex items-center justify-between z-10">
            
            {/* Titulo com Efeito Glitch/Desmonte no Hover */}
            <div className="flex flex-col items-start">
              <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-6 relative">
                {/* Texto Principal */}
                <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand transition-all duration-500">
                  {title}
                </span>
                
                {/* Efeito de Duplicação (Glitch visual sutil) */}
                <span className="absolute top-0 left-0 -z-10 text-brand opacity-0 group-hover:opacity-50 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-300">
                  {title}
                </span>
                <span className="absolute top-0 left-0 -z-10 text-blue-500 opacity-0 group-hover:opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  {title}
                </span>

                <span className="text-sm font-mono tracking-widest text-brand border border-brand/30 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-8 group-hover:translate-x-0 hidden md:block bg-brand/10">
                  {isOpen ? "[ FECHAR ]" : "[ DESCOMPACTAR ]"}
                </span>
              </h2>
            </div>
            
            {/* Ícone Tecnológico Animado */}
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
              isOpen 
                ? 'border-brand text-brand rotate-[135deg] bg-brand/10 shadow-[0_0_20px_rgba(255,85,0,0.4)]' 
                : 'border-white/20 text-white/50 group-hover:border-brand/80 group-hover:text-brand group-hover:scale-110'
            }`}>
              <svg width="24" height="24" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          
          {/* Barra de progresso visual */}
          <div className={`absolute bottom-0 left-0 h-1 bg-brand transition-all duration-700 ease-out ${isOpen ? 'w-full' : 'w-0 group-hover:w-1/4'}`}></div>
        </button>

        {/* Accordion Content */}
        <div 
          className={`grid transition-all duration-700 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start pb-8">
              {items.slice(0, showAll ? items.length : defaultShowCount).map(renderItem)}
            </div>
            
            {!showAll && items.length > defaultShowCount && (
              <div className="mt-8 mb-16 flex justify-center">
                <button 
                  onClick={() => setShowAll(true)}
                  className="group relative px-8 py-4 bg-transparent text-white border border-white/20 hover:border-brand transition-all duration-300 uppercase font-mono tracking-widest text-sm overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    Carregar Arquivos Ocultos ({items.length - defaultShowCount})
                  </span>
                  <div className="absolute inset-0 bg-brand translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen selection:bg-brand selection:text-white pb-32">
      {/* 1. Hero Text Overlay */}
      <ScrollVideoHero />

      {/* 2. Portfolio / Músicas (Acordeão) */}
      <div className="mt-16">
        <ExpandableSection 
          title={t.portfolio.title}
          items={musicEmbeds}
          renderItem={(item) => (
            <div key={`embed-${item.id}`} className="w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <EmbedWidget url={item.url} />
            </div>
          )}
        />
      </div>

      {/* 3. Mídia / Vídeos (Acordeão) */}
      <ExpandableSection 
        title={t.portfolio.media}
        items={mediaEmbeds}
        renderItem={(item) => (
          <div key={`media-${item.id}`} className="w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <EmbedWidget url={item.url} />
          </div>
        )}
      />

      {/* 4. Visuais / Instagram (Acordeão) */}
      <ExpandableSection 
        title={t.portfolio.visuals}
        items={visualEmbeds}
        renderItem={(item) => (
          <div 
            key={`visual-${item.id}`} 
            className={`w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ${
              item.url.includes("behance") ? "md:col-span-2 lg:col-span-3" : ""
            }`}
          >
            <EmbedWidget url={item.url} />
          </div>
        )}
      />

      {/* 5. Minhas Redes (Acordeão) */}
      <ExpandableSection 
        title={`${t.work.title} ${t.work.subtitle}`}
        items={portfolio}
        defaultShowCount={6}
        renderItem={(item) => (
          <div key={item.id} className="flex flex-col gap-2 transform hover:scale-[1.05] transition-transform duration-300">
            <EmbedWidget url={item.url} />
          </div>
        )}
      />

      {/* 6. Manifesto / About Section (Por último) */}
      <section id="about" className="relative py-32 px-6 z-10 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="order-2 lg:order-1 relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <video 
              src="/media/Stop Time.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-brand/30 bg-brand/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
              <span className="text-brand font-mono text-sm tracking-widest uppercase">{t.about.tag}</span>
            </div>
            <div className="space-y-6 text-white/80 font-sans text-xl md:text-2xl leading-relaxed drop-shadow-md">
              <p className="pl-6 border-l-4 border-brand/50">
                {t.about.text1}
              </p>
              {t.about.text2 && (
                <p className="pl-6 text-white/50 italic text-base font-serif mt-4">
                  {t.about.text2}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-6 pt-8 font-mono uppercase text-sm tracking-widest">
              <a 
                href={`mailto:${socials.booking}`}
                className="group relative px-8 py-4 bg-transparent text-white border border-brand hover:border-transparent transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  Iniciar Contato
                </span>
                <div className="absolute inset-0 bg-brand translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10 text-center font-mono text-xs uppercase tracking-widest text-white/50">
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

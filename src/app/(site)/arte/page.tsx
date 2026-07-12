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
              ? 'bg-black/90 border-brand/80 shadow-[0_0_50px_rgba(255,85,0,0.3)] scale-[1.01]' 
              : 'bg-black/40 border-white/20 hover:bg-black/70 hover:border-brand/60 backdrop-blur-xl'
            }`}
        >
          {/* Fundo com textura de grid cibernético sutil */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          {/* Cyberpunk Shimmer / Scanline effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          
          <div className="relative px-8 py-12 md:py-16 flex items-center justify-between z-10">
            
            {/* Titulo com Efeito Glitch/Desmonte no Hover */}
            <div className="flex flex-col items-start">
              <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-6 relative">
                {/* Texto Principal com textura */}
                <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand transition-all duration-500">
                  {title}
                </span>
                
                {/* Efeito de Duplicação (Glitch visual explosivo no hover) */}
                <span className="absolute top-0 left-0 -z-10 text-brand opacity-0 group-hover:opacity-60 group-hover:-translate-x-2 group-hover:translate-y-2 transition-all duration-300">
                  {title}
                </span>
                <span className="absolute top-0 left-0 -z-10 text-blue-500 opacity-0 group-hover:opacity-60 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300">
                  {title}
                </span>

                <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand border border-brand/50 px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-8 group-hover:translate-x-0 hidden md:block bg-brand/10 shadow-[0_0_15px_rgba(255,85,0,0.3)]">
                  {isOpen ? "[ RECOLHER ]" : "[ DESCOMPACTAR ]"}
                </span>
              </h2>
            </div>
            
            {/* Ícone Tecnológico Animado Massivo */}
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
              isOpen 
                ? 'border-brand text-brand rotate-[135deg] bg-brand/10 shadow-[0_0_30px_rgba(255,85,0,0.5)]' 
                : 'border-white/30 text-white group-hover:border-brand group-hover:text-brand group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,85,0,0.3)]'
            }`}>
              <svg width="24" height="24" className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          
          {/* Barra de progresso visual brilhante */}
          <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-brand to-yellow-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,85,0,1)] ${isOpen ? 'w-full' : 'w-0 group-hover:w-1/3'}`}></div>
        </button>

        {/* Accordion Content */}
        <div 
          className={`grid transition-all duration-700 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100 mt-10' : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start pb-8">
              {items.slice(0, showAll ? items.length : defaultShowCount).map(renderItem)}
            </div>
            
            {!showAll && items.length > defaultShowCount && (
              <div className="mt-8 mb-16 flex justify-center">
                <button 
                  onClick={() => setShowAll(true)}
                  className="group relative px-10 py-5 bg-black/50 text-white border border-brand/50 hover:border-brand transition-all duration-300 uppercase font-mono tracking-widest text-sm overflow-hidden shadow-[0_0_20px_rgba(255,85,0,0.2)] rounded-full"
                >
                  <span className="relative z-10 group-hover:text-black font-bold transition-colors duration-300">
                    Carregar Arquivos Ocultos ({items.length - defaultShowCount})
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-yellow-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
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
  const t = translations[language] || translations["pt-BR"];

  return (
    <main className="min-h-screen selection:bg-brand selection:text-white pb-32">
      {/* 1. Hero Text Overlay */}
      <ScrollVideoHero />

      {/* 2. Portfolio / Músicas (Acordeão) */}
      <div className="mt-20">
        <ExpandableSection 
          title={t.portfolio.title}
          items={musicEmbeds}
          renderItem={(item) => (
            <div key={`embed-${item.id}`} className="w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,85,0,0.2)] hover:border-brand/50 transition-all duration-500">
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
          <div key={`media-${item.id}`} className="w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,85,0,0.2)] hover:border-brand/50 transition-all duration-500">
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
            className={`w-full shadow-2xl rounded-xl border border-white/10 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,85,0,0.2)] hover:border-brand/50 transition-all duration-500 ${
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
          <div key={item.id} className="flex flex-col gap-2 transform hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(255,85,0,0.3)] transition-all duration-500 rounded-xl overflow-hidden border border-transparent hover:border-brand/50">
            <EmbedWidget url={item.url} />
          </div>
        )}
      />

      {/* 6. Manifesto / About Section (Por último) */}
      <section id="about" className="relative py-32 px-6 z-10 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-black/60 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          <div className="order-2 lg:order-1 relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
            <video 
              src="/media/Stop Time.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-brand/50 bg-brand/20 w-fit shadow-[0_0_20px_rgba(255,85,0,0.2)]">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_10px_rgba(255,85,0,1)]"></span>
              <span className="text-brand font-mono text-sm tracking-[0.2em] font-bold uppercase">{t.about.tag}</span>
            </div>
            <div className="space-y-6 text-white/90 font-sans text-xl md:text-3xl leading-relaxed drop-shadow-lg">
              <p className="pl-6 border-l-4 border-brand">
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
                className="group relative px-10 py-5 bg-transparent text-white border-2 border-brand hover:border-transparent transition-all duration-300 overflow-hidden rounded-full shadow-[0_0_30px_rgba(255,85,0,0.1)]"
              >
                <span className="relative z-10 group-hover:text-black font-bold transition-colors duration-300">
                  Iniciar Contato
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-yellow-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/10 text-center font-mono text-xs uppercase tracking-widest text-white/50 bg-black/50 backdrop-blur-md">
        <p>© {new Date().getFullYear()} PAJÔ. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
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

"use client";
import { useLanguage } from "@/context/LanguageContext";
import { webProjects } from "@/content/data";

export default function SitesPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen w-full relative pt-32 pb-32 px-6 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] uppercase">
            WEBSITES & <span className="text-brand">APPS</span>
          </h1>
          <p className="text-white/70 font-mono text-xs md:text-sm tracking-widest uppercase mt-6 max-w-2xl mx-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            {language === 'pt-BR' 
              ? 'Desenvolvimento criativo e experiências digitais de alta performance.' 
              : language === 'es-ES' 
                ? 'Desarrollo creativo y experiencias digitales de alto rendimiento.' 
                : 'Creative development and high-performance digital experiences.'}
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {webProjects.map((project) => (
            <a 
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-2xl transition-all duration-500 group-hover:border-brand/50 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(255,85,0,0.15)]">
                
                {/* Loader Backing (Shows while iframe loads) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/10 border-t-brand rounded-full animate-spin"></div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/30">Loading</span>
                  </div>
                </div>

                {/* Live Thumbnail */}
                <iframe 
                  src={project.url}
                  className="absolute top-0 left-0 w-[400%] h-[400%] scale-[0.25] origin-top-left pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700 bg-white/5"
                  loading="lazy"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tighter drop-shadow-md">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                    <p className="text-[10px] font-mono text-white/70 uppercase tracking-widest group-hover:text-brand transition-colors">
                      Live Preview ↗
                    </p>
                  </div>
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

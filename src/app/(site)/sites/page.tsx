"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { webProjects } from "@/content/data";

function ProjectCard({ project }: { project: { id: number; name: string; url: string } }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group block relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl transition-all duration-500 hover:border-brand/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,85,0,0.15)]">
       
       {!isLoaded ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-black/80 to-black p-6">
             <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tighter drop-shadow-md text-center mb-6">
               {project.name}
             </h3>
             <button 
               onClick={() => setIsLoaded(true)}
               className="px-6 py-3 bg-brand/20 border border-brand/50 text-brand rounded-full text-xs font-mono tracking-widest uppercase hover:bg-brand hover:text-white transition-all shadow-[0_0_15px_rgba(255,85,0,0.2)]"
             >
                Carregar Live Preview
             </button>
             <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-6 text-[10px] text-white/40 hover:text-white uppercase font-mono tracking-widest">
                Ou abrir em nova aba ↗
             </a>
          </div>
       ) : (
          <>
             {/* Live Iframe */}
             <iframe 
                src={project.url}
                className="absolute top-0 left-0 w-[400%] h-[400%] scale-[0.25] origin-top-left bg-white"
             />
             
             {/* Bottom Overlay when hovered (to allow closing or opening external) */}
             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity z-30">
                <button 
                   onClick={() => setIsLoaded(false)} 
                   className="px-3 py-1 bg-black/50 border border-white/20 text-white text-[10px] uppercase font-mono rounded backdrop-blur hover:bg-white hover:text-black transition-colors"
                >
                   Fechar Preview
                </button>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-brand text-white text-[10px] uppercase font-mono rounded shadow-[0_0_10px_rgba(255,85,0,0.5)]">
                   Abrir Site ↗
                </a>
             </div>
          </>
       )}
    </div>
  );
}

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

        {/* Grid de Projetos Otimizado com Click-to-Load */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {webProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}

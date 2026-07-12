"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, Language } from "@/context/LanguageContext";
import { socials } from "@/content/data";
import { FaInstagram, FaSoundcloud, FaSpotify, FaYoutube, FaWhatsapp, FaBehance, FaMusic } from "react-icons/fa";

export default function IntroPage() {
  const { language, setLanguage } = useLanguage();

  const socialLinks = [
    { name: "Instagram", url: socials.instagram, Icon: FaInstagram },
    { name: "SoundCloud", url: socials.soundcloud, Icon: FaSoundcloud },
    { name: "Audius", url: socials.audius, Icon: FaMusic },
    { name: "Spotify", url: socials.spotify, Icon: FaSpotify },
    { name: "Behance", url: socials.behance, Icon: FaBehance },
    { name: "YouTube", url: socials.youtube, Icon: FaYoutube },
    { name: "WhatsApp", url: socials.whatsapp, Icon: FaWhatsapp },
  ];

  return (
    <div className="h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Seletor de Idiomas */}
        <div className="absolute top-6 right-6 lg:right-12 z-20 flex gap-2 text-xs font-mono font-medium tracking-widest bg-black/20 p-2 rounded-lg backdrop-blur-md border border-white/10">
          {(["pt-BR", "en-US", "es-ES"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded transition-all duration-300 ${
                language === lang 
                  ? "bg-brand text-white shadow-[0_0_15px_rgba(255,85,0,0.5)]" 
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {lang.split("-")[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Intro Content */}
        <div className="z-10 flex flex-col items-center gap-14 max-w-2xl mx-auto w-full px-6">
          
          {/* Logo */}
          <div className="text-center flex flex-col items-center">
             <Image 
               src="/media/pajo-logo.png" 
               alt="PAJÔ" 
               width={300} 
               height={100} 
               className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
               priority
             />
             <p className="text-white/80 font-mono tracking-[0.3em] text-xs md:text-sm uppercase mt-8 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
               {language === 'pt-BR' ? 'Música, Arte & Tecnologia' : language === 'es-ES' ? 'Música, Arte y Tecnología' : 'Music, Art & Technology'}
             </p>
          </div>

          {/* Botões Principais */}
          <div className="flex flex-col sm:flex-row gap-6 w-full mt-4">
            <Link 
              href="/sites"
              className="flex-1 px-8 py-5 bg-black/30 hover:bg-white text-white hover:text-black transition-all duration-300 border border-white/30 hover:border-white font-mono text-center tracking-widest uppercase text-sm backdrop-blur-md shadow-2xl"
            >
              {language === 'pt-BR' ? 'Ver Sites' : language === 'es-ES' ? 'Ver Sitios' : 'View Sites'}
            </Link>
            <Link 
              href="/arte" 
              className="flex-1 px-8 py-5 bg-brand/80 hover:bg-white text-white hover:text-black transition-all duration-300 border border-brand hover:border-white font-mono text-center tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(255,85,0,0.4)] backdrop-blur-md"
            >
              {language === 'pt-BR' ? 'Ver Arte' : language === 'es-ES' ? 'Ver Arte' : 'View Art'}
            </Link>
          </div>

          {/* Redes Sociais em Cards */}
          <div className="w-full flex flex-wrap justify-center items-center gap-3 mt-6 max-w-3xl">
            {socialLinks.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/10 hover:border-brand rounded-sm backdrop-blur-sm text-white/70 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,85,0,0.3)] hover:-translate-y-1"
              >
                <Icon className="text-lg" />
                <span className="font-mono text-[10px] tracking-widest uppercase">{name}</span>
              </a>
            ))}
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 animate-pulse pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest uppercase text-white drop-shadow-md">
            {language === 'pt-BR' ? 'Role para ver o vídeo' : language === 'es-ES' ? 'Desplácese para ver el video' : 'Scroll to play video'}
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
        </div>

      </div>
    </div>
  );
}

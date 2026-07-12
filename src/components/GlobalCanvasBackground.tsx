"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalCanvasBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    gsap.registerPlugin(ScrollTrigger);
    
    const video = videoRef.current;
    if (!video) return;

    // Garante que o vídeo vai estar pronto para o GSAP ler a duração
    const handleLoadedMetadata = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smoothing de 1 segundo ajuda o vídeo a acompanhar sem travar o celular
        },
      });

      tl.to(video, {
        currentTime: video.duration || 10,
        ease: "none",
      });
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 -z-50 bg-black pointer-events-none overflow-hidden">
      {/* 
        Para consertar o corte do rosto no mobile:
        Usamos object-left no celular para que o lado esquerdo (onde o rosto está) 
        fique alinhado com a borda da tela. 
      */}
      <video
        ref={videoRef}
        src="/media/pajo-hero.mp4"
        className={`w-full h-full object-cover opacity-60 ${isMobile ? 'object-left' : 'object-center'}`}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

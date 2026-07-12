"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false }); // alpha false for performance
    if (!context) return;

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(); // Re-render current frame on resize
    };
    window.addEventListener("resize", handleResize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Frame Sequence Logic
    const frameCount = 361; // Total de frames na pasta
    const images: HTMLImageElement[] = new Array(frameCount);
    const seq = { frame: 0 };
    let loadedCount = 0;
    
    // OTIMIZAÇÃO: Carregar apenas os primeiros 15 frames imediatamente (1 segundo de vídeo)
    // para a página abrir instantaneamente e não travar o 3G.
    const initialLoadCount = 15;

    const render = () => {
      const currentFrame = Math.round(seq.frame);
      const img = images[currentFrame];
      
      // Se pular para um frame que ainda não terminou de baixar (scroll rápido), ignora o desenho
      if (!img || !img.complete) return; 
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth, renderHeight, x, y;

      const isMobile = canvas.width < 768;

      // Object-cover logic com Offset de Foco para Mobile
      if (imgRatio > canvasRatio) {
        renderHeight = canvas.height;
        renderWidth = canvas.height * imgRatio;
        
        if (isMobile) {
            // CORREÇÃO DO ROSTO CORTADO:
            // 0.5 seria o centro exato. 0.7 puxa o vídeo para que a parte direita fique mais visível.
            // Altere este valor entre 0.0 (esquerda) e 1.0 (direita) para centralizar perfeitamente o seu rosto.
            const MOBILE_FOCUS_OFFSET = 0.7; 
            const overflowX = renderWidth - canvas.width;
            x = -(overflowX * MOBILE_FOCUS_OFFSET);
        } else {
            // Desktop: Centro exato
            x = (canvas.width - renderWidth) / 2;
        }
        y = 0;
      } else {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2; // Vertical center is usually fine
      }

      context.drawImage(img, x, y, renderWidth, renderHeight);
    };

    const loadFrame = (i: number) => {
      const img = new Image();
      img.src = `/media/frames/frame_${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (i === 0) render(); // Render first frame immediately
        
        // Consider ready for interaction when initial batch is done
        if (loadedCount >= Math.min(initialLoadCount, frameCount) && !imagesLoaded) {
          setImagesLoaded(true); 
        }
      };
      images[i] = img;
    };

    // 1. Carrega os primeiros frames IMEDIATAMENTE (Prioridade Alta)
    for (let i = 0; i < Math.min(initialLoadCount, frameCount); i++) {
       loadFrame(i);
    }

    // 2. Carrega o restante dos frames DEPOIS que a página já processou (Prioridade Baixa)
    if (frameCount > initialLoadCount) {
       setTimeout(() => {
          for (let i = initialLoadCount; i < frameCount; i++) {
             loadFrame(i);
          }
       }, 500); // Meio segundo de atraso para deixar a CPU livre para renderizar a interface
    }

    // Scroll Animation - Attached to the entire document.body
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0, // Instant scrub for canvas
      },
    });

    // Scrub through frames
    tl.to(seq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 -z-50 bg-black pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
      
      {/* Loading Indicator for Initial Frames only */}
      {!imagesLoaded && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/30 font-mono text-xs uppercase tracking-widest animate-pulse">
          Loading Engine...
        </div>
      )}
    </div>
  );
}

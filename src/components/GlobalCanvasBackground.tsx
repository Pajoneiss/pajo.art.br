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
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener("resize", handleResize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mobile usa apenas 121 frames em BAIXA resolução para consumo de RAM zero
    // Desktop usa 361 frames HD
    const frameCount = isMobile ? 121 : 361;
    const folder = isMobile ? "frames_mobile" : "frames";
    const images: HTMLImageElement[] = new Array(frameCount);
    const seq = { frame: 0 };
    let loadedCount = 0;
    
    const initialLoadCount = 10;

    const render = () => {
      const currentFrame = Math.round(seq.frame);
      const img = images[currentFrame];
      if (!img || !img.complete) return; 
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth, renderHeight, x, y;

      if (imgRatio > canvasRatio) {
        renderHeight = canvas.height;
        renderWidth = canvas.height * imgRatio;
        
        if (isMobile) {
            // x = 0 trava o canto esquerdo do vídeo no canto esquerdo do celular
            // garantindo que o seu rosto, que está na esquerda, não seja cortado.
            x = 0; 
        } else {
            // Desktop: Centro exato
            x = (canvas.width - renderWidth) / 2;
        }
        y = 0;
      } else {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      }
      context.drawImage(img, x, y, renderWidth, renderHeight);
    };

    const loadFrame = (i: number) => {
      const img = new Image();
      img.src = `/media/${folder}/frame_${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (i === 0) render();
        if (loadedCount >= Math.min(initialLoadCount, frameCount) && !imagesLoaded) {
          setImagesLoaded(true); 
        }
      };
      images[i] = img;
    };

    for (let i = 0; i < Math.min(initialLoadCount, frameCount); i++) {
       loadFrame(i);
    }

    if (frameCount > initialLoadCount) {
       setTimeout(() => {
          for (let i = initialLoadCount; i < frameCount; i++) {
             loadFrame(i);
          }
       }, 200);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Smoothing super leve
      },
    });

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
      {!imagesLoaded && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/30 font-mono text-xs uppercase tracking-widest animate-pulse">
          Loading Engine...
        </div>
      )}
    </div>
  );
}

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
    const context = canvas.getContext("2d");
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
    const frameCount = 361;
    const images: HTMLImageElement[] = [];
    const seq = { frame: 0 };
    let loadedCount = 0;

    const render = () => {
      if (!images[seq.frame]) return;
      const img = images[seq.frame];
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth, renderHeight, x, y;

      // Object-cover logic
      if (imgRatio > canvasRatio) {
        renderHeight = canvas.height;
        renderWidth = canvas.height * imgRatio;
        x = (canvas.width - renderWidth) / 2;
        y = 0;
      } else {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, renderWidth, renderHeight);
    };

    // Preload Images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // frame_000.jpg to frame_240.jpg
      img.src = `/media/frames/frame_${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (i === 0) render(); // Render first frame immediately
        if (loadedCount === frameCount) setImagesLoaded(true);
      };
      images.push(img);
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
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-black pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
      />
      
      {/* Loading Indicator */}
      {!imagesLoaded && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/30 font-mono text-xs uppercase tracking-widest animate-pulse">
          Loading Engine...
        </div>
      )}
      
      {/* No global dark overlay as requested */}
    </div>
  );
}

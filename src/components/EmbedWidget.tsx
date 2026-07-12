import React from "react";
import { FaInstagram, FaSoundcloud, FaSpotify, FaBehance, FaYoutube, FaWhatsapp, FaMusic, FaLink } from "react-icons/fa6";

interface EmbedWidgetProps {
  url: string;
}

export default function EmbedWidget({ url }: EmbedWidgetProps) {
  // 1. YouTube
  // Match youtube.com/watch?v=ID or youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }

  // 2. Instagram
  // Match instagram.com/p/ID or instagram.com/reel/ID
  const igMatch = url.match(/(?:instagram\.com)\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    const postId = igMatch[1];
    return (
      <div className="relative w-full max-w-sm mx-auto aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          src={`https://www.instagram.com/p/${postId}/embed`}
          className="absolute top-0 left-0 w-full h-full border-none"
          scrolling="no"
          allowTransparency
        />
      </div>
    );
  }

  // 3. Behance
  // Match behance.net/gallery/ID/TITLE or behance.net/embed/project/ID
  const behanceMatch = url.match(/behance\.net\/(?:gallery|embed\/project)\/(\d+)/);
  if (behanceMatch && behanceMatch[1]) {
    const projectId = behanceMatch[1];
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
        <iframe
          src={`https://www.behance.net/embed/project/${projectId}?ssr=1`}
          className="absolute top-0 left-0 w-full h-full border-none"
          allowFullScreen
          allow="clipboard-write"
        />
      </div>
    );
  }

  // 4. Spotify
  const spotifyMatch = url.match(/spotify\.com\/(?:embed\/)?(artist|track|album|playlist)\/([A-Za-z0-9]+)/);
  if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
    const type = spotifyMatch[1];
    const id = spotifyMatch[2];
    return (
      <div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
          className="absolute top-0 left-0 w-full h-full border-none"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }

  // 5. Audius
  const audiusEmbedMatch = url.match(/audius\.co\/embed\/track\/([A-Za-z0-9_-]+)/);
  if (audiusEmbedMatch && audiusEmbedMatch[1]) {
    const trackId = audiusEmbedMatch[1];
    return (
      <div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
        <iframe
          src={`https://audius.co/embed/track/${trackId}?flavor=card`}
          className="absolute top-0 left-0 w-full h-full border-none"
          allow="encrypted-media"
        />
      </div>
    );
  }

  const audiusMatch = url.match(/audius\.co\/([^\/]+)\/([^\/?]+)/);
  if (audiusMatch && audiusMatch[1] && audiusMatch[2]) {
    const user = audiusMatch[1];
    const track = audiusMatch[2];
    if (user !== "embed") {
      return (
        <div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
          <iframe
            src={`https://audius.co/embed/track/${user}/${track}?flavor=card`}
            className="absolute top-0 left-0 w-full h-full border-none"
            allow="encrypted-media"
          />
        </div>
      );
    }
  }

  // 6. SoundCloud
  const scMatch = url.match(/soundcloud\.com\/([^\/]+)\/([^\/?]+)/);
  if (scMatch) {
    const encodedUrl = encodeURIComponent(url);
    return (
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
        <iframe
          src={`https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&visual=true`}
          className="absolute top-0 left-0 w-full h-full border-none"
          allow="autoplay; encrypted-media"
        />
      </div>
    );
  }

  // Fallback: If URL is not supported, just render a clickable link card
  let platformName = "External Project";
  let Icon = FaLink;
  let color = "text-white";

  if (url.includes("instagram.com")) {
    platformName = "Instagram";
    Icon = FaInstagram;
    color = "text-pink-500";
  } else if (url.includes("soundcloud.com")) {
    platformName = "SoundCloud";
    Icon = FaSoundcloud;
    color = "text-orange-500";
  } else if (url.includes("audius.co")) {
    platformName = "Audius";
    Icon = FaMusic;
    color = "text-purple-500";
  } else if (url.includes("spotify.com")) {
    platformName = "Spotify";
    Icon = FaSpotify;
    color = "text-green-500";
  } else if (url.includes("behance.net")) {
    platformName = "Behance";
    Icon = FaBehance;
    color = "text-blue-500";
  } else if (url.includes("wa.me")) {
    platformName = "WhatsApp";
    Icon = FaWhatsapp;
    color = "text-green-400";
  } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
    platformName = "YouTube";
    Icon = FaYoutube;
    color = "text-red-500";
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center w-full aspect-square bg-black/60 hover:bg-white/10 backdrop-blur-md transition-all rounded-2xl border border-white/20 group shadow-2xl overflow-hidden relative"
    >
      {/* Glow effect behind icon */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-t from-current to-transparent ${color}`} />
      
      <Icon className={`w-1/2 h-1/2 drop-shadow-xl group-hover:scale-110 transition-transform duration-500 ${color}`} />
    </a>
  );
}

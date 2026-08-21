import { useState } from "react";
import type { Video } from "../data/videos";

interface VideoCardProps {
  video: Video;
  featured?: boolean;
}

export function VideoCard({ video, featured = false }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = video.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`
    : video.embedUrl;

  return (
    <div
      className={`border-2 border-white bg-black p-4 sm:p-6 font-mono text-white flex flex-col justify-between ${
        featured
          ? "shadow-[8px_8px_0px_#00F5D4]"
          : "shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4]"
      } transition-all`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs uppercase">
        <span className="bg-[#00F5D4] text-black font-bold px-2 py-0.5 text-[11px]">
          {video.category || "VISUAL TRANSMISSION"}
        </span>
        {video.releaseDate && (
          <span className="text-neutral-400 text-[11px]">
            {video.releaseDate}
          </span>
        )}
      </div>

      {/* Video Container / Player Frame */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-2 border-white mb-6">
        {isPlaying && embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        ) : (
          <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/Band Logo/Band Icon.PNG";
              }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-5 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest border-2 border-white group-hover:bg-[#00F5D4] group-hover:border-[#00F5D4] shadow-[4px_4px_0px_#000000] flex items-center gap-2">
                <span>▶</span>
                <span>[ PLAY VIDEO ]</span>
              </div>
            </div>
            {/* Tactical Tag */}
            <div className="absolute bottom-2 left-2 bg-black px-2 py-1 border border-white text-[10px] uppercase font-bold text-white">
              VISUAL FEED // {video.id}
            </div>
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-[-0.04em]">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs text-neutral-400 uppercase leading-relaxed">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default VideoCard;

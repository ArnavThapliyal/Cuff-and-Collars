import { Link } from "@remix-run/react";
import type { Release } from "../data/releases";

interface ReleaseCardProps {
  release: Release;
  featured?: boolean;
}

export function ReleaseCard({ release, featured = false }: ReleaseCardProps) {
  return (
    <article
      className={`border-2 border-white bg-black p-4 md:p-6 font-mono text-white flex flex-col justify-between transition-all ${
        featured
          ? "shadow-[8px_8px_0px_#00F5D4]"
          : "shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4]"
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs uppercase">
        <span className="bg-[#00F5D4] text-black font-bold px-2 py-0.5 text-[11px]">
          {release.type}
        </span>
        <span className="text-neutral-400 text-[11px]">
          {release.releaseDate}
        </span>
      </div>

      {/* Cover Artwork */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-900 border-2 border-white mb-6 group">
        <img
          src={release.coverImage}
          alt={release.title}
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/Band Logo/band-icon.png";
          }}
        />
        <div className="absolute top-2 left-2 bg-black px-2 py-1 border border-white text-[10px] uppercase font-bold text-white">
          ARTWORK // CC-RELEASE
        </div>
      </div>

      {/* Release Info */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-black uppercase text-white tracking-[-0.04em]">
            {release.title}
          </h3>
          <p className="text-xs text-neutral-400 uppercase mt-2 line-clamp-3">
            {release.description}
          </p>
        </div>

        {/* Tracklist Preview & Streaming CTA */}
        <div className="pt-4 border-t border-neutral-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400 uppercase">
            <span>TRACKS: {release.tracklist.length}</span>
            <Link
              to={`/music/${release.slug}`}
              className="text-[#00F5D4] hover:underline font-bold"
            >
              [ VIEW DETAILS → ]
            </Link>
          </div>

          {/* Streaming Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] uppercase font-bold">
            {release.streamingLinks.spotify && (
              <a
                href={release.streamingLinks.spotify}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white text-center hover:bg-white hover:text-black transition-colors"
              >
                SPOTIFY ↗
              </a>
            )}
            {release.streamingLinks.appleMusic && (
              <a
                href={release.streamingLinks.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white text-center hover:bg-white hover:text-black transition-colors"
              >
                APPLE MUSIC ↗
              </a>
            )}
            {release.streamingLinks.bandcamp && (
              <a
                href={release.streamingLinks.bandcamp}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white text-center hover:bg-white hover:text-black transition-colors sm:col-span-2"
              >
                BANDCAMP ARCHIVE ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReleaseCard;

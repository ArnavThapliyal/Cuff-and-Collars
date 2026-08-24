import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getReleaseBySlug } from "../data/releases";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.release) {
    return [{ title: "RELEASE NOT FOUND // CUFF & COLLARS" }];
  }
  return [
    { title: `${data.release.title.toUpperCase()} // CUFF & COLLARS` },
    {
      name: "description",
      content: data.release.description || `Listen to ${data.release.title} by Cuff & Collars.`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    throw new Response("Slug parameter is required", { status: 400 });
  }

  const release = getReleaseBySlug(slug);
  if (!release) {
    throw new Response(`Release "${slug}" not found in catalog.`, { status: 404 });
  }

  return json({ release });
};

export default function ReleaseDetailRoute() {
  const { release } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <Link
            to="/music"
            className="text-xs uppercase font-bold text-[#00F5D4] hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>[ RETURN TO DISCOGRAPHY ]</span>
          </Link>
          <span className="text-xs text-neutral-500 uppercase font-mono">
            CATALOG ENTRY // {release.slug}
          </span>
        </div>

        {/* Release Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Artwork Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-2 border-white bg-black p-3 shadow-[8px_8px_0px_#00F5D4]">
              <div className="aspect-square w-full overflow-hidden bg-neutral-900 border-2 border-white mb-3">
                <img
                  src={release.coverImage}
                  alt={release.title}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/Band Logo/band-icon.png";
                  }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-neutral-400 uppercase pt-1 font-mono">
                <span>OFFICIAL ARTWORK</span>
                <span className="text-[#00F5D4] font-bold">HI-RES ARCHIVE</span>
              </div>
            </div>

            {/* Streaming & Audio Channels */}
            <div className="border-2 border-white bg-black p-5 space-y-3 font-mono">
              <h4 className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                AUDIO TRANSMISSION LINKS
              </h4>
              <div className="flex flex-col gap-2 pt-1">
                {release.streamingLinks.spotify && (
                  <a
                    href={release.streamingLinks.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 border border-white text-xs uppercase font-bold text-center hover:bg-[#00F5D4] hover:text-black hover:border-[#00F5D4] transition-colors flex justify-between items-center"
                  >
                    <span>SPOTIFY</span>
                    <span>↗</span>
                  </a>
                )}
                {release.streamingLinks.appleMusic && (
                  <a
                    href={release.streamingLinks.appleMusic}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 border border-white text-xs uppercase font-bold text-center hover:bg-white hover:text-black transition-colors flex justify-between items-center"
                  >
                    <span>APPLE MUSIC</span>
                    <span>↗</span>
                  </a>
                )}
                {release.streamingLinks.bandcamp && (
                  <a
                    href={release.streamingLinks.bandcamp}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 border border-white text-xs uppercase font-bold text-center hover:bg-white hover:text-black transition-colors flex justify-between items-center"
                  >
                    <span>BANDCAMP</span>
                    <span>↗</span>
                  </a>
                )}
                {release.streamingLinks.youtube && (
                  <a
                    href={release.streamingLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 border border-white text-xs uppercase font-bold text-center hover:bg-white hover:text-black transition-colors flex justify-between items-center"
                  >
                    <span>YOUTUBE AUDIO</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Tracklist, Liner Notes */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header Details */}
            <div className="border-b-2 border-white pb-6 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="zine-tag bg-[#00F5D4] text-black font-bold">
                  {release.type}
                </span>
                <span className="text-xs uppercase text-neutral-400 font-mono">
                  RELEASE DATE: {release.releaseDate}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-[-0.06em]">
                {release.title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed uppercase font-mono">
                {release.description}
              </p>
            </div>

            {/* Tracklist Section */}
            <div className="border-2 border-white bg-black p-6 shadow-[6px_6px_0px_#FFFFFF] space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-display font-black uppercase text-white tracking-[-0.04em]">
                  TRACKLIST // DIRECTORY
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  {release.tracklist.length} {release.tracklist.length === 1 ? "TRACK" : "TRACKS"}
                </span>
              </div>

              <div className="divide-y divide-neutral-900 font-mono text-sm">
                {release.tracklist.map((track) => (
                  <div
                    key={track.trackNumber}
                    className="py-3 flex items-center justify-between group hover:bg-neutral-900 px-2 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-500 text-xs w-6">
                        {String(track.trackNumber).padStart(2, "0")}
                      </span>
                      <span className="font-bold text-white uppercase group-hover:text-[#00F5D4] transition-colors">
                        {track.title}
                      </span>
                    </div>
                    {track.duration && (
                      <span className="text-xs text-neutral-500 uppercase">
                        {track.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Liner Notes & Credits Box */}
            <div className="border-2 border-white bg-black p-6 space-y-3 font-mono text-xs uppercase shadow-[4px_4px_0px_#FFFFFF]">
              <h4 className="text-[#00F5D4] font-bold tracking-widest">
                ARCHIVE LINER NOTES
              </h4>
              <div className="space-y-2">
                <span className="zine-todo text-[11px] block">
                  TODO: Insert Full Album Liner Notes & Credits
                </span>
                <span className="zine-todo text-[11px] block">
                  TODO: Insert Production & Master Credits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { VideoCard } from "../components/VideoCard";
import { videos } from "../data/videos";
import { bandData } from "../data/band";

export const meta: MetaFunction = () => {
  return [
    { title: "VIDEOS & VISUALS // CUFF & COLLARS" },
    {
      name: "description",
      content:
        "Official music videos, visualizers, live performance recordings, and archival film from Cuff & Collars.",
    },
  ];
};

export const loader = async () => {
  const archiveVisuals = [
    {
      id: "live-session-01",
      title: "TODO: Live Session Transmission #01",
      thumbnailUrl: "/RefrenceImages/band-live-rehearsal.jpg",
      category: "Live" as const,
      description: "TODO: Insert Live Session Details",
      releaseDate: "TODO",
    },
    {
      id: "visualizer-02",
      title: "TODO: Official Visualizer #02",
      thumbnailUrl: "/RefrenceImages/visualizer-thumb-02.jpg",
      category: "Visualizer" as const,
      description: "TODO: Insert Visualizer Details",
      releaseDate: "TODO",
    },
  ];

  return json({ videos, archiveVisuals, bandData });
};

export default function VideosRoute() {
  const { videos, archiveVisuals, bandData } = useLoaderData<typeof loader>();
  const featuredVideo = videos[0];
  const allVideos = [...videos.slice(1), ...archiveVisuals];

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2">
              <span>INDEX // 04</span>
              <span>•</span>
              <span>VIDEO TRANSMISSIONS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none">
              VISUAL REEL
            </h1>
          </div>
          <div className="text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1">
            <span className="zine-todo text-[10px] block">
              TODO: Insert Video Archive Metadata
            </span>
          </div>
        </div>

        {/* Featured Video Player */}
        {featuredVideo && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="zine-tag bg-white text-black font-bold">
                FEATURED TRANSMISSION
              </span>
              <span className="text-xs text-neutral-500 uppercase font-mono">
                SIGNAL // PRIMARY
              </span>
            </div>
            <VideoCard video={featuredVideo} featured={true} />
          </section>
        )}

        {/* Video Gallery Grid */}
        <section className="space-y-6 pt-8">
          <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
            <h2 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em]">
              ARCHIVED VISUALS & SESSIONS
            </h2>
            <span className="text-xs text-neutral-400 uppercase font-mono">
              {allVideos.length} ENTRIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* YouTube Channel Banner */}
        <div className="border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#00F5D4] mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="zine-tag bg-[#00F5D4] text-black font-bold mb-2">
              YOUTUBE ARCHIVE
            </span>
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2">
              SUBSCRIBE FOR OFFICIAL TRANSMISSIONS
            </h3>
            <div className="pt-1">
              <span className="zine-todo text-[11px] block">
                TODO: Insert YouTube Channel Description
              </span>
            </div>
          </div>
          <a
            href={bandData.socials.youtube}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]"
          >
            [ OPEN YOUTUBE CHANNEL ↗ ]
          </a>
        </div>
      </div>
    </div>
  );
}

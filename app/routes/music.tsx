import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ReleaseCard } from "../components/ReleaseCard";
import { releases } from "../data/releases";
import { bandData } from "../data/band";

export const meta: MetaFunction = () => {
  return [
    { title: "MUSIC & DISCOGRAPHY // CUFF & COLLARS" },
    {
      name: "description",
      content:
        "Complete catalog of singles, EPs, and albums by alternative/indie collective Cuff & Collars.",
    },
  ];
};

export const loader = async () => {
  return json({ releases, bandData });
};

export default function MusicIndexRoute() {
  const { releases, bandData } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2">
              <span>INDEX // 02</span>
              <span>•</span>
              <span>AUDIO ARCHIVE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none">
              DISCOGRAPHY
            </h1>
          </div>
          <div className="text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1">
            <p>TOTAL RELEASES: {releases.length}</p>
            <span className="zine-todo text-[10px] block">
              TODO: Insert Physical Formats
            </span>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, idx) => (
            <ReleaseCard key={release.slug} release={release} featured={idx === 0} />
          ))}

          {/* Pending Release Slot */}
          <div className="border-2 border-dashed border-white/40 bg-black p-6 flex flex-col justify-between items-center text-center font-mono min-h-[400px]">
            <div className="w-full flex justify-between text-[10px] text-neutral-500 uppercase border-b border-neutral-800 pb-2">
              <span>UPCOMING ENTRY</span>
              <span>#CC-002</span>
            </div>
            <div className="space-y-3 my-auto">
              <div className="w-16 h-16 border-2 border-dashed border-[#00F5D4] mx-auto flex items-center justify-center text-[#00F5D4] text-xl font-bold">
                +
              </div>
              <h3 className="font-display font-black text-xl uppercase text-white tracking-[-0.04em]">
                NEW RECORD
              </h3>
              <span className="zine-todo text-xs inline-block">
                TODO: Next Release Announcement
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 uppercase pt-2 border-t border-neutral-800 w-full">
              STATUS: ARCHIVE PENDING
            </div>
          </div>
        </div>

        {/* Global Streaming Links Section */}
        <div className="border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#FFFFFF] mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="zine-tag bg-[#00F5D4] text-black font-bold mb-2">
                DIRECT STREAMING CHANNELS
              </span>
              <h3 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2">
                LISTEN ACROSS PLATFORMS
              </h3>
              <div className="pt-1">
                <span className="zine-todo text-[11px] block">
                  TODO: Insert Streaming Overview Blurb
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-xs font-bold uppercase w-full sm:w-auto">
              <a
                href={bandData.socials.spotify}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                SPOTIFY ↗
              </a>
              <a
                href={bandData.socials.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                APPLE MUSIC ↗
              </a>
              <a
                href={bandData.socials.bandcamp}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                BANDCAMP ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { Hero } from "../components/Hero";
import { ReleaseCard } from "../components/ReleaseCard";
import { ShowCard, ShowsEmptyState } from "../components/ShowCard";
import { VideoCard } from "../components/VideoCard";

import { releases } from "../data/releases";
import { showsData } from "../data/shows";
import { videos } from "../data/videos";
import { bandData } from "../data/band";

export const meta: MetaFunction = () => {
  return [
    { title: "CUFF & COLLARS // OFFICIAL BAND ARCHIVE" },
    {
      name: "description",
      content:
        "Official digital archive, discography, tour dates, and visual catalog for alternative/indie band Cuff & Collars.",
    },
  ];
};

export const loader = async () => {
  const latestRelease = releases[0];
  const latestVideo = videos[0];
  const upcomingShows = showsData.shows;
  const isShowsComingSoon = showsData.isComingSoon || upcomingShows.length === 0;

  // Curated photographic stills from band archive
  const galleryStills = [
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (2).jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.06 (1).jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.07.jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.08.jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.12.jpeg",
      caption: "TODO: Insert Photo Caption",
    },
  ];

  return json({
    latestRelease,
    latestVideo,
    upcomingShows,
    isShowsComingSoon,
    showsMessage: showsData.message,
    bandData,
    galleryStills,
  });
};

export default function IndexRoute() {
  const {
    latestRelease,
    latestVideo,
    upcomingShows,
    isShowsComingSoon,
    showsMessage,
    bandData,
    galleryStills,
  } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black">
      {/* 1. HERO SECTION */}
      <Hero
        title="CUFF & COLLARS"
        tagline="ANALOG TRANSMISSIONS // NOISE & LIGHT"
        heroImage="/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg"
        location={bandData.location}
      />

      {/* 2. LATEST RELEASE SECTION */}
      <section className="border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // 02]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                LATEST RELEASE
              </h2>
            </div>
            <Link
              to="/music"
              className="text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto"
            >
              [ FULL DISCOGRAPHY → ]
            </Link>
          </div>

          {/* Release Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {latestRelease ? (
                <ReleaseCard release={latestRelease} featured={true} />
              ) : (
                <div className="border-2 border-dashed border-white p-8 text-center">
                  <span className="zine-todo">
                    TODO: Insert Latest Release Data
                  </span>
                </div>
              )}
            </div>

            {/* Tactical Sidebar Note */}
            <div className="lg:col-span-4 border-2 border-white bg-black p-6 space-y-4 shadow-[4px_4px_0px_#FFFFFF]">
              <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-800 pb-2">
                <span>CATALOG ENTRY</span>
                <span className="text-[#00F5D4] font-bold">#CC-001</span>
              </div>
              <h4 className="font-display font-black text-xl uppercase text-white tracking-[-0.04em]">
                RELEASE NOTES
              </h4>
              <div className="pt-2 space-y-2">
                <span className="zine-todo text-[11px] block">
                  TODO: Insert Curator/Release Notes
                </span>
                <span className="zine-todo text-[11px] block">
                  TODO: Physical Vinyl/Cassette Order Link
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING SHOWS SECTION */}
      <section className="border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // 03]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                UPCOMING SHOWS
              </h2>
            </div>
            <Link
              to="/shows"
              className="text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto"
            >
              [ ALL DATES & ARCHIVE → ]
            </Link>
          </div>

          {/* Show Content: Coming Soon or List */}
          {isShowsComingSoon || upcomingShows.length === 0 ? (
            <ShowsEmptyState message={showsMessage} />
          ) : (
            <div className="space-y-4">
              {upcomingShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. LATEST VIDEO SECTION */}
      <section className="border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // 04]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                LATEST VIDEO TRANSMISSION
              </h2>
            </div>
            <Link
              to="/videos"
              className="text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto"
            >
              [ VIDEO ARCHIVE → ]
            </Link>
          </div>

          {/* Video Container */}
          <div className="max-w-5xl mx-auto">
            {latestVideo ? (
              <VideoCard video={latestVideo} featured={true} />
            ) : (
              <div className="border-2 border-dashed border-white p-8 text-center">
                <span className="zine-todo">
                  TODO: Insert Latest Video Transmission
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. THE BAND SECTION */}
      <section className="border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // 05]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                THE BAND // ARCHIVE
              </h2>
            </div>
            <Link
              to="/band"
              className="text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto"
            >
              [ FULL BAND DOSSIER → ]
            </Link>
          </div>

          {/* Band Statement & Visual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="border-2 border-white bg-black p-6 sm:p-8 shadow-[6px_6px_0px_#FFFFFF]">
                <span className="zine-tag bg-[#00F5D4] text-black font-bold mb-4">
                  ARTISTIC STATEMENT
                </span>
                <p className="font-serif italic text-xl sm:text-2xl text-white leading-relaxed mt-4">
                  "{bandData.statement}"
                </p>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400 uppercase">
                  <span>COLLECTIVE MANIFESTO</span>
                  <span className="text-[#00F5D4]">CUFF & COLLARS</span>
                </div>
              </div>

              <div className="p-4 border border-neutral-800 bg-black text-xs text-neutral-300 uppercase space-y-2">
                <div className="text-neutral-500 font-bold">BAND BIOGRAPHY:</div>
                <p>{bandData.bio}</p>
              </div>
            </div>

            {/* Polaroid Photography Collage */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-white bg-black p-2 shadow-[4px_4px_0px_#00F5D4]">
                <img
                  src="/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04.jpeg"
                  alt="Band Polaroid"
                  className="w-full aspect-square object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
                <div className="p-2 text-[10px] text-center uppercase text-neutral-400 font-mono">
                  [TODO: Insert Photo Label]
                </div>
              </div>
              <div className="border-2 border-white bg-black p-2 shadow-[4px_4px_0px_#FFFFFF] mt-0 sm:mt-6">
                <img
                  src="/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (2).jpeg"
                  alt="Live Still"
                  className="w-full aspect-square object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
                <div className="p-2 text-[10px] text-center uppercase text-neutral-400 font-mono">
                  [TODO: Insert Photo Label]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIALS & VISUAL TRANSMISSIONS (INSTAGRAM GRID) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // 06]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                VISUAL TRANSMISSIONS // INSTAGRAM
              </h2>
            </div>
            <a
              href={bandData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto flex items-center gap-2"
            >
              <span>[ FOLLOW ON INSTAGRAM ↗ ]</span>
            </a>
          </div>

          {/* Tactical Art-Zine Stills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryStills.map((still, idx) => (
              <a
                key={idx}
                href={bandData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="group border-2 border-white bg-black p-2 block hover:border-[#00F5D4] shadow-[3px_3px_0px_#FFFFFF] hover:shadow-[4px_4px_0px_#00F5D4] transition-all"
              >
                <div className="aspect-square overflow-hidden bg-black border border-neutral-800">
                  <img
                    src={still.src}
                    alt={still.caption}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/Band Logo/Band Icon.PNG";
                    }}
                  />
                </div>
                <div className="pt-2 text-[9px] uppercase font-mono text-neutral-400 group-hover:text-white truncate">
                  {still.caption}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

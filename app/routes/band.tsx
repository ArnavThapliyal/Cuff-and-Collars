import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { BandMember } from "../components/BandMember";
import { bandData } from "../data/band";

export const meta: MetaFunction = () => {
  return [
    { title: "BAND & ZINE ARCHIVE // CUFF & COLLARS" },
    {
      name: "description",
      content:
        "Editorial art-zine, manifesto, photographic archive, and band dossier for Cuff & Collars.",
    },
  ];
};

export const loader = async () => {
  const zineSpreads = [
    {
      id: "spread-01",
      title: "TODO: Insert Spread Title 01",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.07.jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      id: "spread-02",
      title: "TODO: Insert Spread Title 02",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.06 (1).jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      id: "spread-03",
      title: "TODO: Insert Spread Title 03",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
      caption: "TODO: Insert Photo Caption",
    },
    {
      id: "spread-04",
      title: "TODO: Insert Spread Title 04",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.13 (2).jpeg",
      caption: "TODO: Insert Photo Caption",
    },
  ];

  return json({ bandData, zineSpreads });
};

export default function BandRoute() {
  const { bandData, zineSpreads } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2">
              <span>INDEX // 05</span>
              <span>•</span>
              <span>EDITORIAL ZINE & DOSSIER</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none">
              THE ARCHIVE
            </h1>
          </div>
          <div className="text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1">
            <p>COLLECTIVE: CUFF & COLLARS</p>
            <span className="zine-todo text-[10px] block">
              ORIGIN: [{bandData.location}]
            </span>
          </div>
        </div>

        {/* 1. MANIFESTO & ART-ZINE SPREAD */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Manifesto Column */}
          <div className="lg:col-span-7 border-2 border-white bg-black p-6 sm:p-10 shadow-[8px_8px_0px_#00F5D4] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span className="zine-tag bg-white text-black font-bold">
                  MANIFESTO // VOL. 01
                </span>
                <span className="text-xs text-neutral-500 uppercase font-mono">
                  UNFILTERED SIGNAL
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-[-0.05em]">
                RAW SOUND. TACTILE ARTIFACTS.
              </h2>
              <blockquote className="font-serif italic text-lg sm:text-2xl text-neutral-200 border-l-2 border-[#00F5D4] pl-6 leading-relaxed">
                "{bandData.statement}"
              </blockquote>
              <div className="pt-2">
                <span className="zine-todo text-xs block">
                  {bandData.bio}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs uppercase font-mono">
              <span className="text-[#00F5D4] font-bold">
                OFFICIAL DIGITAL ARCHIVE
              </span>
              <span className="text-neutral-500">REF: ARCH-ZINE-2026</span>
            </div>
          </div>

          {/* Right Tactile Graphic Box */}
          <div className="lg:col-span-5 border-2 border-white bg-black p-6 flex flex-col justify-between shadow-[8px_8px_0px_#FFFFFF] space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2 font-mono">
                <span>IDENTITY SYMBOL</span>
                <span className="text-[#00F5D4] font-bold">OFFICIAL EMBLEM</span>
              </div>
              <div className="aspect-square bg-black border-2 border-white flex items-center justify-center p-8 group">
                <img
                  src="/Band Logo/Band Icon.PNG"
                  alt="Band Icon"
                  className="w-full h-full object-contain invert group-hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs uppercase font-mono">
              <div className="font-bold text-white">COLLECTIVE DISPATCH</div>
              <span className="zine-todo text-[11px] block">
                TODO: Insert Collective Mission Statement
              </span>
            </div>
          </div>
        </section>

        {/* 2. BAND MEMBERS SECTION */}
        <section className="space-y-8">
          <div className="border-b-2 border-white pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // PERSONNEL]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                BAND MEMBERS
              </h2>
            </div>
            <span className="text-xs text-neutral-400 uppercase font-mono">
              ROSTER // OFFICIAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandData.members.map((member, idx) => (
              <BandMember key={idx} member={member} />
            ))}

            {/* Placeholder for Additional Band Personnel */}
            <div className="border-2 border-dashed border-white/40 bg-black p-6 flex flex-col justify-between text-center min-h-[300px]">
              <div className="text-[10px] text-neutral-500 uppercase border-b border-neutral-800 pb-2 font-mono">
                PERSONNEL // DOSSIER
              </div>
              <div className="space-y-2 my-auto">
                <span className="zine-todo text-xs inline-block">
                  TODO: Additional Member Profiles
                </span>
              </div>
              <div className="text-[10px] text-neutral-500 uppercase pt-2 border-t border-neutral-800 font-mono">
                DISPATCH PENDING
              </div>
            </div>
          </div>
        </section>

        {/* 3. ZINE GALLERY / PHOTO SPREADS */}
        <section className="space-y-8 pt-8">
          <div className="border-b-2 border-white pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                [SECTION // PHYSICAL ARTIFACTS]
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1">
                ZINE SPREADS & POLAROIDS
              </h2>
            </div>
            <span className="text-xs text-neutral-400 uppercase font-mono">
              DIGITAL ARCHIVE SLIDES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {zineSpreads.map((spread) => (
              <div
                key={spread.id}
                className="border-2 border-white bg-black p-4 sm:p-6 shadow-[6px_6px_0px_#FFFFFF] hover:shadow-[8px_8px_0px_#00F5D4] transition-all space-y-4"
              >
                <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-800 pb-2 uppercase font-mono">
                  <span className="font-bold text-white">{spread.title}</span>
                  <span className="text-[#00F5D4]">{spread.id}</span>
                </div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900 border-2 border-white">
                  <img
                    src={spread.image}
                    alt={spread.title}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/Band Logo/Band Icon.PNG";
                    }}
                  />
                </div>
                <div className="text-xs text-neutral-400 uppercase font-mono pt-1">
                  {spread.caption}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. DISPATCH & BOOKING CALLOUT */}
        <div className="border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="zine-tag bg-[#00F5D4] text-black font-bold mb-2">
              DISPATCH & PRESS
            </span>
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2">
              CONNECT WITH CUFF & COLLARS
            </h3>
            <div className="pt-1">
              <span className="zine-todo text-[11px] block">
                TODO: Insert Press & Interview Inquiry Note
              </span>
            </div>
          </div>
          <Link
            to="/contact"
            className="w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]"
          >
            [ DISPATCH INQUIRY → ]
          </Link>
        </div>
      </div>
    </div>
  );
}

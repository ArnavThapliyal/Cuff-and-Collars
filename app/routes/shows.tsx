import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { ShowCard, ShowsEmptyState } from "../components/ShowCard";
import { showsData } from "../data/shows";

export const meta: MetaFunction = () => {
  return [
    { title: "LIVE SHOWS & DATES // CUFF & COLLARS" },
    {
      name: "description",
      content:
        "Official live dates, tour schedule, festival appearances, and ticket links for Cuff & Collars.",
    },
  ];
};

export const loader = async () => {
  return json({ showsData });
};

export default function ShowsRoute() {
  const { showsData } = useLoaderData<typeof loader>();
  const isComingSoon = showsData.isComingSoon || showsData.shows.length === 0;

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2">
              <span>INDEX // 03</span>
              <span>•</span>
              <span>LIVE GIGS & TOURS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none">
              LIVE DATES
            </h1>
          </div>
          <div className="text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1">
            <p>STATUS: TRANSMISSION PENDING</p>
            <span className="zine-todo text-[10px] block">
              REGIONS: [TODO: Insert Tour Regions]
            </span>
          </div>
        </div>

        {/* Shows Main Content: Shows or Coming Soon */}
        {isComingSoon ? (
          <div className="space-y-8">
            <ShowsEmptyState message={showsData.message} />

            {/* Live Performance Photography & Stills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="border-2 border-white bg-black p-4 space-y-3 shadow-[4px_4px_0px_#FFFFFF]">
                <div className="aspect-video overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src="/RefrenceImages/band-hero.jpg"
                    alt="Live Rehearsal"
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-xs uppercase font-bold text-white">
                  STAGE DISPATCH // 01
                </div>
                <span className="zine-todo text-[10px] block">
                  TODO: Insert Stage Setup Notes
                </span>
              </div>

              <div className="border-2 border-white bg-black p-4 space-y-3 shadow-[4px_4px_0px_#00F5D4]">
                <div className="aspect-video overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src="/RefrenceImages/band-live-rehearsal.jpg"
                    alt="Live Performance"
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-xs uppercase font-bold text-white">
                  STAGE DISPATCH // 02
                </div>
                <span className="zine-todo text-[10px] block">
                  TODO: Insert Live Audio Recording Notes
                </span>
              </div>

              <div className="border-2 border-white bg-black p-4 space-y-3 shadow-[4px_4px_0px_#FFFFFF]">
                <div className="aspect-video overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src="/RefrenceImages/stage-dispatch-03.jpg"
                    alt="Tour Stills"
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-xs uppercase font-bold text-white">
                  STAGE DISPATCH // 03
                </div>
                <span className="zine-todo text-[10px] block">
                  TODO: Insert Visual Performance Notes
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {showsData.shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}

        {/* Booking and Venue Inquiry Box */}
        <div className="border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#FFFFFF] mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="zine-tag bg-[#00F5D4] text-black font-bold mb-2">
              BOOKINGS & PROMOTERS
            </span>
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2">
              BOOK CUFF & COLLARS FOR YOUR VENUE / FESTIVAL
            </h3>
            <div className="pt-1">
              <span className="zine-todo text-[11px] block">
                TODO: Insert Promoter Rider & Booking Info
              </span>
            </div>
          </div>
          <Link
            to="/contact"
            className="w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]"
          >
            [ CONTACT BOOKING AGENT → ]
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { bandData } from "../data/band";

export const meta: MetaFunction = () => {
  return [
    { title: "CONTACT & DISPATCH // CUFF & COLLARS" },
    {
      name: "description",
      content:
        "Booking, press inquiries, management, and official transmission dispatch for Cuff & Collars.",
    },
  ];
};

export const loader = async () => {
  return json({ bandData });
};

export default function ContactRoute() {
  const { bandData } = useLoaderData<typeof loader>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2">
              <span>INDEX // 06</span>
              <span>•</span>
              <span>DIRECT DISPATCH</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none">
              CONTACT
            </h1>
          </div>
          <div className="text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1">
            <p>CHANNELS: DIRECT TRANSMISSION</p>
            <p>STATUS: ACTIVE DISPATCH</p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-6 space-y-6">
            {/* Booking & Press */}
            <div className="border-2 border-white bg-black p-6 sm:p-8 shadow-[6px_6px_0px_#FFFFFF] space-y-4">
              <span className="zine-tag bg-[#00F5D4] text-black font-bold">
                BOOKING & LIVE INQUIRIES
              </span>
              <h3 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em]">
                GIGS, TOURS & FESTIVALS
              </h3>
              <p className="text-xs text-neutral-300 uppercase leading-relaxed font-mono">
                Direct all booking and live performance inquiries:
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${bandData.socials.email}`}
                  className="inline-block text-sm sm:text-base font-bold text-white underline decoration-[#00F5D4] decoration-2 hover:text-[#00F5D4] transition-colors"
                >
                  {bandData.socials.email || "booking@TODO.com"}
                </a>
              </div>
            </div>

            {/* Management & Record Label */}
            <div className="border-2 border-white bg-black p-6 sm:p-8 shadow-[6px_6px_0px_#00F5D4] space-y-4">
              <span className="zine-tag bg-white text-black font-bold">
                MANAGEMENT & PRESS
              </span>
              <h3 className="text-2xl font-display font-black uppercase text-white tracking-[-0.04em]">
                PRESS RELEASES & INTERVIEWS
              </h3>
              <div className="space-y-2">
                <span className="text-xs text-neutral-400 uppercase block font-mono">
                  MANAGEMENT DESK:
                </span>
                <span className="zine-todo text-xs block">
                  TODO: Insert Management Email & Phone
                </span>
              </div>
            </div>

            {/* Audio Channels & Socials */}
            <div className="border-2 border-white bg-black p-6 space-y-3 font-mono">
              <h4 className="text-xs uppercase tracking-widest text-[#00F5D4] font-bold">
                OFFICIAL TRANSMISSION CHANNELS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs uppercase font-bold">
                <a
                  href={bandData.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-white hover:bg-white hover:text-black transition-colors text-center"
                >
                  INSTAGRAM ↗
                </a>
                <a
                  href={bandData.socials.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-white hover:bg-white hover:text-black transition-colors text-center"
                >
                  SPOTIFY ↗
                </a>
                <a
                  href={bandData.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-white hover:bg-white hover:text-black transition-colors text-center"
                >
                  YOUTUBE ↗
                </a>
                <a
                  href={bandData.socials.bandcamp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 border border-white hover:bg-white hover:text-black transition-colors text-center"
                >
                  BANDCAMP ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Form Box */}
          <div className="lg:col-span-6 border-2 border-white bg-black p-6 sm:p-8 shadow-[8px_8px_0px_#FFFFFF] space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <span className="zine-tag bg-white text-black font-bold">
                MESSAGE TERMINAL
              </span>
              <span className="text-xs text-neutral-500 uppercase font-mono">
                FORM // DISPATCH
              </span>
            </div>

            {formSubmitted ? (
              <div className="border-2 border-[#00F5D4] p-6 text-center space-y-3 bg-black">
                <span className="text-xs font-bold text-[#00F5D4] uppercase block">
                  [ TRANSMISSION LOGGED ]
                </span>
                <p className="text-xs text-neutral-300 uppercase font-mono">
                  Your message has been received by the archive desk.
                </p>
                <span className="zine-todo text-[10px] block">
                  TODO: Connect Message Dispatch Backend
                </span>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-white text-xs uppercase hover:bg-white hover:text-black transition-colors font-bold"
                >
                  [ SEND ANOTHER MESSAGE ]
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-5 font-mono"
              >
                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-2">
                    [01] SENDER NAME / ENTITY *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="NAME OR ORGANIZATION"
                    className="w-full bg-black border-2 border-white p-3 text-xs uppercase text-white placeholder-neutral-600 focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-2">
                    [02] RETURN EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="YOUR@EMAIL.COM"
                    className="w-full bg-black border-2 border-white p-3 text-xs uppercase text-white placeholder-neutral-600 focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-2">
                    [03] TRANSMISSION PURPOSE
                  </label>
                  <select className="w-full bg-black border-2 border-white p-3 text-xs uppercase text-white focus:outline-none focus:border-[#00F5D4]">
                    <option value="booking">BOOKING / LIVE SHOW</option>
                    <option value="press">PRESS / MEDIA / INTERVIEW</option>
                    <option value="distribution">PHYSICAL ZINE / MERCH</option>
                    <option value="general">GENERAL TRANSMISSION</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-2">
                    [04] MESSAGE CONTENT *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="WRITE YOUR MESSAGE HERE..."
                    className="w-full bg-black border-2 border-white p-3 text-xs uppercase text-white placeholder-neutral-600 focus:outline-none focus:border-[#00F5D4]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]"
                >
                  [ TRANSMIT MESSAGE // SEND ]
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

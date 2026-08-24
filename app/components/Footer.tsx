import { Link } from "@remix-run/react";
import { bandData } from "../data/band";

export function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t-2 border-white font-mono selection:bg-[#00F5D4] selection:text-black mt-auto">
      {/* Massive Brutalist Header Band */}
      <div className="border-b-2 border-white py-10 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="zine-tag mb-3 bg-[#00F5D4] text-black font-bold">
              OFFICIAL DIGITAL ZINE & ARCHIVE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-[-0.06em] text-white uppercase leading-none mt-2">
              CUFF & COLLARS
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs uppercase text-neutral-400 space-y-1">
            <p>REF NO. // 2026-CC-ARCHIVE</p>
            <p>STATUS: TRANSMISSION ARCHIVE</p>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: About & Visual */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/Band Logo/band-icon.png"
              alt="Cuff & Collars Logo"
              className="w-10 h-10 object-contain invert border border-white p-1"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <span className="font-bold text-sm tracking-widest text-white uppercase">
              INDEX // 001
            </span>
          </div>
          <div className="space-y-2">
            <span className="zine-todo text-[10px] block">
              {bandData.statement}
            </span>
            <span className="zine-todo text-[10px] block">
              {bandData.bio}
            </span>
          </div>
        </div>

        {/* Column 2: Navigation Map */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest uppercase text-[#00F5D4] border-b border-neutral-800 pb-2">
            INDEX DIRECTORY
          </h3>
          <ul className="space-y-2 text-xs uppercase">
            <li>
              <Link to="/" className="hover:text-[#00F5D4] transition-colors flex items-center gap-2">
                <span className="text-neutral-600 font-mono">[01]</span>
                <span>Home / Overview</span>
              </Link>
            </li>
            <li>
              <Link to="/music" className="hover:text-[#00F5D4] transition-colors flex items-center gap-2">
                <span className="text-neutral-600 font-mono">[02]</span>
                <span>Music / Discography</span>
              </Link>
            </li>
            <li>
              <Link to="/shows" className="hover:text-[#00F5D4] transition-colors flex items-center gap-2">
                <span className="text-neutral-600 font-mono">[03]</span>
                <span>Shows / Live Dates</span>
              </Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-[#00F5D4] transition-colors flex items-center gap-2">
                <span className="text-neutral-600 font-mono">[04]</span>
                <span>Videos / Visuals</span>
              </Link>
            </li>
            <li>
              <Link to="/band" className="hover:text-[#00F5D4] transition-colors flex items-center gap-2">
                <span className="text-neutral-600 font-mono">[05]</span>
                <span>Band / Archive</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#00F5D4] transition-colors flex items-center gap-2">
                <span className="text-neutral-600 font-mono">[06]</span>
                <span>Contact / Dispatch</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Channels / Socials */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest uppercase text-[#00F5D4] border-b border-neutral-800 pb-2">
            AUDIO / CHANNELS
          </h3>
          <ul className="space-y-2 text-xs uppercase">
            <li>
              <a
                href={bandData.socials.spotify}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00F5D4] transition-colors flex items-center justify-between"
              >
                <span>Spotify</span>
                <span className="text-[10px] text-neutral-600">↗</span>
              </a>
            </li>
            <li>
              <a
                href={bandData.socials.appleMusic}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00F5D4] transition-colors flex items-center justify-between"
              >
                <span>Apple Music</span>
                <span className="text-[10px] text-neutral-600">↗</span>
              </a>
            </li>
            <li>
              <a
                href={bandData.socials.bandcamp}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00F5D4] transition-colors flex items-center justify-between"
              >
                <span>Bandcamp</span>
                <span className="text-[10px] text-neutral-600">↗</span>
              </a>
            </li>
            <li>
              <a
                href={bandData.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00F5D4] transition-colors flex items-center justify-between"
              >
                <span>YouTube</span>
                <span className="text-[10px] text-neutral-600">↗</span>
              </a>
            </li>
            <li>
              <a
                href={bandData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00F5D4] transition-colors flex items-center justify-between"
              >
                <span>Instagram</span>
                <span className="text-[10px] text-neutral-600">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Management */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest uppercase text-[#00F5D4] border-b border-neutral-800 pb-2">
            DISPATCH / INQUIRIES
          </h3>
          <div className="text-xs space-y-2 uppercase text-neutral-300">
            <div>
              <span className="text-[10px] text-neutral-500 block">BOOKING & PRESS:</span>
              <a
                href={`mailto:${bandData.socials.email}`}
                className="hover:text-[#00F5D4] underline transition-colors"
              >
                {bandData.socials.email || "booking@TODO.com"}
              </a>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 block">MANAGEMENT:</span>
              <span className="zine-todo text-[10px] block mt-1">
                TODO: Insert Management Info
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 bg-black px-4 sm:px-6 lg:px-8 py-4 text-[11px] text-neutral-500 uppercase flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} CUFF & COLLARS. ALL RIGHTS RESERVED.</p>
        <p className="font-mono tracking-widest text-neutral-600">
          EDITORIAL ART-ZINE // CUFF & COLLARS
        </p>
      </div>
    </footer>
  );
}

export default Footer;

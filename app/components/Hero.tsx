import { Link } from "@remix-run/react";

interface HeroProps {
  title?: string;
  tagline?: string;
  heroImage?: string;
  location?: string;
}

export function Hero({
  title = "CUFF & COLLARS",
  tagline = "ANALOG TRANSMISSIONS // NOISE & LIGHT",
  heroImage = "/RefrenceImages/band-hero.jpg",
  location = "TODO: Insert Band Location",
}: HeroProps) {
  return (
    <section className="relative w-full border-b-2 border-white bg-black text-white overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        {/* Tactical Status Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-neutral-800 pb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-[#00F5D4] text-xs">■</span>
            <span className="text-[#00F5D4] font-bold">LIVE ARCHIVE</span>
            <span className="text-neutral-600">//</span>
            <span>VOL. 01 / ISSUE 2026</span>
          </div>
          <div>
            <span>LOCATION: [{location}]</span>
          </div>
        </div>

        {/* Hero Grid with Deliberate Asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Typography Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <div className="inline-block bg-white text-black font-mono font-bold text-xs px-2.5 py-1 mb-4 uppercase tracking-widest">
                ALTERNATIVE // INDIE // ART-ZINE
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-[-0.06em] uppercase leading-[0.88] text-white break-words">
                CUFF & <br />
                <span className="text-white underline decoration-[#00F5D4] decoration-4">
                  COLLARS
                </span>
              </h1>
              <p className="font-mono text-sm sm:text-base text-neutral-300 mt-6 max-w-xl uppercase tracking-wider leading-relaxed border-l-2 border-[#00F5D4] pl-4">
                {tagline}
              </p>
            </div>

            {/* Tactical Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 font-mono">
              <Link
                to="/music"
                className="w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs sm:text-sm tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#00F5D4]"
              >
                [ LISTEN TO RELEASES ]
              </Link>
              <Link
                to="/videos"
                className="w-full sm:w-auto text-center px-6 py-3.5 bg-black text-white font-bold uppercase text-xs sm:text-sm tracking-wider border-2 border-white hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#ffffff]"
              >
                [ WATCH LATEST VIDEO ]
              </Link>
            </div>
          </div>

          {/* Photographic Hero Column (Tactical Art-Zine frame) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div className="relative border-2 border-white bg-neutral-900 p-2 shadow-[8px_8px_0px_#00F5D4]">
              {/* Top Frame Bar */}
              <div className="flex justify-between items-center px-2 py-1 bg-black text-[10px] font-mono text-neutral-400 border border-neutral-800 mb-2 uppercase">
                <span>PHOTO // ARCHIVE STILL</span>
                <span>NO. 001</span>
              </div>

              {/* Main Image with Contrast Filter */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black border-2 border-white">
                <img
                  src={heroImage}
                  alt="Cuff & Collars Live"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/Band Logo/band-icon.png";
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black p-2 border border-white text-[10px] font-mono uppercase text-neutral-300 flex justify-between">
                  <span>DISPATCH: LIVE CAPTURE</span>
                  <span className="text-[#00F5D4]">RAW FILE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

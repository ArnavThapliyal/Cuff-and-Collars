import { useState } from "react";
import { Link, NavLink } from "@remix-run/react";

interface NavItem {
  number: string;
  label: string;
  to: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: "01", label: "HOME", to: "/" },
  { number: "02", label: "MUSIC", to: "/music" },
  { number: "03", label: "SHOWS", to: "/shows", badge: "SOON" },
  { number: "04", label: "VIDEOS", to: "/videos" },
  { number: "05", label: "BAND", to: "/band" },
  { number: "06", label: "CONTACT", to: "/contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b-2 border-white text-white font-mono selection:bg-[#00F5D4] selection:text-black">
      {/* Tactical Top Ticker */}
      <div className="hidden md:flex justify-between items-center px-4 py-1 text-[11px] uppercase tracking-widest bg-black border-b border-white/10 text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="inline-block text-[#00F5D4] text-xs">■</span>
          <span>OFFICIAL BAND ARCHIVE // CUFF & COLLARS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>CATALOG: ACTIVE</span>
          <span>SYSTEM: ZINE-V1</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 font-display text-xl sm:text-2xl font-black tracking-tighter text-white hover:text-[#00F5D4] transition-colors"
        >
          <img
            src="/Band Logo/band-icon.png"
            alt="Cuff & Collars Icon"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain invert group-hover:rotate-6 transition-transform"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <span className="font-extrabold tracking-[-0.05em] uppercase">
            CUFF & COLLARS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-white text-black font-bold border-white shadow-[2px_2px_0px_#00F5D4]"
                    : "border-transparent text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900"
                }`
              }
            >
              <span className="text-[10px] text-neutral-500 font-mono">
                [{item.number}]
              </span>
              <span className="tracking-tight font-bold">{item.label}</span>
              {item.badge && (
                <span className="ml-1 px-1 py-0.2 bg-[#00F5D4] text-black text-[9px] font-bold tracking-normal">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border-2 border-white text-white font-mono text-xs uppercase tracking-widest bg-black hover:bg-white hover:text-black transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? "[ CLOSE // X ]" : "[ MENU // = ]"}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[66px] bottom-0 bg-black border-t-2 border-white p-6 flex flex-col justify-between z-50 overflow-y-auto">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between p-4 border-2 text-base font-bold uppercase tracking-tight ${
                    isActive
                      ? "border-[#00F5D4] bg-white text-black shadow-[4px_4px_0px_#00F5D4]"
                      : "border-neutral-800 text-white hover:border-white hover:bg-neutral-900"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-500">
                    [{item.number}]
                  </span>
                  <span className="font-display font-black tracking-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-[#00F5D4] text-black text-xs font-bold font-mono">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-500 uppercase flex flex-col gap-2">
            <div>CUFF & COLLARS ARCHIVE // SYSTEM V1</div>
            <div>STATUS: ONLINE</div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;

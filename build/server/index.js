import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Link, NavLink, Outlet, useRouteError, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const NAV_ITEMS = [
  { number: "01", label: "HOME", to: "/" },
  { number: "02", label: "MUSIC", to: "/music" },
  { number: "03", label: "SHOWS", to: "/shows", badge: "SOON" },
  { number: "04", label: "VIDEOS", to: "/videos" },
  { number: "05", label: "BAND", to: "/band" },
  { number: "06", label: "CONTACT", to: "/contact" }
];
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full bg-black border-b-2 border-white text-white font-mono selection:bg-[#00F5D4] selection:text-black", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex justify-between items-center px-4 py-1 text-[11px] uppercase tracking-widest bg-black border-b border-white/10 text-neutral-400", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block text-[#00F5D4] text-xs", children: "■" }),
        /* @__PURE__ */ jsx("span", { children: "OFFICIAL BAND ARCHIVE // CUFF & COLLARS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { children: "CATALOG: ACTIVE" }),
        /* @__PURE__ */ jsx("span", { children: "SYSTEM: ZINE-V1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "group flex items-center gap-3 font-display text-xl sm:text-2xl font-black tracking-tighter text-white hover:text-[#00F5D4] transition-colors",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/Band Logo/Band Icon.PNG",
                alt: "Cuff & Collars Icon",
                className: "w-7 h-7 sm:w-8 sm:h-8 object-contain invert group-hover:rotate-6 transition-transform",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "font-extrabold tracking-[-0.05em] uppercase", children: "CUFF & COLLARS" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-1", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxs(
        NavLink,
        {
          to: item.to,
          className: ({ isActive }) => `px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 border ${isActive ? "bg-white text-black font-bold border-white shadow-[2px_2px_0px_#00F5D4]" : "border-transparent text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900"}`,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-neutral-500 font-mono", children: [
              "[",
              item.number,
              "]"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "tracking-tight font-bold", children: item.label }),
            item.badge && /* @__PURE__ */ jsx("span", { className: "ml-1 px-1 py-0.2 bg-[#00F5D4] text-black text-[9px] font-bold tracking-normal", children: item.badge })
          ]
        },
        item.to
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex lg:hidden items-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          className: "p-2 border-2 border-white text-white font-mono text-xs uppercase tracking-widest bg-black hover:bg-white hover:text-black transition-colors",
          "aria-label": "Toggle Navigation Menu",
          children: mobileMenuOpen ? "[ CLOSE // X ]" : "[ MENU // = ]"
        }
      ) })
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden fixed inset-x-0 top-[66px] bottom-0 bg-black border-t-2 border-white p-6 flex flex-col justify-between z-50 overflow-y-auto", children: [
      /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-3", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxs(
        NavLink,
        {
          to: item.to,
          onClick: () => setMobileMenuOpen(false),
          className: ({ isActive }) => `flex items-center justify-between p-4 border-2 text-base font-bold uppercase tracking-tight ${isActive ? "border-[#00F5D4] bg-white text-black shadow-[4px_4px_0px_#00F5D4]" : "border-neutral-800 text-white hover:border-white hover:bg-neutral-900"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-neutral-500", children: [
                "[",
                item.number,
                "]"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-display font-black tracking-tight", children: item.label })
            ] }),
            item.badge && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-[#00F5D4] text-black text-xs font-bold font-mono", children: item.badge })
          ]
        },
        item.to
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-500 uppercase flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("div", { children: "CUFF & COLLARS ARCHIVE // SYSTEM V1" }),
        /* @__PURE__ */ jsx("div", { children: "STATUS: ONLINE" })
      ] })
    ] })
  ] });
}
const bandData = {
  name: "Cuff & Collars",
  location: "TODO: Insert Band Location",
  bio: "TODO: Insert Band Bio Here",
  statement: "TODO: Insert Band Statement Here",
  members: [
    {
      name: "TODO: Insert Member Name Here",
      role: "TODO: Insert Member Role Here",
      bio: "TODO: Insert Member Bio Here",
      photoUrl: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04.jpeg"
    }
  ],
  socials: {
    instagram: "https://instagram.com/TODO",
    spotify: "https://open.spotify.com/artist/TODO",
    appleMusic: "https://music.apple.com/artist/TODO",
    youtube: "https://youtube.com/@TODO",
    bandcamp: "https://cuffandcollars.bandcamp.com/TODO",
    email: "booking@TODO.com"
  }
};
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "w-full bg-black text-white border-t-2 border-white font-mono selection:bg-[#00F5D4] selection:text-black mt-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b-2 border-white py-10 px-4 sm:px-6 lg:px-8 bg-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "zine-tag mb-3 bg-[#00F5D4] text-black font-bold", children: "OFFICIAL DIGITAL ZINE & ARCHIVE" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-[-0.06em] text-white uppercase leading-none mt-2", children: "CUFF & COLLARS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-left md:text-right font-mono text-xs uppercase text-neutral-400 space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "REF NO. // 2026-CC-ARCHIVE" }),
        /* @__PURE__ */ jsx("p", { children: "STATUS: TRANSMISSION ARCHIVE" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/Band Logo/Band Icon.PNG",
              alt: "Cuff & Collars Logo",
              className: "w-10 h-10 object-contain invert border border-white p-1",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-sm tracking-widest text-white uppercase", children: "INDEX // 001" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: bandData.statement }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: bandData.bio })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold tracking-widest uppercase text-[#00F5D4] border-b border-neutral-800 pb-2", children: "INDEX DIRECTORY" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs uppercase", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "hover:text-[#00F5D4] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 font-mono", children: "[01]" }),
            /* @__PURE__ */ jsx("span", { children: "Home / Overview" })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/music", className: "hover:text-[#00F5D4] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 font-mono", children: "[02]" }),
            /* @__PURE__ */ jsx("span", { children: "Music / Discography" })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/shows", className: "hover:text-[#00F5D4] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 font-mono", children: "[03]" }),
            /* @__PURE__ */ jsx("span", { children: "Shows / Live Dates" })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/videos", className: "hover:text-[#00F5D4] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 font-mono", children: "[04]" }),
            /* @__PURE__ */ jsx("span", { children: "Videos / Visuals" })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/band", className: "hover:text-[#00F5D4] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 font-mono", children: "[05]" }),
            /* @__PURE__ */ jsx("span", { children: "Band / Archive" })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "hover:text-[#00F5D4] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 font-mono", children: "[06]" }),
            /* @__PURE__ */ jsx("span", { children: "Contact / Dispatch" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold tracking-widest uppercase text-[#00F5D4] border-b border-neutral-800 pb-2", children: "AUDIO / CHANNELS" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs uppercase", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: bandData.socials.spotify,
              target: "_blank",
              rel: "noreferrer",
              className: "hover:text-[#00F5D4] transition-colors flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Spotify" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-600", children: "↗" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: bandData.socials.appleMusic,
              target: "_blank",
              rel: "noreferrer",
              className: "hover:text-[#00F5D4] transition-colors flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Apple Music" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-600", children: "↗" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: bandData.socials.bandcamp,
              target: "_blank",
              rel: "noreferrer",
              className: "hover:text-[#00F5D4] transition-colors flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Bandcamp" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-600", children: "↗" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: bandData.socials.youtube,
              target: "_blank",
              rel: "noreferrer",
              className: "hover:text-[#00F5D4] transition-colors flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsx("span", { children: "YouTube" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-600", children: "↗" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: bandData.socials.instagram,
              target: "_blank",
              rel: "noreferrer",
              className: "hover:text-[#00F5D4] transition-colors flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Instagram" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-600", children: "↗" })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold tracking-widest uppercase text-[#00F5D4] border-b border-neutral-800 pb-2", children: "DISPATCH / INQUIRIES" }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs space-y-2 uppercase text-neutral-300", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-500 block", children: "BOOKING & PRESS:" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `mailto:${bandData.socials.email}`,
                className: "hover:text-[#00F5D4] underline transition-colors",
                children: bandData.socials.email || "booking@TODO.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-neutral-500 block", children: "MANAGEMENT:" }),
            /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block mt-1", children: "TODO: Insert Management Info" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-neutral-900 bg-black px-4 sm:px-6 lg:px-8 py-4 text-[11px] text-neutral-500 uppercase flex flex-col sm:flex-row justify-between items-center gap-2", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " CUFF & COLLARS. ALL RIGHTS RESERVED."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono tracking-widest text-neutral-600", children: "EDITORIAL ART-ZINE // CUFF & COLLARS" })
    ] })
  ] });
}
const styles = "/assets/global-Dva6jSa4.css";
const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@500;700;800&display=swap"
  }
];
const meta$7 = () => {
  return [
    { title: "CUFF & COLLARS // OFFICIAL ARCHIVE & ZINE" },
    {
      name: "description",
      content: "Official digital archive, discography, tour dates, and visual catalog for alternative/indie band Cuff & Collars."
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" }
  ];
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark bg-[#050505] text-[#F5F5F5]", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen flex flex-col bg-[#050505] text-[#F5F5F5] selection:bg-[#00F5D4] selection:text-black antialiased", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 w-full relative", children }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
function ErrorBoundary() {
  const error = useRouteError();
  let heading = "TRANSMISSION ERROR";
  let message = "An unexpected error occurred in the signal dispatch.";
  let status = "500";
  if (isRouteErrorResponse(error)) {
    status = `${error.status}`;
    heading = error.status === 404 ? "SIGNAL LOST // 404" : "ARCHIVE ERROR";
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-[70vh] flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl w-full border-2 border-white bg-black p-8 shadow-[8px_8px_0px_#00F5D4] font-mono", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b-2 border-white pb-3 mb-6", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-xs bg-[#00F5D4] text-black px-2 py-0.5 font-bold", children: [
        "FATAL_DISPATCH // ",
        status
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500", children: "CUFF & COLLARS SYSTEM" })
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-display font-black uppercase text-white mb-4 tracking-tighter", children: heading }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-300 mb-6 uppercase leading-relaxed font-mono", children: message }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "inline-block px-4 py-2 border-2 border-white bg-white text-black font-bold uppercase text-xs hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-colors",
        children: "[ RETURN TO HOME DIRECTORY ]"
      }
    )
  ] }) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App,
  links,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const releases = [
  {
    slug: "panchtantra-rasaayan",
    title: "Panchtantra Rasaayan",
    type: "EP",
    releaseDate: "TODO: Insert Release Date Here",
    coverImage: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.00.jpeg",
    description: "TODO: Insert Release Description Here",
    streamingLinks: {
      spotify: "https://open.spotify.com/TODO",
      appleMusic: "https://music.apple.com/TODO",
      bandcamp: "https://cuffandcollars.bandcamp.com/TODO",
      youtube: "https://youtube.com/TODO"
    },
    tracklist: [
      {
        trackNumber: 1,
        title: "TODO: Insert Track 1 Title",
        duration: "TODO"
      }
    ]
  }
];
const getReleaseBySlug = (slug) => {
  return releases.find((release) => release.slug === slug);
};
const meta$6 = ({ data }) => {
  if (!data || !data.release) {
    return [{ title: "RELEASE NOT FOUND // CUFF & COLLARS" }];
  }
  return [
    { title: `${data.release.title.toUpperCase()} // CUFF & COLLARS` },
    {
      name: "description",
      content: data.release.description || `Listen to ${data.release.title} by Cuff & Collars.`
    }
  ];
};
const loader$6 = async ({ params }) => {
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
function ReleaseDetailRoute() {
  const { release } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-neutral-800 pb-4", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/music",
          className: "text-xs uppercase font-bold text-[#00F5D4] hover:text-white transition-colors flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx("span", { children: "←" }),
            /* @__PURE__ */ jsx("span", { children: "[ RETURN TO DISCOGRAPHY ]" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-500 uppercase font-mono", children: [
        "CATALOG ENTRY // ",
        release.slug
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-3 shadow-[8px_8px_0px_#00F5D4]", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-square w-full overflow-hidden bg-neutral-900 border-2 border-white mb-3", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: release.coverImage,
              alt: release.title,
              className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300",
              onError: (e) => {
                e.target.src = "/Band Logo/Band Icon.PNG";
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-[10px] text-neutral-400 uppercase pt-1 font-mono", children: [
            /* @__PURE__ */ jsx("span", { children: "OFFICIAL ARTWORK" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4] font-bold", children: "HI-RES ARCHIVE" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-5 space-y-3 font-mono", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "AUDIO TRANSMISSION LINKS" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-1", children: [
            release.streamingLinks.spotify && /* @__PURE__ */ jsxs(
              "a",
              {
                href: release.streamingLinks.spotify,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white text-xs uppercase font-bold text-center hover:bg-[#00F5D4] hover:text-black hover:border-[#00F5D4] transition-colors flex justify-between items-center",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "SPOTIFY" }),
                  /* @__PURE__ */ jsx("span", { children: "↗" })
                ]
              }
            ),
            release.streamingLinks.appleMusic && /* @__PURE__ */ jsxs(
              "a",
              {
                href: release.streamingLinks.appleMusic,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white text-xs uppercase font-bold text-center hover:bg-white hover:text-black transition-colors flex justify-between items-center",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "APPLE MUSIC" }),
                  /* @__PURE__ */ jsx("span", { children: "↗" })
                ]
              }
            ),
            release.streamingLinks.bandcamp && /* @__PURE__ */ jsxs(
              "a",
              {
                href: release.streamingLinks.bandcamp,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white text-xs uppercase font-bold text-center hover:bg-white hover:text-black transition-colors flex justify-between items-center",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "BANDCAMP" }),
                  /* @__PURE__ */ jsx("span", { children: "↗" })
                ]
              }
            ),
            release.streamingLinks.youtube && /* @__PURE__ */ jsxs(
              "a",
              {
                href: release.streamingLinks.youtube,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white text-xs uppercase font-bold text-center hover:bg-white hover:text-black transition-colors flex justify-between items-center",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "YOUTUBE AUDIO" }),
                  /* @__PURE__ */ jsx("span", { children: "↗" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-6 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold", children: release.type }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs uppercase text-neutral-400 font-mono", children: [
              "RELEASE DATE: ",
              release.releaseDate
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-[-0.06em]", children: release.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-neutral-300 leading-relaxed uppercase font-mono", children: release.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-6 shadow-[6px_6px_0px_#FFFFFF] space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-neutral-800 pb-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-display font-black uppercase text-white tracking-[-0.04em]", children: "TRACKLIST // DIRECTORY" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-400 font-mono", children: [
              release.tracklist.length,
              " ",
              release.tracklist.length === 1 ? "TRACK" : "TRACKS"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "divide-y divide-neutral-900 font-mono text-sm", children: release.tracklist.map((track) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "py-3 flex items-center justify-between group hover:bg-neutral-900 px-2 transition-colors",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-neutral-500 text-xs w-6", children: String(track.trackNumber).padStart(2, "0") }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-white uppercase group-hover:text-[#00F5D4] transition-colors", children: track.title })
                ] }),
                track.duration && /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500 uppercase", children: track.duration })
              ]
            },
            track.trackNumber
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-6 space-y-3 font-mono text-xs uppercase shadow-[4px_4px_0px_#FFFFFF]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[#00F5D4] font-bold tracking-widest", children: "ARCHIVE LINER NOTES" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Full Album Liner Notes & Credits" }),
            /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Production & Master Credits" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ReleaseDetailRoute,
  loader: loader$6,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const meta$5 = () => {
  return [
    { title: "CONTACT & DISPATCH // CUFF & COLLARS" },
    {
      name: "description",
      content: "Booking, press inquiries, management, and official transmission dispatch for Cuff & Collars."
    }
  ];
};
const loader$5 = async () => {
  return json({ bandData });
};
function ContactRoute() {
  const { bandData: bandData2 } = useLoaderData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2", children: [
          /* @__PURE__ */ jsx("span", { children: "INDEX // 06" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: "DIRECT DISPATCH" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none", children: "CONTACT" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "CHANNELS: DIRECT TRANSMISSION" }),
        /* @__PURE__ */ jsx("p", { children: "STATUS: ACTIVE DISPATCH" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-6 sm:p-8 shadow-[6px_6px_0px_#FFFFFF] space-y-4", children: [
          /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold", children: "BOOKING & LIVE INQUIRIES" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em]", children: "GIGS, TOURS & FESTIVALS" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-300 uppercase leading-relaxed font-mono", children: "Direct all booking and live performance inquiries:" }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: `mailto:${bandData2.socials.email}`,
              className: "inline-block text-sm sm:text-base font-bold text-white underline decoration-[#00F5D4] decoration-2 hover:text-[#00F5D4] transition-colors",
              children: bandData2.socials.email || "booking@TODO.com"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-6 sm:p-8 shadow-[6px_6px_0px_#00F5D4] space-y-4", children: [
          /* @__PURE__ */ jsx("span", { className: "zine-tag bg-white text-black font-bold", children: "MANAGEMENT & PRESS" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em]", children: "PRESS RELEASES & INTERVIEWS" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400 uppercase block font-mono", children: "MANAGEMENT DESK:" }),
            /* @__PURE__ */ jsx("span", { className: "zine-todo text-xs block", children: "TODO: Insert Management Email & Phone" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-6 space-y-3 font-mono", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "OFFICIAL TRANSMISSION CHANNELS" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs uppercase font-bold", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: bandData2.socials.instagram,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white hover:bg-white hover:text-black transition-colors text-center",
                children: "INSTAGRAM ↗"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: bandData2.socials.spotify,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white hover:bg-white hover:text-black transition-colors text-center",
                children: "SPOTIFY ↗"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: bandData2.socials.youtube,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white hover:bg-white hover:text-black transition-colors text-center",
                children: "YOUTUBE ↗"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: bandData2.socials.bandcamp,
                target: "_blank",
                rel: "noreferrer",
                className: "p-3 border border-white hover:bg-white hover:text-black transition-colors text-center",
                children: "BANDCAMP ↗"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 border-2 border-white bg-black p-6 sm:p-8 shadow-[8px_8px_0px_#FFFFFF] space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-neutral-800 pb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "zine-tag bg-white text-black font-bold", children: "MESSAGE TERMINAL" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500 uppercase font-mono", children: "FORM // DISPATCH" })
        ] }),
        formSubmitted ? /* @__PURE__ */ jsxs("div", { className: "border-2 border-[#00F5D4] p-6 text-center space-y-3 bg-black", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-[#00F5D4] uppercase block", children: "[ TRANSMISSION LOGGED ]" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-300 uppercase font-mono", children: "Your message has been received by the archive desk." }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "TODO: Connect Message Dispatch Backend" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setFormSubmitted(false),
              className: "mt-4 px-4 py-2 border border-white text-xs uppercase hover:bg-white hover:text-black transition-colors font-bold",
              children: "[ SEND ANOTHER MESSAGE ]"
            }
          )
        ] }) : /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              setFormSubmitted(true);
            },
            className: "space-y-5 font-mono",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase font-bold text-neutral-300 mb-2", children: "[01] SENDER NAME / ENTITY *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    required: true,
                    placeholder: "NAME OR ORGANIZATION",
                    className: "w-full bg-black border-2 border-white p-3 text-xs uppercase text-white placeholder-neutral-600 focus:outline-none focus:border-[#00F5D4]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase font-bold text-neutral-300 mb-2", children: "[02] RETURN EMAIL ADDRESS *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    required: true,
                    placeholder: "YOUR@EMAIL.COM",
                    className: "w-full bg-black border-2 border-white p-3 text-xs uppercase text-white placeholder-neutral-600 focus:outline-none focus:border-[#00F5D4]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase font-bold text-neutral-300 mb-2", children: "[03] TRANSMISSION PURPOSE" }),
                /* @__PURE__ */ jsxs("select", { className: "w-full bg-black border-2 border-white p-3 text-xs uppercase text-white focus:outline-none focus:border-[#00F5D4]", children: [
                  /* @__PURE__ */ jsx("option", { value: "booking", children: "BOOKING / LIVE SHOW" }),
                  /* @__PURE__ */ jsx("option", { value: "press", children: "PRESS / MEDIA / INTERVIEW" }),
                  /* @__PURE__ */ jsx("option", { value: "distribution", children: "PHYSICAL ZINE / MERCH" }),
                  /* @__PURE__ */ jsx("option", { value: "general", children: "GENERAL TRANSMISSION" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase font-bold text-neutral-300 mb-2", children: "[04] MESSAGE CONTENT *" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 5,
                    required: true,
                    placeholder: "WRITE YOUR MESSAGE HERE...",
                    className: "w-full bg-black border-2 border-white p-3 text-xs uppercase text-white placeholder-neutral-600 focus:outline-none focus:border-[#00F5D4]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]",
                  children: "[ TRANSMIT MESSAGE // SEND ]"
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactRoute,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function Hero({
  title = "CUFF & COLLARS",
  tagline = "ANALOG TRANSMISSIONS // NOISE & LIGHT",
  heroImage = "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
  location = "TODO: Insert Band Location"
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full border-b-2 border-white bg-black text-white overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-neutral-800 pb-3 font-mono text-xs uppercase tracking-widest text-neutral-400", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4] text-xs", children: "■" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4] font-bold", children: "LIVE ARCHIVE" }),
          /* @__PURE__ */ jsx("span", { className: "text-neutral-600", children: "//" }),
          /* @__PURE__ */ jsx("span", { children: "VOL. 01 / ISSUE 2026" })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { children: [
          "LOCATION: [",
          location,
          "]"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 flex flex-col justify-between space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "inline-block bg-white text-black font-mono font-bold text-xs px-2.5 py-1 mb-4 uppercase tracking-widest", children: "ALTERNATIVE // INDIE // ART-ZINE" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-[-0.06em] uppercase leading-[0.88] text-white break-words", children: [
              "CUFF & ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-white underline decoration-[#00F5D4] decoration-4", children: "COLLARS" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-mono text-sm sm:text-base text-neutral-300 mt-6 max-w-xl uppercase tracking-wider leading-relaxed border-l-2 border-[#00F5D4] pl-4", children: tagline })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 pt-4 font-mono", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/music",
                className: "w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs sm:text-sm tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#00F5D4]",
                children: "[ LISTEN TO RELEASES ]"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/videos",
                className: "w-full sm:w-auto text-center px-6 py-3.5 bg-black text-white font-bold uppercase text-xs sm:text-sm tracking-wider border-2 border-white hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#ffffff]",
                children: "[ WATCH LATEST VIDEO ]"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 relative flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative border-2 border-white bg-neutral-900 p-2 shadow-[8px_8px_0px_#00F5D4]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-2 py-1 bg-black text-[10px] font-mono text-neutral-400 border border-neutral-800 mb-2 uppercase", children: [
            /* @__PURE__ */ jsx("span", { children: "PHOTO // ARCHIVE STILL" }),
            /* @__PURE__ */ jsx("span", { children: "NO. 001" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-black border-2 border-white", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroImage,
                alt: "Cuff & Collars Live",
                className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500",
                onError: (e) => {
                  e.target.src = "/Band Logo/Band Icon.PNG";
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 right-2 bg-black p-2 border border-white text-[10px] font-mono uppercase text-neutral-300 flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "DISPATCH: LIVE CAPTURE" }),
              /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4]", children: "RAW FILE" })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function ReleaseCard({ release, featured = false }) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: `border-2 border-white bg-black p-4 md:p-6 font-mono text-white flex flex-col justify-between transition-all ${featured ? "shadow-[8px_8px_0px_#00F5D4]" : "shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4]"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-[#00F5D4] text-black font-bold px-2 py-0.5 text-[11px]", children: release.type }),
          /* @__PURE__ */ jsx("span", { className: "text-neutral-400 text-[11px]", children: release.releaseDate })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full overflow-hidden bg-neutral-900 border-2 border-white mb-6 group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: release.coverImage,
              alt: release.title,
              className: "w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300",
              onError: (e) => {
                e.target.src = "/Band Logo/Band Icon.PNG";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 bg-black px-2 py-1 border border-white text-[10px] uppercase font-bold text-white", children: "ARTWORK // CC-RELEASE" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 flex-1 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-display font-black uppercase text-white tracking-[-0.04em]", children: release.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 uppercase mt-2 line-clamp-3", children: release.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-neutral-800 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-400 uppercase", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "TRACKS: ",
                release.tracklist.length
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: `/music/${release.slug}`,
                  className: "text-[#00F5D4] hover:underline font-bold",
                  children: "[ VIEW DETAILS → ]"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] uppercase font-bold", children: [
              release.streamingLinks.spotify && /* @__PURE__ */ jsx(
                "a",
                {
                  href: release.streamingLinks.spotify,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "p-2 border border-white text-center hover:bg-white hover:text-black transition-colors",
                  children: "SPOTIFY ↗"
                }
              ),
              release.streamingLinks.appleMusic && /* @__PURE__ */ jsx(
                "a",
                {
                  href: release.streamingLinks.appleMusic,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "p-2 border border-white text-center hover:bg-white hover:text-black transition-colors",
                  children: "APPLE MUSIC ↗"
                }
              ),
              release.streamingLinks.bandcamp && /* @__PURE__ */ jsx(
                "a",
                {
                  href: release.streamingLinks.bandcamp,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "p-2 border border-white text-center hover:bg-white hover:text-black transition-colors sm:col-span-2",
                  children: "BANDCAMP ARCHIVE ↗"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ShowCard({ show }) {
  const isSoldOut = show.status === "sold-out";
  const isPast = show.status === "past";
  return /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-4 sm:p-6 font-mono text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4] transition-all", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-2 border-white p-3 bg-neutral-900 text-center min-w-[110px]", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-xs uppercase text-[#00F5D4] font-bold", children: "DATE" }),
        /* @__PURE__ */ jsx("span", { className: "block text-lg font-black tracking-tight text-white mt-0.5", children: show.date })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "zine-tag text-[10px] bg-white text-black font-bold", children: show.city }),
          isSoldOut && /* @__PURE__ */ jsx("span", { className: "zine-tag text-[10px] bg-[#F78DA7] text-black font-bold", children: "SOLD OUT" }),
          isPast && /* @__PURE__ */ jsx("span", { className: "zine-tag text-[10px] bg-neutral-800 text-neutral-400 font-bold", children: "CONCLUDED" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-display font-black uppercase text-white tracking-[-0.04em]", children: show.venue }),
        show.notes && /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 uppercase", children: show.notes })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-2 md:pt-0", children: show.ticketLink && !isSoldOut && !isPast ? /* @__PURE__ */ jsx(
      "a",
      {
        href: show.ticketLink,
        target: "_blank",
        rel: "noreferrer",
        className: "inline-block w-full md:w-auto px-6 py-3 bg-[#00F5D4] text-black font-bold uppercase text-xs tracking-wider border-2 border-[#00F5D4] hover:bg-white hover:border-white transition-all shadow-[2px_2px_0px_#000000] text-center",
        children: "[ GET TICKETS ]"
      }
    ) : isSoldOut ? /* @__PURE__ */ jsx("span", { className: "inline-block w-full md:w-auto px-6 py-3 bg-neutral-900 text-neutral-500 font-bold uppercase text-xs tracking-wider border-2 border-neutral-700 text-center cursor-not-allowed", children: "[ SOLD OUT ]" }) : isPast ? /* @__PURE__ */ jsx("span", { className: "inline-block w-full md:w-auto px-6 py-3 bg-neutral-900 text-neutral-500 font-bold uppercase text-xs tracking-wider border-2 border-neutral-800 text-center", children: "[ ARCHIVED ]" }) : /* @__PURE__ */ jsx("span", { className: "zine-todo text-xs", children: "TODO: Tickets Available Soon" }) })
  ] });
}
function ShowsEmptyState({ message }) {
  return /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-white/40 bg-black p-8 sm:p-12 text-center font-mono space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-block px-3 py-1 bg-[#00F5D4] text-black text-xs font-bold uppercase tracking-widest", children: "TRANSMISSION PENDING" }),
    /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-[-0.04em]", children: "LIVE DATES // COMING SOON" }),
    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-neutral-400 uppercase max-w-md mx-auto leading-relaxed", children: message || "TODO: Live tour dates and festival appearances will be announced shortly. Join the mailing list or follow socials for dispatches." })
  ] });
}
function VideoCard({ video, featured = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = video.youtubeId ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0` : video.embedUrl;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border-2 border-white bg-black p-4 sm:p-6 font-mono text-white flex flex-col justify-between ${featured ? "shadow-[8px_8px_0px_#00F5D4]" : "shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4]"} transition-all`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-xs uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-[#00F5D4] text-black font-bold px-2 py-0.5 text-[11px]", children: video.category || "VISUAL TRANSMISSION" }),
          video.releaseDate && /* @__PURE__ */ jsx("span", { className: "text-neutral-400 text-[11px]", children: video.releaseDate })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative aspect-video w-full overflow-hidden bg-neutral-900 border-2 border-white mb-6", children: isPlaying && embedUrl ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: embedUrl,
            title: video.title,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "w-full h-full border-0"
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full group cursor-pointer", onClick: () => setIsPlaying(true), children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: video.thumbnailUrl,
              alt: video.title,
              className: "w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300",
              onError: (e) => {
                e.target.src = "/Band Logo/Band Icon.PNG";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "px-5 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest border-2 border-white group-hover:bg-[#00F5D4] group-hover:border-[#00F5D4] shadow-[4px_4px_0px_#000000] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: "▶" }),
            /* @__PURE__ */ jsx("span", { children: "[ PLAY VIDEO ]" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 bg-black px-2 py-1 border border-white text-[10px] uppercase font-bold text-white", children: [
            "VISUAL FEED // ",
            video.id
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-display font-black uppercase text-white tracking-[-0.04em]", children: video.title }),
          video.description && /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 uppercase leading-relaxed", children: video.description })
        ] })
      ]
    }
  );
}
const showsData = {
  isComingSoon: true,
  message: "TODO: Live dates coming soon.",
  shows: []
};
const videos = [
  {
    id: "featured-video",
    title: "TODO: Insert Video Title Here",
    youtubeId: "",
    // TODO: Insert YouTube Video ID
    thumbnailUrl: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.03.jpeg",
    description: "TODO: Insert Video Description Here",
    category: "Music Video"
  }
];
const meta$4 = () => {
  return [
    { title: "CUFF & COLLARS // OFFICIAL BAND ARCHIVE" },
    {
      name: "description",
      content: "Official digital archive, discography, tour dates, and visual catalog for alternative/indie band Cuff & Collars."
    }
  ];
};
const loader$4 = async () => {
  const latestRelease = releases[0];
  const latestVideo = videos[0];
  const upcomingShows = showsData.shows;
  const isShowsComingSoon = showsData.isComingSoon || upcomingShows.length === 0;
  const galleryStills = [
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (2).jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.06 (1).jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.07.jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.08.jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.12.jpeg",
      caption: "TODO: Insert Photo Caption"
    }
  ];
  return json({
    latestRelease,
    latestVideo,
    upcomingShows,
    isShowsComingSoon,
    showsMessage: showsData.message,
    bandData,
    galleryStills
  });
};
function IndexRoute() {
  const {
    latestRelease,
    latestVideo,
    upcomingShows,
    isShowsComingSoon,
    showsMessage,
    bandData: bandData2,
    galleryStills
  } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black", children: [
    /* @__PURE__ */ jsx(
      Hero,
      {
        title: "CUFF & COLLARS",
        tagline: "ANALOG TRANSMISSIONS // NOISE & LIGHT",
        heroImage: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
        location: bandData2.location
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // 02]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "LATEST RELEASE" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/music",
            className: "text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto",
            children: "[ FULL DISCOGRAPHY → ]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-8", children: latestRelease ? /* @__PURE__ */ jsx(ReleaseCard, { release: latestRelease, featured: true }) : /* @__PURE__ */ jsx("div", { className: "border-2 border-dashed border-white p-8 text-center", children: /* @__PURE__ */ jsx("span", { className: "zine-todo", children: "TODO: Insert Latest Release Data" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 border-2 border-white bg-black p-6 space-y-4 shadow-[4px_4px_0px_#FFFFFF]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-800 pb-2", children: [
            /* @__PURE__ */ jsx("span", { children: "CATALOG ENTRY" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4] font-bold", children: "#CC-001" })
          ] }),
          /* @__PURE__ */ jsx("h4", { className: "font-display font-black text-xl uppercase text-white tracking-[-0.04em]", children: "RELEASE NOTES" }),
          /* @__PURE__ */ jsxs("div", { className: "pt-2 space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Curator/Release Notes" }),
            /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Physical Vinyl/Cassette Order Link" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // 03]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "UPCOMING SHOWS" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/shows",
            className: "text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto",
            children: "[ ALL DATES & ARCHIVE → ]"
          }
        )
      ] }),
      isShowsComingSoon || upcomingShows.length === 0 ? /* @__PURE__ */ jsx(ShowsEmptyState, { message: showsMessage }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: upcomingShows.map((show) => /* @__PURE__ */ jsx(ShowCard, { show }, show.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // 04]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "LATEST VIDEO TRANSMISSION" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/videos",
            className: "text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto",
            children: "[ VIDEO ARCHIVE → ]"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: latestVideo ? /* @__PURE__ */ jsx(VideoCard, { video: latestVideo, featured: true }) : /* @__PURE__ */ jsx("div", { className: "border-2 border-dashed border-white p-8 text-center", children: /* @__PURE__ */ jsx("span", { className: "zine-todo", children: "TODO: Insert Latest Video Transmission" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b-2 border-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // 05]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "THE BAND // ARCHIVE" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/band",
            className: "text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto",
            children: "[ FULL BAND DOSSIER → ]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-6 sm:p-8 shadow-[6px_6px_0px_#FFFFFF]", children: [
            /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold mb-4", children: "ARTISTIC STATEMENT" }),
            /* @__PURE__ */ jsxs("p", { className: "font-serif italic text-xl sm:text-2xl text-white leading-relaxed mt-4", children: [
              '"',
              bandData2.statement,
              '"'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400 uppercase", children: [
              /* @__PURE__ */ jsx("span", { children: "COLLECTIVE MANIFESTO" }),
              /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4]", children: "CUFF & COLLARS" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 border border-neutral-800 bg-black text-xs text-neutral-300 uppercase space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-neutral-500 font-bold", children: "BAND BIOGRAPHY:" }),
            /* @__PURE__ */ jsx("p", { children: bandData2.bio })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-2 shadow-[4px_4px_0px_#00F5D4]", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04.jpeg",
                alt: "Band Polaroid",
                className: "w-full aspect-square object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "p-2 text-[10px] text-center uppercase text-neutral-400 font-mono", children: "[TODO: Insert Photo Label]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-2 shadow-[4px_4px_0px_#FFFFFF] mt-0 sm:mt-6", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (2).jpeg",
                alt: "Live Still",
                className: "w-full aspect-square object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "p-2 text-[10px] text-center uppercase text-neutral-400 font-mono", children: "[TODO: Insert Photo Label]" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b-2 border-white pb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // 06]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "VISUAL TRANSMISSIONS // INSTAGRAM" })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: bandData2.socials.instagram,
            target: "_blank",
            rel: "noreferrer",
            className: "text-xs uppercase font-bold text-white hover:text-[#00F5D4] transition-colors border border-white px-3 py-1.5 self-start sm:self-auto flex items-center gap-2",
            children: /* @__PURE__ */ jsx("span", { children: "[ FOLLOW ON INSTAGRAM ↗ ]" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: galleryStills.map((still, idx) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: bandData2.socials.instagram,
          target: "_blank",
          rel: "noreferrer",
          className: "group border-2 border-white bg-black p-2 block hover:border-[#00F5D4] shadow-[3px_3px_0px_#FFFFFF] hover:shadow-[4px_4px_0px_#00F5D4] transition-all",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden bg-black border border-neutral-800", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: still.src,
                alt: still.caption,
                className: "w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300",
                onError: (e) => {
                  e.target.src = "/Band Logo/Band Icon.PNG";
                }
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "pt-2 text-[9px] uppercase font-mono text-neutral-400 group-hover:text-white truncate", children: still.caption })
          ]
        },
        idx
      )) })
    ] }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IndexRoute,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = () => {
  return [
    { title: "VIDEOS & VISUALS // CUFF & COLLARS" },
    {
      name: "description",
      content: "Official music videos, visualizers, live performance recordings, and archival film from Cuff & Collars."
    }
  ];
};
const loader$3 = async () => {
  const archiveVisuals = [
    {
      id: "live-session-01",
      title: "TODO: Live Session Transmission #01",
      thumbnailUrl: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (2).jpeg",
      category: "Live",
      description: "TODO: Insert Live Session Details",
      releaseDate: "TODO"
    },
    {
      id: "visualizer-02",
      title: "TODO: Official Visualizer #02",
      thumbnailUrl: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.12 (2).jpeg",
      category: "Visualizer",
      description: "TODO: Insert Visualizer Details",
      releaseDate: "TODO"
    }
  ];
  return json({ videos, archiveVisuals, bandData });
};
function VideosRoute() {
  const { videos: videos2, archiveVisuals, bandData: bandData2 } = useLoaderData();
  const featuredVideo = videos2[0];
  const allVideos = [...videos2.slice(1), ...archiveVisuals];
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2", children: [
          /* @__PURE__ */ jsx("span", { children: "INDEX // 04" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: "VIDEO TRANSMISSIONS" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none", children: "VISUAL REEL" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "TODO: Insert Video Archive Metadata" }) })
    ] }),
    featuredVideo && /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "zine-tag bg-white text-black font-bold", children: "FEATURED TRANSMISSION" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500 uppercase font-mono", children: "SIGNAL // PRIMARY" })
      ] }),
      /* @__PURE__ */ jsx(VideoCard, { video: featuredVideo, featured: true })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-6 pt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b border-neutral-800 pb-3 flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em]", children: "ARCHIVED VISUALS & SESSIONS" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-400 uppercase font-mono", children: [
          allVideos.length,
          " ENTRIES"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: allVideos.map((video) => /* @__PURE__ */ jsx(VideoCard, { video }, video.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#00F5D4] mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold mb-2", children: "YOUTUBE ARCHIVE" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2", children: "SUBSCRIBE FOR OFFICIAL TRANSMISSIONS" }),
        /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert YouTube Channel Description" }) })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: bandData2.socials.youtube,
          target: "_blank",
          rel: "noreferrer",
          className: "w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]",
          children: "[ OPEN YOUTUBE CHANNEL ↗ ]"
        }
      )
    ] })
  ] }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VideosRoute,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [
    { title: "MUSIC & DISCOGRAPHY // CUFF & COLLARS" },
    {
      name: "description",
      content: "Complete catalog of singles, EPs, and albums by alternative/indie collective Cuff & Collars."
    }
  ];
};
const loader$2 = async () => {
  return json({ releases, bandData });
};
function MusicIndexRoute() {
  const { releases: releases2, bandData: bandData2 } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2", children: [
          /* @__PURE__ */ jsx("span", { children: "INDEX // 02" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: "AUDIO ARCHIVE" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none", children: "DISCOGRAPHY" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "TOTAL RELEASES: ",
          releases2.length
        ] }),
        /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "TODO: Insert Physical Formats" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
      releases2.map((release, idx) => /* @__PURE__ */ jsx(ReleaseCard, { release, featured: idx === 0 }, release.slug)),
      /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-white/40 bg-black p-6 flex flex-col justify-between items-center text-center font-mono min-h-[400px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between text-[10px] text-neutral-500 uppercase border-b border-neutral-800 pb-2", children: [
          /* @__PURE__ */ jsx("span", { children: "UPCOMING ENTRY" }),
          /* @__PURE__ */ jsx("span", { children: "#CC-002" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 my-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-dashed border-[#00F5D4] mx-auto flex items-center justify-center text-[#00F5D4] text-xl font-bold", children: "+" }),
          /* @__PURE__ */ jsx("h3", { className: "font-display font-black text-xl uppercase text-white tracking-[-0.04em]", children: "NEW RECORD" }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-xs inline-block", children: "TODO: Next Release Announcement" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neutral-500 uppercase pt-2 border-t border-neutral-800 w-full", children: "STATUS: ARCHIVE PENDING" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#FFFFFF] mt-16", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold mb-2", children: "DIRECT STREAMING CHANNELS" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2", children: "LISTEN ACROSS PLATFORMS" }),
        /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Streaming Overview Blurb" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 font-mono text-xs font-bold uppercase w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: bandData2.socials.spotify,
            target: "_blank",
            rel: "noreferrer",
            className: "w-full sm:w-auto text-center px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors",
            children: "SPOTIFY ↗"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: bandData2.socials.appleMusic,
            target: "_blank",
            rel: "noreferrer",
            className: "w-full sm:w-auto text-center px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors",
            children: "APPLE MUSIC ↗"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: bandData2.socials.bandcamp,
            target: "_blank",
            rel: "noreferrer",
            className: "w-full sm:w-auto text-center px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors",
            children: "BANDCAMP ↗"
          }
        )
      ] })
    ] }) })
  ] }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MusicIndexRoute,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    { title: "LIVE SHOWS & DATES // CUFF & COLLARS" },
    {
      name: "description",
      content: "Official live dates, tour schedule, festival appearances, and ticket links for Cuff & Collars."
    }
  ];
};
const loader$1 = async () => {
  return json({ showsData });
};
function ShowsRoute() {
  const { showsData: showsData2 } = useLoaderData();
  const isComingSoon = showsData2.isComingSoon || showsData2.shows.length === 0;
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2", children: [
          /* @__PURE__ */ jsx("span", { children: "INDEX // 03" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: "LIVE GIGS & TOURS" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none", children: "LIVE DATES" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "STATUS: TRANSMISSION PENDING" }),
        /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "REGIONS: [TODO: Insert Tour Regions]" })
      ] })
    ] }),
    isComingSoon ? /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsx(ShowsEmptyState, { message: showsData2.message }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 pt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-4 space-y-3 shadow-[4px_4px_0px_#FFFFFF]", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden bg-neutral-900 border border-neutral-800", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
              alt: "Live Rehearsal",
              className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold text-white", children: "STAGE DISPATCH // 01" }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "TODO: Insert Stage Setup Notes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-4 space-y-3 shadow-[4px_4px_0px_#00F5D4]", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden bg-neutral-900 border border-neutral-800", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (2).jpeg",
              alt: "Live Performance",
              className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold text-white", children: "STAGE DISPATCH // 02" }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "TODO: Insert Live Audio Recording Notes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-4 space-y-3 shadow-[4px_4px_0px_#FFFFFF]", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden bg-neutral-900 border border-neutral-800", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.12.jpeg",
              alt: "Tour Stills",
              className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold text-white", children: "STAGE DISPATCH // 03" }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[10px] block", children: "TODO: Insert Visual Performance Notes" })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: showsData2.shows.map((show) => /* @__PURE__ */ jsx(ShowCard, { show }, show.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#FFFFFF] mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold mb-2", children: "BOOKINGS & PROMOTERS" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2", children: "BOOK CUFF & COLLARS FOR YOUR VENUE / FESTIVAL" }),
        /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Promoter Rider & Booking Info" }) })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contact",
          className: "w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]",
          children: "[ CONTACT BOOKING AGENT → ]"
        }
      )
    ] })
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShowsRoute,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function BandMember({ member }) {
  return /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-4 font-mono text-white flex flex-col justify-between shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4] transition-all", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border-2 border-white mb-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: member.photoUrl || "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04.jpeg",
          alt: member.name,
          className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300",
          onError: (e) => {
            e.target.src = "/Band Logo/Band Icon.PNG";
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2 bg-black px-2 py-0.5 border border-white text-[10px] uppercase font-bold text-[#00F5D4]", children: member.role })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-xl font-display font-black uppercase text-white tracking-[-0.04em]", children: member.name }),
      member.bio && /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 uppercase leading-relaxed", children: member.bio })
    ] })
  ] });
}
const meta = () => {
  return [
    { title: "BAND & ZINE ARCHIVE // CUFF & COLLARS" },
    {
      name: "description",
      content: "Editorial art-zine, manifesto, photographic archive, and band dossier for Cuff & Collars."
    }
  ];
};
const loader = async () => {
  const zineSpreads = [
    {
      id: "spread-01",
      title: "TODO: Insert Spread Title 01",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.07.jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      id: "spread-02",
      title: "TODO: Insert Spread Title 02",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.06 (1).jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      id: "spread-03",
      title: "TODO: Insert Spread Title 03",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.04 (1).jpeg",
      caption: "TODO: Insert Photo Caption"
    },
    {
      id: "spread-04",
      title: "TODO: Insert Spread Title 04",
      image: "/RefrenceImages/WhatsApp Image 2026-08-21 at 07.31.13 (2).jpeg",
      caption: "TODO: Insert Photo Caption"
    }
  ];
  return json({ bandData, zineSpreads });
};
function BandRoute() {
  const { bandData: bandData2, zineSpreads } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#050505] text-[#F5F5F5] font-mono selection:bg-[#00F5D4] selection:text-black py-12 md:py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase text-[#00F5D4] font-bold mb-2", children: [
          /* @__PURE__ */ jsx("span", { children: "INDEX // 05" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: "EDITORIAL ZINE & DOSSIER" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase text-white tracking-[-0.06em] leading-none", children: "THE ARCHIVE" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-400 uppercase font-mono max-w-xs space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "COLLECTIVE: CUFF & COLLARS" }),
        /* @__PURE__ */ jsxs("span", { className: "zine-todo text-[10px] block", children: [
          "ORIGIN: [",
          bandData2.location,
          "]"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 border-2 border-white bg-black p-6 sm:p-10 shadow-[8px_8px_0px_#00F5D4] flex flex-col justify-between space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-neutral-800 pb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "zine-tag bg-white text-black font-bold", children: "MANIFESTO // VOL. 01" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500 uppercase font-mono", children: "UNFILTERED SIGNAL" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-[-0.05em]", children: "RAW SOUND. TACTILE ARTIFACTS." }),
          /* @__PURE__ */ jsxs("blockquote", { className: "font-serif italic text-lg sm:text-2xl text-neutral-200 border-l-2 border-[#00F5D4] pl-6 leading-relaxed", children: [
            '"',
            bandData2.statement,
            '"'
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-xs block", children: bandData2.bio }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs uppercase font-mono", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4] font-bold", children: "OFFICIAL DIGITAL ARCHIVE" }),
          /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: "REF: ARCH-ZINE-2026" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 border-2 border-white bg-black p-6 flex flex-col justify-between shadow-[8px_8px_0px_#FFFFFF] space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2 font-mono", children: [
            /* @__PURE__ */ jsx("span", { children: "IDENTITY SYMBOL" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4] font-bold", children: "OFFICIAL EMBLEM" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "aspect-square bg-black border-2 border-white flex items-center justify-center p-8 group", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/Band Logo/Band Icon.PNG",
              alt: "Band Icon",
              className: "w-full h-full object-contain invert group-hover:scale-105 transition-transform"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs uppercase font-mono", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-white", children: "COLLECTIVE DISPATCH" }),
          /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Collective Mission Statement" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // PERSONNEL]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "BAND MEMBERS" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400 uppercase font-mono", children: "ROSTER // OFFICIAL" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        bandData2.members.map((member, idx) => /* @__PURE__ */ jsx(BandMember, { member }, idx)),
        /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-white/40 bg-black p-6 flex flex-col justify-between text-center min-h-[300px]", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neutral-500 uppercase border-b border-neutral-800 pb-2 font-mono", children: "PERSONNEL // DOSSIER" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 my-auto", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-xs inline-block", children: "TODO: Additional Member Profiles" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neutral-500 uppercase pt-2 border-t border-neutral-800 font-mono", children: "DISPATCH PENDING" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-8 pt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-white pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-[#00F5D4] font-bold", children: "[SECTION // PHYSICAL ARTIFACTS]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-[-0.05em] mt-1", children: "ZINE SPREADS & POLAROIDS" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400 uppercase font-mono", children: "DIGITAL ARCHIVE SLIDES" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: zineSpreads.map((spread) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border-2 border-white bg-black p-4 sm:p-6 shadow-[6px_6px_0px_#FFFFFF] hover:shadow-[8px_8px_0px_#00F5D4] transition-all space-y-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-800 pb-2 uppercase font-mono", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-white", children: spread.title }),
              /* @__PURE__ */ jsx("span", { className: "text-[#00F5D4]", children: spread.id })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full overflow-hidden bg-neutral-900 border-2 border-white", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: spread.image,
                alt: spread.title,
                className: "w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300",
                onError: (e) => {
                  e.target.src = "/Band Logo/Band Icon.PNG";
                }
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-neutral-400 uppercase font-mono pt-1", children: spread.caption })
          ]
        },
        spread.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-2 border-white bg-black p-8 shadow-[6px_6px_0px_#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "zine-tag bg-[#00F5D4] text-black font-bold mb-2", children: "DISPATCH & PRESS" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-black uppercase text-white tracking-[-0.04em] mt-2", children: "CONNECT WITH CUFF & COLLARS" }),
        /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx("span", { className: "zine-todo text-[11px] block", children: "TODO: Insert Press & Interview Inquiry Note" }) })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contact",
          className: "w-full sm:w-auto text-center px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-wider border-2 border-white hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-all shadow-[4px_4px_0px_#000000]",
          children: "[ DISPATCH INQUIRY → ]"
        }
      )
    ] })
  ] }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BandRoute,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-QAqrQIlr.js", "imports": ["/assets/components-CWj0NU6o.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-D9U-srsX.js", "imports": ["/assets/components-CWj0NU6o.js"], "css": [] }, "routes/music.$slug": { "id": "routes/music.$slug", "parentId": "routes/music", "path": ":slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/music._slug-DLe9NfYF.js", "imports": ["/assets/components-CWj0NU6o.js"], "css": [] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-5DxgOAM4.js", "imports": ["/assets/components-CWj0NU6o.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DPbhuoyA.js", "imports": ["/assets/components-CWj0NU6o.js", "/assets/ReleaseCard-BNBgRNWK.js", "/assets/ShowCard-BwqG-2fx.js", "/assets/VideoCard-BPWjOmR0.js"], "css": [] }, "routes/videos": { "id": "routes/videos", "parentId": "root", "path": "videos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/videos-CF43SS0w.js", "imports": ["/assets/components-CWj0NU6o.js", "/assets/VideoCard-BPWjOmR0.js"], "css": [] }, "routes/music": { "id": "routes/music", "parentId": "root", "path": "music", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/music-EbPnTRSy.js", "imports": ["/assets/components-CWj0NU6o.js", "/assets/ReleaseCard-BNBgRNWK.js"], "css": [] }, "routes/shows": { "id": "routes/shows", "parentId": "root", "path": "shows", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/shows-elGQhePd.js", "imports": ["/assets/components-CWj0NU6o.js", "/assets/ShowCard-BwqG-2fx.js"], "css": [] }, "routes/band": { "id": "routes/band", "parentId": "root", "path": "band", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/band-URw-JwwW.js", "imports": ["/assets/components-CWj0NU6o.js"], "css": [] } }, "url": "/assets/manifest-fee355b9.js", "version": "fee355b9" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/music.$slug": {
    id: "routes/music.$slug",
    parentId: "routes/music",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/videos": {
    id: "routes/videos",
    parentId: "root",
    path: "videos",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/music": {
    id: "routes/music",
    parentId: "root",
    path: "music",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/shows": {
    id: "routes/shows",
    parentId: "root",
    path: "shows",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/band": {
    id: "routes/band",
    parentId: "root",
    path: "band",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

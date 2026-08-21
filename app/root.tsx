import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import styles from "./styles/global.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@500;700;800&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "CUFF & COLLARS // OFFICIAL ARCHIVE & ZINE" },
    {
      name: "description",
      content:
        "Official digital archive, discography, tour dates, and visual catalog for alternative/indie band Cuff & Collars.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark bg-[#050505] text-[#F5F5F5]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-[#050505] text-[#F5F5F5] selection:bg-[#00F5D4] selection:text-black antialiased">
        <Navigation />
        <main className="flex-1 w-full relative">{children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
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

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-xl w-full border-2 border-white bg-black p-8 shadow-[8px_8px_0px_#00F5D4] font-mono">
        <div className="flex items-center justify-between border-b-2 border-white pb-3 mb-6">
          <span className="text-xs bg-[#00F5D4] text-black px-2 py-0.5 font-bold">
            FATAL_DISPATCH // {status}
          </span>
          <span className="text-xs text-neutral-500">CUFF & COLLARS SYSTEM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black uppercase text-white mb-4 tracking-tighter">
          {heading}
        </h1>
        <p className="text-sm text-neutral-300 mb-6 uppercase leading-relaxed font-mono">
          {message}
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 border-2 border-white bg-white text-black font-bold uppercase text-xs hover:bg-[#00F5D4] hover:border-[#00F5D4] transition-colors"
        >
          [ RETURN TO HOME DIRECTORY ]
        </a>
      </div>
    </div>
  );
}

import type { Show } from "../data/shows";

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  const isSoldOut = show.status === "sold-out";
  const isPast = show.status === "past";

  return (
    <div className="border-2 border-white bg-black p-4 sm:p-6 font-mono text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4] transition-all">
      {/* Date & Location Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Date Box */}
        <div className="border-2 border-white p-3 bg-neutral-900 text-center min-w-[110px]">
          <span className="block text-xs uppercase text-[#00F5D4] font-bold">
            DATE
          </span>
          <span className="block text-lg font-black tracking-tight text-white mt-0.5">
            {show.date}
          </span>
        </div>

        {/* Venue & City */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="zine-tag text-[10px] bg-white text-black font-bold">
              {show.city}
            </span>
            {isSoldOut && (
              <span className="zine-tag text-[10px] bg-[#F78DA7] text-black font-bold">
                SOLD OUT
              </span>
            )}
            {isPast && (
              <span className="zine-tag text-[10px] bg-neutral-800 text-neutral-400 font-bold">
                CONCLUDED
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-[-0.04em]">
            {show.venue}
          </h3>
          {show.notes && (
            <p className="text-xs text-neutral-400 uppercase">
              {show.notes}
            </p>
          )}
        </div>
      </div>

      {/* Ticket Action Button */}
      <div className="pt-2 md:pt-0">
        {show.ticketLink && !isSoldOut && !isPast ? (
          <a
            href={show.ticketLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block w-full md:w-auto px-6 py-3 bg-[#00F5D4] text-black font-bold uppercase text-xs tracking-wider border-2 border-[#00F5D4] hover:bg-white hover:border-white transition-all shadow-[2px_2px_0px_#000000] text-center"
          >
            [ GET TICKETS ]
          </a>
        ) : isSoldOut ? (
          <span className="inline-block w-full md:w-auto px-6 py-3 bg-neutral-900 text-neutral-500 font-bold uppercase text-xs tracking-wider border-2 border-neutral-700 text-center cursor-not-allowed">
            [ SOLD OUT ]
          </span>
        ) : isPast ? (
          <span className="inline-block w-full md:w-auto px-6 py-3 bg-neutral-900 text-neutral-500 font-bold uppercase text-xs tracking-wider border-2 border-neutral-800 text-center">
            [ ARCHIVED ]
          </span>
        ) : (
          <span className="zine-todo text-xs">
            TODO: Tickets Available Soon
          </span>
        )}
      </div>
    </div>
  );
}

export function ShowsEmptyState({ message }: { message?: string }) {
  return (
    <div className="border-2 border-dashed border-white/40 bg-black p-8 sm:p-12 text-center font-mono space-y-4">
      <div className="inline-block px-3 py-1 bg-[#00F5D4] text-black text-xs font-bold uppercase tracking-widest">
        TRANSMISSION PENDING
      </div>
      <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-[-0.04em]">
        LIVE DATES // COMING SOON
      </h3>
      <p className="text-xs sm:text-sm text-neutral-400 uppercase max-w-md mx-auto leading-relaxed">
        {message || "TODO: Live tour dates and festival appearances will be announced shortly. Join the mailing list or follow socials for dispatches."}
      </p>
    </div>
  );
}

export default ShowCard;

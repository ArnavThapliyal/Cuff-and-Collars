export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketLink?: string;
  status: 'upcoming' | 'sold-out' | 'past' | 'cancelled';
  notes?: string;
}

export interface ShowsState {
  isComingSoon: boolean;
  message: string;
  shows: Show[];
}

// Shows section initially reflects a 'Coming Soon' state
export const showsData: ShowsState = {
  isComingSoon: true,
  message: "TODO: Live dates coming soon.",
  shows: [],
};

export interface Track {
  trackNumber: number;
  title: string;
  duration?: string;
}

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  bandcamp?: string;
  youtube?: string;
  soundcloud?: string;
}

export interface Release {
  slug: string;
  title: string;
  type: 'Album' | 'EP' | 'Single';
  releaseDate: string;
  coverImage: string;
  description: string;
  streamingLinks: StreamingLinks;
  tracklist: Track[];
}

export const releases: Release[] = [
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
      youtube: "https://youtube.com/TODO",
    },
    tracklist: [
      {
        trackNumber: 1,
        title: "TODO: Insert Track 1 Title",
        duration: "TODO",
      },
    ],
  },
];

export const getReleaseBySlug = (slug: string): Release | undefined => {
  return releases.find((release) => release.slug === slug);
};

export interface BandMember {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
}

export interface SocialLinks {
  instagram?: string;
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  bandcamp?: string;
  email?: string;
}

export interface BandData {
  name: string;
  location: string;
  bio: string;
  statement: string;
  members: BandMember[];
  socials: SocialLinks;
}

export const bandData: BandData = {
  name: "Cuff & Collars",
  location: "TODO: Insert Band Location",
  bio: "TODO: Insert Band Bio Here",
  statement: "TODO: Insert Band Statement Here",
  members: [
    {
      name: "TODO: Insert Member Name Here",
      role: "TODO: Insert Member Role Here",
      bio: "TODO: Insert Member Bio Here",
      photoUrl: "/RefrenceImages/band-member-portrait.jpg",
    },
  ],
  socials: {
    instagram: "https://instagram.com/TODO",
    spotify: "https://open.spotify.com/artist/TODO",
    appleMusic: "https://music.apple.com/artist/TODO",
    youtube: "https://youtube.com/@TODO",
    bandcamp: "https://cuffandcollars.bandcamp.com/TODO",
    email: "booking@TODO.com",
  },
};

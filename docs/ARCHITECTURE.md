# Application Architecture

## Directory Map
The project follows a standard Remix structure[cite: 2, 4]:
- `app/routes/` - Page endpoints[cite: 2]
- `app/components/` - Reusable UI elements[cite: 2]
- `app/public/` - Static assets (images, videos, audio)[cite: 2]

## Route Structure
Based on the defined navigation[cite: 3]:
- `/` (`_index.tsx`) - Homepage[cite: 2]
- `/music` (`music.tsx`) - Index of all releases[cite: 2]
- `/music/:slug` (`music.$slug.tsx`) - Individual release pages[cite: 2]
- `/shows` (`shows.tsx`) - Live dates / Currently "Coming Soon"[cite: 2, 3]
- `/videos` (`videos.tsx`) - Video gallery[cite: 2]
- `/band` (`band.tsx`) - About the band / zine archive[cite: 2]
- `/contact` (`contact.tsx`) - Booking and social links[cite: 2]

## Component Library
Located in `app/components/`[cite: 2]:
- `Hero.tsx` - High-impact visual header[cite: 2]
- `ReleaseCard.tsx` - For displaying albums/singles[cite: 2]
- `ShowCard.tsx` - For listing gig dates/venues[cite: 2]
- `VideoCard.tsx` - Video player/thumbnail wrapper[cite: 2]
- `BandMember.tsx` - Profile blocks[cite: 2]
- `Footer.tsx` - Global footer[cite: 2]

## Data Strategy
Do not hardcode content into components. We will use a local data model (e.g., `app/data/releases.ts`, `shows.ts`) to manage the band's catalog, allowing for easy updates without altering UI code.
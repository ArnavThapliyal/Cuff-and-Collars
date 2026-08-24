export interface Video {
  id: string;
  title: string;
  embedUrl?: string;
  youtubeId?: string;
  thumbnailUrl: string;
  description?: string;
  releaseDate?: string;
  category?: 'Music Video' | 'Live' | 'Behind the Scenes' | 'Visualizer';
}

export const videos: Video[] = [
  {
    id: "featured-video",
    title: "TODO: Insert Video Title Here",
    youtubeId: "", // TODO: Insert YouTube Video ID
    thumbnailUrl: "/RefrenceImages/video-thumbnail-featured.jpg",
    description: "TODO: Insert Video Description Here",
    category: "Music Video",
  },
];

export const getVideoById = (id: string): Video | undefined => {
  return videos.find((v) => v.id === id);
};

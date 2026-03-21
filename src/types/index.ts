export interface Video {
  id: string;
  title: string;
  date: string;
  theme: string;
  duration: string;
  youtubeId: string;
  thumbnail?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Credential {
  value: string;
  label: string;
}

export type Theme = 'All' | 'Latest Talks' | 'Most Popular' | 'Spirituality' | 'Ethics' | 'Interfaith' | 'Family' | 'Society';

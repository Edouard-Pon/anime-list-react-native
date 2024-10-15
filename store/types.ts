export interface User {
  id: string;
  username: string;
  role: string;
  created_at: string;
}

export interface Anime {
  id: string;
  title: string;
  type: string;
  episodes: number;
  status: string;
  description?: string;
  release_date?: string;
  upload_date: string;
  source?: string;
  external_link?: string;
  cover_image: string;
  genres: string[];
  themes?: string[];
  duration?: string;
  rating?: number;
  characters?: Character[];
}

export interface Character {
  id: string;
  name: string;
  original_name?: string;
  description?: string;
  cover_image: string;
  upload_date: string;
  anime?: Anime[];
}

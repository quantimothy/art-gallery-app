export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  likedArtworks: string[]; // Array of artwork IDs
}

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  artistName: string;
  location: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
}

export interface Gallery {
  id: string;
  title: string;
  description: string;
  tag: string; // The tag this gallery represents
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
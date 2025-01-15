export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  developer: string;
  publisher?: string;
  releaseDate: string;
  genres: string[];
  tags: string[];
  rating: number;
  playerCount: number;
  onSale?: boolean;
  saleDiscount?: number;
  features: string[];
  operatingSystem: string[];
  languages: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  games: Game[];
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface NFTAsset {
  id: string;
  name: string;
  description: string;
  image: string;
  game: string;
  price: number;
  type: 'weapon' | 'skin' | 'character';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}
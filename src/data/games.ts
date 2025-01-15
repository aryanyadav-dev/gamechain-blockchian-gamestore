import { Game, Category, Genre, NFTAsset } from '../types';

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyber Legends',
    description: 'A futuristic battle royale with NFT weapons and skins',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800',
    developer: 'Cyber Studios',
    publisher: 'BlockChain Games',
    releaseDate: '2024-03-15',
    genres: ['Action', 'Battle Royale', 'Multiplayer'],
    tags: ['NFT', 'Crypto', 'PvP'],
    rating: 4.8,
    playerCount: 15000,
    onSale: true,
    saleDiscount: 20,
    features: ['NFT Integration', 'Cross-platform', 'Controller Support'],
    operatingSystem: ['Windows', 'MacOS'],
    languages: ['English', 'Spanish', 'Chinese']
  },
  {
    id: '2',
    title: 'Meta Knights',
    description: 'Medieval fantasy RPG with blockchain-powered trading',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800',
    developer: 'Chain Games',
    publisher: 'Meta Publishing',
    releaseDate: '2024-02-01',
    genres: ['RPG', 'Fantasy', 'Open World'],
    tags: ['Trading', 'Multiplayer', 'Adventure'],
    rating: 4.6,
    playerCount: 8000,
    features: ['Trading System', 'Open World', 'Character Customization'],
    operatingSystem: ['Windows'],
    languages: ['English', 'Japanese', 'Korean']
  },
  {
    id: '3',
    title: 'Quantum Raiders',
    description: 'Sci-fi MMO with player-owned space territories',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800',
    developer: 'Quantum Studios',
    publisher: 'Space Games Inc',
    releaseDate: '2024-03-01',
    genres: ['MMO', 'Sci-Fi', 'Strategy'],
    tags: ['Space', 'Exploration', 'Trading'],
    rating: 4.5,
    playerCount: 12000,
    features: ['Territory Control', 'Space Combat', 'Economy System'],
    operatingSystem: ['Windows', 'Linux'],
    languages: ['English', 'German', 'French']
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'top-sellers',
    name: 'Top Sellers',
    description: 'Best-selling games on the platform',
    games: GAMES.sort((a, b) => b.playerCount - a.playerCount)
  },
  {
    id: 'new-releases',
    name: 'New Releases',
    description: 'Recently released games',
    games: GAMES.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  },
  {
    id: 'on-sale',
    name: 'Special Offers',
    description: 'Games with special discounts',
    games: GAMES.filter(game => game.onSale)
  }
];

export const GENRES: Genre[] = [
  {
    id: 'action',
    name: 'Action',
    description: 'Fast-paced games focused on combat and movement',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800'
  },
  {
    id: 'rpg',
    name: 'RPG',
    description: 'Story-driven games with character progression',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    description: 'Games that prioritize tactical thinking and planning',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800'
  }
];

export const NFT_ASSETS: NFTAsset[] = [
  // Weapons
  {
    id: '1',
    name: 'Dragon Slayer Sword',
    description: 'Legendary weapon from Cyber Legends',
    image: 'https://cdn-thumbs.ohmyprints.net/1/a3f957c06b788a3c26abcbb2166341fb/817x600/thumbnail/fit.jpg',
    game: 'Cyber Legends',
    price: 0.5,
    type: 'weapon',
    rarity: 'Legendary'
  },
  {
    id: '2',
    name: 'Plasma Rifle',
    description: 'Advanced energy weapon',
    image: 'https://imgcdn.stablediffusionweb.com/2024/3/4/8d9c671a-24f0-41ee-b08e-fea177a5ae56.jpg',
    game: 'Quantum Raiders',
    price: 0.3,
    type: 'weapon',
    rarity: 'Rare'
  },
  // Skins
  {
    id: '3',
    name: 'Neon Rider',
    description: 'Limited edition character skin',
    image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/csgo-skin-neon-rider-sunny-wright.jpg',
    game: 'Cyber Legends',
    price: 0.4,
    type: 'skin',
    rarity: 'Epic'
  },
  {
    id: '4',
    name: 'Mythical Wand',
    description: 'Mythical Wand',
    image: 'https://nftplazas.com/wp-content/uploads/2023/06/What-the-Thriving-Skins-Market-Means-for-NFT-Gaming-Assets-1280x720.png',
    game: 'Meta Knights',
    price: 0.6,
    type: 'skin',
    rarity: 'Legendary'
  },
  // Characters
  {
    id: '5',
    name: 'Space Marine',
    description: 'Elite character class',
    image: 'https://static.vecteezy.com/system/resources/previews/027/294/895/non_2x/imaginative-and-lovable-game-character-for-tshirt-graphic-generative-ai-free-png.png',
    game: 'Quantum Raiders',
    price: 0.8,
    type: 'character',
    rarity: 'Epic'
  },
  {
    id: '6',
    name: 'Cyber Ninja',
    description: 'Stealth specialist character',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5Y6ceM3mjFpbDBG65xrO3YloI0wAqwZqDg&s',
    game: 'Cyber Legends',
    price: 0.7,
    type: 'character',
    rarity: 'Rare'
  }
];
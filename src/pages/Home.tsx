import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { GAMES, CATEGORIES } from '../data/games';
import { TrendingUp, Trophy, Coins, Gift, Search, ChevronRight } from 'lucide-react';

const GENRES = [
  { id: 1, name: 'Free To Play', path: '/games/free-to-play' },
  { id: 2, name: 'Early Access', path: '/games/early-access' },
  { id: 3, name: 'Action', path: '/games/action' },
  { id: 4, name: 'Adventure', path: '/games/adventure' },
  { id: 5, name: 'Casual', path: '/games/casual' },
  { id: 6, name: 'Indie', path: '/games/indie' },
  { id: 7, name: 'Massively Multiplayer', path: '/games/mmo' },
  { id: 8, name: 'Racing', path: '/games/racing' },
  { id: 9, name: 'RPG', path: '/games/rpg' },
  { id: 10, name: 'Simulation', path: '/games/simulation' },
  { id: 11, name: 'Sports', path: '/games/sports' },
  { id: 12, name: 'Strategy', path: '/games/strategy' },
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = searchQuery ? (
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
      game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : true;

    const matchesGenre = selectedGenre ? game.genres.includes(selectedGenre) : true;

    return matchesSearch && matchesGenre;
  });

  const handleGenreClick = (genrePath: string) => {
    navigate(genrePath);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Genre Sidebar */}
        <div className="w-56 bg-gray-900 min-h-screen p-4 sticky top-16 border-r border-gray-800">
          <h2 className="text-xl font-bold mb-4 px-2 text-white">Genres</h2>
          <div className="space-y-1">
            {GENRES.map(genre => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.path)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                  selectedGenre === genre.name
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                <span>{genre.name}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="mb-12 relative rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000"
              alt="Featured Game" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end">
              <div className="p-8">
                <h1 className="text-4xl font-bold mb-2 text-white">Cyber Legends Season 2</h1>
                <p className="text-xl mb-4 text-gray-200">New NFT Collection Available Now</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  Play Now
                </button>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg flex items-center">
              <TrendingUp className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Trading Volume</p>
                <p className="text-xl font-bold text-white">$2.4M</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex items-center">
              <Trophy className="h-8 w-8 text-yellow-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Active Players</p>
                <p className="text-xl font-bold text-white">124.5K</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex items-center">
              <Coins className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">NFTs Minted</p>
                <p className="text-xl font-bold text-white">892.3K</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex items-center">
              <Gift className="h-8 w-8 text-purple-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Rewards Given</p>
                <p className="text-xl font-bold text-white">$892.3K</p>
              </div>
            </div>
          </section>

          {/* Search and Categories */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search games, genres, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            {searchQuery ? (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-white">Search Results</h2>
                  <p className="text-gray-400">Found {filteredGames.length} games</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Featured Games */}
                <section className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Featured Games</h2>
                    <Link to="/games/featured" className="text-blue-400 hover:text-blue-300">View All</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GAMES.slice(0, 6).map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </section>

                {/* Categories */}
                {CATEGORIES.map(category => (
                  <section key={category.id} className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white">{category.name}</h2>
                        <p className="text-gray-400 mt-1">{category.description}</p>
                      </div>
                      <Link 
                        to={`/games/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.games.slice(0, 3).map((game) => (
                        <GameCard key={game.id} game={game} />
                      ))}
                    </div>
                  </section>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


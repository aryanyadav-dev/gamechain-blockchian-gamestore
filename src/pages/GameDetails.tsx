import { useParams } from 'react-router-dom';
import { Shield, Trophy, Users, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';

export function GameDetails() {
  const { id } = useParams();
  const { address } = useAccount();

  // Mock data - would be fetched from blockchain/API
  const game = {
    id,
    title: 'Cyber Legends',
    description: 'A futuristic battle royale with NFT weapons and skins',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800',
    developer: 'Cyber Studios',
    players: 15000,
    achievements: 50,
    rating: 4.8
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <h1 className="text-4xl font-bold mt-6 mb-4">{game.title}</h1>
          <p className="text-gray-400 mb-6">{game.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <Users className="h-6 w-6 text-blue-400 mb-2" />
              <p className="text-sm text-gray-400">Active Players</p>
              <p className="text-xl font-bold">{game.players.toLocaleString()}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-400 mb-2" />
              <p className="text-sm text-gray-400">Achievements</p>
              <p className="text-xl font-bold">{game.achievements}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Shield className="h-6 w-6 text-green-400 mb-2" />
              <p className="text-sm text-gray-400">Rating</p>
              <p className="text-xl font-bold">{game.rating}/5.0</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Wallet className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-xl font-bold">${game.price}</p>
            </div>
          </div>

          {address ? (
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
              Purchase Game NFT
            </button>
          ) : (
            <button className="w-full bg-gray-700 text-gray-300 py-3 rounded-lg font-bold">
              Connect Wallet to Purchase
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Game Assets</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <img
                    src={`https://images.unsplash.com/photo-155${i}751371-adc38448a05e?auto=format&fit=crop&w=100`}
                    alt={`Asset ${i}`}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-bold">Legendary Weapon #{i}</h3>
                    <p className="text-sm text-gray-400">0.05 ETH</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Latest Achievements</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="bg-gray-700 p-2 rounded">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">Achievement #{i}</h3>
                    <p className="text-sm text-gray-400">Unlocked by 15% of players</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
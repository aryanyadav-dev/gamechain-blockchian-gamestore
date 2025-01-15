import { Game } from '../types';
import { Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const discountedPrice = game.onSale 
    ? game.price * (1 - (game.saleDiscount || 0) / 100)
    : game.price;

  return (
    <Link to={`/game/${game.id}`} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
      <div className="relative">
        <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="p-2 bg-gray-900/50 hover:bg-gray-900/75 rounded-full">
            <Heart className="h-4 w-4" />
          </button>
          <button className="p-2 bg-gray-900/50 hover:bg-gray-900/75 rounded-full">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        {game.onSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded">
            -{game.saleDiscount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{game.title}</h3>
          <div className="flex flex-col items-end">
            {game.onSale && (
              <span className="text-sm line-through text-gray-400">${game.price}</span>
            )}
            <span className="text-green-400 font-bold">${discountedPrice.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{game.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {game.genres.map((genre, index) => (
            <span key={index} className="bg-gray-700 text-sm px-2 py-1 rounded">
              {genre}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>{game.developer}</span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{game.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
import { Game } from '../types';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
  title: string;
  description?: string;
}

export function GameGrid({ games, title, description }: GameGridProps) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {description && (
            <p className="text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <button className="text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
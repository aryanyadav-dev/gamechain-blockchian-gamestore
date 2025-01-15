import { Genre } from '../types';
import { Link } from 'react-router-dom';

interface GenreCardProps {
  genre: Genre;
}

export function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link to={`/genres/${genre.id}`} className="relative group">
      <div className="relative h-48 rounded-lg overflow-hidden">
        <img 
          src={genre.image} 
          alt={genre.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{genre.name}</h3>
          <p className="text-sm text-gray-300">{genre.description}</p>
        </div>
      </div>
    </Link>
  );
}
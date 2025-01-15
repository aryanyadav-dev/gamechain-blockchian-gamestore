import { Trophy, Award, Star, Crown } from 'lucide-react';

export function Achievements() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-yellow-400 font-bold">2,450</span>
            <span className="text-gray-400 ml-2">Total Score</span>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-blue-400 font-bold">48/100</span>
            <span className="text-gray-400 ml-2">Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  {i % 4 === 0 ? (
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  ) : i % 3 === 0 ? (
                    <Award className="h-6 w-6 text-purple-400" />
                  ) : i % 2 === 0 ? (
                    <Star className="h-6 w-6 text-blue-400" />
                  ) : (
                    <Crown className="h-6 w-6 text-green-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">Achievement #{i}</h3>
                  <p className="text-sm text-gray-400">Cyber Legends</p>
                </div>
              </div>
              <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                50 Points
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Complete this challenging task to earn a unique NFT badge
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(i * 10) % 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{(i * 10) % 100}% Complete</span>
              <span>Unlocked by 15% of players</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
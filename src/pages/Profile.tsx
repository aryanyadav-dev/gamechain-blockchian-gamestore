import { useAccount } from 'wagmi';
import { 
  Trophy, 
  Gamepad2, 
  Wallet, 
  History,
  Share2,
  Settings
} from 'lucide-react';

export function Profile() {
  const { address } = useAccount();

  // Update playerProfile based on connected wallet
  const playerProfile = {
    name: address ? `Player ${address.slice(0, 6)}` : 'Anonymous Player',
    joinDate: 'January 2025',
    wallet: address || '...',
    gamesOwned: address ? 15 : 0,
    nftItems: address ? 40 : 0,
    achievementScore: address ? 3_500 : 0,
  };

  // Only show achievements if wallet is connected
  const recentAchievements = address ? [
    { title: 'Master of Combat', game: 'Warzone Legends', unlocked: '2 days ago' },
    { title: 'Ultimate Collector', game: 'Artifact Hunter', unlocked: '5 days ago' },
    { title: 'Champion of the Arena', game: 'Battlefield Royale', unlocked: '1 week ago' },
  ] : [];

  // Only show games if wallet is connected
  const recentGamesList = address ? [
    { title: 'Warzone Legends', hoursPlayed: 7, imgSrc: '/api/placeholder/100/100' },
    { title: 'Artifact Hunter', hoursPlayed: 12, imgSrc: '/api/placeholder/100/100' },
    { title: 'Battlefield Royale', hoursPlayed: 5, imgSrc: '/api/placeholder/100/100' },
  ] : [];

  // Only show transactions if wallet is connected
  const transactionHistory = address ? [
    { title: 'Purchased "Warzone Legends"', date: '3 days ago', amount: '-0.5 ETH' },
    { title: 'Purchased "Artifact Hunter"', date: '1 week ago', amount: '-0.75 ETH' },
    { title: 'Purchased "Battlefield Royale"', date: '2 weeks ago', amount: '-0.3 ETH' },
    { title: 'Purchased "Racing Rivals"', date: '1 month ago', amount: '-0.6 ETH' },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">{playerProfile.name}</h2>
              <p className="text-gray-400 text-sm mb-4">Joined {playerProfile.joinDate}</p>
              <div className="flex justify-center space-x-4">
                <button className="p-2 bg-gray-700 rounded-full">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 bg-gray-700 rounded-full">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Wallet</span>
                <span className="font-mono text-sm">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '...'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Games Owned</span>
                <span>{playerProfile.gamesOwned}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">NFT Items</span>
                <span>{playerProfile.nftItems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Achievement Score</span>
                <span>{playerProfile.achievementScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Trophy className="h-6 w-6 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold">Recent Achievements</h3>
              </div>
              <div className="space-y-4">
                {recentAchievements.length > 0 ? (
                  recentAchievements.map((achievement, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="bg-gray-700 p-2 rounded">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold">{achievement.title}</h4>
                        <p className="text-sm text-gray-400">Unlocked {achievement.unlocked} in "{achievement.game}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Connect wallet to view achievements</p>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Gamepad2 className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">Recent Games</h3>
              </div>
              <div className="space-y-4">
                {recentGamesList.length > 0 ? (
                  recentGamesList.map((game, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <img
                        src={game.imgSrc}
                        alt={game.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-bold">{game.title}</h4>
                        <p className="text-sm text-gray-400">{game.hoursPlayed} hours played</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Connect wallet to view games</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <History className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="text-xl font-bold">Transaction History</h3>
            </div>
            <div className="space-y-4">
              {transactionHistory.length > 0 ? (
                transactionHistory.map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Wallet className="h-5 w-5 text-green-400" />
                      <div>
                        <h4 className="font-bold">{transaction.title}</h4>
                        <p className="text-sm text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <span className="text-green-400">{transaction.amount}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Connect wallet to view transactions</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
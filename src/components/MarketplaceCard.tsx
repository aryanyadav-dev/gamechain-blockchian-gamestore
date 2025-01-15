import { NFTAsset } from '../types';
import { Heart, Share2 } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

interface MarketplaceCardProps {
  asset: NFTAsset;
  onBuy: () => void;
}

export function MarketplaceCard({ asset, onBuy }: MarketplaceCardProps) {
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
      <div className="relative">
        <img src={asset.image} alt={asset.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="p-2 bg-gray-900/50 hover:bg-gray-900/75 rounded-full">
            <Heart className="h-4 w-4" />
          </button>
          <button className="p-2 bg-gray-900/50 hover:bg-gray-900/75 rounded-full">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{asset.name}</h3>
          <span className={`px-2 py-1 rounded text-xs ${
            asset.type === 'skin' ? 'bg-purple-900 text-purple-400' :
            asset.type === 'weapon' ? 'bg-red-900 text-red-400' :
            'bg-green-900 text-green-400'
          }`}>
            {asset.type}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4">{asset.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-green-400 font-bold">{asset.price} ETH</span>
          </div>
          {address ? (
            <button
              onClick={onBuy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Buy Now
            </button>
          ) : (
            <button
              onClick={() => open()}
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
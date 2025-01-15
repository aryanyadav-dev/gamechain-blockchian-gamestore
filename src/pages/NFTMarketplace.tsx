import { useState } from 'react';
import { Filter, Search, SortDesc, Trash2 } from 'lucide-react'; 
import { useAccount } from 'wagmi';
import { MarketplaceCard } from '../components/MarketplaceCard';
import { NFTAsset } from '../types';
import { useGameNFT } from '../hooks/useSmartContracts';
import { NFT_ASSETS } from '../data/games';

export function NFTMarketplace() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userAssets, setUserAssets] = useState<NFTAsset[]>([]); // User-owned assets for selling/trading
  const [newNFT, setNewNFT] = useState({ name: '', type: '', price: '', coverImage: '' }); // New NFT form state
  const { buyGame, sellGame } = useGameNFT();

  const handleBuy = async (asset: NFTAsset) => {
    try {
      await buyGame(parseInt(asset.id), asset.price);
    } catch (error) {
      console.error('Error buying asset:', error);
    }
  };

  const handleSell = async (asset: NFTAsset) => {
    try {
      await sellGame(parseInt(asset.id), asset.price);
      setUserAssets((prev) => prev.filter((item) => item.id !== asset.id)); // Remove sold item
    } catch (error) {
      console.error('Error selling asset:', error);
    }
  };

  const handleNewNFTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNFT((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadNFT = () => {
    if (newNFT.name && newNFT.type && newNFT.price) {
      const newAsset: NFTAsset = {
        id: `${Date.now()}`, // Generate a unique ID
        name: newNFT.name,
        type: newNFT.type,
        price: parseFloat(newNFT.price),
        coverImage: newNFT.coverImage, // Add cover image URL
      };
      setUserAssets((prev) => [...prev, newAsset]);
      setNewNFT({ name: '', type: '', price: '', coverImage: '' }); // Reset form
    } else {
      alert('Please fill in all fields before uploading.');
    }
  };

  const handleDeleteNFT = (id: string) => {
    setUserAssets((prev) => prev.filter((asset) => asset.id !== id)); // Remove NFT from the list
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Check if the file is an image (JPG or PNG)
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        // Check file size (optional)
        if (file.size > 5 * 1024 * 1024) { // 5MB max size
          alert('File size is too large. Please upload a file smaller than 5MB.');
          return;
        }
        // Create an object URL for the image
        setNewNFT((prev) => ({ ...prev, coverImage: URL.createObjectURL(file) }));
      } else {
        alert('Invalid file type. Please upload a JPG or PNG image.');
      }
    }
  };

  const filteredAssets = NFT_ASSETS.filter(asset => {
    if (activeTab !== 'all' && activeTab !== 'sell' && asset.type !== activeTab) return false;
    if (searchQuery && !asset.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">NFT Marketplace</h1>

        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <button className="bg-gray-800 p-2 rounded-lg">
            <Filter className="h-5 w-5" />
          </button>
          <button className="bg-gray-800 p-2 rounded-lg">
            <SortDesc className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'all' ? 'bg-blue-600' : 'bg-gray-800'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Assets
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'skin' ? 'bg-blue-600' : 'bg-gray-800'
          }`}
          onClick={() => setActiveTab('skin')}
        >
          Skins
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'weapon' ? 'bg-blue-600' : 'bg-gray-800'
          }`}
          onClick={() => setActiveTab('weapon')}
        >
          Weapons
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'character' ? 'bg-blue-600' : 'bg-gray-800'
          }`}
          onClick={() => setActiveTab('character')}
        >
          Characters
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'sell' ? 'bg-blue-600' : 'bg-gray-800'
          }`}
          onClick={() => setActiveTab('sell')}
        >
          Sell/Trade
        </button>
      </div>

      {activeTab === 'sell' ? (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Assets</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Upload New NFT</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={newNFT.name}
                onChange={handleNewNFTChange}
                placeholder="NFT Name"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="type"
                value={newNFT.type}
                onChange={handleNewNFTChange}
                placeholder="NFT Type (e.g., skin, weapon)"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                name="price"
                value={newNFT.price}
                onChange={handleNewNFTChange}
                placeholder="Price"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="file"
                name="coverImage"
                onChange={handleImageUpload}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleUploadNFT}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg col-span-1 md:col-span-3 hover:opacity-90 mx-auto"
              >
                Upload NFT
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userAssets.length > 0 ? (
              userAssets.map((asset) => (
                <div key={asset.id} className="relative">
                  <MarketplaceCard
                    asset={asset}
                    onBuy={null}
                    onSell={() => handleSell(asset)}
                  />
                  <button
                    onClick={() => handleDeleteNFT(asset.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You have no assets to sell or trade.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <MarketplaceCard
              key={asset.id}
              asset={asset}
              onBuy={() => handleBuy(asset)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

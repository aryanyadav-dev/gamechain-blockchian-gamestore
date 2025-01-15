import { Menu, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { useState, useEffect } from 'react';
import { GAMES } from '../data/games';

export function Navbar() {
  const { address } = useAccount();
  const { connect } = useConnect();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [connectedAccount, setConnectedAccount] = useState<string>('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    checkIfMetaMaskIsInstalled();
    checkIfAccountIsConnected();
  }, []);

  const checkIfMetaMaskIsInstalled = () => {
    const { ethereum } = window;
    setIsMetaMaskInstalled(Boolean(ethereum && ethereum.isMetaMask));
  };

  const checkIfAccountIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask installed!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setConnectedAccount(account);
        setAccounts(accounts);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      console.log("Connected", accounts[0]);
      setConnectedAccount(accounts[0]);
      setAccounts(accounts);

      const chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain:", chainId);
      
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      setConnectedAccount('');
      setAccounts([]);
      setShowAccountMenu(false);
      
      // Clear any local storage data if you're storing any
      localStorage.removeItem('walletConnection');
      
      console.log("Wallet disconnected");
      
      // Optional: Reload the page to reset all states
      // window.location.reload();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      ethereum.on('accountsChanged', (newAccounts: string[]) => {
        console.log('Accounts changed:', newAccounts);
        setAccounts(newAccounts);
        if (newAccounts.length > 0) {
          setConnectedAccount(newAccounts[0]);
        } else {
          setConnectedAccount('');
        }
      });

      ethereum.on('chainChanged', (chainId: string) => {
        console.log('Chain changed:', chainId);
      });

      return () => {
        ethereum.removeListener('accountsChanged', () => {});
        ethereum.removeListener('chainChanged', () => {});
      };
    }
  }, []);

  const filteredGames = GAMES.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleGameSelect = (gameId: string) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(`/game/${gameId}`);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Close account menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.account-menu-container')) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 cursor-pointer" />
            <Link to="/" className="text-xl font-bold">GameChain</Link>
          </div>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setShowResults(true)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {showResults && searchQuery && (
                <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl">
                  {filteredGames.length > 0 ? (
                    filteredGames.map(game => (
                      <div
                        key={game.id}
                        onClick={() => handleGameSelect(game.id)}
                        className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
                      >
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="ml-3">
                          <p className="font-semibold">{game.title}</p>
                          <p className="text-sm text-gray-400">{game.genres.join(', ')}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-400">No games found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/nft-marketplace" className="hover:text-blue-400 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Marketplace
            </Link>
            <Link to="/profile" className="hover:text-blue-400">Profile</Link>
            {!isMetaMaskInstalled ? (
              <a 
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Install MetaMask
              </a>
            ) : connectedAccount ? (
              <div className="relative account-menu-container">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  {formatAddress(connectedAccount)}
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={handleDisconnectWallet}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { GenrePage } from './pages/GenrePage';
import { GameDetails } from './pages/GameDetails';
import { NFTMarketplace } from './pages/NFTMarketplace';
import { Profile } from './pages/Profile';
import { Achievements } from './pages/Achievements';
import { Login } from './pages/Login';

// WalletConnect project configuration
const projectId = 'YOUR_PROJECT_ID'; // Replace with your actual project ID from WalletConnect Cloud
const metadata = {
  name: 'GameChain',
  description: 'Web3 Gaming Platform',
  url: 'https://gamechain.example', // Replace with your actual platform URL
  icons: ['https://avatars.githubusercontent.com/u/37784886'] // Replace with your platform's icon URL
};

// Supported chains configuration
const chains = [mainnet, sepolia];

// Initialize Wagmi configuration
const config = defaultWagmiConfig({ chains, projectId, metadata });

// Initialize React Query client
const queryClient = new QueryClient();

// Create Web3Modal instance
createWeb3Modal({ wagmiConfig: config, projectId, chains });

// ProtectedRoute component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// AppContent component to conditionally render Navbar
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/games/:genre" element={
          <ProtectedRoute>
            <GenrePage />
          </ProtectedRoute>
        } />
        <Route path="/game/:id" element={
          <ProtectedRoute>
            <GameDetails />
          </ProtectedRoute>
        } />
        <Route path="/nft-marketplace" element={
          <ProtectedRoute>
            <NFTMarketplace />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/achievements" element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  // Check authentication on app load
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return (
      <Navigate to="/login" replace />
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

import React from 'react';
import { Wallet } from 'lucide-react';

interface NavbarProps {
  walletAddress: string | null;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ walletAddress, isConnecting, onConnect, onDisconnect }) => {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">⚔️</span>
          QuestQuest
        </h1>
        
        {walletAddress ? (
          <button
            onClick={onDisconnect}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Wallet className="w-4 h-4" />
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </button>
        ) : (
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Wallet className="w-4 h-4" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
};

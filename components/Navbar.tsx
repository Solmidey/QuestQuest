import React from 'react';
import { ConnectButton } from './ConnectButton';
import { Layers } from 'lucide-react';

interface NavbarProps {
  walletAddress: string | null;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  walletAddress, 
  isConnecting, 
  onConnect, 
  onDisconnect 
}) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-base-blue rounded-lg flex items-center justify-center">
            <Layers className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
            QuestQuest
          </span>
        </div>
        
        <ConnectButton 
          address={walletAddress}
          isConnecting={isConnecting}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      </div>
    </nav>
  );
};
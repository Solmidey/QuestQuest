import React from 'react';
import { Wallet, Loader2, LogOut } from 'lucide-react';

interface ConnectButtonProps {
  address: string | null;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  address, 
  isConnecting, 
  onConnect, 
  onDisconnect 
}) => {
  if (address) {
    return (
      <button 
        onClick={onDisconnect}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-slate-700"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        {address.slice(0, 6)}...{address.slice(-4)}
        <LogOut className="w-3 h-3 ml-1 text-slate-400" />
      </button>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-base-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-blue-900/50 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};
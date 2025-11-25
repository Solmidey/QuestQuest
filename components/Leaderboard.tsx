import React from 'react';
import { Trophy, Award, Loader2 } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useAccount } from 'wagmi';

export const Leaderboard: React.FC = () => {
  const { players, isLoading } = useLeaderboard(10, 10000); // Top 10, refresh every 10s
  const { address } = useAccount();

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h2>
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">
            No adventurers yet. Be the first to complete a quest!
          </p>
        </div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Top Questers
      </h2>
      
      <div className="space-y-3">
        {players.map((player) => {
          const isCurrentUser = address && player.player.toLowerCase() === address.toLowerCase();
          
          return (
            <div
              key={player.player}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                isCurrentUser
                  ? 'bg-blue-500/20 border border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800 hover:bg-slate-750'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl font-bold text-slate-400 w-12 text-center">
                  {getRankIcon(player.rank)}
                </div>
                
                <div className="flex-1">
                  <div className="font-mono text-sm text-white flex items-center gap-2">
                    {player.player.slice(0, 6)}...{player.player.slice(-4)}
                    {isCurrentUser && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {player.questsCompleted.toString()} quests completed
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-yellow-500">
                  {player.xp.toString()} XP
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-xs text-slate-500">
        Updates every 10 seconds
      </div>
    </div>
  );
};

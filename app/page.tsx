'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract } from 'wagmi';
import { Navbar } from '../components/Navbar';
import { QuestItem } from '../components/QuestItem';
import { BadgeReward } from '../components/BadgeReward';
import { Leaderboard } from '../components/Leaderboard';
import { MOCK_QUESTS } from '../constants';
import { Quest, QuestStatus } from '../types';
import { Sparkles, Trophy, Lock, Award } from 'lucide-react';
import { QUEST_QUEST_ADDRESS, QUEST_QUEST_ABI } from '../lib/contract';

const getTodayString = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

const getDayId = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

export default function Page() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Check quest completion status for each quest
  const questIds = MOCK_QUESTS.map(q => q.id);

  const completedCount = useMemo(
    () => quests.filter((q) => q.status === QuestStatus.COMPLETED).length,
    [quests]
  );
  const progressPercentage = useMemo(
    () => (quests.length > 0 ? (completedCount / quests.length) * 100 : 0),
    [quests, completedCount]
  );
  const allCompleted = quests.length > 0 && completedCount === quests.length;

  useEffect(() => {
    const initialQuests = MOCK_QUESTS.map((q) => ({
      ...q,
      status: QuestStatus.PENDING,
    }));
    setQuests(initialQuests);
  }, []);

  const handleConnect = async () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setQuests((prev) => prev.map((q) => ({ ...q, status: QuestStatus.PENDING })));
    setIsClaimed(false);
  };

  const handleVerifyQuest = (id: number) => {
    console.log('Quest completed:', id);
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: QuestStatus.COMPLETED } : q))
    );
  };

  const handleClaimReward = () => {
    if (!address || !allCompleted) return;
    setIsClaimed(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar
        walletAddress={address || null}
        isConnecting={false}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <div className="mb-8 flex justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
              Today's Quests
            </h1>
            <p className="text-slate-400 text-lg flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {getTodayString()}
            </p>
          </div>
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Award className="w-5 h-5" />
            {showLeaderboard ? 'Quests' : 'Leaderboard'}
          </button>
        </div>

        {/* Debug Info */}
        {address && (
          <div className="mb-4 p-4 bg-slate-800 rounded-lg text-xs font-mono">
            <div>Connected: {address}</div>
            <div>Completed: {completedCount}</div>
          </div>
        )}

        {showLeaderboard ? (
          <Leaderboard />
        ) : isClaimed ? (
          <BadgeReward
            dayLabel={getTodayString()}
            metadata={{
              tokenId: getDayId(),
              name: `QuestQuest Master ${getDayId()}`,
              image: '',
              attributes: [{ trait_type: 'Day', value: getDayId() }],
            }}
          />
        ) : (
          <div className="space-y-8 animate-[slideUp_0.4s_ease-out]">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Daily Progress
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {completedCount} / {quests.length} Completed
                  </div>
                </div>
                <div className="text-right">
                  {allCompleted ? (
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Ready to Claim
                    </span>
                  ) : (
                    <span className="text-blue-400 font-medium">
                      {Math.round(progressPercentage)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-700 ease-out relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {quests.map((quest) => (
                <QuestItem
                  key={quest.id}
                  quest={quest}
                  onVerify={handleVerifyQuest}
                  disabled={!isConnected}
                />
              ))}
            </div>

            {!isConnected && (
              <div className="flex items-center justify-center gap-2 p-4 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20 text-sm">
                <Lock className="w-4 h-4" />
                Connect your wallet to start completing quests.
              </div>
            )}

            {allCompleted && (
              <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-40">
                <button
                  onClick={handleClaimReward}
                  className="max-w-md w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trophy className="w-6 h-6" />
                  Claim Daily Badge
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

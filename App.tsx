import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { QuestItem } from './components/QuestItem';
import { BadgeReward } from './components/BadgeReward';
import { MOCK_QUESTS } from './constants';
import { Quest, QuestStatus } from './types';
import { verifyQuestOnChain, mintDailyBadge } from './services/mockChain';
import { Sparkles, Trophy, Lock } from 'lucide-react';

// Utility for date formatting
const getTodayString = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

const getDayId = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

const App: React.FC = () => {
  // --- State ---
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  // --- Derived State ---
  const completedCount = useMemo(() => quests.filter(q => q.status === QuestStatus.COMPLETED).length, [quests]);
  const progressPercentage = useMemo(() => (quests.length > 0 ? (completedCount / quests.length) * 100 : 0), [quests, completedCount]);
  const allCompleted = quests.length > 0 && completedCount === quests.length;

  // --- Effects ---
  useEffect(() => {
    // Load initial quests (simulating fetching from contract or JSON)
    const initialQuests = MOCK_QUESTS.map(q => ({
      ...q,
      type: q.type as any,
      status: QuestStatus.PENDING
    }));
    setQuests(initialQuests);
  }, []);

  // --- Handlers ---
  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
      setIsConnecting(false);
    }, 800);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setQuests(prev => prev.map(q => ({ ...q, status: QuestStatus.PENDING })));
    setIsClaimed(false);
  };

  const handleVerifyQuest = async (id: number) => {
    if (!walletAddress) return;

    // Optimistic UI update to verifying
    setQuests(prev => prev.map(q => q.id === id ? { ...q, status: QuestStatus.VERIFYING } : q));

    try {
      const success = await verifyQuestOnChain(id, walletAddress);
      
      setQuests(prev => prev.map(q => 
        q.id === id ? { ...q, status: success ? QuestStatus.COMPLETED : QuestStatus.FAILED } : q
      ));
    } catch (e) {
      setQuests(prev => prev.map(q => q.id === id ? { ...q, status: QuestStatus.FAILED } : q));
    }
  };

  const handleClaimReward = async () => {
    if (!walletAddress || !allCompleted) return;
    
    setIsMinting(true);
    try {
      await mintDailyBadge(getDayId(), walletAddress);
      setIsClaimed(true);
    } catch (e) {
      console.error("Mint failed", e);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-base-blue selection:text-white">
      <Navbar 
        walletAddress={walletAddress}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
            Today's Quests
          </h1>
          <p className="text-slate-400 text-lg flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {getTodayString()}
          </p>
        </div>

        {/* View Switcher: Quests vs Reward */}
        {isClaimed ? (
          <BadgeReward 
            dayLabel={getTodayString()}
            metadata={{
              tokenId: getDayId(),
              name: `QuestQuest Master ${getDayId()}`,
              image: "",
              attributes: [{ trait_type: "Day", value: getDayId() }]
            }}
          />
        ) : (
          <div className="space-y-8 animate-[slideUp_0.4s_ease-out]">
            
            {/* Progress Bar */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Daily Progress</div>
                  <div className="text-2xl font-bold text-white">{completedCount} / {quests.length} Completed</div>
                </div>
                <div className="text-right">
                  {allCompleted ? (
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Ready to Claim
                    </span>
                  ) : (
                    <span className="text-base-blue font-medium">{Math.round(progressPercentage)}%</span>
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

            {/* Quest List */}
            <div className="space-y-4">
              {quests.map((quest) => (
                <QuestItem 
                  key={quest.id}
                  quest={quest}
                  onVerify={handleVerifyQuest}
                  disabled={!walletAddress}
                />
              ))}
            </div>

            {/* Locked State Message if not connected */}
            {!walletAddress && (
              <div className="flex items-center justify-center gap-2 p-4 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20 text-sm">
                <Lock className="w-4 h-4" />
                Connect your wallet to start completing quests.
              </div>
            )}

            {/* Claim Button Area */}
            {allCompleted && (
              <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-40">
                <button
                  onClick={handleClaimReward}
                  disabled={isMinting}
                  className="max-w-md w-full bg-gradient-to-r from-base-blue to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-80 disabled:transform-none"
                >
                  {isMinting ? (
                    <>Minting Reward...</>
                  ) : (
                    <>
                      <Trophy className="w-6 h-6" />
                      Claim Daily Badge
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
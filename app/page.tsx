"use client";
import React, { useEffect, useState } from "react";
import { WagmiConfig, useAccount, useWriteContract, usePrepareWriteContract } from "wagmi";
import { wagmiConfig } from "./lib/wagmi";
import { QUESTQUEST_ADDRESS, QUESTQUEST_ABI } from "./lib/contract";
import QuestCard from "./components/QuestCard";
import ClaimReward from "./components/ClaimReward";
import ShareAchievement from "./components/ShareAchievement";

type Quest = {
  id: number;
  name: string;
  description: string;
  rewardId: number;
  dayIndex: number;
};

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const fetchQuests = async () => {
    try {
      const qs: Quest[] = [];
      for (let i = 0; i < 5; i++) {
        qs.push({ id: i, name: `Quest #${i+1}`, description: `Complete task ${i+1}`, rewardId: i, dayIndex: i });
      }
      setQuests(qs);
    } catch (err) {
      console.error("Failed to fetch quests:", err);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const completeQuestWrite = usePrepareWriteContract({
    address: QUESTQUEST_ADDRESS,
    abi: QUESTQUEST_ABI,
    functionName: "completeQuest",
  });

  const completeQuest = useWriteContract(completeQuestWrite.config);

  const handleCompleteQuest = async (questId: number) => {
    try {
      await completeQuest.writeAsync({ args: [questId] });
      setCompleted([...completed, questId]);
      alert(`Quest ${questId} completed!`);
    } catch (err) {
      console.error(err);
      alert("Failed to complete quest");
    }
  };

  const handleClaimReward = async () => {
    alert("Rewards are automatically minted upon quest completion!");
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">QuestQuest</h1>
        {!isConnected && <p className="text-center text-gray-600">Connect your wallet to see today's quests.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onComplete={() => handleCompleteQuest(quest.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <ClaimReward onClaim={handleClaimReward} />
          {quests.filter(q => completed.includes(q.id)).map(q => (
            <ShareAchievement key={q.id} questName={q.name} />
          ))}
        </div>
      </div>
    </WagmiConfig>
  );
}

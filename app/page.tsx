"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { QUESTQUEST_ADDRESS, QUESTQUEST_ABI } from "./lib/contract";
import QuestCard from "./components/QuestCard";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [quests, setQuests] = useState([]);
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleCompleteQuest = async (questId: number) => {
    if (!address) return;
    
    try {
      writeContract({
        address: QUESTQUEST_ADDRESS,
        abi: QUESTQUEST_ABI,
        functionName: "completeQuest",
        args: [questId],
      } as any);
    } catch (error) {
      console.error("Error completing quest:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Quest completed successfully!");
    }
  }, [isSuccess]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">QuestQuest</h1>
      
      {!isConnected ? (
        <div className="text-center">
          <p>Please connect your wallet to continue</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {quests.length === 0 ? (
            <p>No quests available</p>
          ) : (
            quests.map((quest: any) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onComplete={handleCompleteQuest}
                isLoading={isPending}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}

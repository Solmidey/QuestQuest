import { useReadContract } from 'wagmi';
import { QUEST_QUEST_ADDRESS, QUEST_QUEST_ABI } from '../lib/contract';
import { LeaderboardPlayer } from '../types';
import { useEffect } from 'react';

export function useLeaderboard(limit: number = 10, refreshInterval: number = 10000) {
  const { data, isLoading, refetch } = useReadContract({
    address: QUEST_QUEST_ADDRESS,
    abi: QUEST_QUEST_ABI,
    functionName: 'getTopPlayers',
    args: [BigInt(limit)],
  });

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refetch, refreshInterval]);

  // Transform data to include rank
  const players: LeaderboardPlayer[] = data
    ? (data as any[]).map((player, index) => ({
        player: player.player,
        xp: player.xp,
        questsCompleted: player.questsCompleted,
        rank: index + 1,
      }))
    : [];

  return {
    players,
    isLoading,
    refetch,
  };
}

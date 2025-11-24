import { Quest, QuestStatus } from '../types';

/**
 * Mocks the behavior of smart contract interactions and off-chain indexers.
 * In a real app, this would use 'viem' to read/write to the Base Mainnet
 * and fetch data from a Cloudflare Worker/Graph.
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const verifyQuestOnChain = async (questId: number, walletAddress: string): Promise<boolean> => {
  await delay(1500); // Simulate network latency
  
  // Random failure simulation for demonstration purposes (rare)
  if (Math.random() > 0.95) return false;
  
  return true;
};

export const mintDailyBadge = async (dayId: string, walletAddress: string): Promise<string> => {
  await delay(3000); // Simulate transaction confirmation time
  // Returns a mock transaction hash
  return "0x7a2267891238912389128931298319283912893128931293";
};

export const signMessage = async (message: string): Promise<string> => {
  await delay(800);
  return "0xsignature_mock_123456789";
};

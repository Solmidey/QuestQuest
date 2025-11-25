import { useState } from 'react';
import { useAccount, useBalance, useWriteContract, useSignMessage, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, recoverMessageAddress } from 'viem';
import { Quest, QuestType, QuestStatus } from '../types';
import { QUEST_QUEST_ADDRESS, QUEST_QUEST_ABI, ACHIEVEMENTS_NFT_ADDRESS, ACHIEVEMENTS_NFT_ABI, CHAIN } from '../lib/contract';

export function useQuestVerification() {
  const { address, chain } = useAccount();
  const [verifyingQuestId, setVerifyingQuestId] = useState<number | null>(null);
  
  const { data: balance } = useBalance({ address });
  const { writeContractAsync: writeQuest } = useWriteContract();
  const { writeContractAsync: writeNFT } = useWriteContract();
  const { signMessageAsync } = useSignMessage();

  // Verify BALANCE quest
  const verifyBalanceQuest = async (quest: Quest): Promise<boolean> => {
    if (!balance || !quest.balanceThreshold) return false;
    
    const threshold = parseEther(quest.balanceThreshold);
    const hasEnoughBalance = balance.value >= threshold;
    
    if (!hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need at least ${quest.balanceThreshold} ETH`);
    }
    
    return true;
  };

  // Verify SIGNATURE quest
  const verifySignatureQuest = async (quest: Quest): Promise<boolean> => {
    if (!address || !quest.signatureMessage) return false;
    
    try {
      const signature = await signMessageAsync({ 
        account: address,
        message: quest.signatureMessage,
      });
      
      // Recover address from signature to verify it matches
      const recoveredAddress = await recoverMessageAddress({
        message: quest.signatureMessage,
        signature,
      });
      
      return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  };

  // Complete quest on-chain
  const completeQuestOnChain = async (questId: number): Promise<string> => {
    if (!address || !chain) throw new Error('Wallet not connected');
    
    const hash = await writeQuest({
      address: QUEST_QUEST_ADDRESS,
      abi: QUEST_QUEST_ABI,
      functionName: 'completeQuest',
      args: [BigInt(questId)],
      account: address,
      chain: CHAIN,
    });
    
    return hash;
  };

  // Mint Achievement NFT (special quest)
  const mintAchievementNFT = async (): Promise<string> => {
    if (!address || !chain) throw new Error('Wallet not connected');
    
    const hash = await writeNFT({
      address: ACHIEVEMENTS_NFT_ADDRESS,
      abi: ACHIEVEMENTS_NFT_ABI,
      functionName: 'mint',
      account: address,
      chain: CHAIN,
    });
    
    return hash;
  };

  // Main verification function
  const verifyQuest = async (quest: Quest): Promise<{ success: boolean; txHash?: string; error?: string }> => {
    if (!address) {
      return { success: false, error: 'Wallet not connected' };
    }

    setVerifyingQuestId(quest.id);

    try {
      let verificationPassed = false;
      let txHash: string | undefined;

      switch (quest.type) {
        case QuestType.BALANCE:
          verificationPassed = await verifyBalanceQuest(quest);
          if (verificationPassed) {
            txHash = await completeQuestOnChain(quest.id);
          }
          break;

        case QuestType.SIGNATURE:
          verificationPassed = await verifySignatureQuest(quest);
          if (verificationPassed) {
            txHash = await completeQuestOnChain(quest.id);
          }
          break;

        case QuestType.ONCHAIN:
          // For mint NFT quest, handle specially
          if (quest.title.toLowerCase().includes('mint')) {
            txHash = await mintAchievementNFT();
          } else {
            // User performed action externally, just complete on-chain
            txHash = await completeQuestOnChain(quest.id);
          }
          verificationPassed = true;
          break;

        case QuestType.SOCIAL:
          // Social quests are verified client-side only (no on-chain call)
          verificationPassed = true;
          break;

        default:
          throw new Error('Unknown quest type');
      }

      setVerifyingQuestId(null);
      return { success: verificationPassed, txHash };
    } catch (error: any) {
      console.error('Quest verification failed:', error);
      setVerifyingQuestId(null);
      return { success: false, error: error.message || 'Verification failed' };
    }
  };

  return {
    verifyQuest,
    verifyingQuestId,
    isVerifying: verifyingQuestId !== null,
  };
}

// Hook to wait for transaction and update quest status
export function useQuestTransaction(txHash: string | undefined) {
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  return {
    isPending: isLoading,
    isConfirmed: isSuccess,
    isFailed: isError,
  };
}

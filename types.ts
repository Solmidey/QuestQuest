export enum QuestType {
  ONCHAIN = 'ONCHAIN',
  SOCIAL = 'SOCIAL',
  BALANCE = 'BALANCE',
  SIGNATURE = 'SIGNATURE',
}

export enum QuestStatus {
  PENDING = 'PENDING',
  VERIFYING = 'VERIFYING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  type: QuestType;
  status: QuestStatus;
  xpReward: number;
  
  // Optional fields based on quest type
  redirectUrl?: string; // For ONCHAIN & SOCIAL
  balanceThreshold?: string; // For BALANCE (in ETH)
  tokenAddress?: string | null; // null = native ETH
  requiresTx?: boolean; // For ONCHAIN - requires tx submission
  signatureMessage?: string; // For SIGNATURE
}

export interface LeaderboardPlayer {
  player: string;
  xp: bigint;
  questsCompleted: bigint;
  rank: number;
}

export interface BadgeMetadata {
  tokenId: string;
  name: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
}

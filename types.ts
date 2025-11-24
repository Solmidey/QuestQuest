export enum QuestType {
  ONCHAIN_TX = 'ONCHAIN_TX',
  SIGNATURE = 'SIGNATURE',
  SOCIAL = 'SOCIAL',
  BALANCE = 'BALANCE'
}

export enum QuestStatus {
  PENDING = 'PENDING',
  VERIFYING = 'VERIFYING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  xp: number;
  type: QuestType;
  actionLabel: string;
  status: QuestStatus;
}

export interface DailyData {
  dayId: string; // Format: YYYYMMDD
  dateLabel: string;
  isRewardClaimed: boolean;
  quests: Quest[];
}

export interface BadgeMetadata {
  tokenId: string;
  name: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}
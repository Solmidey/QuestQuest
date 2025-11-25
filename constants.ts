import { Quest, QuestType, QuestStatus } from './types';

// Generate different quests based on day of year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

// Quest pool - rotates based on day
const QUEST_POOL: Quest[] = [
  // ONCHAIN QUESTS
  {
    id: 1,
    title: 'Bridge to Base',
    description: 'Bridge ETH to Base network',
    type: QuestType.ONCHAIN,
    status: QuestStatus.PENDING,
    xpReward: 100,
    redirectUrl: 'https://bridge.base.org/',
    requiresTx: true,
  },
  {
    id: 2,
    title: 'Swap on Uniswap',
    description: 'Make a swap on Uniswap (Base)',
    type: QuestType.ONCHAIN,
    status: QuestStatus.PENDING,
    xpReward: 75,
    redirectUrl: 'https://app.uniswap.org/swap?chain=base',
    requiresTx: true,
  },
  {
    id: 3,
    title: 'Swap on Aerodrome',
    description: 'Trade on Aerodrome DEX',
    type: QuestType.ONCHAIN,
    status: QuestStatus.PENDING,
    xpReward: 75,
    redirectUrl: 'https://aerodrome.finance/swap',
    requiresTx: true,
  },
  {
    id: 4,
    title: 'Mint Achievement NFT',
    description: 'Mint your first Achievement NFT',
    type: QuestType.ONCHAIN,
    status: QuestStatus.PENDING,
    xpReward: 150,
    requiresTx: true,
    // No redirectUrl - handled in-app
  },
  
  // BALANCE QUESTS
  {
    id: 5,
    title: 'Hold 0.001 ETH',
    description: 'Maintain a balance of at least 0.001 ETH',
    type: QuestType.BALANCE,
    status: QuestStatus.PENDING,
    xpReward: 50,
    balanceThreshold: '0.001',
    tokenAddress: null, // Native ETH
  },
  {
    id: 6,
    title: 'Hold 0.01 ETH',
    description: 'Maintain a balance of at least 0.01 ETH',
    type: QuestType.BALANCE,
    status: QuestStatus.PENDING,
    xpReward: 100,
    balanceThreshold: '0.01',
    tokenAddress: null,
  },
  
  // SOCIAL QUESTS
  {
    id: 7,
    title: 'Follow on X (Twitter)',
    description: 'Follow QuestQuest on X',
    type: QuestType.SOCIAL,
    status: QuestStatus.PENDING,
    xpReward: 25,
    redirectUrl: 'https://twitter.com/intent/follow?screen_name=base',
  },
  {
    id: 8,
    title: 'Join Discord',
    description: 'Join the QuestQuest Discord community',
    type: QuestType.SOCIAL,
    status: QuestStatus.PENDING,
    xpReward: 25,
    redirectUrl: 'https://discord.gg/buildonbase',
  },
  {
    id: 9,
    title: 'Share on Farcaster',
    description: 'Share your quest progress on Farcaster',
    type: QuestType.SOCIAL,
    status: QuestStatus.PENDING,
    xpReward: 50,
    redirectUrl: 'https://warpcast.com/~/compose',
  },
  
  // SIGNATURE QUESTS
  {
    id: 10,
    title: 'Sign the Pledge',
    description: 'Sign the QuestQuest adventurer pledge',
    type: QuestType.SIGNATURE,
    status: QuestStatus.PENDING,
    xpReward: 50,
    signatureMessage: 'I pledge to be an honorable QuestQuest adventurer!',
  },
];

// Select 5 quests per day (deterministic based on day)
export const MOCK_QUESTS: Quest[] = (() => {
  const day = getDayOfYear();
  const selected: Quest[] = [];
  
  // Ensure we get at least one of each type
  const onchainQuests = QUEST_POOL.filter(q => q.type === QuestType.ONCHAIN);
  const socialQuests = QUEST_POOL.filter(q => q.type === QuestType.SOCIAL);
  const balanceQuests = QUEST_POOL.filter(q => q.type === QuestType.BALANCE);
  const signatureQuests = QUEST_POOL.filter(q => q.type === QuestType.SIGNATURE);
  
  // Pick one from each category using day as seed
  selected.push(onchainQuests[day % onchainQuests.length]);
  selected.push(socialQuests[day % socialQuests.length]);
  selected.push(balanceQuests[day % balanceQuests.length]);
  selected.push(signatureQuests[day % signatureQuests.length]);
  
  // Add one more random quest
  const remaining = QUEST_POOL.filter(q => !selected.includes(q));
  selected.push(remaining[(day * 7) % remaining.length]);
  
  return selected;
})();

export const FARCASTER_SHARE_URL = "https://warpcast.com/~/compose";


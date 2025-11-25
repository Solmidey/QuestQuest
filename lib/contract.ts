import { base } from 'wagmi/chains';

export const QUEST_QUEST_ADDRESS = '0xDD4A70A54C2E759F3eF4D2DD3dcba7f8FA326b55' as const;
export const ACHIEVEMENTS_NFT_ADDRESS = '0x02DE94645831dFa668657860F7C8BAFc72a80E56' as const;

export const QUEST_QUEST_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'questId', type: 'uint256' }],
    name: 'completeQuest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'limit', type: 'uint256' }],
    name: 'getTopPlayers',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'playerAddress', type: 'address' },
          { internalType: 'uint256', name: 'totalXP', type: 'uint256' },
          { internalType: 'uint256', name: 'questsCompleted', type: 'uint256' },
          { internalType: 'uint256', name: 'lastCompletionTime', type: 'uint256' },
        ],
        internalType: 'struct QuestQuest.Player[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'questId', type: 'uint256' },
    ],
    name: 'getUserQuestStatus',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getPlayerStats',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'playerAddress', type: 'address' },
          { internalType: 'uint256', name: 'totalXP', type: 'uint256' },
          { internalType: 'uint256', name: 'questsCompleted', type: 'uint256' },
          { internalType: 'uint256', name: 'lastCompletionTime', type: 'uint256' },
        ],
        internalType: 'struct QuestQuest.Player',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getActiveQuests',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' },
          { internalType: 'uint8', name: 'questType', type: 'uint8' },
          { internalType: 'uint256', name: 'xpReward', type: 'uint256' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
        ],
        internalType: 'struct QuestQuest.Quest[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'questId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'xpEarned', type: 'uint256' },
    ],
    name: 'QuestCompleted',
    type: 'event',
  },
] as const;

export const ACHIEVEMENTS_NFT_ABI = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'BadgeMinted',
    type: 'event',
  },
] as const;

export const CHAIN = base;

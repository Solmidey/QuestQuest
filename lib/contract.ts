import { base } from 'wagmi/chains';

export const QUEST_QUEST_ADDRESS = '0x93B9E86c8cec411D9Fb62dfc9b448A6623Fb5F83' as const;
export const ACHIEVEMENTS_NFT_ADDRESS = '0xa1258e6b9afF4b1d90B7BEa912ce81E07114f76e' as const;

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
          { internalType: 'address', name: 'player', type: 'address' },
          { internalType: 'uint256', name: 'xp', type: 'uint256' },
          { internalType: 'uint256', name: 'questsCompleted', type: 'uint256' },
        ],
        internalType: 'struct Leaderboard.Player[]',
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
    outputs: [{ internalType: 'bool', name: 'completed', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'questId', type: 'uint256' },
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
] as const;

export const CHAIN = base;

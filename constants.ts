export const APP_NAME = "QuestQuest";
export const APP_VERSION = "1.0.0";
export const BASE_CHAIN_ID = 8453;

// Mock data to simulate the "Daily Rotation"
export const MOCK_QUESTS = [
  {
    id: 1,
    title: "GM Base",
    description: "Sign a daily message to prove you are active on the network.",
    xp: 50,
    type: "SIGNATURE",
    actionLabel: "Sign In",
    status: "PENDING"
  },
  {
    id: 2,
    title: "Bridge Explorer",
    description: "Check the status of the official Base Bridge contract.",
    xp: 100,
    type: "ONCHAIN_TX",
    actionLabel: "Check Contract",
    status: "PENDING"
  },
  {
    id: 3,
    title: "HODL Check",
    description: "Verify your wallet holds at least 0.0001 ETH (Simulated).",
    xp: 75,
    type: "BALANCE",
    actionLabel: "Verify Balance",
    status: "PENDING"
  }
];

export const FARCASTER_SHARE_URL = "https://warpcast.com/~/compose";
export const REPO_URL = "https://github.com/example/questquest";

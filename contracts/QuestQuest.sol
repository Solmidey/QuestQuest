// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title QuestQuest
 * @notice Main contract for managing daily quests and tracking user progress
 * @dev Handles quest completion, XP rewards, and leaderboard
 */
contract QuestQuest is Ownable, ReentrancyGuard {
    
    // ============ Structs ============
    
    struct Quest {
        uint256 id;
        string title;
        string description;
        uint8 questType; // 0: ONCHAIN, 1: SOCIAL, 2: BALANCE, 3: SIGNATURE
        uint256 xpReward;
        bool isActive;
    }
    
    struct Player {
        address playerAddress;
        uint256 totalXP;
        uint256 questsCompleted;
        uint256 lastCompletionTime;
    }
    
    // ============ State Variables ============
    
    // Quest ID => Quest details
    mapping(uint256 => Quest) public quests;
    
    // User address => Quest ID => completion status
    mapping(address => mapping(uint256 => bool)) public userQuestStatus;
    
    // User address => Player stats
    mapping(address => Player) public players;
    
    // Array of all player addresses for leaderboard
    address[] public playerAddresses;
    
    // Mapping to check if address is already in playerAddresses
    mapping(address => bool) public isPlayerRegistered;
    
    uint256 public nextQuestId;
    
    // ============ Events ============
    
    event QuestCreated(uint256 indexed questId, string title, uint256 xpReward);
    event QuestCompleted(address indexed user, uint256 indexed questId, uint256 xpEarned);
    event QuestDeactivated(uint256 indexed questId);
    
    // ============ Constructor ============
    
    constructor() Ownable(msg.sender) {
        nextQuestId = 1;
        
        // Create initial quests
        _createQuest("Bridge to Base", "Bridge ETH to Base network", 0, 100);
        _createQuest("Swap on Uniswap", "Make a swap on Uniswap", 0, 75);
        _createQuest("Swap on Aerodrome", "Trade on Aerodrome DEX", 0, 75);
        _createQuest("Mint Achievement NFT", "Mint your first Achievement NFT", 0, 150);
        _createQuest("Hold 0.001 ETH", "Maintain balance of at least 0.001 ETH", 2, 50);
        _createQuest("Hold 0.01 ETH", "Maintain balance of at least 0.01 ETH", 2, 100);
        _createQuest("Follow on X", "Follow QuestQuest on X (Twitter)", 1, 25);
        _createQuest("Join Discord", "Join the QuestQuest Discord", 1, 25);
        _createQuest("Share on Farcaster", "Share your quest progress", 1, 50);
        _createQuest("Sign the Pledge", "Sign the QuestQuest adventurer pledge", 3, 50);
    }
    
    // ============ Internal Functions ============
    
    function _createQuest(
        string memory title,
        string memory description,
        uint8 questType,
        uint256 xpReward
    ) internal {
        quests[nextQuestId] = Quest({
            id: nextQuestId,
            title: title,
            description: description,
            questType: questType,
            xpReward: xpReward,
            isActive: true
        });
        
        emit QuestCreated(nextQuestId, title, xpReward);
        nextQuestId++;
    }
    
    function _registerPlayer(address user) internal {
        if (!isPlayerRegistered[user]) {
            players[user] = Player({
                playerAddress: user,
                totalXP: 0,
                questsCompleted: 0,
                lastCompletionTime: 0
            });
            playerAddresses.push(user);
            isPlayerRegistered[user] = true;
        }
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Complete a quest and earn XP
     * @param questId The ID of the quest to complete
     */
    function completeQuest(uint256 questId) external nonReentrant {
        require(quests[questId].isActive, "Quest does not exist or is inactive");
        require(!userQuestStatus[msg.sender][questId], "Quest already completed");
        
        // Register player if first time
        _registerPlayer(msg.sender);
        
        // Mark quest as completed
        userQuestStatus[msg.sender][questId] = true;
        
        // Update player stats
        Player storage player = players[msg.sender];
        player.totalXP += quests[questId].xpReward;
        player.questsCompleted++;
        player.lastCompletionTime = block.timestamp;
        
        emit QuestCompleted(msg.sender, questId, quests[questId].xpReward);
    }
    
    /**
     * @notice Get user's completion status for a specific quest
     * @param user The user's address
     * @param questId The quest ID to check
     */
    function getUserQuestStatus(address user, uint256 questId) external view returns (bool) {
        return userQuestStatus[user][questId];
    }
    
    /**
     * @notice Get player stats
     * @param user The user's address
     */
    function getPlayerStats(address user) external view returns (Player memory) {
        return players[user];
    }
    
    /**
     * @notice Get top players sorted by XP
     * @param limit Maximum number of players to return
     */
    function getTopPlayers(uint256 limit) external view returns (Player[] memory) {
        uint256 totalPlayers = playerAddresses.length;
        uint256 resultSize = limit > totalPlayers ? totalPlayers : limit;
        
        if (resultSize == 0) {
            return new Player[](0);
        }
        
        // Create array of all players
        Player[] memory allPlayers = new Player[](totalPlayers);
        for (uint256 i = 0; i < totalPlayers; i++) {
            allPlayers[i] = players[playerAddresses[i]];
        }
        
        // Simple bubble sort by XP (descending)
        for (uint256 i = 0; i < totalPlayers; i++) {
            for (uint256 j = i + 1; j < totalPlayers; j++) {
                if (allPlayers[i].totalXP < allPlayers[j].totalXP) {
                    Player memory temp = allPlayers[i];
                    allPlayers[i] = allPlayers[j];
                    allPlayers[j] = temp;
                }
            }
        }
        
        // Return top N players
        Player[] memory topPlayers = new Player[](resultSize);
        for (uint256 i = 0; i < resultSize; i++) {
            topPlayers[i] = allPlayers[i];
        }
        
        return topPlayers;
    }
    
    /**
     * @notice Get all active quests
     */
    function getActiveQuests() external view returns (Quest[] memory) {
        uint256 activeCount = 0;
        
        // Count active quests
        for (uint256 i = 1; i < nextQuestId; i++) {
            if (quests[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active quests
        Quest[] memory activeQuests = new Quest[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i < nextQuestId; i++) {
            if (quests[i].isActive) {
                activeQuests[index] = quests[i];
                index++;
            }
        }
        
        return activeQuests;
    }
    
    /**
     * @notice Get quest details
     * @param questId The quest ID
     */
    function getQuest(uint256 questId) external view returns (Quest memory) {
        return quests[questId];
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Create a new quest (Owner only)
     */
    function createQuest(
        string memory title,
        string memory description,
        uint8 questType,
        uint256 xpReward
    ) external onlyOwner {
        _createQuest(title, description, questType, xpReward);
    }
    
    /**
     * @notice Deactivate a quest (Owner only)
     */
    function deactivateQuest(uint256 questId) external onlyOwner {
        require(quests[questId].id != 0, "Quest does not exist");
        quests[questId].isActive = false;
        emit QuestDeactivated(questId);
    }
    
    /**
     * @notice Update quest XP reward (Owner only)
     */
    function updateQuestReward(uint256 questId, uint256 newXpReward) external onlyOwner {
        require(quests[questId].id != 0, "Quest does not exist");
        quests[questId].xpReward = newXpReward;
    }
}

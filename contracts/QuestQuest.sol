// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./AchievementsNFT.sol";

contract QuestQuest {
    AchievementsNFT public achievements;

    struct Quest {
        string name;
        string description;
        uint256 rewardId;
        uint256 dayIndex;
    }

    mapping(uint256 => Quest) public quests;          
    mapping(address => mapping(uint256 => bool)) public completed;  

    event QuestCompleted(address user, uint256 questId);
    
    constructor(address _achievements) {
        achievements = AchievementsNFT(_achievements);
    }

    function completeQuest(uint256 questId) external {
        require(!completed[msg.sender][questId], "Already completed");

        completed[msg.sender][questId] = true;
        achievements.mint(msg.sender, quests[questId].rewardId);

        emit QuestCompleted(msg.sender, questId);
    }

    function setQuest(
        uint256 questId, 
        string memory name, 
        string memory description, 
        uint256 rewardId, 
        uint256 dayIndex
    ) external {
        quests[questId] = Quest(name, description, rewardId, dayIndex);
    }
}

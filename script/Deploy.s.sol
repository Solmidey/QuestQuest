// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/QuestQuest.sol";
import "../contracts/AchievementsNFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy QuestQuest
        QuestQuest questQuest = new QuestQuest();
        console.log("QuestQuest deployed at:", address(questQuest));
        
        // Deploy AchievementsNFT
        AchievementsNFT achievementsNFT = new AchievementsNFT();
        console.log("AchievementsNFT deployed at:", address(achievementsNFT));
        
        vm.stopBroadcast();
    }
}

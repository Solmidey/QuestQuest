// forge script Deploy.s.sol --rpc-url BASE_MAINNET --broadcast

pragma solidity ^0.8.22;

import "../QuestQuest.sol";
import "../AchievementsNFT.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        AchievementsNFT nft = new AchievementsNFT();
        QuestQuest qq = new QuestQuest(address(nft));

        vm.stopBroadcast();
    }
}

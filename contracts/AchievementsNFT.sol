// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AchievementsNFT is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("QuestQuest Achievement", "QQA") {}

    function mint(address to, uint256 rewardId) external {
        uint256 newId = tokenCounter;
        _safeMint(to, newId);
        _setTokenURI(newId, string(abi.encodePacked("ipfs://reward/", Strings.toString(rewardId))));
        tokenCounter += 1;
    }
}

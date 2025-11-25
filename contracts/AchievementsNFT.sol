// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title AchievementsNFT
 * @notice NFT badges for quest achievements
 * @dev Each NFT represents a milestone or daily completion
 */
contract AchievementsNFT is ERC721, Ownable {
    using Strings for uint256;
    
    // ============ State Variables ============
    
    uint256 public nextTokenId;
    string public baseTokenURI;
    
    // Token ID => Mint timestamp
    mapping(uint256 => uint256) public mintTimestamps;
    
    // User address => total badges minted
    mapping(address => uint256) public userBadgeCount;
    
    // ============ Events ============
    
    event BadgeMinted(address indexed user, uint256 indexed tokenId, uint256 timestamp);
    event BaseURIUpdated(string newBaseURI);
    
    // ============ Constructor ============
    
    constructor() ERC721("QuestQuest Achievement", "QQUEST") Ownable(msg.sender) {
        nextTokenId = 1;
        baseTokenURI = "https://questquest.app/api/metadata/";
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Mint a new achievement badge
     */
    function mint() external {
        uint256 tokenId = nextTokenId;
        
        _safeMint(msg.sender, tokenId);
        
        mintTimestamps[tokenId] = block.timestamp;
        userBadgeCount[msg.sender]++;
        
        emit BadgeMinted(msg.sender, tokenId, block.timestamp);
        
        nextTokenId++;
    }
    
    /**
     * @notice Get all token IDs owned by a user
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;
        
        for (uint256 i = 1; i < nextTokenId && index < balance; i++) {
            if (_ownerOf(i) == owner) {
                tokens[index] = i;
                index++;
            }
        }
        
        return tokens;
    }
    
    /**
     * @notice Get token URI with metadata
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        return string(abi.encodePacked(baseTokenURI, tokenId.toString()));
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update base URI for metadata (Owner only)
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }
    
    /**
     * @notice Admin mint for special occasions (Owner only)
     */
    function adminMint(address to) external onlyOwner {
        uint256 tokenId = nextTokenId;
        
        _safeMint(to, tokenId);
        
        mintTimestamps[tokenId] = block.timestamp;
        userBadgeCount[to]++;
        
        emit BadgeMinted(to, tokenId, block.timestamp);
        
        nextTokenId++;
    }
}

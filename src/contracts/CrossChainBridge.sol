// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GameBridge is ReentrancyGuard {
    mapping(uint256 => mapping(address => bool)) public lockedTokens;
    mapping(bytes32 => bool) public processedHashes;
    
    event TokenLocked(address indexed token, uint256 tokenId, address owner);
    event TokenUnlocked(address indexed token, uint256 tokenId, address owner);
    
    function lockToken(address tokenContract, uint256 tokenId) external nonReentrant {
        IERC721(tokenContract).transferFrom(msg.sender, address(this), tokenId);
        lockedTokens[tokenId][tokenContract] = true;
        emit TokenLocked(tokenContract, tokenId, msg.sender);
    }
    
    function unlockToken(
        address tokenContract,
        uint256 tokenId,
        bytes32 proofHash,
        bytes memory signature
    ) external nonReentrant {
        require(!processedHashes[proofHash], "Already processed");
        require(lockedTokens[tokenId][tokenContract], "Token not locked");
        
        // Verify cross-chain proof
        require(verifyProof(proofHash, signature), "Invalid proof");
        
        processedHashes[proofHash] = true;
        lockedTokens[tokenId][tokenContract] = false;
        IERC721(tokenContract).transferFrom(address(this), msg.sender, tokenId);
        
        emit TokenUnlocked(tokenContract, tokenId, msg.sender);
    }
    
    function verifyProof(bytes32 proofHash, bytes memory signature) internal pure returns (bool) {
        // Implement cross-chain verification logic
        return true;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GameReviews is Ownable {
    struct Review {
        address reviewer;
        uint256 gameId;
        uint8 rating;
        string content;
        uint256 timestamp;
        uint256 helpfulVotes;
    }
    
    mapping(uint256 => Review[]) public gameReviews;
    mapping(address => mapping(uint256 => bool)) public hasReviewed;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    event ReviewSubmitted(uint256 indexed gameId, address indexed reviewer, uint8 rating);
    event ReviewVoted(uint256 indexed gameId, uint256 reviewIndex, address voter);
    
    function submitReview(
        uint256 gameId,
        uint8 rating,
        string calldata content
    ) external {
        require(!hasReviewed[msg.sender][gameId], "Already reviewed");
        require(rating >= 1 && rating <= 5, "Invalid rating");
        
        gameReviews[gameId].push(Review({
            reviewer: msg.sender,
            gameId: gameId,
            rating: rating,
            content: content,
            timestamp: block.timestamp,
            helpfulVotes: 0
        }));
        
        hasReviewed[msg.sender][gameId] = true;
        emit ReviewSubmitted(gameId, msg.sender, rating);
    }
    
    function voteHelpful(uint256 gameId, uint256 reviewIndex) external {
        require(!hasVoted[msg.sender][reviewIndex], "Already voted");
        require(reviewIndex < gameReviews[gameId].length, "Review not found");
        
        gameReviews[gameId][reviewIndex].helpfulVotes++;
        hasVoted[msg.sender][reviewIndex] = true;
        emit ReviewVoted(gameId, reviewIndex, msg.sender);
    }
    
    function getGameReviews(uint256 gameId) external view returns (Review[] memory) {
        return gameReviews[gameId];
    }
}
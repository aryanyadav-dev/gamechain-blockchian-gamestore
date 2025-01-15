// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GameLeaderboard is Ownable, ReentrancyGuard {
    struct Score {
        address player;
        uint256 score;
        uint256 timestamp;
        bytes32 proof;
    }
    
    mapping(uint256 => Score[]) public gameLeaderboards;
    mapping(uint256 => mapping(address => uint256)) public playerBestScores;
    
    event ScoreSubmitted(uint256 indexed gameId, address indexed player, uint256 score);
    event LeaderboardReset(uint256 indexed gameId);
    
    function submitScore(
        uint256 gameId,
        uint256 score,
        bytes32 proof
    ) external nonReentrant {
        require(verifyScore(score, proof), "Invalid score proof");
        
        if (score > playerBestScores[gameId][msg.sender]) {
            playerBestScores[gameId][msg.sender] = score;
            
            Score memory newScore = Score({
                player: msg.sender,
                score: score,
                timestamp: block.timestamp,
                proof: proof
            });
            
            insertScore(gameId, newScore);
            emit ScoreSubmitted(gameId, msg.sender, score);
        }
    }
    
    function insertScore(uint256 gameId, Score memory newScore) internal {
        Score[] storage scores = gameLeaderboards[gameId];
        
        if (scores.length == 0) {
            scores.push(newScore);
            return;
        }
        
        // Keep only top 100 scores
        uint256 maxScores = 100;
        
        for (uint256 i = 0; i < scores.length && i < maxScores; i++) {
            if (newScore.score > scores[i].score) {
                scores.push(scores[scores.length - 1]);
                for (uint256 j = scores.length - 1; j > i; j--) {
                    scores[j] = scores[j - 1];
                }
                scores[i] = newScore;
                return;
            }
        }
        
        if (scores.length < maxScores) {
            scores.push(newScore);
        }
    }
    
    function verifyScore(uint256 score, bytes32 proof) internal pure returns (bool) {
        // Implement score verification logic
        return true;
    }
    
    function getTopScores(uint256 gameId, uint256 limit) external view returns (Score[] memory) {
        Score[] storage scores = gameLeaderboards[gameId];
        uint256 resultSize = limit < scores.length ? limit : scores.length;
        
        Score[] memory result = new Score[](resultSize);
        for (uint256 i = 0; i < resultSize; i++) {
            result[i] = scores[i];
        }
        return result;
    }
}
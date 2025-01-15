// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardSystem is Ownable {
    struct Activity {
        string name;
        uint256 rewardAmount;
        bool active;
    }
    
    IERC20 public rewardToken;
    mapping(bytes32 => Activity) public activities;
    mapping(address => mapping(bytes32 => uint256)) public lastRewardClaim;
    
    event RewardClaimed(address indexed user, bytes32 indexed activityId, uint256 amount);
    event ActivityUpdated(bytes32 indexed activityId, string name, uint256 rewardAmount);
    
    constructor(address _rewardToken) {
        rewardToken = IERC20(_rewardToken);
    }
    
    function addActivity(
        bytes32 activityId,
        string calldata name,
        uint256 rewardAmount
    ) external onlyOwner {
        activities[activityId] = Activity(name, rewardAmount, true);
        emit ActivityUpdated(activityId, name, rewardAmount);
    }
    
    function claimReward(bytes32 activityId, bytes calldata proof) external {
        Activity memory activity = activities[activityId];
        require(activity.active, "Activity not available");
        require(
            block.timestamp - lastRewardClaim[msg.sender][activityId] >= 1 days,
            "Already claimed today"
        );
        require(verifyActivity(msg.sender, activityId, proof), "Invalid proof");
        
        lastRewardClaim[msg.sender][activityId] = block.timestamp;
        require(
            rewardToken.transfer(msg.sender, activity.rewardAmount),
            "Reward transfer failed"
        );
        
        emit RewardClaimed(msg.sender, activityId, activity.rewardAmount);
    }
    
    function verifyActivity(
        address user,
        bytes32 activityId,
        bytes calldata proof
    ) internal pure returns (bool) {
        // Implement activity verification logic
        return true;
    }
}
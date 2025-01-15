// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameSubscription is ERC1155, Ownable {
    struct Plan {
        string name;
        uint256 duration;
        uint256 price;
        bool active;
    }
    
    mapping(uint256 => Plan) public plans;
    mapping(address => uint256) public subscriptionExpiry;
    
    event SubscriptionPurchased(address indexed user, uint256 planId, uint256 expiry);
    event SubscriptionTransferred(address indexed from, address indexed to, uint256 planId);
    
    constructor() ERC1155("") {}
    
    function createPlan(
        uint256 planId,
        string memory name,
        uint256 duration,
        uint256 price
    ) external onlyOwner {
        plans[planId] = Plan(name, duration, price, true);
    }
    
    function purchase(uint256 planId) external payable {
        Plan memory plan = plans[planId];
        require(plan.active, "Plan not available");
        require(msg.value >= plan.price, "Insufficient payment");
        
        uint256 newExpiry = block.timestamp + plan.duration;
        if (subscriptionExpiry[msg.sender] > block.timestamp) {
            newExpiry += subscriptionExpiry[msg.sender] - block.timestamp;
        }
        
        subscriptionExpiry[msg.sender] = newExpiry;
        _mint(msg.sender, planId, 1, "");
        
        emit SubscriptionPurchased(msg.sender, planId, newExpiry);
    }
    
    function transfer(address to, uint256 planId) external {
        require(balanceOf(msg.sender, planId) > 0, "No subscription");
        require(subscriptionExpiry[msg.sender] > block.timestamp, "Subscription expired");
        
        uint256 remainingTime = subscriptionExpiry[msg.sender] - block.timestamp;
        subscriptionExpiry[msg.sender] = block.timestamp;
        subscriptionExpiry[to] = block.timestamp + remainingTime;
        
        _safeTransferFrom(msg.sender, to, planId, 1, "");
        emit SubscriptionTransferred(msg.sender, to, planId);
    }
}
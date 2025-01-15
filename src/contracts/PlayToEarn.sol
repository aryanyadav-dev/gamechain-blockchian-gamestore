// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC20, Ownable {
    mapping(address => bool) public gameContracts;
    
    constructor() ERC20("GameChain Token", "GAME") {}
    
    function mint(address to, uint256 amount) external {
        require(gameContracts[msg.sender], "Only authorized games can mint");
        _mint(to, amount);
    }
    
    function authorizeGame(address gameContract) external onlyOwner {
        gameContracts[gameContract] = true;
    }
    
    function revokeGame(address gameContract) external onlyOwner {
        gameContracts[gameContract] = false;
    }
}
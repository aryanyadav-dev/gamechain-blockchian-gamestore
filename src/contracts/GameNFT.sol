// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GameNFT is ERC721, Ownable, ReentrancyGuard {
    uint256 private _tokenIds;
    uint256 public constant ROYALTY_PERCENTAGE = 5; // 5% royalty

    struct Game {
        string title;
        string description;
        uint256 price;
        address developer;
        bool isActive;
    }

    mapping(uint256 => Game) public games;
    mapping(address => uint256) public royalties;

    event GameListed(uint256 tokenId, string title, uint256 price);
    event GameSold(uint256 tokenId, address buyer, uint256 price);

    constructor() ERC721("GameChain NFT", "GAME") {}

    function listGame(
        string memory title,
        string memory description,
        uint256 price
    ) external returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        games[newTokenId] = Game({
            title: title,
            description: description,
            price: price,
            developer: msg.sender,
            isActive: true
        });

        _mint(msg.sender, newTokenId);
        emit GameListed(newTokenId, title, price);
        return newTokenId;
    }

    function buyGame(uint256 tokenId) external payable nonReentrant {
        Game memory game = games[tokenId];
        require(game.isActive, "Game not available");
        require(msg.value >= game.price, "Insufficient payment");

        address seller = ownerOf(tokenId);
        uint256 royaltyAmount = (msg.value * ROYALTY_PERCENTAGE) / 100;
        uint256 sellerAmount = msg.value - royaltyAmount;

        royalties[game.developer] += royaltyAmount;
        payable(seller).transfer(sellerAmount);

        _transfer(seller, msg.sender, tokenId);
        emit GameSold(tokenId, msg.sender, msg.value);
    }
}
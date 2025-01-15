// Contract Addresses (Replace with actual deployed addresses)
export const GAME_NFT_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ANTI_CHEAT_ADDRESS = '0x0000000000000000000000000000000000000000';
export const BRIDGE_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GAME_DAO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GAME_LEADERBOARD_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GAME_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GAME_REVIEWS_ADDRESS = '0x0000000000000000000000000000000000000000';
export const REWARD_SYSTEM_ADDRESS = '0x0000000000000000000000000000000000000000';

// ABIs
export const GAME_NFT_ABI = [
  'function listGame(string memory title, string memory description, uint256 price) returns (uint256)',
  'function buyGame(uint256 tokenId) payable',
] as const;

export const ANTI_CHEAT_ABI = [
  'function submitGameState(bytes32 stateHash, bytes memory signature, bytes memory gameData)',
  'function reportCheat(address player, uint256 nonce, string calldata reason, bytes memory proof)',
] as const;

export const BRIDGE_ABI = [
  'function lockToken(address tokenContract, uint256 tokenId)',
  'function unlockToken(address tokenContract, uint256 tokenId, bytes32 proofHash, bytes memory signature)',
] as const;

export const GAME_DAO_ABI = [
  'function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description)',
  'function castVote(uint256 proposalId, uint8 support)',
  'function votingDelay() view returns (uint256)',
] as const;

export const GAME_LEADERBOARD_ABI = [
  'function submitScore(uint256 gameId, uint256 score, bytes32 proof)',
  'function getTopScores(uint256 gameId, uint256 limit) view returns (tuple(address player, uint256 score, uint256 timestamp, bytes32 proof)[])',
] as const;

export const GAME_TOKEN_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function mint(address to, uint256 amount)',
] as const;

export const GAME_REVIEWS_ABI = [
  'function submitReview(uint256 gameId, uint8 rating, string calldata content)',
  'function voteHelpful(uint256 gameId, uint256 reviewIndex)',
  'function getGameReviews(uint256 gameId) view returns (tuple(address reviewer, uint256 gameId, uint8 rating, string content, uint256 timestamp, uint256 helpfulVotes)[])',
] as const;

export const REWARD_SYSTEM_ABI = [
  'function claimReward(bytes32 activityId, bytes calldata proof)',
  'function activities(bytes32) view returns (tuple(string name, uint256 rewardAmount, bool active))',
] as const;
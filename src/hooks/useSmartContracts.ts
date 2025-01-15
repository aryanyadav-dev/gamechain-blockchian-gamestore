import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { GAME_NFT_ABI, GAME_NFT_ADDRESS } from '../contracts/constants';

export function useGameNFT() {
  const { write: listGame } = useContractWrite({
    address: GAME_NFT_ADDRESS,
    abi: GAME_NFT_ABI,
    functionName: 'listGame',
  });

  const { write: buyGame } = useContractWrite({
    address: GAME_NFT_ADDRESS,
    abi: GAME_NFT_ABI,
    functionName: 'buyGame',
  });

  const handleListGame = async (title: string, description: string, price: number) => {
    try {
      await listGame({
        args: [title, description, parseEther(price.toString())],
      });
    } catch (error) {
      console.error('Error listing game:', error);
      throw error;
    }
  };

  const handleBuyGame = async (tokenId: number, price: number) => {
    try {
      await buyGame({
        args: [tokenId],
        value: parseEther(price.toString()),
      });
    } catch (error) {
      console.error('Error buying game:', error);
      throw error;
    }
  };

  return {
    listGame: handleListGame,
    buyGame: handleBuyGame,
  };
}
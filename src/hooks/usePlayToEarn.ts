import { useContractWrite, useContractRead } from 'wagmi';
import { GAME_TOKEN_ABI, GAME_TOKEN_ADDRESS } from '../contracts/constants';

export function usePlayToEarn() {
  const { data: balance } = useContractRead({
    address: GAME_TOKEN_ADDRESS,
    abi: GAME_TOKEN_ABI,
    functionName: 'balanceOf',
  });

  const { write: claimRewards } = useContractWrite({
    address: GAME_TOKEN_ADDRESS,
    abi: GAME_TOKEN_ABI,
    functionName: 'mint',
  });

  const handleClaimRewards = async (amount: bigint) => {
    try {
      await claimRewards({
        args: [amount],
      });
    } catch (error) {
      console.error('Error claiming rewards:', error);
      throw error;
    }
  };

  return {
    balance,
    claimRewards: handleClaimRewards,
  };
}
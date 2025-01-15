import { useContractWrite, useContractRead } from 'wagmi';
import { REWARD_SYSTEM_ABI, REWARD_SYSTEM_ADDRESS } from '../contracts/constants';

export function useRewards() {
  const { write: claimReward } = useContractWrite({
    address: REWARD_SYSTEM_ADDRESS,
    abi: REWARD_SYSTEM_ABI,
    functionName: 'claimReward',
  });

  const { data: activities } = useContractRead({
    address: REWARD_SYSTEM_ADDRESS,
    abi: REWARD_SYSTEM_ABI,
    functionName: 'activities',
  });

  const handleClaimReward = async (activityId: string, proof: string) => {
    try {
      await claimReward({
        args: [activityId, proof],
      });
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  };

  return {
    claimReward: handleClaimReward,
    activities,
  };
}
import { useContractWrite, useContractRead } from 'wagmi';
import { parseEther } from 'viem';
import { GAME_SUBSCRIPTION_ABI, GAME_SUBSCRIPTION_ADDRESS } from '../contracts/constants';

export function useSubscription() {
  const { write: purchase } = useContractWrite({
    address: GAME_SUBSCRIPTION_ADDRESS,
    abi: GAME_SUBSCRIPTION_ABI,
    functionName: 'purchase',
  });

  const { write: transfer } = useContractWrite({
    address: GAME_SUBSCRIPTION_ADDRESS,
    abi: GAME_SUBSCRIPTION_ABI,
    functionName: 'transfer',
  });

  const { data: subscriptionExpiry } = useContractRead({
    address: GAME_SUBSCRIPTION_ADDRESS,
    abi: GAME_SUBSCRIPTION_ABI,
    functionName: 'subscriptionExpiry',
  });

  const handlePurchase = async (planId: number, price: number) => {
    try {
      await purchase({
        args: [planId],
        value: parseEther(price.toString()),
      });
    } catch (error) {
      console.error('Error purchasing subscription:', error);
      throw error;
    }
  };

  const handleTransfer = async (to: string, planId: number) => {
    try {
      await transfer({
        args: [to, planId],
      });
    } catch (error) {
      console.error('Error transferring subscription:', error);
      throw error;
    }
  };

  return {
    purchase: handlePurchase,
    transfer: handleTransfer,
    subscriptionExpiry,
  };
}
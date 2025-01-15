import { useContractWrite } from 'wagmi';
import { BRIDGE_ABI, BRIDGE_ADDRESS } from '../contracts/constants';

export function useCrossChain() {
  const { write: lockToken } = useContractWrite({
    address: BRIDGE_ADDRESS,
    abi: BRIDGE_ABI,
    functionName: 'lockToken',
  });

  const { write: unlockToken } = useContractWrite({
    address: BRIDGE_ADDRESS,
    abi: BRIDGE_ABI,
    functionName: 'unlockToken',
  });

  const handleBridgeToken = async (tokenContract: string, tokenId: number) => {
    try {
      await lockToken({
        args: [tokenContract, tokenId],
      });
    } catch (error) {
      console.error('Error bridging token:', error);
      throw error;
    }
  };

  const handleUnlockToken = async (tokenContract: string, tokenId: number, proofHash: string, signature: string) => {
    try {
      await unlockToken({
        args: [tokenContract, tokenId, proofHash, signature],
      });
    } catch (error) {
      console.error('Error unlocking token:', error);
      throw error;
    }
  };

  return {
    bridgeToken: handleBridgeToken,
    unlockToken: handleUnlockToken,
  };
}
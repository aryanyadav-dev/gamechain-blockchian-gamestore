import { useContractWrite, useContractRead } from 'wagmi';
import { GAME_DAO_ABI, GAME_DAO_ADDRESS } from '../contracts/constants';

export function useDAO() {
  const { write: propose } = useContractWrite({
    address: GAME_DAO_ADDRESS,
    abi: GAME_DAO_ABI,
    functionName: 'propose',
  });

  const { write: castVote } = useContractWrite({
    address: GAME_DAO_ADDRESS,
    abi: GAME_DAO_ABI,
    functionName: 'castVote',
  });

  const { data: votingDelay } = useContractRead({
    address: GAME_DAO_ADDRESS,
    abi: GAME_DAO_ABI,
    functionName: 'votingDelay',
  });

  const handlePropose = async (description: string, targets: string[], values: bigint[], calldatas: string[]) => {
    try {
      await propose({
        args: [targets, values, calldatas, description],
      });
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  };

  const handleVote = async (proposalId: bigint, support: boolean) => {
    try {
      await castVote({
        args: [proposalId, support ? 1 : 0],
      });
    } catch (error) {
      console.error('Error casting vote:', error);
      throw error;
    }
  };

  return {
    propose: handlePropose,
    vote: handleVote,
    votingDelay,
  };
}
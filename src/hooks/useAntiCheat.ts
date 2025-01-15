import { useContractWrite, useContractRead } from 'wagmi';
import { ANTI_CHEAT_ABI, ANTI_CHEAT_ADDRESS } from '../contracts/constants';

export function useAntiCheat() {
  const { write: submitState } = useContractWrite({
    address: ANTI_CHEAT_ADDRESS,
    abi: ANTI_CHEAT_ABI,
    functionName: 'submitGameState',
  });

  const { write: reportCheat } = useContractWrite({
    address: ANTI_CHEAT_ADDRESS,
    abi: ANTI_CHEAT_ABI,
    functionName: 'reportCheat',
  });

  const handleSubmitGameState = async (stateHash: string, signature: string, gameData: string) => {
    try {
      await submitState({
        args: [stateHash, signature, gameData],
      });
    } catch (error) {
      console.error('Error submitting game state:', error);
      throw error;
    }
  };

  const handleReportCheat = async (player: string, nonce: number, reason: string, proof: string) => {
    try {
      await reportCheat({
        args: [player, nonce, reason, proof],
      });
    } catch (error) {
      console.error('Error reporting cheat:', error);
      throw error;
    }
  };

  return {
    submitGameState: handleSubmitGameState,
    reportCheat: handleReportCheat,
  };
}
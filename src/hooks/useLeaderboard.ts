import { useContractWrite, useContractRead } from 'wagmi';
import { GAME_LEADERBOARD_ABI, GAME_LEADERBOARD_ADDRESS } from '../contracts/constants';

export function useLeaderboard() {
  const { write: submitScore } = useContractWrite({
    address: GAME_LEADERBOARD_ADDRESS,
    abi: GAME_LEADERBOARD_ABI,
    functionName: 'submitScore',
  });

  const { data: topScores } = useContractRead({
    address: GAME_LEADERBOARD_ADDRESS,
    abi: GAME_LEADERBOARD_ABI,
    functionName: 'getTopScores',
  });

  const handleSubmitScore = async (gameId: number, score: number, proof: string) => {
    try {
      await submitScore({
        args: [gameId, score, proof],
      });
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  };

  return {
    submitScore: handleSubmitScore,
    topScores,
  };
}
import { useContractWrite, useContractRead } from 'wagmi';
import { GAME_REVIEWS_ABI, GAME_REVIEWS_ADDRESS } from '../contracts/constants';

export function useReviews() {
  const { write: submitReview } = useContractWrite({
    address: GAME_REVIEWS_ADDRESS,
    abi: GAME_REVIEWS_ABI,
    functionName: 'submitReview',
  });

  const { write: voteHelpful } = useContractWrite({
    address: GAME_REVIEWS_ADDRESS,
    abi: GAME_REVIEWS_ABI,
    functionName: 'voteHelpful',
  });

  const { data: gameReviews } = useContractRead({
    address: GAME_REVIEWS_ADDRESS,
    abi: GAME_REVIEWS_ABI,
    functionName: 'getGameReviews',
  });

  const handleSubmitReview = async (gameId: number, rating: number, content: string) => {
    try {
      await submitReview({
        args: [gameId, rating, content],
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  const handleVoteHelpful = async (gameId: number, reviewIndex: number) => {
    try {
      await voteHelpful({
        args: [gameId, reviewIndex],
      });
    } catch (error) {
      console.error('Error voting on review:', error);
      throw error;
    }
  };

  return {
    submitReview: handleSubmitReview,
    voteHelpful: handleVoteHelpful,
    gameReviews,
  };
}
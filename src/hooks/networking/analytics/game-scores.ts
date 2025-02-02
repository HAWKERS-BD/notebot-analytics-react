import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type GameScore = {
  date: string;
  score: number;
  email: string;
  user_name: string;
};

type GameScoresResponse = {
  hof: GameScore[];
};

const fetchGameScores = async (): Promise<GameScoresResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.GAME_SCORES);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching game scores:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetGameScores = () => {
  return useQuery<GameScoresResponse | null, Error>({
    queryKey: ["game-scores"],
    queryFn: () => fetchGameScores(),
  });
};

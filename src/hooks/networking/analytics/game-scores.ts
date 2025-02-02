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
  total: number;
  current_page: number;
  limit: number;
  total_pages: number;
  search: string;
};

const fetchGameScores = async (
  page: number = 1,
  limit: number = 100,
  search: string = ""
): Promise<GameScoresResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.GAME_SCORES, {
      params: {
        page,
        limit,
        search,
      },
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching game scores:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetGameScores = (
  page: number = 1,
  limit: number = 100,
  search: string = ""
) => {
  return useQuery<GameScoresResponse | null, Error>({
    queryKey: ["game-scores", page, limit, search],
    queryFn: () => fetchGameScores(page, limit, search),
  });
};

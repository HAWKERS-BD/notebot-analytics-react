import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type MissedWord = {
  id: number;
  missed_words: string;
};

type MissedWordsResponse = {
  missed_words: MissedWord[];
  pagination: {
    current_page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};

const fetchMissedWords = async (): Promise<MissedWordsResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.MISSED_WORDS);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching missed words:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetMissedWords = () => {
  return useQuery<MissedWordsResponse | null, Error>({
    queryKey: ["missed-words"],
    queryFn: () => fetchMissedWords(),
  });
};

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
    search: string;
  };
};

const fetchMissedWords = async (
  page: number = 1,
  limit: number = 500,
  search: string = ""
): Promise<MissedWordsResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.MISSED_WORDS, {
      params: {
        page,
        limit,
        search,
      },
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching missed words:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetMissedWords = (
  page: number = 1,
  limit: number = 500,
  search: string = ""
) => {
  return useQuery<MissedWordsResponse | null, Error>({
    queryKey: ["missed-words", page, limit, search],
    queryFn: () => fetchMissedWords(page, limit, search),
  });
};

import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type DailySummaryResponse = {
  kpi: {
    appPlatformPercentage: number;
    botPlatformPercentage: number;
    highestApiCountDate: string;
    highestAppPlatformCount: number;
    highestBotPlatformCount: number;
    highestPlatform: string;
    lowestApiCount: number;
    lowestApiCountDate: string;
    lowestPlatform: string;
    totalAppPlatformCount: number;
    totalBotPlatformCount: number;
  };
  status: string;
};

const fetchDailySummary = async (): Promise<DailySummaryResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.DAILY_REPORT_SUMMARY);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching daily summary:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetDailySummary = () => {
  return useQuery<DailySummaryResponse | null, Error>({
    queryKey: ["daily-summary"],
    queryFn: () => fetchDailySummary(),
  });
};

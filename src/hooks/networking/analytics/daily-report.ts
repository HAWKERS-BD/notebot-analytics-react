import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type DailyReportItem = {
  count: number;
  date: string;
  id: number;
  platform: string;
};

type DailyReportResponse = {
  data: DailyReportItem[];
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
  status: string;
};

const fetchDailyReport = async (): Promise<DailyReportResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.DAILY_REPORT);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching daily report:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetDailyReport = () => {
  return useQuery<DailyReportResponse | null, Error>({
    queryKey: ["daily-report"],
    queryFn: () => fetchDailyReport(),
  });
};

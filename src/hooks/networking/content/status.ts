import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface AnalyticsStatus {
  db_connection: boolean;
  endPoints: string[];
  mode: string;
}

interface NotebotStatus {
  isServerRunning: boolean;
  url: string;
  paths: string[];
  botStatus: boolean;
  msg: string;
}

interface CombinedStatus {
  analytics: AnalyticsStatus | null;
  notebot: NotebotStatus | null;
}

const fetchBothStatuses = async (): Promise<CombinedStatus> => {
  try {
    const [analyticsResponse, notebotResponse] = await Promise.all([
      axios.get<AnalyticsStatus>(API_CONFIG.PLATFORM_STATUS),
      axios.get<NotebotStatus>(API_CONFIG.BOT_STATUS),
    ]);

    return {
      analytics: analyticsResponse?.data ?? null,
      notebot: notebotResponse?.data ?? null,
    };
  } catch (error) {
    console.error("Error fetching platform statuses:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetPlatformStatus = () => {
  return useQuery<CombinedStatus, Error>({
    queryKey: ["status", "both-platforms"],
    queryFn: () => fetchBothStatuses(),
  });
};

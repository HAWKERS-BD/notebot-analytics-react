import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type AppUser = {
  batch: number;
  dept: string;
  email: string;
  id: number;
  imgUrl: string;
  role: string;
  uni_id: string;
};

type AppUsersResponse = {
  current_page: number;
  limit: number;
  total: number;
  total_pages: number;
  users: AppUser[];
  search?: string;
};

const fetchAppUsers = async (
  page: number = 1,
  limit: number = 25,
  search: string = ""
): Promise<AppUsersResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.APP_USERS, {
      params: {
        page,
        limit,
        search,
      },
    });
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching app users:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetAppUsers = (
  page: number = 1,
  limit: number = 25,
  search: string = ""
) => {
  return useQuery<AppUsersResponse | null, Error>({
    queryKey: ["app-users", page, limit, search],
    queryFn: () => fetchAppUsers(page, limit, search),
  });
};

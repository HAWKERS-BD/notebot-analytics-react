import { API_CONFIG } from "@/constants/api-config";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type TopNoteSubject = {
  count: number;
  id: number;
  level: number;
  sub_name: string;
};

type TopLabSubject = {
  count: number;
  id: number;
  lab_name: string;
  level: number;
};

type TopNotesResponse = {
  topNoteSubjects: TopNoteSubject[];
};

type TopLabsResponse = {
  topLabSubjects: TopLabSubject[];
};

const fetchTopNotes = async (): Promise<TopNotesResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.TOP_NOTES);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching top notes:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

const fetchTopLabs = async (): Promise<TopLabsResponse | null> => {
  try {
    const response = await axios.get(API_CONFIG.TOP_LABS);
    return response?.data ?? null;
  } catch (error) {
    console.error("Error fetching top labs:", error);
    throw error instanceof AxiosError
      ? error
      : new Error("An unexpected error occurred");
  }
};

export const useGetTopNotes = () => {
  return useQuery<TopNotesResponse | null, Error>({
    queryKey: ["top-notes"],
    queryFn: () => fetchTopNotes(),
  });
};

export const useGetTopLabs = () => {
  return useQuery<TopLabsResponse | null, Error>({
    queryKey: ["top-labs"],
    queryFn: () => fetchTopLabs(),
  });
};

// hooks/useActivities.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "@/types";

const STORAGE_KEY = "recentActivities";

function getStoredActivities(): Activity[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as Activity[]) : [];
}

function storeActivities(activities: Activity[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: () => getStoredActivities(),
    initialData: [],
  });
}

export function useAddActivity() {
  const queryClient = useQueryClient();

  return useMutation<Activity[], unknown, Omit<Activity, "id">>({
    mutationFn: async (newActivity) => {
      const current = getStoredActivities();
      const updated: Activity[] = [
        { id: Date.now(), ...newActivity },
        ...current,
      ].slice(0, 10); // Keep only 10 latest
      storeActivities(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Activity[]>(["activities"], data);
    },
  });
}

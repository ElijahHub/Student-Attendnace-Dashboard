import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { Lecturer } from "@/types";

export function useLecturers() {
  return useQuery({
    queryKey: ["lecturers"],
    queryFn: async (): Promise<Lecturer[]> => {
      const res = await makeRequest.get("/lecturers");
      return res.data;
    },
  });
}

export function useLecturer(id: string) {
  return useQuery({
    queryKey: ["lecturers"],
    queryFn: async (): Promise<Lecturer> => {
      const res = await makeRequest.get(`/user/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Lecturer): Promise<Lecturer> => {
      const res = await makeRequest.post("/lecturers", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useUpdateLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Lecturer;
    }): Promise<Lecturer> => {
      const res = await makeRequest.patch(`/user/update/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useDeleteLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await makeRequest.delete(`/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

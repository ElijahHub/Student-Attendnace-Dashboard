import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { Lecturer, LecturerFormValue } from "@/types";

export function useLecturers() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["lecturers"],
    queryFn: async (): Promise<Lecturer[]> => {
      const res = await makeRequest.get("/lecturers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
  });
}

export function useLecturer(id: string) {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["lecturers"],
    queryFn: async (): Promise<Lecturer> => {
      const res = await makeRequest.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateLecturer() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (data: LecturerFormValue): Promise<Lecturer> => {
      const res = await makeRequest.post("/lecturers", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useUpdateLecturer() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: LecturerFormValue;
    }): Promise<Lecturer> => {
      const res = await makeRequest.patch(`/user/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

export function useDeleteLecturer() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await makeRequest.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });
}

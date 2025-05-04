import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { Student } from "@/types";

export function useLecturers() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<Student[]> => {
      const res = await makeRequest.get("/students");
      return res.data;
    },
  });
}

export function useLecturer(id: string) {
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<Student> => {
      const res = await makeRequest.get(`/user/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Student): Promise<Student> => {
      const res = await makeRequest.post("/students", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
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
      data: Student;
    }): Promise<Student> => {
      const res = await makeRequest.patch(`/students/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
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
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

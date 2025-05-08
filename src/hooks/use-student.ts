import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { Student, StudentFormValue } from "@/types";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<Student[]> => {
      const res = await makeRequest.get("/students");
      return res.data;
    },
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<Student> => {
      const res = await makeRequest.get(`/user/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentFormValue): Promise<Student> => {
      const res = await makeRequest.post("/students", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: StudentFormValue;
    }): Promise<Student> => {
      const res = await makeRequest.patch(`/user/update/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useDeleteStudent() {
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { Student, StudentFormValue } from "@/types";
import { useAuth } from "@/context/AuthContext";

export function useStudents() {
  const { token, loading } = useAuth();
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<Student[]> => {
      const res = await makeRequest.get("/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token && !loading, // ✅ wait until token is ready
  });
}

export function useStudent(id: string) {
  const { token, loading } = useAuth();
  return useQuery({
    queryKey: ["student", id], // ✅ unique cache per student
    queryFn: async (): Promise<Student> => {
      const res = await makeRequest.get(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!id && !!token && !loading, // ✅ wait for token and id
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: StudentFormValue): Promise<Student> => {
      const res = await makeRequest.post("/students", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: StudentFormValue;
    }): Promise<Student> => {
      const res = await makeRequest.patch(`/user/update/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await makeRequest.delete(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

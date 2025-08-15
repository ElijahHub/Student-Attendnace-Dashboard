import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { Course, CourseFormValue } from "@/types";

export function useCourses() {
  const { token, loading } = useAuth();
  return useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      const res = await makeRequest.get("/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token && !loading, // ✅ wait for token
  });
}

export function useCourse(courseCode: string) {
  const { token, loading } = useAuth();
  return useQuery({
    queryKey: ["courses", courseCode],
    queryFn: async (): Promise<Course> => {
      const res = await makeRequest.get(`/courses/${courseCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!courseCode && !!token && !loading, // ✅ wait for both
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: CourseFormValue): Promise<Course> => {
      const res = await makeRequest.post("/courses", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CourseFormValue;
    }): Promise<Course> => {
      const res = await makeRequest.patch(`/courses/update/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useAddLecturerToCourse() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({
      id,
      lecturerIds,
    }: {
      id: string;
      lecturerIds: string[];
    }): Promise<Course> => {
      const res = await makeRequest.patch(
        `/courses/update/${id}/addLecturer`,
        lecturerIds,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useRemoveLecturerFromCourse() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({
      id,
      lecturerId,
    }: {
      id: string;
      lecturerId: string;
    }): Promise<Course> => {
      const res = await makeRequest.patch(
        `/courses/${id}/removeLecturer`,
        lecturerId,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await makeRequest.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

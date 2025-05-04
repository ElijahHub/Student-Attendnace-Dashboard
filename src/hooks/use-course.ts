import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils";
import { Course } from "@/types";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => {
      const res = await makeRequest.get("/courses");
      return res.data;
    },
  });
}

export function useCourse(courseCode: string) {
  return useQuery({
    queryKey: ["courses", courseCode],
    queryFn: async (): Promise<Course> => {
      const res = await makeRequest.get(`/courses/${courseCode}`);
      return res.data;
    },
    enabled: !!courseCode,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Course): Promise<Course> => {
      const res = await makeRequest.post("/courses", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Course;
    }): Promise<Course> => {
      const res = await makeRequest.patch(`/courses/update/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useAddLecturerToCourse() {
  const queryClient = useQueryClient();

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
        lecturerIds
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useRemoveLecturerFromCourse() {
  const queryClient = useQueryClient();

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
        lecturerId
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await makeRequest.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

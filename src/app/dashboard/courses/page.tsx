"use client ";

import { useState } from "react";
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from "@/hooks/use-course";
import { Column, Course, CourseFormValue } from "@/types";
import { BookOpen, PlusIcon, Pencil, Trash2, User } from "lucide-react";

export default function CoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();

  const columns: Column[] = [
    {
      key: "course_code",
      label: "Course Code",
    },
    {
      key: "course_name",
      label: "Course Name",
    },
    {
      key: "course_description",
      label: "Course Description",
    },
    {
      key: "course_lecturers",
      label: "Course Lecturer(s)",
    },
  ];

  console.log(courses);

  return <div className="space-y-6"></div>;
}

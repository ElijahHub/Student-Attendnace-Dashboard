"use client ";

import { useState } from "react";
import { Button, Badge, Alert, useToast, useAlert } from "@heroui/react";
import { PageHeader, DataTable } from "@/components";
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

  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage Courses">
        <Button className="flex justify-center items-center">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </PageHeader>

      <DataTable
        data={[]}
        columns={columns}
        isLoading={false}
        emptyText="No courses found. Add course to get started!"
      />
    </div>
  );
}

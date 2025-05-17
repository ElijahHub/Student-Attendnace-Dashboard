"use client";

import { useState } from "react";
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  useCourse
} from "@/hooks/use-course";
import { Column, Course, CourseFormValue } from "@/types";
import { BookOpen, PlusIcon, Pencil, Trash2, User } from "lucide-react";
import PageHeader from "@/components/page-header";
import DataTable from "@/components/table";
import CourseForm from "@/components/course-form";
import {useDisclosure, Button, } from "@heroui/react"

export default function CoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const {data: course, isLoading: isCourseLoading} = useCourse(selectedCourse?.courseCode)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const columns: Column[] = [
    {
      key: "courseCode",
      label: "Course Code",
    },
    {
      key: "courseName",
      label: "Course Name",
    },
    {
      key: "description",
      label: "Course Description",
    },
    {
      key: "lecturers",
      label: "Course Lecturer(s)",
    },
    {
      key: "actions",
      label: "Actions"
    }
  ];


  const onEdit = (user:any) => {
    setSelectedCourse(user || null)
    onOpen()
  }

  const courseData = courses?.map((course) => {
    return {
      ...course,
      lecturers: course.lecturersId.map((lecturer) => lecturer.name).join(", "),
    };
  })
  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage university courses">
        <Button 
          onPress={onOpen}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={courseData || []}
        isLoading={isLoading}
        onEdit={onEdit}
        />

      <CourseForm
        onSubmitAction={(data: CourseFormValue) => console.log(data)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isSubmitting={createCourseMutation.isLoading}
        defaultValues= { course || undefined}
        />
    </div>
  );
}

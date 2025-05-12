"use client ";

import { useState } from "react";
import {
  Button,
  Badge,
  Alert,
  useToast,
  useAlert,
  useDisclosure,
} from "@heroui/react";
import { PageHeader, DataTable, CourseForm } from "@/components";
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Open create form
  const handleAddNew = () => {
    setSelectedCourse(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsFormOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  // Create or update course
  const handleFormSubmit = async (data: CourseFormValue) => {
    setIsSubmitting(true);

    try {
      if (selectedCourse) {
        await updateCourseMutation.mutateAsync({
          id: selectedCourse.id,
          data,
        });
      } else {
        await createCourseMutation.mutateAsync(data);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //Delete course
  const handleDelete = async () => {
    if (!selectedCourse) return;
    try {
      await deleteCourseMutation.mutateAsync(selectedCourse.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage Courses">
        <Button
          onPress={handleAddNew}
          className="flex justify-center items-center"
        >
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

      <CourseForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={selectedCourse || undefined}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

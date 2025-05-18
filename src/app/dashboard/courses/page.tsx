"use client";

import _ from "lodash";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useDisclosure, Button, Pagination } from "@heroui/react";
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  useCourse,
} from "@/hooks/use-course";
import { useLecturers } from "@/hooks/use-lecturer";
import {
  PageHeader,
  DataTable,
  CourseForm,
  View,
  DeleteDialog,
} from "@/components";
import type { Column, Course, CourseFormValue } from "@/types";

export default function CoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();

  const { data: lecturers } = useLecturers();
  const { data: courses, isLoading } = useCourses();
  const { data: course } = useCourse(selectedCourse?.courseCode, {
    enabled: !!selectedCourse
  })

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: deleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const {
    isOpen: viewOpen,
    onOpen: onViewOpen,
    onOpenChange: onViewOpenChange,
  } = useDisclosure();

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
      label: "Actions",
    },
  ];

  const handleAddNew = async () => {
    await setSelectedCourse(null);
    onOpen();
  };

  const handleEdit = async (user: Course) => {
   await setSelectedCourse(user);
    onOpen();
  };

  const handleView =async (user: Course) => {
   await setSelectedCourse(user);
    onViewOpen();
  };

  const handleDeleteClick =async (user: Course) => {
   await setSelectedCourse(user);
    onDeleteOpen();
  };

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
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (_.isEmpty(selectedCourse)) return;

    try {
      await deleteCourseMutation.mutateAsync(selectedCourse.id);
    } catch (error) {
      console.log(error);
    }
  };

  const courseData = courses?.map((course) => {
    return {
      ...course,
      lecturers: _.filter(lecturers, (lecturer) =>
        course.lecturersId.includes(lecturer.id)
      ).map((lecturer) => lecturer.name),
    };
  });

  const paginatedData = _.chunk(courseData, 10);
  const totalPages = paginatedData.length;

  const viewData = {
    "Course Code": course?.courseCode,
    "Course Name": course?.courseName,
    "Course Description": course?.description,
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage university courses">
        <Button onPress={handleAddNew}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={paginatedData[currentPage - 1] || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onView={handleView}
      />

      <Pagination
        initialPage={1}
        page={currentPage}
        onChange={setCurrentPage}
        total={totalPages}
        showControls
      />

      <CourseForm
        onSubmit={handleFormSubmit}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isSubmitting={isSubmitting}
        defaultValues={course || undefined }
      />

      <View
        title="Lecturer Info"
        data={viewData}
        onOpenChange={onViewOpenChange}
        isOpen={viewOpen}
      />

      <DeleteDialog
        onDelete={handleDelete}
        onOpenChange={onDeleteOpenChange}
        isOpen={deleteOpen}
      />
    </div>
  );
}

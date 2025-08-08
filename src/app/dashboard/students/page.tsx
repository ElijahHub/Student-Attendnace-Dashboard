"use client";

import _ from "lodash";
import { useMemo, useState } from "react";
import { useDisclosure, Pagination } from "@heroui/react";

import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
} from "@/hooks/use-student";

import {
  PageHeader,
  DataTable,
  StudentForm,
  View,
  DeleteDialog,
} from "@/components";

import type { Column, Student, StudentFormValue } from "@/types";

export default function StudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const deleteStudentMutation = useDeleteStudent();

  const { data: students = [], isLoading } = useStudents();

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onOpenChange: onFormOpenChange,
  } = useDisclosure();

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
    { key: "matNumber", label: "Matric Number" },
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email Address" },
    { key: "actions", label: "Actions" },
  ];

  const paginatedData = useMemo(() => _.chunk(students, 10), [students]);
  const totalPages = paginatedData.length || 1;

  const handleEdit = (user: Student) => {
    setSelectedStudent(user);
    onFormOpen();
  };

  const handleView = (user: Student) => {
    setSelectedStudent(user);
    onViewOpen();
  };

  const handleDeleteClick = (user: Student) => {
    setSelectedStudent(user);
    onDeleteOpen();
  };

  const handleFormSubmit = async (data: StudentFormValue) => {
    setIsSubmitting(true);
    try {
      if (selectedStudent) {
        await updateStudentMutation.mutateAsync({
          id: selectedStudent.id,
          data,
        });
      } else {
        await createStudentMutation.mutateAsync(data);
      }

      setSelectedStudent(null);
      onFormOpenChange();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedStudent?.id) return;

    try {
      await deleteStudentMutation.mutateAsync(selectedStudent.id);
      setSelectedStudent(null);
      onDeleteOpenChange();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const viewData = {
    "Matriculation Number": selectedStudent?.matNumber,
    name: selectedStudent?.name,
    email: selectedStudent?.email,
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Students" description="Manage university students" />

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

      <StudentForm
        onSubmit={handleFormSubmit}
        isOpen={isFormOpen}
        onOpenChange={onFormOpenChange}
        isSubmitting={isSubmitting}
        defaultValues={selectedStudent || undefined}
      />

      <View
        title="Student Info"
        data={viewData}
        isOpen={viewOpen}
        onOpenChange={onViewOpenChange}
      />

      <DeleteDialog
        onDelete={handleDelete}
        isOpen={deleteOpen}
        onOpenChange={onDeleteOpenChange}
      />
    </div>
  );
}

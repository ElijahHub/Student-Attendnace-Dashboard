"use client";

import _ from "lodash";
import { useState } from "react";
import { useDisclosure, Button, Pagination } from "@heroui/react";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
  useStudent,
} from "@/hooks/use-student";
import { PageHeader, DataTable, StudentForm } from "@/components";
import type { Column, Student, StudentFormValue } from "@/types";

export default function StudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isView, setIsView] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const deleteStudentMutation = useDeleteStudent();

  const { data: students, isLoading } = useStudents();
  const { data: student } = useStudent(selectedStudent?.id as string);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const columns: Column[] = [
    {
      key: "matNumber",
      label: "Matric Number",
    },
    {
      key: "name",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email Address",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const handleAddNew = () => {
    setSelectedStudent(null);
    onOpen();
  };

  const handleEdit = (user: Student) => {
    setSelectedStudent(user);
    onOpen();
  };

  const handleView = (user: Student) => {
    setSelectedStudent(user);
  };

  const handleDeleteClick = (user: Student) => {
    setSelectedStudent(user);
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
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (_.isEmpty(selectedStudent)) return;

    try {
      await deleteStudentMutation.mutateAsync(selectedStudent.id);
    } catch (error) {
      console.log(error);
    }
  };

  const paginatedData = _.chunk(students, 10);
  const totalPages = paginatedData.length;

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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isSubmitting={isSubmitting}
        defaultValues={student || undefined}
      />
    </div>
  );
}

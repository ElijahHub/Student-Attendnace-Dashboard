"use client";

import { useState } from "react";
import { PageHeader, StudentForm, DataTable } from "@/components";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
} from "@/hooks/use-student";
import { Column, Student, StudentFormValue } from "@/types";
import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";

export default function StudentsPage() {
  const { data: students, isLoading } = useStudents();
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const deleteStudentMutation = useDeleteStudent();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open create form
  const handleAddNew = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  // Create or update student
  const handleFormSubmit = async (data: StudentFormValue) => {
    setIsSubmitting(true);

    try {
      if (selectedStudent) {
        // Update
        await updateStudentMutation.mutateAsync({
          id: selectedStudent.id,
          data,
        });
      } else {
        // Create
        await createStudentMutation.mutateAsync(data);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete student
  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      await deleteStudentMutation.mutateAsync(selectedStudent.id);

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: Column[] = [
    {
      key: "mt_number",
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
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Students" description="Manage university students">
        <Button
          onPress={handleAddNew}
          className="flex justify-center items-center"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </PageHeader>

      <DataTable
        data={[]}
        columns={columns}
        isLoading={false}
        emptyText="No students found. Add your first student to get started!"
      />

      {/* Student form modal */}
      <StudentForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={selectedStudent || undefined}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

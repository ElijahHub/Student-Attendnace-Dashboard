"use client";

import { useState } from "react";
import { PageHeader, DataTable } from "@/components";
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

  console.log(students);

  return (
    <div className="space-y-6">
      <PageHeader title="Students" description="Manage university students">
        <Button className="flex justify-center items-center">
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
    </div>
  );
}

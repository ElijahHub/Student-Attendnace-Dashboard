"use client";

import { useState } from "react";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
} from "@/hooks/use-student";
import { Column, Student, StudentFormValue } from "@/types";
import { PlusIcon } from "lucide-react";
import DataTable from "@/components/table"

export default function StudentsPage() {
  const { data: students, isLoading } = useStudents();
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const deleteStudentMutation = useDeleteStudent();

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

  const onEdit = (id: string) => console.log(id);
  const onDelete = (id: string) => console.log(id);
  const onView = (id: string) => console.log(id);

  return (
    <DataTable
      columns={columns}
      data={students}
      isLoading={isLoading}
      />
  );
}

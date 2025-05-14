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

  return <div className="space-y-6"></div>;
}

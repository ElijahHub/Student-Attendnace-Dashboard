"use client";

import { useState } from "react";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
} from "@/hooks/use-student";
import { Column, Student, StudentFormValue } from "@/types";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react"
import { PlusIcon } from "lucide-react";

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
  ];

  console.log(students);

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {students?.map((row) =>
          <TableRow key={row.id}>
           <TableCell>{row.matNumber}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

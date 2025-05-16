"use client";

import { useState, useEffect } from "react";
import { Column, Lecturer, LecturerFormValue } from "@/types";
import {
  useLecturers,
  useCreateLecturer,
  useUpdateLecturer,
  useDeleteLecturer,
} from "@/hooks/use-lecturer";
import { PlusIcon } from "lucide-react";
import DataTable from "@/components/table";

export default function LecturersPage() {
  const { data: lecturers, isLoading } = useLecturers();
  const createLecturerMutation = useCreateLecturer();
  const updateLecturerMutation = useUpdateLecturer();
  const deleteLecturerMutation = useDeleteLecturer();

  const columns: Column[] = [

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
  const onView = (id) => console.log(id, 'clicked view');

 

  return (
    <DataTable
      columns={columns}
      data={lecturers}
      isLoading={isLoading}
      onView={onView}
      />
  )
}

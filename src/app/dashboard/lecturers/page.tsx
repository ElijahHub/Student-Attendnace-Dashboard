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

export default function LecturersPage() {
  const { data: lecturers, isLoading } = useLecturers();
  const createLecturerMutation = useCreateLecturer();
  const updateLecturerMutation = useUpdateLecturer();
  const deleteLecturerMutation = useDeleteLecturer();

  const columns: Column[] = [
    {
      key: "serial",
      label: "#",
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
      key: "action",
      label: "Actions",
    },
  ];

  const renderRow = (item: Lecturer) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="flex items-center gap-4 p-4">{item.email}</td>
      <td>
        <div className="flex items-center gap-2"></div>
      </td>
    </tr>
  );
  console.log(lecturers);

  return <div className="space-y-6 relative "></div>;
}

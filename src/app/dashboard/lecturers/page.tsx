"use client";

import { useState, useEffect } from "react";
import { PageHeader, DataTable } from "@/components";
import {
  Button,
  Alert,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
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
      key: "name",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email Address",
    },
  ];

  console.log(lecturers);

  return (
    <div className="space-y-6 relative ">
      <PageHeader title="Lecturers" description="Manage university lecturers">
        <Button className="flex justify-center items-center">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Lecturer
        </Button>
      </PageHeader>
      <DataTable
        data={lecturers || []}
        columns={columns}
        isLoading={false}
        emptyText="No lecturers found. Add your first lecturer to get started!"
      />
      {/* Lecturer form modal */}
    </div>
  );
}

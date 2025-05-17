"use client";

import _ from "lodash";
import { useState } from "react";
import { useDisclosure, Button, Pagination } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import {
  useLecturers,
  useCreateLecturer,
  useUpdateLecturer,
  useDeleteLecturer,
  useLecturer,
} from "@/hooks/use-lecturer";
import { PageHeader, DataTable, LecturerForm } from "@/components";
import type { Column, Lecturer, LecturerFormValue } from "@/types";

export default function LecturersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [isView, setIsView] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createLecturerMutation = useCreateLecturer();
  const updateLecturerMutation = useUpdateLecturer();
  const deleteLecturerMutation = useDeleteLecturer();

  const { data: lecturers, isLoading } = useLecturers();
  const { data: lecturer } = useLecturer(selectedLecturer?.id as string);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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

  const handleAddNew = () => {
    setSelectedLecturer(null);
    onOpen();
  };

  const handleEdit = (user: Lecturer) => {
    setSelectedLecturer(user);
    onOpen();
  };

  const handleView = (user: Lecturer) => {
    setSelectedLecturer(user);
  };

  const handleDeleteClick = (user: Lecturer) => {
    setSelectedLecturer(user);
  };

  const handleFormSubmit = async (data: LecturerFormValue) => {
    setIsSubmitting(true);
    try {
      if (selectedLecturer) {
        await updateLecturerMutation.mutateAsync({
          id: selectedLecturer.id,
          data,
        });
      } else {
        await createLecturerMutation.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (_.isEmpty(selectedLecturer)) return;

    try {
      await deleteLecturerMutation.mutateAsync(selectedLecturer.id);
    } catch (error) {
      console.log(error);
    }
  };

  const paginatedData = _.chunk(lecturers, 10);
  const totalPages = paginatedData.length;

  return (
    <div className="space-y-6">
      <PageHeader title="Lecturers" description="Manage university lecturers">
        <Button onPress={handleAddNew}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </PageHeader>

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

      <LecturerForm
        onSubmit={handleFormSubmit}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isSubmitting={isSubmitting}
        defaultValues={lecturer || undefined}
      />
    </div>
  );
}

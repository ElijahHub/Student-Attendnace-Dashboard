"use client";

import { useState, useEffect } from "react";
import { PageHeader, LecturerForm, DataTable } from "@/components";
import { Button, Alert } from "@heroui/react";
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open create form
  const handleAddNew = () => {
    setSelectedLecturer(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEdit = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setIsFormOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setIsDeleteDialogOpen(true);
  };

  //Create or Update Lecturer
  const handleFormSubmit = async (data: LecturerFormValue) => {
    setIsSubmitting(true);

    try {
      if (selectedLecturer) {
        // Update
        await updateLecturerMutation.mutateAsync({
          id: selectedLecturer.id,
          data,
        });
      } else {
        // Create
        await createLecturerMutation.mutateAsync(data);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete lecturer
  const handleDelete = async () => {
    if (!selectedLecturer) return;

    try {
      await deleteLecturerMutation.mutateAsync(selectedLecturer.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="space-y-6">
      <PageHeader title="Lecturers" description="Manage university lecturers">
        <Button onPress={handleAddNew}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Lecturer
        </Button>
      </PageHeader>

      <DataTable
        data={lecturers || []}
        columns={columns}
        isLoading={isLoading}
        emptyText="No lecturers found. Add your first lecturer to get started!"
      />

      {/* Lecturer form modal */}
      <LecturerForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={selectedLecturer || undefined}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

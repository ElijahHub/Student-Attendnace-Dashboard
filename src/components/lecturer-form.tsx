"use client";

import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { LecturerFormProps, LecturerFormValue } from "@/types";

export default function LecturerForm({
  onSubmit,
  defaultValues,
  isOpen,
  onOpenChange,
  isSubmitting = false,
}: LecturerFormProps) {
  const isEditing = !!defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LecturerFormValue>({
    defaultValues: _.defaults({}, defaultValues, {
      name: "",
      email: "",
    }),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const processSubmit = (data: LecturerFormValue) => {
    onSubmit(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-lg font-semibold leading-none tracking-tight">
                  {isEditing ? "Edit Lecturer" : "Add New Lecturer"}
                </h1>
                <h3 className="text-sm text-muted-foreground">
                  {isEditing
                    ? "Update the lecturer information in the form below."
                    : "Fill in the details to add a new lecturer."}
                </h3>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="Enter lecturers name"
                  {...register("name", {
                    required: "Lecturer Name is required",
                  })}
                  errorMessage={errors.name?.message}
                  className="w-full"
                />
                <Input
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  errorMessage={errors.email?.message}
                  className="w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  fullWidth={true}
                  isLoading={isSubmitting}
                  onPress={() =>
                    handleSubmit(async (data) => {
                      await onSubmit(data);
                      onClose();
                    })()
                  }
                >
                  {isEditing ? "Update Lecturer" : "Add Lecturer"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

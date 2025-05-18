"use client";

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
import { StudentFormValue, StudentFormProps } from "@/types";

export default function StudentForm({
  onSubmit,
  defaultValues,
  isOpen,
  onOpenChange,
  isSubmitting = false,
}: StudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormValue>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-lg font-semibold leading-none tracking-tight">
                  Edit Student Details
                </h1>
                <h3 className="text-sm text-muted-foreground">
                  Update the student information in the form below.
                </h3>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="Enter full name"
                  {...register("matNumber", {
                    required: "Matriculation Number is required",
                  })}
                  errorMessage={errors.matNumber?.message}
                  className="w-full"
                />
                <Input
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="Enter full name"
                  {...register("name", {
                    required: "Full Name is required",
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
                  Update Student
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

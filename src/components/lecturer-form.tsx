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
  Form,
  Spinner,
} from "@heroui/react";
import { LecturerFormProps, LecturerFormValue } from "@/types";

export default function StudentForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
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
    <Modal
      isOpen={open}
      placement="center"
      onOpenChange={onClose}
      className="bg-black"
    >
      <ModalContent className="sm:max-w-[500px]">
        {(closeModal) => (
          <>
            <ModalHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
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
              <Form
                onSubmit={handleSubmit(processSubmit)}
                className="w-full max-w-xs flex flex-col gap-4 space-y-4 py-2"
              >
                <Input
                  isRequired
                  errorMessage={errors.name && errors.name.message}
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="Enter Full Name"
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />
                <Input
                  isRequired
                  errorMessage={errors.email && errors.email.message}
                  label="Email Address"
                  labelPlacement="outside"
                  placeholder="Enter Email Address"
                  {...register("email", {
                    required: "Email is Required",
                  })}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" type="button" onPress={closeModal}>
                Cancel
              </Button>
              <Button>
                {isSubmitting ? (
                  <Spinner
                    classNames={{ label: "text-foreground mt-4" }}
                    label="default"
                    variant="default"
                  />
                ) : isEditing ? (
                  "Update Lecturer"
                ) : (
                  "Add Lecturer"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

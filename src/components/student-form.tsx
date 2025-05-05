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
  Form,
  Spinner,
} from "@heroui/react";
import { StudentFormValue, StudentFormProps } from "@/types";

export default function StudentForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
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

  const processSubmit = (data: StudentFormValue) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={open} placement="top-center" onOpenChange={onClose}>
      <ModalContent className="sm:max-w-[500px]">
        {(closeModal) => (
          <>
            <ModalHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h1 className="text-lg font-semibold leading-none tracking-tight">
                "Edit Student"
              </h1>
              <h3 className="text-sm text-muted-foreground">
                "Update the student information in the form below."
              </h3>
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={handleSubmit(processSubmit)}
                className="w-full max-w-xs flex flex-col gap-4 space-y-4 py-2"
              >
                <Input
                  isRequired
                  errorMessage={errors.matNumber && errors.matNumber.message}
                  label="Matriculation Number"
                  labelPlacement="outside"
                  placeholder="Enter Matriculation Number"
                  {...register("matNumber", {
                    required: "Matriculation Number is Required",
                  })}
                />
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
                ) : (
                  "Update Course"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

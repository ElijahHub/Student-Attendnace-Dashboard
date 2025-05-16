"use client";

import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLecturers } from "@/hooks/use-lecturer";
import { CourseFormProps, CourseFormValue } from "@/types";
import Input from "./input";

export default function CourseForm({
  onSubmit,
  defaultValues,
  onOpen,
  onOpenChange,
  isSubmitting = false,
}: CourseFormProps) {
  const isEditing = !!defaultValues;

  const defaultFormValues: CourseFormValue = {
    courseCode: "",
    courseName: "",
    description: "",
    lecturersId: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CourseFormValue>({
    defaultValues: _.defaults({}, defaultValues, defaultFormValues),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(_.defaults({}, defaultValues, defaultFormValues));
    }
  }, [defaultValues]);

  const processSubmit = (data: CourseFormValue) => {
    onSubmit(data);
  };

  const lecturersId = watch("lecturersId");

  const handleLecturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLecturers = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    const currentLecturers = watch("lecturersId") || [];
    const updatedLecturers = _.uniq([
      ...currentLecturers,
      ...selectedLecturers,
    ]);
    setValue("lecturersId", updatedLecturers);
  };
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold leading-none tracking-tight">
                {isEditing ? "Edit Course" : "Add New Course"}
              </h1>
              <h3 className="text-sm text-muted-foreground">
                {isEditing
                  ? "Update the course information in the form below."
                  : "Fill in the details to add a new course."}
              </h3>
            </ModalHeader>
            <ModalBody>
              <Form className="w-full max-w-xs" onSubmit={onSubmit}></Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

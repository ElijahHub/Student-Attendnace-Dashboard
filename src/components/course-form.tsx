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
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { useLecturers } from "@/hooks/use-lecturer";
import type { CourseFormProps, CourseFormValue } from "@/types";

export default function CourseForm({
  onSubmit,
  defaultValues,
  isOpen,
  onOpenChange,
  isSubmitting = false,
}: CourseFormProps) {
  const isEditing = !!defaultValues;
  const { data: lecturers } = useLecturers();

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
    defaultValues: defaultFormValues, // fallback always
  });

  const lecturersId = watch("lecturersId");

  // ✅ Reset form based on modal state and defaultValues
  useEffect(() => {
    if (isOpen) {
      if (defaultValues) {
        reset(_.defaults({}, defaultValues, defaultFormValues)); // editing
      } else {
        reset(defaultFormValues); // adding new
      }
    }
  }, [defaultValues, isOpen]);

  const handleLecturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("lecturersId", e.target.value.split(","));
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
              <Input
                label="Course Code"
                labelPlacement="outside"
                placeholder="Enter course code"
                {...register("courseCode", {
                  required: "Course code is required",
                })}
                errorMessage={errors.courseCode?.message}
                className="w-full"
              />

              <Input
                label="Course Name"
                labelPlacement="outside"
                placeholder="Enter course name"
                {...register("courseName", {
                  required: "Course name is required",
                })}
                errorMessage={errors.courseName?.message}
                className="w-full"
              />

              <Textarea
                label="Description"
                labelPlacement="outside"
                placeholder="Enter course description"
                {...register("description")}
                errorMessage={errors.description?.message}
                className="w-full"
              />

              <Select
                selectedKeys={lecturersId}
                label="Lecturers"
                labelPlacement="outside"
                placeholder="Select lecturers"
                onChange={handleLecturerChange}
                selectionMode="multiple"
                className="w-full"
                items={lecturers}
              >
                {(lecturer) => (
                  <SelectItem key={lecturer.id}>{lecturer.name}</SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                fullWidth
                isLoading={isSubmitting}
                onPress={() =>
                  handleSubmit(async (data) => {
                    await onSubmit(data);
                    onClose();
                  })()
                }
              >
                {isEditing ? "Update Course" : "Add Course"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

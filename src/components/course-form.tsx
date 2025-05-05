"use client";

import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Form,
  Spinner,
} from "@heroui/react";
import { useLecturers } from "@/hooks/use-lecturer";
import { CourseFormProps, CourseFormValue } from "@/types";

export default function CourseForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
  isSubmitting = false,
}: CourseFormProps) {
  const isEditing = !!defaultValues;
  const { data: lecturers, isLoading } = useLecturers();

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
      (option) => option.value
    );
    const currentLecturers = watch("lecturersId") || [];
    const updatedLecturers = _.uniq([
      ...currentLecturers,
      ...selectedLecturers,
    ]);
    setValue("lecturersId", updatedLecturers);
  };
  return (
    <Modal isOpen={open} placement="top-center" onOpenChange={onClose}>
      <ModalContent className="sm:max-w-[500px]">
        {(closeModal) => (
          <>
            <ModalHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
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
              <Form
                onSubmit={handleSubmit(processSubmit)}
                className="w-full max-w-xs flex flex-col gap-4 space-y-4 py-2"
              >
                <Input
                  isRequired
                  errorMessage={errors.courseName && errors.courseName.message}
                  label="Course Title"
                  labelPlacement="outside"
                  placeholder="Enter Course Title"
                  {...register("courseName", {
                    required: "Course Title is Required",
                  })}
                />
                <Input
                  isRequired
                  errorMessage={errors.courseCode && errors.courseCode.message}
                  label="Course Code"
                  labelPlacement="outside"
                  placeholder="Enter Course Code"
                  {...register("courseCode", {
                    required: "Course Code is Required",
                  })}
                />
                <Textarea
                  className="max-w-xs min-h-[80px] resize-none "
                  label="Course Description"
                  labelPlacement="outside"
                  placeholder="Course Description"
                  {...register("description")}
                />
                <Select
                  className="max-w-xs"
                  label="Lecturers"
                  placeholder="Select Lecturer(s)"
                  selectionMode="multiple"
                  value={lecturersId}
                  onChange={handleLecturerChange}
                >
                  {isLoading ? (
                    <SelectItem>
                      <Spinner
                        classNames={{ label: "text-foreground mt-4" }}
                        label="wave"
                        variant="wave"
                      />
                    </SelectItem>
                  ) : (
                    lecturers?.map((lecturer) => (
                      <SelectItem key={lecturer.id}>{lecturer.name}</SelectItem>
                    )) || <SelectItem>No lecturers available</SelectItem>
                  )}
                </Select>
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
                  "Update Course"
                ) : (
                  "Add Course"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

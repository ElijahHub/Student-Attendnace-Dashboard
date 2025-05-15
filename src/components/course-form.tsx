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
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(processSubmit)}
    >
      <h1 className="text-lg font-semibold leading-none tracking-tight">
        {isEditing ? "Edit Course" : "Add New Course"}
      </h1>
      <h3 className="text-sm text-muted-foreground">
        {isEditing
          ? "Update the course information in the form below."
          : "Fill in the details to add a new course."}
      </h3>
      <div className="flex justify-center flex-col">
        <Input
          isRequired
          errorMessage={errors.courseCode && errors.courseCode.message}
          label="Course Code"
          placeholder="Enter Course Code"
          name="courseCode"
          register={register}
          defaultValue={defaultValues?.courseCode}
        />
        <Input
          isRequired
          errorMessage={errors.courseName && errors.courseName.message}
          label="Course Name"
          placeholder="Enter Course Name"
          name="courseName"
          register={register}
          defaultValue={defaultValues?.courseName}
        />
        <div className="flex flex-col max-w-xs min-h-[80px] ">
          <label className="text-xs text-gray-500">Description</label>
          <textarea
            className="w-full resize-none "
            placeholder="Course Description"
            {...register("description")}
          />
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        isEditing ? ( "Update Course" ) : ( "Add Course" )
      </button>
    </form>
  );
}

"use client";

import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LecturerFormProps, LecturerFormValue } from "@/types";
import Input from "./input";

export default function StudentForm({
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
          errorMessage={errors.name && errors.name.message}
          label="Full Name"
          placeholder="Enter Full Name"
          register={register}
          name="name"
        />
        <Input
          isRequired
          errorMessage={errors.email && errors.email.message}
          label="Email Address"
          placeholder="Enter Email Address"
          register={register}
          name="email"
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        isEditing ? ( "Update Lecturer" ) : ( "Add Lecturer" )
      </button>
    </form>
  );
}

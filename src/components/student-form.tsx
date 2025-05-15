"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StudentFormValue, StudentFormProps } from "@/types";
import Input from "./input";

export default function StudentForm({
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
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(processSubmit)}
    >
      <h1 className="text-lg font-semibold leading-none tracking-tight">
        Update Student Information
      </h1>
      <h3 className="text-sm text-muted-foreground">
        Update Student Information
      </h3>
      <div className="flex justify-center flex-col">
        <Input
          isRequired
          errorMessage={errors.matNumber && errors.matNumber.message}
          label="Matric Number"
          placeholder="Enter Full Name"
          name="matNumber"
          register={register}
          defaultValue={defaultValues?.matNumber}
        />
        <Input
          isRequired
          errorMessage={errors.name && errors.name.message}
          label="Full Name"
          placeholder="Enter Full Name"
          name="name"
          register={register}
          defaultValue={defaultValues?.name}
        />
        <Input
          isRequired
          errorMessage={errors.email && errors.email.message}
          label="Email Address"
          placeholder="Enter Email Address"
          name="email"
          register={register}
          defaultValue={defaultValues?.email}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        Update Student
      </button>
    </form>
  );
}

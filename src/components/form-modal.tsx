"use client";

import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { JSX } from "react";

const LecturerForm = dynamic(() => import("./lecturer-form"));
const StudentForm = dynamic(() => import("./student-form"));
const CourseForm = dynamic(() => import("./course-form"));

const forms: {
  [key: string]: (
    onSubmit: (data: any) => void,
    defaultValues?: any,
    isSubmitting?: boolean
  ) => JSX.Element;
} = {
  lecturer: (onSubmit, defaultValues, isSubmitting) => (
    <LecturerForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
    />
  ),
  student: (onSubmit, defaultValues, isSubmitting) => (
    <StudentForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
    />
  ),
  course: (onSubmit, defaultValues, isSubmitting) => (
    <CourseForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
    />
  ),
};

export default function FormModal({
  open,
  table,
  onSubmit,
  onClose,
  defaultValues,
  isSubmitting,
}: {
  open: boolean;
  table: "lecturer" | "student" | "course";
  onSubmit: (data: any) => void;
  onClose: () => void;
  defaultValues?: any;
  isSubmitting?: boolean;
}) {
  {
    open && (
      <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
          {forms[table](onSubmit, defaultValues, isSubmitting)}
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => onClose}
          >
            <X width={14} height={14} />
          </div>
        </div>
      </div>
    );
  }
}

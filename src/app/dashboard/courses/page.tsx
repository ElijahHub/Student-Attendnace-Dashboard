"use client ";

import { useState } from "react";
import { Button, Badge, Alert, useToast, useAlert } from "@heroui/react";
import { PageHeader } from "@/components";
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from "@/hooks/use-course";
import { Course, CourseFormValue } from "@/types";

export interface LecturerFormValue {
  name: string;
  email: string;
}

export type Lecturer = { id: string } & LecturerFormValue;

export interface StudentFormValue {
  name: string;
  email: string;
  matNumber: string;
}

export type Student = { id: string } & StudentFormValue;

export interface CourseFormValue {
  courseName: string;
  courseCode: string;
  description?: string;
  lecturersId: string[];
}

export type Course = { id: string } & CourseFormValue;

export interface DashBoardStats {
  totalStudents: number;
  totalLecturers: number;
  totalCourses: number;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

export interface UseToast {
  showToast: (
    message: string,
    type?: ToastType,
    options?: ToastOptions
  ) => void;
  dismissToast: (toastId?: string) => void;
  dismissAllToasts: () => void;
}

export interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  isCollapsed: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface CourseFormProps {
  onSubmit: (data: CourseFormValue) => void;
  defaultValues?: CourseFormValue;
  isSubmitting?: boolean;
}

export interface StudentFormProps {
  onSubmit: (data: StudentFormValue) => void;
  defaultValues?: Student;
  isSubmitting?: boolean;
}

export interface LecturerFormProps {
  onSubmit: (data: LecturerFormValue) => void;
  defaultValues?: Lecturer;
  isSubmitting?: boolean;
}

export interface Column {
  key: string;
  label: string;
  className?: string;
}
export interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  isLoading: Boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void
  emptyText?: string;
}

export interface Lecturer {
  id: string;
  name: string;
  email: string;
  courses: string[];
  noOfCourse: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  matNumber: string;
}

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  description: string;
  lecturerId?: string[];
  lecturers?: Lecturer[];
}

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
  children?: React.ReactNode;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

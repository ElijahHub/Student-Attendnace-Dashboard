"use client";

import { useCourses } from "@/hooks/use-course";
import { useLecturers } from "@/hooks/use-lecturer";
import { useStudents } from "@/hooks/use-student";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Users, BookOpen, GraduationCap } from "lucide-react";

export default function Dashboard() {
  const { data: students } = useStudents();
  const { data: lecturers } = useLecturers();
  const { data: courses } = useCourses();

  const stats = [
    {
      label: "Students",
      value: students?.length,
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Lecturers",
      value: lecturers?.length,
      icon: <Users className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Courses",
      value: courses?.length,
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    },
  ];

  const recentActivities = [
    { id: 1, action: "Added new student", user: "Admin", date: "2025-08-09" },
    {
      id: 2,
      action: "Updated course: CSC101",
      user: "Lecturer John",
      date: "2025-08-09",
    },
    { id: 3, action: "Removed student", user: "Admin", date: "2025-08-08" },
    { id: 4, action: "Added new lecturer", user: "Admin", date: "2025-08-08" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} shadow="sm" className="border border-gray-200">
            <CardHeader className="flex items-center gap-3">
              {stat.icon}
              <h4 className="text-lg font-semibold">{stat.label}</h4>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card shadow="sm" className="border border-gray-200">
        <CardHeader>
          <h4 className="text-lg font-semibold">Recent Activities</h4>
        </CardHeader>
        <CardBody>
          <Table aria-label="Recent activities">
            <TableHeader>
              <TableColumn>Action</TableColumn>
              <TableColumn>User</TableColumn>
              <TableColumn>Date</TableColumn>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

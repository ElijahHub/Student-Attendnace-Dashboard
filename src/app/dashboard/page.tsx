"use client";

import { useState } from "react";
import { useActivities } from "@/hooks/use-activities";
import { useCourses } from "@/hooks/use-course";
import { useLecturers } from "@/hooks/use-lecturer";
import { useStudents } from "@/hooks/use-student";
import { Activity } from "@/types";
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
  Button,
} from "@heroui/react";
import { Users, BookOpen, GraduationCap } from "lucide-react";

export default function Dashboard() {
  const { data: students } = useStudents();
  const { data: lecturers } = useLecturers();
  const { data: courses } = useCourses();
  const { data: recentActivities } = useActivities();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Show 5 per page

  const totalPages = Math.ceil(recentActivities.length / pageSize);

  const paginatedActivities = recentActivities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = [
    {
      label: "Students",
      value: students?.length || 0,
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Lecturers",
      value: lecturers?.length || 0,
      icon: <Users className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Courses",
      value: courses?.length || 0,
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} shadow="sm" className="border-none">
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
      <Card className="border-none">
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
              {paginatedActivities.length > 0 ? (
                paginatedActivities.map((activity: Activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No recent activities
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

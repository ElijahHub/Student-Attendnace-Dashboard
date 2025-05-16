"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  Menu,
  X,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import {Button} from "@heroui/react"

export default function SideBar({ className }: { className: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col border-none shadow-xl rounded-r-xl bg-background text-white",
        isCollapsed ? "w-[70px]" : "w-[250px]",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex h-20 items-center border-b border-muted px-3">
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
        >
          {isCollapsed ? <Menu size={20} className="text-foreground" /> : <X size={20} className="text-foreground" />}
        </button>
        {!isCollapsed && (
          <span className="ml-3 font-semibold text-foreground ">Admin Dashboard</span>
        )}
      </div>
      <div
        className={cn("flex-1 overflow-auto", isCollapsed ? "px-2" : "px-3")}
      >
        <div
          className={cn(
            "space-y-1 py-4",
            isCollapsed && "flex flex-col items-center"
          )}
        >
          <SidebarItem
            href="/dashboard"
            icon={<Home size={20} />}
            title="Dashboard"
            isActive={pathname === "/dashboard"}
            isCollapsed={isCollapsed}
          />

          <SidebarItem
            href="/dashboard/lecturers"
            icon={<Users size={20} />}
            title="Lecturers"
            isActive={pathname === "/dashboard/lecturers"}
            isCollapsed={isCollapsed}
          />

          <SidebarItem
            href="/dashboard/students"
            icon={<GraduationCap size={20} />}
            title="Students"
            isActive={pathname === "/dashboard/students"}
            isCollapsed={isCollapsed}
          />

          <SidebarItem
            href="/dashboard/courses"
            icon={<BookOpen size={20} />}
            title="Courses"
            isActive={pathname === "/dashboard/courses"}
            isCollapsed={isCollapsed}
          />

          <SidebarItem
            href="/dashboard/settings"
            icon={<Settings size={20} />}
            title="Settings"
            isActive={pathname === "/dashboard/settings"}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>

      <div
        className={cn(
          "border-t border-muted p-3 flex-shrink-0",
          isCollapsed && "flex justify-center"
        )}
      >
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground">
            <p>Admin Dashboard</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
}

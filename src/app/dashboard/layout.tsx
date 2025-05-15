"use client";

import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideBar className="hidden md:flex" />

      <div className="flex flex-1 flex-col">
        <Navbar className="" />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

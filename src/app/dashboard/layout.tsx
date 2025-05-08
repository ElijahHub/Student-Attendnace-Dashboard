"use client";

import { Sidebar, Navbar } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden md:flex" />

      <div className="flex flex-1 flex-col">
        <Navbar className="" />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

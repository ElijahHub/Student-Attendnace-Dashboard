"use client";

import Link from "next/link";

import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <BookOpen size={64} className="text-primary" />
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mb-6 max-w-md text-muted-foreground">
          Comprehensive management system for university courses, students, and
          faculty.
        </p>

        <Link href="/dashboard">Enter Dashboard</Link>

        <p className="mt-8 text-sm text-muted-foreground">
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}

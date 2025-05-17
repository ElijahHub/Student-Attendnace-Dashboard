"use client";

import Link from "next/link";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { BookOpen } from "lucide-react";

import { Button, Spinner } from "@heroui/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [router]);

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
          lecturers.
        </p>

        <Button>Enter DashBoard</Button>

        <div className="mt-8 text-sm text-muted-foreground">
          <Spinner
            label="Redirecting to dashboard..."
            classNames={{ label: "text-foreground mt-4" }}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon, BellIcon, UserCircleIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/utils";
import {signOut} from "next-auth/react"

export default function Navbar({ className }: { className: string }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div
      className={cn(
        "flex h-20 items-center border-none border-muted rounded-md shadow-sm   bg-background m-1 px-4 lg:px-6",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard" className="font-semibold hidden md:block">
          University Portal
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted relative"
            aria-label="Notifications"
          >
            <BellIcon size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 rounded-md border bg-card p-2 shadow-md">
              {/* Notification content */}
              ...
            </div>
          )}
        </div>

        {/* Profile menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 rounded-md hover:bg-muted px-2 py-1"
            aria-label="User profile"
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <UserCircleIcon size={24} />
            </div>
            <span className="hidden text-sm font-medium sm:block">
              Admin User
            </span>
          </button>

          {isProfileMenuOpen && (
      <div className="absolute right-0 top-full mt-1 w-56 rounded-md border-none bg-background p-2 shadow-md z-[10]">
        <div className="border-b px-3 py-2">
          <p className="font-medium">Admin User</p>
          <p className="text-xs text-muted-foreground">
            admin@university.edu
          </p>
        </div>

        <div className="mt-2 space-y-1">
       
          <button
            onClick={() => signOut()} // ✅ Logout handler
            className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
          >
            Logout
          </button>
        </div>
      </div>
          )}
        </div>
      </div>
    </div>
  );
}

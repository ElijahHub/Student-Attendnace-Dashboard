"use client";

import { useState } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon, BellIcon, UserCircleIcon } from "lucide-react";
import { cn } from "@/utils";

export default function Navbar({ className }: { className: string }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle a class on the html/body element
    // or interact with a theme provider
  };

  return (
    <div
      className={cn(
        "flex h-14 items-center border-b bg-card px-4 lg:px-6",
        className
      )}
    >
      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard" className="font-semibold hidden md:block">
          University Portal
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        {/* Notifications dropdown */}
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
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="font-medium">Notifications</h3>
                <button className="text-xs text-muted-foreground hover:text-foreground">
                  Mark all as read
                </button>
              </div>

              <div className="mt-2 space-y-1">
                <div className="flex gap-3 rounded-md p-2 hover:bg-muted">
                  <div className="h-9 w-9 flex-shrink-0 rounded-full bg-primary/10"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      New course registration
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CS101: 5 new students registered
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      10 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-md p-2 hover:bg-muted">
                  <div className="h-9 w-9 flex-shrink-0 rounded-full bg-primary/10"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lecturer update</p>
                    <p className="text-xs text-muted-foreground">
                      Dr. Johnson updated course materials
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      1 hour ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 border-t pt-2">
                <Link
                  href="/dashboard/notifications"
                  className="block rounded-md px-3 py-2 text-center text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User profile menu */}
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
            <div className="absolute right-0 top-full mt-1 w-56 rounded-md border bg-card p-2 shadow-md">
              <div className="border-b px-3 py-2">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@university.edu
                </p>
              </div>

              <div className="mt-2 space-y-1">
                <Link
                  href="/dashboard/profile"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  Settings
                </Link>
                <button className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
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

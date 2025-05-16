"use client";

import Link from "next/link";
import { cn } from "@/utils";
import { SidebarItemProps } from "@/types";

export default function SidebarItem({
  href,
  icon,
  title,
  isActive,
  isCollapsed,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/10"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <span className="flex shrink-0 items-center justify-center">{icon}</span>
      {!isCollapsed && <span className="flex-1">{title}</span>}
    </Link>
  );
}

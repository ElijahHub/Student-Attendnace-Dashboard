import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export const makeRequest = axios.create({
  baseURL:
    "https://qrcode-attendance-system-backend-production.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, formatString: string = "PP") {
  return format(new Date(date), formatString);
}

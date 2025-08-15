import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

const backendUrl = process.env.NEXT_BACKEND_URL;
if (!backendUrl) {
  throw new Error("Backend URL is not set in environment variables");
}

export const makeRequest = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
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

import axios from "axios";

export const request = axios.create({
  baseURL: process.env.NEXT_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

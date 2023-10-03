import axios from "axios";
import { getSession } from "next-auth/react";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

fetcher.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    request.headers["Authorization"] = `Bearer ${session.token}`;
  }
  return request;
});

export default fetcher;

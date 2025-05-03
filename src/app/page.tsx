"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log("Access Token:", session.accessToken);
    console.log("User Role:", session.user.role);
  }

  return <div>Welcome {session?.user.email}</div>;
}

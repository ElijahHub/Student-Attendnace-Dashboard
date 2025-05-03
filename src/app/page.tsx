"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return <div>Welcome {session?.user.email}</div>;
}

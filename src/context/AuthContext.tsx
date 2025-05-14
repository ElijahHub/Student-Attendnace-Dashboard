"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const AuthContext = createContext<{ token: string | null }>({ token: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session?.accessToken) setToken(session.accessToken);
    };
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

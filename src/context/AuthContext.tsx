"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface AuthContextType {
  token: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session?.accessToken) {
        setToken(session.accessToken);
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

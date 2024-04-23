import React, { createContext, useState, useEffect } from "react";
import { getMyUser } from "./users/client";
// types.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<User | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMyUser();
      if (user) setUser(user);
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

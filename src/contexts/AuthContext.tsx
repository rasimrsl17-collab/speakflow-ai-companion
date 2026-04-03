import React, { createContext, useContext, useState, ReactNode } from "react";
import { mockUser } from "@/lib/mockData";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  nativeLanguage: string;
  learningLanguage: string;
  level: string;
  streak: number;
  plan: string;
  dailyGoal: number;
  correctionStyle: string;
  learningGoal: string;
  tutorVoice: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; nativeLanguage: string; learningLanguage: string }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    setUser(mockUser);
  };

  const signup = async (data: { name: string; email: string; password: string; nativeLanguage: string; learningLanguage: string }) => {
    await new Promise((r) => setTimeout(r, 500));
    setUser({ ...mockUser, name: data.name, email: data.email, nativeLanguage: data.nativeLanguage, learningLanguage: data.learningLanguage });
  };

  const logout = () => setUser(null);
  const updateUser = (data: Partial<User>) => setUser((prev) => (prev ? { ...prev, ...data } : null));

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

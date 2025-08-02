import { useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UserStoreData = {
  token: string;
  user: User;
  role: string;
  needsProfileCompletion: boolean;
};

export function useUserStore() {
  const [userData, setUserData] = useState<UserStoreData | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("userStore");
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  // Persist user data to localStorage when changed
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userStore", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userStore");
    }
  }, [userData]);

  const login = (data: UserStoreData) => setUserData(data);
  const logout = () => setUserData(null);
  const getUser = () => userData;

  return { userData, login, logout, getUser };
}

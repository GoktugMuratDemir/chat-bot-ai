"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "@/enums";
import type {
  Student,
  Teacher,
  School,
  SystemAdmin,
  LoginResponse,
} from "@/types";

/**
 * Auth Context State
 */
interface AuthContextState {
  isAuthenticated: boolean;
  user: Student | Teacher | School | SystemAdmin | null;
  userType: UserType | null;
  loading: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<
    Student | Teacher | School | SystemAdmin | null
  >(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // localStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUserType = localStorage.getItem("userType");

        if (storedUserType) {
          const type = storedUserType as UserType;
          let userData = null;

          // Rol bazlı kullanıcı verisini yükle
          switch (type) {
            case UserType.STUDENT:
              userData = localStorage.getItem("student");
              break;
            case UserType.TEACHER:
              userData = localStorage.getItem("teacher");
              break;
            case UserType.SCHOOL:
              userData = localStorage.getItem("school");
              break;
            case UserType.SYSTEM_ADMIN:
              userData = localStorage.getItem("system_admin");
              break;
          }

          if (userData) {
            setUser(JSON.parse(userData));
            setUserType(type);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error loading user from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  /**
   * Login fonksiyonu - MD dosyasına göre
   */
  const login = (response: LoginResponse) => {
    if (response.error) {
      console.error("Login error:", response.error);
      return;
    }

    // API'den gelen userType doğrudan enum değeri ile eşleşiyor
    const type = response.userType as UserType;

    if (!Object.values(UserType).includes(type)) {
      console.error("Unknown user type:", response.userType);
      return;
    }

    const { student, teacher, school, systemAdmin } = response;

    // Kullanıcı tipine göre veriyi ve localStorage key'ini ayarla
    let userData = null;
    let storageKey = "";

    switch (type) {
      case UserType.STUDENT:
        userData = student;
        storageKey = "student";
        break;
      case UserType.TEACHER:
        userData = teacher;
        storageKey = "teacher";
        break;
      case UserType.SCHOOL:
        userData = school;
        storageKey = "school";
        break;
      case UserType.SYSTEM_ADMIN:
        userData = systemAdmin;
        storageKey = "system_admin";
        break;
    }

    if (userData) {
      // State'i güncelle
      setUser(userData);
      setUserType(type);
      setIsAuthenticated(true);

      // localStorage'a kaydet
      localStorage.setItem("userType", type);
      localStorage.setItem(storageKey, JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      // Rol bazlı yönlendirme - MD dosyasına göre
      const routes: Record<UserType, string> = {
        [UserType.STUDENT]: "/dashboard-student",
        [UserType.TEACHER]: "/dashboard-teacher",
        [UserType.SCHOOL]: "/dashboard-admin",
        [UserType.SYSTEM_ADMIN]: "/dashboard-system",
      };

      router.push(routes[type]);
    }
  };

  /**
   * Logout fonksiyonu
   */
  const logout = () => {
    // State'i temizle
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);

    // localStorage'ı temizle
    localStorage.removeItem("userType");
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    localStorage.removeItem("school");
    localStorage.removeItem("system_admin");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("accessToken");

    // Login sayfasına yönlendir
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userType,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook - Context'i kullanmak için
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

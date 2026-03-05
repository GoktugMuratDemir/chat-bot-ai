"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GuardType, UserType } from "@/enums";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedGuardProps {
  children: ReactNode;
  guardType: GuardType;
  allowedUserTypes?: UserType[];
}

export function ProtectedGuard({
  children,
  guardType,
  allowedUserTypes,
}: ProtectedGuardProps) {
  const { isAuthenticated, userType, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Loading bitene kadar bekle
    if (loading) return;

    // PROTECTED guard - Kullanıcı giriş yapmış olmalı
    if (guardType === GuardType.PROTECTED) {
      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      // Eğer izin verilen roller belirtilmişse kontrol et
      if (allowedUserTypes && allowedUserTypes.length > 0 && userType) {
        if (!allowedUserTypes.includes(userType)) {
          // Yetkisiz erişim - kullanıcının kendi dashboard'una yönlendir
          const userRoutes: Record<UserType, string> = {
            [UserType.STUDENT]: "/dashboard-student",
            [UserType.TEACHER]: "/dashboard-teacher",
            [UserType.SCHOOL]: "/dashboard-admin",
            [UserType.SYSTEM_ADMIN]: "/dashboard-system",
          };
          router.push(userRoutes[userType]);
        }
      }
    }

    // PUBLIC guard - Giriş yapmış kullanıcıyı dashboard'a yönlendir
    if (guardType === GuardType.PUBLIC && isAuthenticated && userType) {
      const userRoutes: Record<UserType, string> = {
        [UserType.STUDENT]: "/dashboard-student",
        [UserType.TEACHER]: "/dashboard-teacher",
        [UserType.SCHOOL]: "/dashboard-admin",
        [UserType.SYSTEM_ADMIN]: "/dashboard-system",
      };
      router.push(userRoutes[userType]);
    }
  }, [isAuthenticated, userType, loading, guardType, allowedUserTypes, router]);

  // Loading sırasında boş ekran göster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

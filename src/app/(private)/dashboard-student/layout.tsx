"use client";

import Image from "next/image";
import { DashboardHeader } from "@/components";
import { ProtectedGuard } from "@/providers/guard";
import { GuardType, UserType } from "@/enums";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedGuard
      guardType={GuardType.PROTECTED}
      allowedUserTypes={[UserType.STUDENT]}
    >
      <div className="min-h-screen relative">
        {/* Background Image - Full Dashboard */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/images/2-Student Dashboard_background.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Main Container */}
        <div className="container mx-auto px-8 lg:px-12 flex flex-col">
          {/* Header */}
          <DashboardHeader />

          {/* Content */}
          {children}
        </div>
      </div>
    </ProtectedGuard>
  );
}

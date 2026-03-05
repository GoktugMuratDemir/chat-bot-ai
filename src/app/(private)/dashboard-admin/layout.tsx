"use client";

import Image from "next/image";
import { Header } from "@/components";
import { ProtectedGuard } from "@/providers/guard";
import { GuardType, UserType } from "@/enums";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedGuard
      guardType={GuardType.PROTECTED}
      allowedUserTypes={[UserType.SCHOOL]}
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
        <div className="container mx-auto px-12 flex flex-col gap-4">
          {/* Header */}
          <Header />

          {/* Content */}
          {children}
        </div>
      </div>
    </ProtectedGuard>
  );
}

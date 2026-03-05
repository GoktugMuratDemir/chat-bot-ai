"use client";

import { Power, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Student, Teacher, School, SystemAdmin } from "@/types";
import { getFullName } from "@/utils";

export default function DashboardHeader() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Auth context'teki logout fonksiyonu tüm storage'ı temizler
  };

  // Kullanıcı adını ve initiallerini al
  const getUserDisplayName = () => {
    if (!user) return "User";

    if ("name" in user) {
      // Student, Teacher, SystemAdmin
      const name = (user as Student | Teacher | SystemAdmin).name;
      const surname =
        "surname" in user ? (user as Student | Teacher).surname : "";
      return getFullName(name, surname);
    }

    // School
    return (user as School).name;
  };

  const getUserInitials = () => {
    if (!user) return "U";

    if ("name" in user) {
      const name = (user as Student | Teacher | SystemAdmin).name;
      const surname =
        "surname" in user ? (user as Student | Teacher).surname : "";

      const firstInitial = name.charAt(0).toUpperCase();
      const lastInitial =
        surname && surname !== "." ? surname.charAt(0).toUpperCase() : "";

      return lastInitial ? `${firstInitial}${lastInitial}` : firstInitial;
    }

    // School
    return (user as School).name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between py-6 mb-1">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
          <span className="text-white font-bold text-2xl leading-none">b</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-gray-500 text-xs font-semibold leading-tight tracking-wide">
            Axebug Comics
          </div>
          <div className="text-gray-700 text-lg font-bold leading-tight">
            StoryMind
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-gray-700 tracking-wide">
          {getUserDisplayName()}
        </h1>
        <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105">
          {getUserInitials()}
        </div>
        <Link
          href="/help-chat"
          target="_blank"
          className="group w-10 h-10 rounded-full bg-white hover:bg-indigo-50 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 hover:border-indigo-200"
          title="Yardım Asistanı"
        >
          <HelpCircle className="w-5 h-5 text-gray-500 group-hover:text-indigo-500 transition-colors" />
        </Link>
        <button
          onClick={handleLogout}
          className="group w-10 h-10 rounded-full cursor-pointer bg-white hover:bg-red-50 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 hover:border-red-200"
          title="Çıkış Yap"
        >
          <Power className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
        </button>
      </div>
    </header>
  );
}

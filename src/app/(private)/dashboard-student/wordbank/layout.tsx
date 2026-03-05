"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WordbankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-xl font-medium transition-all shadow-md hover:shadow-lg mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Dashboard</span>
      </button>
      {children}
    </div>
  );
}

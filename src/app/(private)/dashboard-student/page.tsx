"use client";

import {
  ClipboardList,
  BookOpen,
  Rocket,
  PenLine,
  BookText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, ScoreBoard } from "@/components";
import { useAuth } from "@/contexts/auth-context";
import { getFullName, getGradeLabel } from "@/utils";
import { Student } from "@/types";
import { useHomeworkScore } from "@/hooks/api";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const student = user as Student;

  // Fetch homework scores for the student
  const { data: scoreData, loading: scoreLoading } = useHomeworkScore(
    student?.id || 300,
  );

  return (
    <div className="flex flex-col gap-6 pt-1 pb-10">
      {/* Welcome Section */}
      {student && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 hover:shadow-lg transition-shadow">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 tracking-wide">
            Hoş geldin, {getFullName(student.name, student.surname)}! 👋
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
            <span className="flex items-center gap-1.5">
              📚 {getGradeLabel(student.grade)}
            </span>
            <span className="flex items-center gap-1.5">
              🏫 {student.school.name}
            </span>
            <span className="flex items-center gap-1.5">
              🚪 {student.schoolRoom.name}
            </span>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <Card
          title="My Tasks"
          iconPath="/images/my_task_icon.webp"
          badgeIcon={ClipboardList}
          badgeText="My Tasks"
          onClick={() => router.push("/dashboard-student/my-tasks")}
        />

        <Card
          title="Contents"
          iconPath="/images/contetns_icon.webp"
          badgeIcon={BookOpen}
          badgeText="Quiz"
          badgeCount={2}
          onClick={() => router.push("/dashboard-student/contents")}
        />

        <Card
          title="Adventure"
          iconPath="/images/adventure_icon.webp"
          badgeIcon={Rocket}
          badgeText="Your journey progress"
          onClick={() => router.push("/dashboard-student/adventure")}
        />

        <Card
          title="Spelling"
          iconPath="/images/spelling_icon.webp"
          badgeIcon={PenLine}
          badgeText="Reading"
          onClick={() => router.push("/dashboard-student/spelling")}
        />

        <Card
          title="Wordbank"
          iconPath="/images/wordbank_icon.webp"
          badgeIcon={BookText}
          badgeText="Balance"
          onClick={() => router.push("/dashboard-student/wordbank")}
        />
      </div>

      <ScoreBoard data={scoreData || undefined} loading={scoreLoading} />
    </div>
  );
}

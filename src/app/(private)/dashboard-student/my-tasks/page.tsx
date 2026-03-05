"use client";

import { ClipboardList, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function MyTasksPage() {
  const tasks = [
    {
      id: 1,
      title: "Mathematics Homework - Chapter 5",
      dueDate: "2026-02-15",
      status: "pending",
      subject: "Mathematics",
    },
    {
      id: 2,
      title: "English Essay: My Favorite Book",
      dueDate: "2026-02-12",
      status: "in-progress",
      subject: "English",
    },
    {
      id: 3,
      title: "Science Project Presentation",
      dueDate: "2026-02-20",
      status: "completed",
      subject: "Science",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-green-100 text-green-700",
      "in-progress": "bg-yellow-100 text-yellow-700",
      pending: "bg-orange-100 text-orange-700",
    };
    const labels = {
      completed: "Completed",
      "in-progress": "In Progress",
      pending: "Pending",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 pt-1 pb-10">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-500 p-2 rounded-xl">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            My Tasks
          </h1>
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Keep track of all your assignments and homework
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {tasks.length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-xl">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {tasks.filter((t) => t.status === "completed").length}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {tasks.filter((t) => t.status === "pending").length}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">All Tasks</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">{getStatusIcon(task.status)}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        📚 {task.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        📅 Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div>{getStatusBadge(task.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

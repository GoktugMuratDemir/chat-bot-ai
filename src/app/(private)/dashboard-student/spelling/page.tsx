"use client";

import { PenLine, BookMarked, Target, TrendingUp } from "lucide-react";

export default function SpellingPage() {
  const words = [
    {
      id: 1,
      word: "Beautiful",
      difficulty: "Medium",
      practiced: 8,
      accuracy: 87,
      status: "learning",
    },
    {
      id: 2,
      word: "Necessary",
      difficulty: "Hard",
      practiced: 5,
      accuracy: 60,
      status: "learning",
    },
    {
      id: 3,
      word: "Tomorrow",
      difficulty: "Medium",
      practiced: 12,
      accuracy: 95,
      status: "mastered",
    },
    {
      id: 4,
      word: "Restaurant",
      difficulty: "Hard",
      practiced: 3,
      accuracy: 45,
      status: "learning",
    },
    {
      id: 5,
      word: "Wednesday",
      difficulty: "Medium",
      practiced: 10,
      accuracy: 92,
      status: "mastered",
    },
    {
      id: 6,
      word: "Definitely",
      difficulty: "Hard",
      practiced: 6,
      accuracy: 72,
      status: "learning",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "mastered"
      ? "bg-green-500 text-white"
      : "bg-blue-500 text-white";
  };

  const totalWords = words.length;
  const masteredWords = words.filter((w) => w.status === "mastered").length;
  const averageAccuracy = Math.round(
    words.reduce((sum, w) => sum + w.accuracy, 0) / words.length,
  );

  return (
    <div className="flex flex-col gap-6 pt-1 pb-10">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-teal-500 p-2 rounded-xl">
            <PenLine className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Spelling Practice
          </h1>
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Improve your spelling skills with targeted practice
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Words</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {totalWords}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-xl">
              <BookMarked className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Mastered</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {masteredWords}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Avg. Accuracy</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {averageAccuracy}%
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {totalWords - masteredWords}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-xl">
              <PenLine className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Practice Button */}
      <div className="bg-linear-to-r from-teal-500 to-emerald-500 rounded-2xl p-6 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Ready to Practice?
          </h2>
          <p className="text-sm text-white/80 font-medium">
            Start a new spelling session and improve your skills
          </p>
        </div>
        <button className="bg-white text-teal-600 px-8 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-md">
          Start Practice
        </button>
      </div>

      {/* Words List */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Your Word List</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {words.map((word) => (
            <div
              key={word.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {word.word}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(word.difficulty)}`}
                    >
                      {word.difficulty}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(word.status)}`}
                    >
                      {word.status === "mastered" ? "✓ Mastered" : "Learning"}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>🎯 Practiced: {word.practiced} times</span>
                    <span>📊 Accuracy: {word.accuracy}%</span>
                  </div>
                  <div className="mt-3">
                    <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          word.accuracy >= 80
                            ? "bg-green-500"
                            : word.accuracy >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${word.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                  Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

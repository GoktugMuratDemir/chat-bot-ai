"use client";

import { Rocket, Trophy, Star, Zap, Map } from "lucide-react";

export default function AdventurePage() {
  const progress = 65;
  const currentLevel = 12;
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: true,
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Complete 10 lessons",
      icon: "📚",
      unlocked: true,
    },
    {
      id: 3,
      title: "Rising Star",
      description: "Reach Level 10",
      icon: "⭐",
      unlocked: true,
    },
    {
      id: 4,
      title: "Math Master",
      description: "Complete all math challenges",
      icon: "🧮",
      unlocked: false,
    },
    {
      id: 5,
      title: "Speed Demon",
      description: "Complete 5 lessons in one day",
      icon: "⚡",
      unlocked: false,
    },
    {
      id: 6,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: "💯",
      unlocked: true,
    },
  ];

  const levels = [
    { level: 10, name: "Explorer", xp: 1000 },
    { level: 11, name: "Adventurer", xp: 1100 },
    { level: 12, name: "Champion", xp: 1200, current: true },
    { level: 13, name: "Hero", xp: 1300 },
    { level: 14, name: "Legend", xp: 1400 },
  ];

  return (
    <div className="flex flex-col gap-6 pt-1 pb-10">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-500 p-2 rounded-xl">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Adventure
          </h1>
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Track your learning journey and unlock achievements
        </p>
      </div>

      {/* Current Progress */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Level {currentLevel}
            </h2>
            <p className="text-gray-500">Champion</p>
          </div>
          <div className="bg-purple-500 p-4 rounded-full">
            <Star className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to next level</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">780</p>
            <p className="text-sm text-gray-500">Current XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">420</p>
            <p className="text-sm text-gray-500">To Next Level</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">1200</p>
            <p className="text-sm text-gray-500">Total XP Needed</p>
          </div>
        </div>
      </div>

      {/* Level Path */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center gap-2 mb-5">
          <Map className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">Your Journey</h2>
        </div>
        <div className="space-y-4">
          {levels.map((level, index) => (
            <div
              key={level.level}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                level.current
                  ? "bg-purple-50 border-2 border-purple-300"
                  : index < 2
                    ? "bg-gray-100 opacity-60"
                    : "bg-gray-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  level.current
                    ? "bg-purple-600 text-white"
                    : index < 2
                      ? "bg-gray-300 text-gray-600"
                      : "bg-white text-gray-400 border-2 border-gray-300"
                }`}
              >
                {level.level}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800">{level.name}</h3>
                  {level.current && (
                    <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{level.xp} XP required</p>
              </div>
              {index < 2 && (
                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? "bg-yellow-50 border-yellow-300 hover:shadow-md"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="text-4xl mb-3 text-center">
                {achievement.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-center mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                    ✓ Unlocked
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

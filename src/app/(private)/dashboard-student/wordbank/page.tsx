"use client";

import { BookText, Search, BookmarkPlus, Sparkles } from "lucide-react";
import { useState } from "react";

export default function WordbankPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Common Words", count: 250, color: "blue" },
    { name: "Academic", count: 180, color: "purple" },
    { name: "Science", count: 120, color: "green" },
    { name: "Mathematics", count: 95, color: "orange" },
    { name: "Literature", count: 140, color: "pink" },
    { name: "Technology", count: 85, color: "teal" },
  ];

  const recentWords = [
    {
      id: 1,
      word: "Magnificent",
      meaning: "Extremely beautiful, impressive, or remarkable",
      example: "The view from the mountain was magnificent.",
      category: "Common Words",
      addedDate: "2026-02-10",
    },
    {
      id: 2,
      word: "Photosynthesis",
      meaning:
        "The process by which green plants use sunlight to synthesize foods",
      example: "Plants need sunlight for photosynthesis.",
      category: "Science",
      addedDate: "2026-02-09",
    },
    {
      id: 3,
      word: "Algorithm",
      meaning:
        "A process or set of rules to be followed in calculations or problem-solving",
      example: "The algorithm helps sort the data efficiently.",
      category: "Technology",
      addedDate: "2026-02-08",
    },
    {
      id: 4,
      word: "Metaphor",
      meaning: "A figure of speech that describes an object or action",
      example: "Time is money is a common metaphor.",
      category: "Literature",
      addedDate: "2026-02-08",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pt-1 pb-10">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-cyan-500 p-2 rounded-xl">
            <BookText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Wordbank
          </h1>
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Build your vocabulary with words and definitions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Words</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">870</p>
            </div>
            <div className="bg-cyan-500 p-3 rounded-xl">
              <BookText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Words This Week
              </p>
              <p className="text-3xl font-bold text-green-600 mt-1">24</p>
            </div>
            <div className="bg-green-500 p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {categories.length}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-xl">
              <BookmarkPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for words in your wordbank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none text-gray-800 bg-white/50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white/80 rounded-xl p-5 border-2 border-gray-200 cursor-pointer hover:border-cyan-500 hover:shadow-lg transition-all hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.count} words in this category
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-colors">
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Words */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Recently Added</h2>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2 shadow-md">
            <BookmarkPlus className="w-4 h-4" />
            Add New Word
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentWords.map((word) => (
            <div
              key={word.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {word.word}
                    </h3>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold">
                      {word.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2 font-medium">
                    {word.meaning}
                  </p>
                  <p className="text-gray-600 italic text-sm mb-2">
                    Example: &ldquo;{word.example}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400">
                    Added on {word.addedDate}
                  </p>
                </div>
                <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-md">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

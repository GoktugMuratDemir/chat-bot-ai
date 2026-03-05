"use client";

import { BookOpen, Video, FileText, Headphones } from "lucide-react";

export default function ContentsPage() {
  const contents = [
    {
      id: 1,
      title: "Introduction to Algebra",
      type: "video",
      duration: "15 min",
      views: 234,
      category: "Mathematics",
    },
    {
      id: 2,
      title: "English Grammar Basics",
      type: "document",
      duration: "10 min read",
      views: 189,
      category: "English",
    },
    {
      id: 3,
      title: "The Solar System",
      type: "video",
      duration: "20 min",
      views: 456,
      category: "Science",
    },
    {
      id: 4,
      title: "Listening Practice: Conversations",
      type: "audio",
      duration: "12 min",
      views: 123,
      category: "English",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5 text-red-500" />;
      case "document":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "audio":
        return <Headphones className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-1 pb-10">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-indigo-500 p-2 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Contents
          </h1>
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Explore educational materials and learning resources
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {["All", "Mathematics", "English", "Science", "History"].map(
          (category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl border-2 border-white/20 text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-md"
            >
              {category}
            </button>
          ),
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-xl">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <p className="text-gray-500 text-sm">Videos</p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">18</p>
              <p className="text-gray-500 text-sm">Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500 p-2 rounded-xl">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-gray-500 text-sm">Audio</p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">54</p>
              <p className="text-gray-500 text-sm">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contents.map((content) => (
          <div
            key={content.id}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all cursor-pointer overflow-hidden"
          >
            <div className="h-40 bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-6xl">📚</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                {getTypeIcon(content.type)}
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  {content.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {content.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⏱️ {content.duration}
                </span>
                <span className="flex items-center gap-1">
                  👁️ {content.views} views
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                  {content.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

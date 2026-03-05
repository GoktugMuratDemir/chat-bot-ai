"use client";

import { useEffect, useState } from "react";
import { LinearProgressBarProps } from "./types";

export function LinearProgressBar({
  label,
  value,
  change,
  color,
  isPositive = true,
}: LinearProgressBarProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const colorClasses = {
    amber: "text-amber-500",
    violet: "text-violet-500",
    cyan: "text-cyan-500",
    lime: "text-lime-500",
  };

  const bgColorClasses = {
    amber: "bg-amber-500",
    violet: "bg-violet-500",
    cyan: "bg-cyan-500",
    lime: "bg-lime-500",
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-22.5 py-4 px-5">
      {/* Label and Score */}
      <div className="w-full flex items-center justify-between mb-2.5">
        <span
          className={`text-xs sm:text-sm font-extrabold tracking-wider sm:tracking-widest uppercase ${colorClasses[color]}`}
        >
          {label}
        </span>
        {value > 0 && (
          <span
            className={`font-extrabold text-lg sm:text-xl tabular-nums ${colorClasses[color]}`}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {value}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3.5 sm:h-4 bg-slate-900/70 rounded-2xl overflow-hidden shadow-inner border border-black/30">
        <div
          className={`h-full ${bgColorClasses[color]} transition-all duration-1000 ease-out`}
          style={{
            width: animated ? `${Math.min(value, 100)}%` : "0%",
            backgroundImage: isPositive
              ? "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)"
              : "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.5) 5px, rgba(0,0,0,0.5) 10px)",
            boxShadow: `inset 0 0 10px ${isPositive ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}`,
          }}
        />
      </div>

      {/* Change indicator */}
      {change !== undefined && (
        <div className="flex items-center space-x-1 mt-2">
          <span
            className={`text-xs sm:text-sm font-bold ${isPositive ? "text-green-400" : "text-red-500"}`}
          >
            {isPositive ? "+" : ""}
            {change}
          </span>
          <span
            className={`text-sm sm:text-base font-bold ${isPositive ? "text-green-400" : "text-red-500"}`}
          >
            {isPositive ? "↑" : "↓"}
          </span>
        </div>
      )}
    </div>
  );
}

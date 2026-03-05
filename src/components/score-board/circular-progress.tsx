"use client";

import { useEffect, useState } from "react";
import { CircularProgressProps } from "./types";

export function CircularProgress({
  label,
  percentage,
  color,
  size = "normal",
}: CircularProgressProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const colorClasses = {
    fuchsia: { stroke: "#F59BEC", glow: "rgba(245, 155, 236, 0.6)" },
    yellow: { stroke: "#FFA500", glow: "rgba(255, 165, 0, 0.6)" },
    sky: { stroke: "#46BEDC", glow: "rgba(70, 190, 220, 0.6)" },
    rose: { stroke: "#FF6699", glow: "rgba(255, 102, 153, 0.6)" },
    chartreuse: { stroke: "#A0EB50", glow: "rgba(160, 235, 80, 0.6)" },
  };

  const isLarge = size === "large";
  const circleSize = isLarge ? 120 : 110;
  const strokeWidth = isLarge ? 10 : 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = animated
    ? circumference - (percentage / 100) * circumference
    : circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2 w-full h-full">
      {label && (
        <span className="text-xs font-extrabold text-gray-200 tracking-widest uppercase leading-tight pb-0.5">
          {label}
        </span>
      )}
      <div
        className="relative mx-auto"
        style={{ width: circleSize, height: circleSize }}
      >
        <svg
          width={circleSize}
          height={circleSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle with glow */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={colorClasses[color].stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-baseline">
            <span
              className="font-extrabold tabular-nums"
              style={{
                fontSize: isLarge ? "1.4rem" : "1.3rem",
                color: colorClasses[color].stroke,
                textShadow: `0 0 15px ${colorClasses[color].glow}, 0 0 25px ${colorClasses[color].glow}`,
                letterSpacing: "-0.02em",
              }}
            >
              {percentage}
            </span>
            <span
              className="font-bold"
              style={{
                fontSize: isLarge ? "1.1rem" : "0.9rem",
                color: colorClasses[color].stroke,
                textShadow: `0 0 10px ${colorClasses[color].glow}`,
                marginLeft: "0.1rem",
              }}
            >
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

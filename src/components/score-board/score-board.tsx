"use client";

import { LinearProgressBar } from "./linear-progress-bar";
import { CircularProgress } from "./circular-progress";
import { ScoreBoardProps } from "./types";

export default function ScoreBoard({ data, loading }: ScoreBoardProps) {
  // Calculate overall score (average of all scores)
  const calculateOverallScore = () => {
    if (!data) return 0;
    return Number(
      (
        (data.examScore +
          data.quizScore +
          data.skillsScore +
          data.readScore +
          data.writeScore +
          data.speakingScore +
          data.listeningScore) /
        7
      ).toFixed(2),
    );
  };

  // Calculate 4 skills power (average of 4 main skills)
  const calculateSkillsPower = () => {
    if (!data) return 0;
    return Number(
      (
        (data.readScore +
          data.writeScore +
          data.speakingScore +
          data.listeningScore) /
        4
      ).toFixed(2),
    );
  };

  const overallScore = calculateOverallScore();
  const skillsPower = calculateSkillsPower();

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 bg-linear-to-br from-slate-700 via-slate-600 to-slate-700">
      {/* Inner shadow overlay */}
      <div className="absolute inset-0 shadow-inner pointer-events-none" />
      {/* Background texture with noise */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 opacity-15" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-4 border-b-2 border-white/20">
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-widest uppercase bg-linear-to-r from-lime-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            PROGRESS OVERVIEW
          </h2>
        </div>

        {/* Progress bars section with grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b-2 border-white/20">
          <div className="border-r-2 border-b-2 lg:border-b-0 border-white/20">
            <LinearProgressBar
              label="EXAM"
              value={loading ? 0 : Number((data?.examScore || 0).toFixed(2))}
              color="amber"
              isPositive={true}
            />
          </div>
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-white/20">
            <LinearProgressBar
              label="QUIZ"
              value={loading ? 0 : Number((data?.quizScore || 0).toFixed(2))}
              color="violet"
              isPositive={false}
            />
          </div>
          <div className="border-r-2 border-white/20">
            <LinearProgressBar
              label="SKILLS"
              value={loading ? 0 : Number((data?.skillsScore || 0).toFixed(2))}
              color="cyan"
              isPositive={true}
            />
          </div>
          <div>
            <LinearProgressBar
              label="OVERALL"
              value={loading ? 0 : overallScore}
              color="lime"
              isPositive={false}
            />
          </div>
        </div>

        {/* Circular progress section with grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left side - 4 skills in grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4">
            <div className="border-r-2 border-b-2 lg:border-b-0 border-white/20 bg-linear-to-b from-slate-700/30 to-slate-800/30 flex items-center justify-center py-5">
              <CircularProgress
                label="READING"
                percentage={
                  loading ? 0 : Number((data?.readScore || 0).toFixed(2))
                }
                color="fuchsia"
              />
            </div>
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-white/20 bg-linear-to-b from-slate-700/30 to-slate-800/30 flex items-center justify-center py-5">
              <CircularProgress
                label="WRITING"
                percentage={
                  loading ? 0 : Number((data?.writeScore || 0).toFixed(2))
                }
                color="yellow"
              />
            </div>
            <div className="border-r-2 lg:border-r-2 border-white/20 bg-linear-to-b from-slate-700/30 to-slate-800/30 flex items-center justify-center py-5">
              <CircularProgress
                label="LISTENING"
                percentage={
                  loading ? 0 : Number((data?.listeningScore || 0).toFixed(2))
                }
                color="sky"
              />
            </div>
            <div className="lg:border-r-2 border-white/20 bg-linear-to-b from-slate-700/30 to-slate-800/30 flex items-center justify-center py-5">
              <CircularProgress
                label="SPEAKING"
                percentage={
                  loading ? 0 : Number((data?.speakingScore || 0).toFixed(2))
                }
                color="rose"
              />
            </div>
          </div>

          {/* Right side - Overall skill with header */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-5 bg-linear-to-b from-slate-600/50 to-slate-700/50 border-t-2 lg:border-t-0 border-white/20">
            <div className="text-center mb-2">
              <h3 className="text-sm font-extrabold text-white/90 tracking-widest uppercase leading-tight">
                4 SKILLS
              </h3>
              <h3 className="text-sm font-extrabold text-white/90 tracking-widest uppercase leading-tight">
                POWER
              </h3>
            </div>
            <CircularProgress
              percentage={loading ? 0 : skillsPower}
              color="chartreuse"
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

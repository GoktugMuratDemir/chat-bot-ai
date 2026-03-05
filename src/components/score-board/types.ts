export interface LinearProgressBarProps {
  label: string;
  value: number;
  change?: number;
  color: "amber" | "violet" | "cyan" | "lime";
  isPositive?: boolean;
}

export interface CircularProgressProps {
  label?: string;
  percentage: number;
  color: "fuchsia" | "yellow" | "sky" | "rose" | "chartreuse";
  size?: "normal" | "large";
}

export interface ScoreBoardData {
  examScore: number;
  quizScore: number;
  skillsScore: number;
  readScore: number;
  writeScore: number;
  speakingScore: number;
  listeningScore: number;
}

export interface ScoreBoardProps {
  data?: ScoreBoardData;
  loading?: boolean;
}

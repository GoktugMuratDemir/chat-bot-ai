"use client";

import { useGet } from "../base/use-get";
import { API_ENDPOINTS } from "@/lib/api";
import type { HomeworkScoreResponse } from "@/types";

/**
 * Get Homework Score Hook - GET /homework/score/:userId/
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useHomeworkScore(300);
 * ```
 */
export const useHomeworkScore = (userId: string | number) => {
  return useGet<HomeworkScoreResponse>(API_ENDPOINTS.HOMEWORK.SCORE(userId));
};

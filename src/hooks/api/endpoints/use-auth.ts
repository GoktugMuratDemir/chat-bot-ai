"use client";

import { usePut } from "../base/use-put";
import { usePost } from "../base/use-post";
import { useGet } from "../base/use-get";
import { API_ENDPOINTS } from "@/lib/api";
import type { LoginResponse } from "@/types";
import type { LoginRequest, LogoutResponse, MeResponse } from "../types";

/**
 * ==================== AUTH API HOOKS ====================
 * Tüm authentication işlemleri için merkezi hook koleksiyonu
 */

/**
 * Login Hook - PUT /login/
 *
 * @example
 * ```tsx
 * const { mutate, loading, error, data } = useAuthLogin();
 * mutate({ username: 'test', password: '1234' });
 * ```
 */
export const useAuthLogin = () => {
  return usePut<LoginResponse, LoginRequest>(API_ENDPOINTS.AUTH.LOGIN);
};

/**
 * Logout Hook - POST /auth/logout
 *
 * @example
 * ```tsx
 * const { mutate, loading, error } = useAuthLogout();
 * mutate();
 * ```
 */
export const useAuthLogout = () => {
  return usePost<LogoutResponse, void>(API_ENDPOINTS.AUTH.LOGOUT);
};

/**
 * Get Current User Hook - GET /auth/me
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useAuthMe();
 * ```
 */
export const useAuthMe = () => {
  return useGet<MeResponse>(API_ENDPOINTS.AUTH.ME);
};

// Backward compatibility için eski useLogin export'u
export { useAuthLogin as useLogin };

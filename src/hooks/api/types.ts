import { AxiosRequestConfig } from "axios";
import { LoginResponse } from "@/types";

/**
 * ==================== BASE API TYPES ====================
 * Temel API hook tipleri
 */

// API Hook durumları
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API Hook seçenekleri (GET için)
export interface ApiOptions<T = unknown> extends AxiosRequestConfig {
  // Otomatik çalışma (GET için)
  enabled?: boolean;
  // Başarı callback'i
  onSuccess?: (data: T) => void;
  // Hata callback'i
  onError?: (error: string) => void;
  // Yükleme bitimi callback'i
  onFinally?: () => void;
}

// Mutation hook seçenekleri (POST, PUT, DELETE için)
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: string, variables: TVariables) => void;
  onFinally?: (variables: TVariables) => void;
}

// API Response yapısı
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * ==================== AUTH TYPES ====================
 * Authentication endpoint tipleri
 */

/**
 * Login Request
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Logout Response
 */
export interface LogoutResponse {
  success: boolean;
  message?: string;
}

/**
 * Current User Response (Me)
 */
export interface MeResponse {
  userType: string;
  student?: LoginResponse["student"];
  teacher?: LoginResponse["teacher"];
  school?: LoginResponse["school"];
  systemAdmin?: LoginResponse["systemAdmin"];
}

/**
 * ==================== USER TYPES ====================
 * User endpoint tipleri
 */

/**
 * Base User Interface
 */
export interface User {
  id: number;
  name: string;
  surname?: string;
  username: string;
  active: boolean;
}

/**
 * User List Response
 */
export interface UserListResponse {
  users: User[];
  total: number;
  page?: number;
  limit?: number;
}

/**
 * User Detail Response
 */
export interface UserDetailResponse extends User {
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create User Request
 */
export interface CreateUserRequest {
  name: string;
  surname?: string;
  username: string;
  password: string;
  email?: string;
}

/**
 * Update User Request
 */
export interface UpdateUserRequest {
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
  active?: boolean;
}

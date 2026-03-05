/**
 * API Types - API ile ilgili tüm TypeScript tip tanımlamaları
 */

// User tipleri
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user";
}

// Auth tipleri
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

// API Response wrappers
export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
  success: true;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  success: false;
}

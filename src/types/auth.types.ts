/**
 * Auth Types - Kimlik doğrulama ile ilgili tüm tip tanımlamaları
 */

/**
 * School (Okul) interface
 */
export interface School {
  id: number;
  name: string;
  active: boolean;
  username: string;
  password: string;
}

/**
 * SchoolRoom (Sınıf) interface
 */
export interface SchoolRoom {
  id: number;
  name: string;
  active: boolean;
  grade: string;
  school: School;
}

/**
 * Student (Öğrenci) interface - Gerçek API response'una göre
 */
export interface Student {
  id: number;
  name: string;
  surname: string;
  grade: string;
  username: string;
  password: string;
  active: boolean;
  avatar: string;
  school: School;
  schoolRoom: SchoolRoom;
}

/**
 * Teacher (Öğretmen) interface
 */
export interface Teacher {
  id: number;
  name: string;
  surname?: string;
  username: string;
  active: boolean;
  school?: School;
}

/**
 * SystemAdmin interface
 */
export interface SystemAdmin {
  id: number;
  name: string;
  username: string;
  active: boolean;
}

/**
 * Login response tipi - API response yapısı
 */
export interface LoginResponse {
  userType: string;
  student?: Student;
  teacher?: Teacher;
  school?: School;
  systemAdmin?: SystemAdmin;
  error?: string | null;
}

/**
 * Re-export enums for convenience
 */
export { Grade, UserType } from "@/enums";

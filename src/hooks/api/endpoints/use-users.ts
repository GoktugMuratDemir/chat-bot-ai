"use client";

import { useGet } from "../base/use-get";
import { usePost } from "../base/use-post";
import { usePut } from "../base/use-put";
import { useDelete } from "../base/use-delete";
import { API_ENDPOINTS } from "@/lib/api";
import type {
  UserListResponse,
  UserDetailResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types";

/**
 * ==================== USERS API HOOKS ====================
 * Tüm kullanıcı işlemleri için merkezi hook koleksiyonu
 */

/**
 * Get Users List Hook - GET /users
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useUsers();
 * ```
 */
export const useUsers = (params?: { page?: number; limit?: number }) => {
  return useGet<UserListResponse>(API_ENDPOINTS.USERS.LIST, { params });
};

/**
 * Get User by ID Hook - GET /users/:id
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useUser(123);
 * ```
 */
export const useUser = (userId: string | number) => {
  return useGet<UserDetailResponse>(API_ENDPOINTS.USERS.BY_ID(userId));
};

/**
 * Create User Hook - POST /users
 *
 * @example
 * ```tsx
 * const { mutate, loading, error } = useCreateUser();
 * mutate({ name: 'John', username: 'john123', password: 'pass' });
 * ```
 */
export const useCreateUser = () => {
  return usePost<UserDetailResponse, CreateUserRequest>(
    API_ENDPOINTS.USERS.LIST,
  );
};

/**
 * Update User Hook - PUT /users/:id
 *
 * @example
 * ```tsx
 * const { mutate, loading, error } = useUpdateUser();
 * mutate({ id: 123, name: 'Jane' });
 * ```
 */
export const useUpdateUser = () => {
  return usePut<
    UserDetailResponse,
    UpdateUserRequest & { id: string | number }
  >((variables) => API_ENDPOINTS.USERS.BY_ID(variables.id));
};

/**
 * Delete User Hook - DELETE /users/:id
 *
 * @example
 * ```tsx
 * const { mutate, loading, error } = useDeleteUser();
 * mutate({ id: 123 });
 * ```
 */
export const useDeleteUser = () => {
  return useDelete<{ success: boolean }, { id: string | number }>((variables) =>
    API_ENDPOINTS.USERS.BY_ID(variables.id),
  );
};

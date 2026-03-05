"use client";

import { useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useApi } from "./use-api";
import { MutationOptions } from "../types";

/**
 * usePost Hook - POST istekleri için
 * Veri gönderme işlemleri için kullanılır
 *
 * @example
 * const { mutate, loading } = usePost<User, CreateUserRequest>('/users');
 * mutate({ name: 'John', email: 'john@example.com' });
 */
export const usePost = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: MutationOptions<TData, TVariables>,
) => {
  const api = useApi<TData>();

  // POST isteği yapma fonksiyonu
  const mutate = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>,
    ): Promise<TData | null> => {
      const combinedOptions = { ...options, ...mutationOptions };

      return api.executeMutation(
        (variables: TVariables) => apiClient.post<TData>(url, variables),
        data,
        combinedOptions,
      );
    },
    [url, options, api],
  );

  // Async mutate - Promise döndürür
  const mutateAsync = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>,
    ): Promise<TData> => {
      const result = await mutate(data, mutationOptions);
      if (result === null) {
        throw new Error("Mutation failed");
      }
      return result;
    },
    [mutate],
  );

  return {
    ...api,
    mutate,
    mutateAsync,
    // Alias'lar
    post: mutate,
    postAsync: mutateAsync,
  };
};

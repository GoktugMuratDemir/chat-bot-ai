/**
 * API Endpoints - Tüm API endpoint'lerinin merkezi yönetimi
 * Kullanım: API_ENDPOINTS.AUTH.LOGIN veya API_ENDPOINTS.USERS.BY_ID(123)
 */
export const API_ENDPOINTS = {
  // Auth endpoints - MD dosyasına göre
  AUTH: {
    LOGIN: "/login/", // PUT https://api.axebug.com/api/login/
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  // User endpoints
  USERS: {
    LIST: "/users",
    BY_ID: (id: string | number) => `/users/${id}`,
  },

  // Homework endpoints
  HOMEWORK: {
    SCORE: (userId: string | number) => `/homework/score/${userId}/`,
  },
} as const;

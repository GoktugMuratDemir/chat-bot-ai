/**
 * API Configuration Constants
 * Merkezi API URL ve konfigürasyon yönetimi
 */

/**
 * Ana API base URL
 * Production için environment variable kullanın
 * MD dosyasına göre: https://api.axebug.com/api
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.axebug.com/api";

/**
 * API timeout süresi (milisaniye)
 */
export const API_TIMEOUT = 10000;

/**
 * Upload endpoint base URL
 */
export const UPLOAD_API_URL = `${API_BASE_URL}/upload`;

/**
 * File serve endpoint base URL
 */
export const FILE_SERVE_URL = `${API_BASE_URL}/files`;

/**
 * Upload endpoint'i oluşturur
 * @param type - Upload tipi (avatar, document, vb.)
 * @returns Upload endpoint URL'i
 */
export const getUploadUrl = (type: string): string => {
  return `${UPLOAD_API_URL}/${type}`;
};

/**
 * Yüklenen dosyanın tam URL'ini oluşturur
 * @param fileUrl - Backend'den dönen dosya URL'i
 * @returns Tam dosya URL'i
 */
export const getFileUrl = (fileUrl: string): string => {
  if (fileUrl.startsWith("http")) {
    return fileUrl;
  }
  return `${FILE_SERVE_URL}/${fileUrl}`;
};

/**
 * HTTP Status kodları
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

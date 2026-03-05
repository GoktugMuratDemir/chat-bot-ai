import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * API Client - Axios tabanlı HTTP istemcisi
 * Token yönetimi ve hata yakalama ile merkezi API yapılandırması
 */
class ApiClient {
  private client: AxiosInstance;

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL ||
      "https://api.axebug.com/api",
  ) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - Token ekleme
    this.client.interceptors.request.use(
      (config) => {
        // localStorage'dan token alma (client-side)
        if (typeof window !== "undefined") {
          try {
            const tokenStr = localStorage.getItem("accessToken");
            if (tokenStr) {
              // Token string kontrolü
              if (tokenStr.trim() === "") {
                console.warn("Empty token found in localStorage");
                localStorage.removeItem("accessToken");
                return config;
              }

              let token: string;
              // Eğer token zaten string ise direkt kullan, JSON ise parse et
              if (tokenStr.startsWith('"') && tokenStr.endsWith('"')) {
                token = JSON.parse(tokenStr);
              } else if (tokenStr.startsWith("{") || tokenStr.startsWith("[")) {
                // JSON object ise parse et
                const parsedToken = JSON.parse(tokenStr);
                token = parsedToken.accessToken || parsedToken;
              } else {
                // Plain string ise direkt kullan
                token = tokenStr;
              }

              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error("Token parse error:", error);
            localStorage.removeItem("accessToken");
          }
        }
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor - Hata yönetimi
    this.client.interceptors.response.use(
      (response) => {
        // Boş response kontrolü
        if (
          response.status === 200 &&
          (response.data === "" ||
            response.data === null ||
            response.data === undefined ||
            response.headers["content-length"] === "0")
        ) {
          console.warn("API returned empty response with 200 status");
          throw new Error("Sunucu boş yanıt döndü.");
        }

        // Başarılı response
        return response;
      },
      (error) => {
        // Detaylı hata logları
        console.error("API Error Details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method,
          headers: error.response?.headers,
          message: error.message,
        });

        // Backend'den gelen hata mesajını al
        let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }

        // 401 durumunda token'ı temizle ve login'e yönlendir
        if (error.response?.status === 401) {
          errorMessage = "Oturum süreniz doldu. Lütfen tekrar giriş yapın.";
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            window.location.href = "/auth/login";
          }
        }

        // 409 durumunda mevcut kayıt hatası
        if (error.response?.status === 409) {
          errorMessage =
            "Bu kayıt zaten mevcut. Lütfen farklı bir kayıt deneyin.";
        }

        // Özel hata mesajları
        if (error.message === "Network Error") {
          errorMessage =
            "Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.";
        }

        if (error.code === "ECONNABORTED") {
          errorMessage = "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
        }

        // Hata mesajını error objesine ekle
        error.message = errorMessage;
        return Promise.reject(error);
      },
    );
  }

  // GET isteği
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  // POST isteği
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  }

  // PUT isteği
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  // DELETE isteği
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  // PATCH isteği
  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Export as 'api' for convenience
export const api = apiClient;

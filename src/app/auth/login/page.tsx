"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLogin } from "@/hooks/api";

// Öğrenci giriş zemin resimleri (ÖĞRENCİ GİRİŞ ZEMİN RESİMLERİ_webp)
const LOGIN_BACKGROUNDS = [
  "login_back0.webp",
  "login_back1.webp",
  "login_back2.webp",
  "login_back3.webp",
  "login_back4.webp",
  "login_back5.webp",
  "login_back6.webp",
  "login_back7.webp",
  "login_back8.webp",
  "login_back9.webp",
  "login_back10.webp",
  "login_back11.png",
  "login_back12.webp",
  "login_back13.webp",
  "login_back14.webp",
  "login_back15.webp",
  "login_back16.webp",
  "login_back17.webp",
  "login_back18.webp",
  "login_back19.webp",
  "login_back20.webp",
  "login_back22.webp",
  "login_back23.webp",
  "login_back24.webp",
  "login_back25.webp",
  "login_back26.webp",
  "login_back27.webp",
];

// Background component that only renders on client
function BackgroundImage() {
  const [backgroundImage] = useState(
    () =>
      LOGIN_BACKGROUNDS[Math.floor(Math.random() * LOGIN_BACKGROUNDS.length)],
  );

  return (
    <Image
      src={`/images/${backgroundImage}`}
      alt="Login Background"
      fill
      priority
      className="object-cover"
      quality={100}
    />
  );
}

// Dynamically import with no SSR
const DynamicBackground = dynamic(() => Promise.resolve(BackgroundImage), {
  ssr: false,
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { mutate: loginMutate, loading, error, data } = useLogin();

  // Login başarılı olduğunda auth context'e aktar
  useEffect(() => {
    if (data && !data.error) {
      authLogin(data);
    }
  }, [data, authLogin]);

  // Hata mesajını computed value olarak hesapla (cascading render'ı önlemek için)
  const errorMessage =
    data?.error || (error && typeof error === "string")
      ? error
      : error
        ? "Giriş sırasında bir hata oluştu"
        : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      // MD dosyasına göre: PUT /login/ ile { username, password }
      loginMutate({ username, password });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
      {/* Arka plan - Öğrenci giriş zemin resimleri */}
      <DynamicBackground />

      {/* Hafif overlay */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      {/* Geri Butonu - Ana Sayfaya Dön */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-all backdrop-blur-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl cursor-pointer"
        aria-label="Ana sayfaya dön"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Ana Sayfa</span>
      </button>

      {/* İçerik: logo + form, oran yandaki gibi */}
      <div className="w-full max-w-lg flex flex-col items-center px-6 sm:px-8 z-10">
        {/* Logo - tek görsel */}
        <div className="w-full mb-12 sm:mb-16 flex items-center justify-center">
          <div className="relative w-70 h-22.5 sm:w-[320px] sm:h-25 drop-shadow-xl">
            <Image
              src="/logo/login-logo-green.webp"
              alt="Axebug Comics StoryMind"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Form - Kullanıcı adı & parola #42607E %50 transparan, giriş butonu #469696 */}
        <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4">
          {/* Hata mesajı */}
          {errorMessage && (
            <div className="w-full px-4 py-3 rounded-xl bg-red-500/80 text-white text-sm text-center backdrop-blur-lg">
              {errorMessage}
            </div>
          )}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 sm:px-5 sm:py-3.5 border-0 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base font-normal transition-all backdrop-blur-lg bg-slate-500/50"
            placeholder="Enter your username"
            required
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 sm:px-5 sm:py-3.5 border-0 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base font-normal transition-all backdrop-blur-lg bg-slate-500/50"
            placeholder="Enter your password"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-3.5 px-6 rounded-xl text-white font-bold text-base sm:text-lg transition-all shadow-lg hover:brightness-110 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 bg-teal-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Login"}
            {!loading && (
              <span className="text-lg sm:text-xl" aria-hidden="true">
                →
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

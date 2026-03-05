"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ClipboardList,
  BookOpen,
  Rocket,
  PenLine,
  BookText,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1e293b 0%, #334155 25%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Background texture with animated gradients */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(100, 200, 200, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(160, 235, 80, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(70, 220, 255, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo/login-logo-green.webp"
                  alt="Axebug"
                  fill
                  className="object-contain"
                />
              </div>
              <h2
                className="text-2xl font-bold tracking-wide"
                style={{
                  background:
                    "linear-gradient(90deg, #B4FF5A 0%, #64E8C8 50%, #46DCFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Axebug
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/auth/login"
                className="px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all shadow-lg hover:brightness-110 hover:shadow-2xl hover:scale-105 active:scale-95"
                style={{ background: "#469696" }}
              >
                Başlayın
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-20">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide mb-6"
              style={{
                background:
                  "linear-gradient(90deg, #B4FF5A 0%, #64E8C8 25%, #46DCFF 50%, #64E8C8 75%, #B4FF5A 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(180, 255, 90, 0.3))",
              }}
            >
              Axebug&apos;a Hoş Geldiniz
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
              Eğitim yolculuğunuzda size eşlik eden modern platform.
              Görevlerinizi yönetin, içerikleri keşfedin, maceraya atılın ve
              ilerlemenizi takip edin.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/login"
                className="px-10 py-4 text-base font-bold text-white rounded-xl transition-all shadow-2xl hover:brightness-110 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3"
                style={{ background: "#469696" }}
              >
                Hemen Başlayın
                <span className="text-xl">→</span>
              </Link>
              <Link
                href="/dashboard"
                className="px-10 py-4 text-base font-bold text-white rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 backdrop-blur-lg"
                style={{ background: "rgba(71, 85, 105, 0.5)" }}
              >
                Dashboard&apos;u İncele
              </Link>
            </div>
          </div>

          {/* Dashboard Features Showcase */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Platform Özellikleri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <FeatureCard
                title="My Tasks"
                iconPath="/images/my_task_icon.webp"
                badgeIcon={ClipboardList}
                badgeText="Görevleriniz"
              />
              <FeatureCard
                title="Contents"
                iconPath="/images/contetns_icon.webp"
                badgeIcon={BookOpen}
                badgeText="İçerikler"
                badgeCount={2}
              />
              <FeatureCard
                title="Adventure"
                iconPath="/images/adventure_icon.webp"
                badgeIcon={Rocket}
                badgeText="Macera"
              />
              <FeatureCard
                title="Spelling"
                iconPath="/images/spelling_icon.webp"
                badgeIcon={PenLine}
                badgeText="Yazım"
              />
              <FeatureCard
                title="Wordbank"
                iconPath="/images/wordbank_icon.webp"
                badgeIcon={BookText}
                badgeText="Kelime Bankası"
              />
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-20">
            <BenefitCard
              icon={Target}
              title="Hedef Odaklı"
              description="Öğrenme hedeflerinizi belirleyin ve ilerlemenizi takip edin."
              color="cyan"
            />
            <BenefitCard
              icon={TrendingUp}
              title="İlerleme Takibi"
              description="Detaylı istatistikler ile performansınızı analiz edin."
              color="lime"
            />
            <BenefitCard
              icon={Award}
              title="Başarı Sistemi"
              description="Quiz, exam ve görevlerinizle başarılarınızı görün."
              color="violet"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Axebug</h3>
              <p className="text-gray-400 text-sm">
                Eğitim yolculuğunuzda yanınızdayız.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Giriş Yap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">İletişim</h3>
              <p className="text-gray-400 text-sm">
                Sorularınız için bizimle iletişime geçin.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2026 Axebug. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component - Dashboard card stilinde
interface FeatureCardProps {
  title: string;
  iconPath: string;
  badgeIcon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  badgeCount?: number;
}

function FeatureCard({
  title,
  iconPath,
  badgeIcon: BadgeIcon,
  badgeText,
  badgeCount,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-4xl shadow-lg hover:shadow-2xl transition-all duration-300 p-3 pt-4 pb-3 flex flex-col items-center justify-center text-center group cursor-pointer transform hover:-translate-y-2 hover:scale-105">
      <div className="mb-2 relative w-14 h-14">
        <Image
          src={iconPath}
          alt={title}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-0.5">{title}</h3>
      <p className="text-sm text-gray-400 font-normal flex items-center justify-center gap-1.5">
        <BadgeIcon className="w-3 h-3 text-gray-400" />
        <span>{badgeText}</span>
        {badgeCount !== undefined && (
          <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-200 rounded text-xs font-semibold text-gray-600 ml-0.5">
            {badgeCount}
          </span>
        )}
      </p>
    </div>
  );
}

// Benefit Card Component
interface BenefitCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: "cyan" | "lime" | "violet";
}

function BenefitCard({
  icon: Icon,
  title,
  description,
  color,
}: BenefitCardProps) {
  const colorClasses = {
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
    lime: "from-lime-500/20 to-lime-600/10 border-lime-500/30",
    violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30",
  };

  const iconColorClasses = {
    cyan: "text-cyan-400",
    lime: "text-lime-400",
    violet: "text-violet-400",
  };

  return (
    <div
      className={`bg-linear-to-br ${colorClasses[color]} border-2 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-slate-800/50 mb-4 mx-auto">
        <Icon className={`h-7 w-7 ${iconColorClasses[color]}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
      <p className="text-gray-300 text-sm text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}

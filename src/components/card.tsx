import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  subtitle?: string;
  iconPath: string;
  badgeIcon?: LucideIcon;
  badgeText?: string;
  badgeCount?: number;
  onClick?: () => void;
}

export default function Card({
  title,
  subtitle,
  iconPath,
  badgeIcon: BadgeIcon,
  badgeText,
  badgeCount,
  onClick,
}: CardProps) {
  return (
    <div
      className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-4 pt-5 pb-4 flex flex-col items-center justify-center text-center group cursor-pointer transform hover:-translate-y-2 border border-gray-50 hover:border-gray-100"
      onClick={onClick}
    >
      <div className="mb-3 relative w-16 h-16">
        <Image
          src={iconPath}
          alt={title}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
      </div>
      <h2 className="text-base font-bold text-gray-800 mb-1 tracking-wide">
        {title}
      </h2>

      {subtitle && !BadgeIcon && (
        <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
      )}

      {BadgeIcon && badgeText && (
        <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1.5">
          <BadgeIcon className="w-3.5 h-3.5 text-gray-400" />
          <span>{badgeText}</span>
          {badgeCount !== undefined && (
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-linear-to-br from-green-500 to-teal-500 rounded-full text-xs font-bold text-white ml-0.5 shadow-sm">
              {badgeCount}
            </span>
          )}
        </p>
      )}
    </div>
  );
}

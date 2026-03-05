import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yardım Asistanı | StoryMind",
  description: "AI destekli yardım asistanı",
};

export default function HelpChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

"use client";
import { useFarcaster } from "minikit-react";

export function shareAchievement(questName: string) {
  const { share } = useFarcaster();
  share({
    text: `I just completed "${questName}" on QuestQuest! 🎯🏆`,
    url: "https://questquest.vercel.app"
  });
}

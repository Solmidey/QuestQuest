"use client";
import { useFarcaster } from "minikit-react";

export default function ShareAchievement({ questName }) {
  const { share } = useFarcaster();

  return (
    <button
      onClick={() =>
        share({
          text: `I just completed "${questName}" on QuestQuest! 🎯🏆`,
          url: "https://questquest.vercel.app"
        })
      }
      className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
    >
      Share Achievement
    </button>
  );
}

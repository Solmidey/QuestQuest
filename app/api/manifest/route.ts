import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    frame: {
      name: "QuestQuest",
      version: "1",
      iconUrl: "https://quest-quest-weld.vercel.app/icon.png",
      homeUrl: "https://quest-quest-weld.vercel.app",
      subtitle: "Complete quests, earn NFT badges on Base",
      description: "QuestQuest is a daily quest platform on Base where users complete on-chain challenges, social tasks, and earn XP to climb the leaderboard. Verify your transactions on-chain and compete with others!",
      primaryCategory: "social",
      splashImageUrl: "https://quest-quest-weld.vercel.app/splash.png",
      splashBackgroundColor: "#0F172A",
      screenshotUrls: [
        "https://quest-quest-weld.vercel.app/screenshot1.png",
        "https://quest-quest-weld.vercel.app/screenshot2.png"
      ],
      imageUrl: "https://quest-quest-weld.vercel.app/preview.png",
      heroImageUrl: "https://quest-quest-weld.vercel.app/hero.png",
      tags: ["quests", "gaming", "nft", "rewards", "base"],
      tagline: "Level up with daily quests.",
      buttonTitle: "Start Questing",
      ogTitle: "QuestQuest - Quests on Base",
      ogDescription: "I'm completing daily quests and earning NFT badges on Base! Join me on QuestQuest.",
      ogImageUrl: "https://quest-quest-weld.vercel.app/og-image.png"
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}

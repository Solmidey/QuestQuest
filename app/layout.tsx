import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "QuestQuest - Daily Quests & NFT Rewards",
  description: "Complete daily quests and earn NFT rewards on Base",
  openGraph: {
    title: "QuestQuest - Daily Quests & NFT Rewards",
    description: "Complete daily quests and earn NFT rewards on Base",
    images: ["/og-image.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_URL || 'https://quest-quest-weld.vercel.app'}/api/og`,
    "fc:frame:button:1": "Start Questing",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": process.env.NEXT_PUBLIC_URL || 'https://quest-quest-weld.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

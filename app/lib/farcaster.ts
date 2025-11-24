"use client";

export function shareAchievement(questName: string) {
  // Placeholder until minikit-react is available
  const shareText = `I just completed the quest: ${questName}!`;
  const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
  
  if (typeof window !== 'undefined') {
    window.open(shareUrl, '_blank');
  }
  
  return { share: () => window.open(shareUrl, '_blank') };
}

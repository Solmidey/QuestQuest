"use client";

export default function ShareAchievement({ questName }: { questName: string }) {
  const handleShare = () => {
    const shareText = `I just completed the quest: ${questName}!`;
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
    
    if (typeof window !== 'undefined') {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
    >
      Share on Farcaster
    </button>
  );
}

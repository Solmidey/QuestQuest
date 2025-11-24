"use client";

export default function ShareAchievement({ questName }: { questName: string }) {
  return (
    <button 
      onClick={() => alert('Share feature coming soon!')}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Share Achievement
    </button>
  );
}

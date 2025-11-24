import React from 'react';
import { Share2, Download, Check } from 'lucide-react';
import { FARCASTER_SHARE_URL } from '../constants';
import { BadgeMetadata } from '../types';

interface BadgeRewardProps {
  metadata: BadgeMetadata;
  dayLabel: string;
}

export const BadgeReward: React.FC<BadgeRewardProps> = ({ metadata, dayLabel }) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    const text = `I just completed the daily quests on QuestQuest and earned the ${dayLabel} Badge! 🛡️✨\n\nBuild your on-chain streak on Base.`;
    const url = `${FARCASTER_SHARE_URL}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent("https://questquest-demo.vercel.app")}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://questquest-demo.vercel.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
      <div className="relative group perspective-1000">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-fast"></div>
        
        {/* Card */}
        <div className="relative w-72 h-96 bg-slate-900 rounded-xl border border-slate-700 p-6 flex flex-col items-center justify-between shadow-2xl transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12 preserve-3d animate-float">
          <div className="text-center">
            <h3 className="text-base-blue font-bold tracking-wider text-sm mb-2">DAILY BADGE</h3>
            <h2 className="text-2xl font-bold text-white mb-4">{metadata.name}</h2>
          </div>
          
          <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-inner mb-4 relative overflow-hidden">
             {/* Abstract Badge Art */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
             <span className="text-4xl">🏆</span>
             <div className="absolute bottom-0 right-0 w-full h-1/2 bg-white/10 backdrop-blur-sm transform rotate-45 translate-y-4"></div>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span>Day ID</span>
              <span className="font-mono text-white">{metadata.attributes.find(a => a.trait_type === 'Day')?.value}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Quests</span>
              <span className="font-mono text-green-400">COMPLETE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3 w-full max-w-xs">
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50 active:scale-95"
        >
          <Share2 className="w-5 h-5" />
          Share on Farcaster
        </button>
        
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 px-6 rounded-xl font-medium transition-colors"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Download className="w-5 h-5" />}
          {copied ? "Link Copied" : "Copy App Link"}
        </button>
      </div>
    </div>
  );
};
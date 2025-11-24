"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet, Zap, Trophy, Sparkles, ChevronDown, LogOut, ArrowRightLeft, Users, Twitter, MessageSquare, Star, CheckCircle, Calendar, Award, Crown, TrendingUp } from "lucide-react";

const generateDailyTasks = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / 1000 / 60 / 60 / 24);
  
  const allTasks = {
    defi: [
      { id: 1, name: "Swap on Uniswap", description: "Make a swap of at least $10 on Uniswap", icon: "ArrowRightLeft", xp: 100, protocol: "Uniswap", link: "https://app.uniswap.org" },
      { id: 2, name: "Bridge to Base", description: "Bridge assets from Ethereum to Base", icon: "TrendingUp", xp: 150, protocol: "Base Bridge", link: "https://bridge.base.org" },
      { id: 3, name: "Provide Liquidity", description: "Add liquidity to any pool on Aerodrome", icon: "Zap", xp: 200, protocol: "Aerodrome", link: "https://aerodrome.finance" },
      { id: 4, name: "Lend on Aave", description: "Supply any asset to Aave v3 on Base", icon: "TrendingUp", xp: 120, protocol: "Aave", link: "https://app.aave.com" },
      { id: 5, name: "Swap on Curve", description: "Trade stablecoins on Curve Finance", icon: "ArrowRightLeft", xp: 100, protocol: "Curve", link: "https://curve.fi" },
      { id: 6, name: "Trade on Sushiswap", description: "Execute a trade on Sushiswap", icon: "ArrowRightLeft", xp: 100, protocol: "Sushiswap", link: "https://www.sushi.com" },
      { id: 7, name: "Stake on Stargate", description: "Stake STG tokens on Stargate", icon: "Star", xp: 180, protocol: "Stargate", link: "https://stargate.finance" },
      { id: 8, name: "Mint on Moonwell", description: "Borrow against your assets on Moonwell", icon: "TrendingUp", xp: 150, protocol: "Moonwell", link: "https://moonwell.fi" }
    ],
    social: [
      { id: 101, name: "Follow Base on Twitter", description: "Follow @base on Twitter and like their latest post", icon: "Twitter", xp: 50, protocol: "Twitter", link: "https://twitter.com/base" },
      { id: 102, name: "Join Base Discord", description: "Join the official Base Discord server", icon: "MessageSquare", xp: 50, protocol: "Discord", link: "https://discord.gg/buildonbase" },
      { id: 103, name: "Share Your Journey", description: "Tweet about your Base experience with #BuildOnBase", icon: "Twitter", xp: 75, protocol: "Twitter", link: "https://twitter.com/intent/tweet?text=Building%20on%20%40base%20%23BuildOnBase" },
      { id: 104, name: "Explore Base Ecosystem", description: "Visit base.org and explore 3 dApps", icon: "Users", xp: 60, protocol: "Base.org", link: "https://base.org/ecosystem" },
      { id: 105, name: "Read Base Docs", description: "Read the Base developer documentation", icon: "MessageSquare", xp: 80, protocol: "Base Docs", link: "https://docs.base.org" },
      { id: 106, name: "Join Base Community Call", description: "Attend or watch a Base community call recording", icon: "Users", xp: 100, protocol: "Community", link: "https://base.org" }
    ],
    exploration: [
      { id: 201, name: "Mint an NFT", description: "Mint an NFT on any Base marketplace", icon: "Star", xp: 120, protocol: "OpenSea", link: "https://opensea.io" },
      { id: 202, name: "Play a Game", description: "Try any on-chain game on Base", icon: "Zap", xp: 100, protocol: "Base Games", link: "https://base.org/ecosystem" },
      { id: 203, name: "Use a DeFi Tool", description: "Try DeFi analytics on DefiLlama", icon: "TrendingUp", xp: 80, protocol: "DefiLlama", link: "https://defillama.com/chain/Base" },
      { id: 204, name: "Explore Base Names", description: "Check out Base Names (Basename)", icon: "Users", xp: 90, protocol: "Basename", link: "https://www.base.org/names" },
      { id: 205, name: "Try a DEX Aggregator", description: "Use 1inch to find the best swap rates", icon: "ArrowRightLeft", xp: 110, protocol: "1inch", link: "https://app.1inch.io" }
    ]
  };

  const defiTasks = [allTasks.defi[dayOfYear % allTasks.defi.length], allTasks.defi[(dayOfYear + 1) % allTasks.defi.length]];
  const socialTasks = [allTasks.social[dayOfYear % allTasks.social.length], allTasks.social[(dayOfYear + 2) % allTasks.social.length]];
  const explorationTasks = [allTasks.exploration[dayOfYear % allTasks.exploration.length]];

  return [...defiTasks, ...socialTasks, ...explorationTasks];
};

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = { ArrowRightLeft, TrendingUp, Zap, Star, Twitter, MessageSquare, Users };
  return icons[iconName] || Zap;
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [tasks, setTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState(new Set<number>());
  const [userXP, setUserXP] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const leaderboard = [
    { rank: 1, address: "0x1234...5678", xp: 4500, tasksCompleted: 45 },
    { rank: 2, address: "0x8765...4321", xp: 4200, tasksCompleted: 42 },
    { rank: 3, address: "0xabcd...efgh", xp: 3800, tasksCompleted: 38 },
    { rank: 4, address: "0x9999...1111", xp: 3500, tasksCompleted: 35 },
    { rank: 5, address: "0x2222...3333", xp: 3200, tasksCompleted: 32 }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    if (isConnected) {
      const dailyTasks = generateDailyTasks();
      setTasks(dailyTasks);
      const saved = localStorage.getItem('completedTasks');
      const savedXP = localStorage.getItem('userXP');
      if (saved) setCompletedTasks(new Set(JSON.parse(saved)));
      if (savedXP) setUserXP(parseInt(savedXP));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isConnected]);

  const completeTask = (taskId: number, xp: number) => {
    const newCompleted = new Set(completedTasks);
    newCompleted.add(taskId);
    setCompletedTasks(newCompleted);
    const newXP = userXP + xp;
    setUserXP(newXP);
    localStorage.setItem('completedTasks', JSON.stringify([...newCompleted]));
    localStorage.setItem('userXP', newXP.toString());
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-blue-300">{rank}</span>;
  };

  if (isConnected) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white p-6">
        <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .task-card { animation: slideIn 0.5s ease-out forwards; }`}</style>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div><h1 className="text-4xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent mb-2">Daily Quests</h1><div className="flex items-center gap-2 text-blue-200"><Calendar className="w-4 h-4" /><span className="text-sm">{today}</span></div></div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl border border-blue-400/30 p-4"><div className="text-blue-200 text-sm mb-1">Your XP</div><div className="text-3xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">{userXP}</div></div>
              <button onClick={() => setShowLeaderboard(!showLeaderboard)} className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center gap-2"><Trophy className="w-5 h-5" /><span className="hidden md:inline">Leaderboard</span></button>
              <button onClick={() => disconnect()} className="px-4 py-4 bg-red-500/20 hover:bg-red-500/30 rounded-2xl transition-all flex items-center gap-2"><LogOut className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-full h-3 overflow-hidden border border-white/10"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500" style={{ width: `${(completedTasks.size / tasks.length) * 100}%` }} /></div>
          <div className="text-blue-200 text-sm mt-2">{completedTasks.size} of {tasks.length} quests completed today</div>
        </div>
        {showLeaderboard && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl border border-blue-400/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"><div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-black flex items-center gap-3"><Trophy className="w-8 h-8 text-yellow-400" />Leaderboard</h2><button onClick={() => setShowLeaderboard(false)} className="text-blue-200 hover:text-white text-2xl">×</button></div><div className="space-y-3">{leaderboard.map((user, idx) => (<div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02] ${user.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-400/30' : 'bg-white/5 border border-white/10'}`}><div className="w-12 h-12 flex items-center justify-center font-bold text-xl">{getRankIcon(user.rank)}</div><div className="flex-1"><div className="font-bold text-lg">{user.address}</div><div className="text-blue-200 text-sm">{user.tasksCompleted} quests completed</div></div><div className="text-right"><div className="text-2xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">{user.xp}</div><div className="text-blue-200 text-sm">XP</div></div></div>))}</div></div></div>
        )}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">{tasks.map((task, idx) => { const Icon = getIcon(task.icon); const isCompleted = completedTasks.has(task.id); return (<div key={task.id} className="task-card group relative bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:border-blue-400/50 transition-all duration-500 hover:scale-105" style={{ animationDelay: `${idx * 0.1}s` }}>{isCompleted && <div className="absolute top-4 right-4"><CheckCircle className="w-6 h-6 text-green-400" /></div>}<div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 ${!isCompleted && 'group-hover:scale-110'} transition-transform duration-300`}><Icon className="w-8 h-8" /></div><div className="mb-2"><span className="text-xs px-3 py-1 bg-blue-500/20 rounded-full text-blue-200">{task.protocol}</span></div><h3 className="text-xl font-bold mb-2">{task.name}</h3><p className="text-blue-200 text-sm mb-4 leading-relaxed">{task.description}</p><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /><span className="font-bold text-yellow-400">+{task.xp} XP</span></div>{isCompleted ? (<button disabled className="px-4 py-2 bg-green-500/20 rounded-xl text-green-400 font-semibold cursor-not-allowed">Completed</button>) : (<button onClick={() => { window.open(task.link, '_blank'); completeTask(task.id, task.xp); }} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">Start Quest</button>)}</div></div>); })}</div>
        <div className="max-w-7xl mx-auto mt-12 text-center"><div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl border border-blue-400/30"><p className="text-blue-200 text-sm">🔄 New quests in {24 - new Date().getHours()} hours</p></div></div>
      </div>
    );
  }

  const parallaxOffset = scrollY * 0.5;
  const glowX = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100;
  const glowY = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 100;

  return (<div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-x-hidden"><style>{`* { scroll-behavior: smooth; } @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } } @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } } .float-animation { animation: float 6s ease-in-out infinite; } .glow-effect { box-shadow: 0 0 40px rgba(0, 82, 255, 0.3), 0 0 80px rgba(0, 82, 255, 0.2); } .shimmer-bg { background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%); background-size: 1000px 100%; animation: shimmer 3s infinite; }`}</style><div className="fixed inset-0 opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 82, 255, 0.3) 0%, transparent 50%)` }} /><div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 float-animation" style={{ top: "10%", left: "10%", animationDelay: "0s", transform: `translate(${parallaxOffset}px, ${parallaxOffset}px)` }} /><div className="absolute w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 float-animation" style={{ top: "60%", right: "15%", animationDelay: "2s", transform: `translate(-${parallaxOffset}px, -${parallaxOffset}px)` }} /><div className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-10 float-animation" style={{ bottom: "10%", left: "50%", animationDelay: "4s" }} /></div><nav className="relative z-20 flex justify-between items-center p-6 backdrop-blur-sm"><div className="flex items-center space-x-2"><div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center glow-effect"><Zap className="w-6 h-6" /></div><h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">QuestQuest</h1></div><button onClick={() => connect({ connector: connectors[0] })} className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"><div className="shimmer-bg absolute inset-0" /><div className="relative flex items-center space-x-2"><Wallet className="w-5 h-5" /><span>Connect Wallet</span></div></button></nav><main className="relative z-10 container mx-auto px-6 pt-20 pb-32"><div className="max-w-4xl mx-auto text-center"><div className="mb-8" style={{ transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg)`, transition: "transform 0.1s ease-out" }}><h2 className="text-7xl md:text-8xl font-black mb-4 leading-tight"><span className="inline-block bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">Complete Quests.</span><br /><span className="inline-block bg-gradient-to-r from-indigo-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">Earn Rewards.</span></h2></div><p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">Join the ultimate on-chain quest platform on Base. Complete challenges, mint achievement NFTs, and showcase your Web3 journey.</p><div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"><button onClick={() => connect({ connector: connectors[0] })} className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 w-full sm:w-auto"><div className="shimmer-bg absolute inset-0" /><div className="relative flex items-center justify-center space-x-2"><Sparkles className="w-6 h-6" /><span>Start Your Quest</span></div></button><button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto">Learn More</button></div><div className="flex justify-center"><div className="animate-bounce"><ChevronDown className="w-8 h-8 text-blue-300" /></div></div></div><div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">{[{ icon: <Zap className="w-8 h-8" />, title: "Lightning Fast", description: "Built on Base for instant transactions and minimal fees", delay: "0s" }, { icon: <Trophy className="w-8 h-8" />, title: "Achievement NFTs", description: "Mint permanent proof of your accomplishments on-chain", delay: "0.2s" }, { icon: <Sparkles className="w-8 h-8" />, title: "Community Driven", description: "Join thousands of questers building the future together", delay: "0.4s" }].map((feature, idx) => (<div key={idx} className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:bg-white/10" style={{ animation: "float 6s ease-in-out infinite", animationDelay: feature.delay, transform: `translateY(${parallaxOffset * 0.2}px)` }}><div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" /><div className="relative"><div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 glow-effect group-hover:scale-110 transition-transform duration-300">{feature.icon}</div><h3 className="text-2xl font-bold mb-3 text-blue-100">{feature.title}</h3><p className="text-blue-200/80 leading-relaxed">{feature.description}</p></div></div>))}</div><div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">{[{ value: "10K+", label: "Active Questers" }, { value: "50K+", label: "Quests Completed" }, { value: "25K+", label: "NFTs Minted" }, { value: "100%", label: "On-Chain" }].map((stat, idx) => (<div key={idx} className="text-center"><div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent mb-2">{stat.value}</div><div className="text-blue-300 text-sm md:text-base">{stat.label}</div></div>))}</div></main><div className="relative z-10 text-center pb-20"><div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl border border-blue-400/30"><p className="text-blue-200">Ready to start your journey? Connect your wallet to begin</p></div></div></div>);
}

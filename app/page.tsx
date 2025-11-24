"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet, Zap, Trophy, Sparkles, ChevronDown, LogOut } from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const glowX = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100;
  const glowY = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 100;

  if (isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white p-8">
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">QuestQuest</h1>
          <div className="flex items-center gap-4">
            <span className="text-blue-200">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            <button
              onClick={() => disconnect()}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </nav>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to QuestQuest!</h2>
          <p className="text-blue-200">Your quests will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <style>{`
        * { scroll-behavior: smooth; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .glow-effect {
          box-shadow: 0 0 40px rgba(0, 82, 255, 0.3), 0 0 80px rgba(0, 82, 255, 0.2);
        }
        .shimmer-bg {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 82, 255, 0.3) 0%, transparent 50%)` }} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 float-animation" style={{ top: "10%", left: "10%", animationDelay: "0s", transform: `translate(${parallaxOffset}px, ${parallaxOffset}px)` }} />
        <div className="absolute w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 float-animation" style={{ top: "60%", right: "15%", animationDelay: "2s", transform: `translate(-${parallaxOffset}px, -${parallaxOffset}px)` }} />
        <div className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-10 float-animation" style={{ bottom: "10%", left: "50%", animationDelay: "4s" }} />
      </div>

      <nav className="relative z-20 flex justify-between items-center p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center glow-effect">
            <Zap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">QuestQuest</h1>
        </div>
        
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
        >
          <div className="shimmer-bg absolute inset-0" />
          <div className="relative flex items-center space-x-2">
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </div>
        </button>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8" style={{ transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg)`, transition: "transform 0.1s ease-out" }}>
            <h2 className="text-7xl md:text-8xl font-black mb-4 leading-tight">
              <span className="inline-block bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">Complete Quests.</span>
              <br />
              <span className="inline-block bg-gradient-to-r from-indigo-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">Earn Rewards.</span>
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the ultimate on-chain quest platform on Base. Complete challenges, mint achievement NFTs, and showcase your Web3 journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 w-full sm:w-auto"
            >
              <div className="shimmer-bg absolute inset-0" />
              <div className="relative flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6" />
                <span>Start Your Quest</span>
              </div>
            </button>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              Learn More
            </button>
          </div>

          <div className="flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-blue-300" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
          {[
            { icon: <Zap className="w-8 h-8" />, title: "Lightning Fast", description: "Built on Base for instant transactions and minimal fees", delay: "0s" },
            { icon: <Trophy className="w-8 h-8" />, title: "Achievement NFTs", description: "Mint permanent proof of your accomplishments on-chain", delay: "0.2s" },
            { icon: <Sparkles className="w-8 h-8" />, title: "Community Driven", description: "Join thousands of questers building the future together", delay: "0.4s" }
          ].map((feature, idx) => (
            <div key={idx} className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:bg-white/10" style={{ animation: "float 6s ease-in-out infinite", animationDelay: feature.delay, transform: `translateY(${parallaxOffset * 0.2}px)` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 glow-effect group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-100">{feature.title}</h3>
                <p className="text-blue-200/80 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Active Questers" },
            { value: "50K+", label: "Quests Completed" },
            { value: "25K+", label: "NFTs Minted" },
            { value: "100%", label: "On-Chain" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-blue-300 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      <div className="relative z-10 text-center pb-20">
        <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl border border-blue-400/30">
          <p className="text-blue-200">Ready to start your journey? Connect your wallet to begin</p>
        </div>
      </div>
    </div>
  );
}

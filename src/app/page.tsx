"use client";

import { useState, useEffect } from "react";
import { ModelViewer } from "@/components/ModelViewer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AutoScrollButton } from "@/components/AutoScrollButton";
import { cn } from "@/lib/utils";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Cinematic Loading Overlay */}
      <LoadingScreen onStarted={() => setIsLoaded(true)} />

      {/* Background Music */}
      <AudioPlayer url="https://files.catbox.moe/g8l0jm.mp3" />

      {/* Auto-scroll button */}
      <AutoScrollButton />

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <ModelViewer />
      </div>

      {/* Fixed Top Right GitHub Link */}
      <div className={cn(
        "fixed top-8 right-8 z-50 transition-all duration-1000 delay-1000",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}>
        <a 
          href="https://github.com/i-am-dhruv" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-4 px-5 py-2.5 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500 shadow-2xl"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
            Developer
          </span>
          <div className="w-[1px] h-4 bg-white/10 group-hover:bg-white/30 transition-colors" />
          <Github className="w-5 h-5 text-white/60 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-1000" />
        </a>
      </div>

      {/* Overlay Content Sections - Visible only when loaded */}
      <div className={cn(
        "relative z-10 pointer-events-none transition-opacity duration-1000 delay-500",
        isLoaded ? "opacity-100" : "opacity-0"
      )}>
        {/* Hero Section */}
        <header className="h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
              The Hornet
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium uppercase tracking-[0.4em] animate-pulse">
             PRINCESS OF HALLOWNEST
            </p>
          </div>
          <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll to Sequence</p>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </header>

        {/* Section 1: Identity */}
        <section className="h-screen flex items-center justify-start p-8 md:p-32">
          <div className="max-w-xl bg-white/[0.03] backdrop-blur-[10px] p-12 rounded-[3rem] border border-white/10 shadow-2xl pointer-events-auto transform transition-all hover:scale-105 hover:bg-white/[0.06] duration-700 translate-y-12">
            <span className="text-white text-xs font-bold tracking-widest uppercase mb-4 block">Identity & Origins</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">The Weaver's Daughter</h2>
            <p className="text-lg text-white/70 leading-relaxed font-light">
            Born of shadows and silk. She is the fierce, silent guardian of Hallownest, protecting its deepest secrets from those who wander in the dark.
            </p>
          </div>
        </section>

        {/* Section 2: Combat */}
        <section className="h-screen flex items-center justify-end p-8 md:p-32 text-right">
          <div className="max-w-xl bg-white/[0.03] backdrop-blur-[10px] p-12 rounded-[3rem] border border-white/10 shadow-2xl pointer-events-auto transform transition-all hover:scale-105 hover:bg-white/[0.06] duration-700">
            <span className="text-white text-xs font-bold tracking-widest uppercase mb-4 block">Combat & Agility</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Needle and Thread</h2>
            <p className="text-lg text-white/70 leading-relaxed font-light">
            A deadly, acrobatic dancer in combat. Wielding a needle and unbound silk, her strikes are swift, precise, and absolutely lethal.
            </p>
          </div>
        </section>

        {/* Section 3: Lore */}
        <section className="h-screen flex items-center justify-center p-8 md:p-32 text-center">
          <div className="max-w-2xl bg-white/[0.04] backdrop-blur-[10px] p-16 rounded-[3.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto transform transition-all hover:scale-105 duration-700">
            <span className="text-white text-xs font-bold tracking-widest uppercase mb-4 block">Personality & Lore</span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white tracking-tight">Driven by Duty</h2>
            <p className="text-xl text-white/60 leading-relaxed font-light">
            Uncompromising and mysterious. She tests the resolve of every traveler, her loyalty tied solely to the survival of her dying world.
            </p>
          </div>
        </section>

        {/* Section 4: Future */}
        <section className="h-screen flex items-center justify-start p-8 md:p-32">
          <div className="max-w-xl bg-white/[0.03] backdrop-blur-[10px] p-12 rounded-[3rem] border border-white/10 shadow-2xl pointer-events-auto transform transition-all hover:scale-105 hover:bg-white/[0.06] duration-700">
            <span className="text-white text-xs font-bold tracking-widest uppercase mb-4 block">The Upcoming Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Bound for Pharloom</h2>
            <p className="text-lg text-white/70 leading-relaxed font-light">
            Captured and taken to a distant land ruled by silk and song. A new journey awaits as she fights to ascend a haunted, shining citadel.
            </p>
          </div>
        </section>

        {/* Section 5: The Masterpiece */}
        <section className="h-[150vh] flex flex-col items-center justify-center p-8 md:p-32 text-center">
          <div className="max-w-4xl space-y-12 pointer-events-auto">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
             THE SONG OF SILK<span className="text-white">.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed">
             Discover the legacy of the fiercest warrior.
            </p>
            <div className="pt-8 flex justify-center">
              <a 
                href="https://www.hollowknight.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-12 py-5 bg-black/95 text-white font-bold uppercase tracking-[0.4em] rounded-full border border-white/10 overflow-hidden transition-all duration-500 hover:scale-110 hover:border-white/40 hover:shadow-[0_0_60px_rgba(255,255,255,0.2),0_0_100px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-colors duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/80 transition-all duration-500" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <span className="relative z-10 text-xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,1)] group-hover:scale-300 transition-all duration-300">
                  SHAW!
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-72 pb-20 px-8 text-center space-y-8 pointer-events-auto bg-transparent">
          <div className="flex justify-center items-center gap-12 text-white/40 text-xs font-bold uppercase tracking-widest">
            <a href="https://x.com/i_am_dhruv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
            <a href="https://www.linkedin.com/in/iam-dhruv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="https://github.com/i-am-dhruv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
            © 2024 THE HORNET. All Rights Reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}

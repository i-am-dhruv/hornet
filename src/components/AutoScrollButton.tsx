"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function AutoScrollButton() {
  const [isScrolling, setIsScrolling] = useState(false);
  const tween = useRef<gsap.core.Tween | null>(null);

  // Total time in seconds to scroll from top to bottom
  const SCROLL_DURATION = 45;

  const handleToggleScroll = () => {
    if (isScrolling) {
      tween.current?.kill();
      // onKill will set isScrolling to false
    } else {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = scrollHeight - viewportHeight;
      
      // If already at the bottom, scroll to top first then start
      if (window.scrollY >= maxScroll - 1) {
        gsap.to(window, {
          scrollTo: 0,
          duration: 2,
          ease: 'power2.inOut',
          onComplete: () => startScrolling(maxScroll)
        });
      } else {
        startScrolling(maxScroll);
      }
    }
  };

  const startScrolling = (maxScroll: number) => {
    setIsScrolling(true);
    const remainingScroll = maxScroll - window.scrollY;
    const remainingFraction = maxScroll > 0 ? remainingScroll / maxScroll : 0;

    tween.current = gsap.to(window, {
      scrollTo: {
        y: "max",
        autoKill: true, // Automatically stop if user scrolls manually
      },
      duration: SCROLL_DURATION * remainingFraction,
      ease: "none",
      onComplete: () => setIsScrolling(false),
      onKill: () => setIsScrolling(false),
    });
  }

  // Cleanup effect to kill tween on component unmount
  useEffect(() => {
    return () => {
      tween.current?.kill();
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-4">
      <button
        onClick={handleToggleScroll}
        className={cn(
          "group flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105",
          isScrolling ? "opacity-100" : "opacity-60"
        )}
      >
        <div className="relative flex items-center justify-center w-6 h-6">
          {isScrolling ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          )}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
          {isScrolling ? "Scrolling" : "Auto-Scroll"}
        </span>
      </button>
    </div>
  );
}

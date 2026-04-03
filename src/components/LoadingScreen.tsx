"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onStarted?: () => void;
}

export function LoadingScreen({ onStarted }: LoadingScreenProps) {
  const { progress, active } = useProgress();
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visualProgress, setVisualProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setVisualProgress(progress);
    
    if (progress === 100 && !active) {
      setIsReady(true);
    }
  }, [progress, active]);

  const handleBegin = () => {
    setFadeOut(true);
    // Dispatch custom event to start audio
    window.dispatchEvent(new CustomEvent('start-background-audio'));
    if (onStarted) onStarted();
    setTimeout(() => setShouldRender(false), 1200);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ease-in-out",
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-[-60px] animate-pulse rounded-full border border-white/10" />
        <div className="absolute inset-[-120px] animate-pulse rounded-full border border-white/5 delay-700" />
        
        <div className="relative z-10 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[0.6em] text-white">
              THE HORNET
            </h1>
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {!isReady ? (
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-[2px] w-80 overflow-hidden rounded-full bg-white/10">
                <div
                  className="absolute left-0 h-full bg-white transition-all duration-700 ease-out shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  style={{ width: `${visualProgress}%` }}
                />
              </div>
              <div className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">
                <span className="animate-pulse">Gathering Silk</span>
                <span className="tabular-nums text-white/70">{Math.round(progress)}%</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleBegin}
              className="group relative px-12 py-4 bg-transparent transition-all duration-500 hover:scale-110"
            >
              <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-white/50 transition-colors" />
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 text-xs font-black uppercase tracking-[0.8em] text-white/80 group-hover:text-white transition-colors">
                Begin Journey
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

    
'use client'

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface FlowingLoaderProps {
  onComplete: () => void;
}

const loadingTexts = [
  "Preparing your personalized flow environment...",
  "Analyzing your identity patterns...",
  "Configuring your neural pathways for success...",
  "Eliminating decision fatigue triggers...",
  "Setting up your automatic action systems...",
  "Optimizing your environment for flow state...",
  "Calibrating reward visualization systems...",
  "Your transformation space is ready..."
];

export const FlowingLoader = ({ onComplete }: FlowingLoaderProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= loadingTexts.length) {
          clearInterval(textInterval);
          setTimeout(onComplete, 2000);
          return prev;
        }
        return nextIndex;
      });
    }, 6000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (loadingTexts.length * 80); // 8 seconds * 10 updates per second
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-zen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        <div className="space-y-6">
          <div className="w-16 h-16 mx-auto animate-zen-pulse">
            <div className="w-full h-full rounded-full bg-gradient-primary animate-glow"></div>
          </div>

          <h2 className="text-3xl font-light text-foreground">
            Creating Your Flow State
          </h2>

          <div className="h-20 flex items-center justify-center">
            <p
              key={currentTextIndex}
              className="text-lg text-muted-foreground animate-flow-in"
            >
              {loadingTexts[currentTextIndex]}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          {loadingTexts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${index <= currentTextIndex ? 'bg-primary' : 'bg-muted'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
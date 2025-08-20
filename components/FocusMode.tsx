'use client'

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, X, CheckCircle } from "lucide-react";

const distractions = [
  "Social Media",
  "News",
  "YouTube",
  "Shopping",
  "Overthinking",
  "Perfectionism",
  "What if scenarios",
  "Comparing to others"
];

interface FocusModeProps {
  identity: string;
}

export const FocusMode = ({ identity }: FocusModeProps) => {
  const [blockedDistractions, setBlockedDistractions] = useState<Set<string>>(new Set());
  const [focusTime, setFocusTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setFocusTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleDistraction = (distraction: string) => {
    setBlockedDistractions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(distraction)) {
        newSet.delete(distraction);
      } else {
        newSet.add(distraction);
      }
      return newSet;
    });
  };

  const startFocusMode = () => {
    setIsActive(true);
    setFocusTime(0);
  };

  const endFocusMode = () => {
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 bg-gradient-zen border-0 shadow-zen">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-medium text-foreground">Focus Protection</h3>
          </div>
          <p className="text-muted-foreground">
            A {identity} says NO to distractions and YES to what matters.
          </p>
        </div>

        {isActive ? (
          <div className="text-center space-y-4">
            <div className="text-6xl font-mono text-primary animate-zen-pulse">
              {formatTime(focusTime)}
            </div>
            <div className="space-y-2">
              <p className="text-lg text-foreground">Focus Mode Active</p>
              <p className="text-sm text-muted-foreground">
                {blockedDistractions.size} distractions blocked
              </p>
            </div>
            <Button
              onClick={endFocusMode}
              variant="outline"
              className="bg-background/50 hover:bg-destructive/10 hover:text-destructive transition-zen"
            >
              End Focus Session
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-foreground">Choose what to block:</h4>
              <div className="flex flex-wrap gap-2">
                {distractions.map((distraction) => {
                  const isBlocked = blockedDistractions.has(distraction);
                  return (
                    <Badge
                      key={distraction}
                      variant={isBlocked ? "default" : "outline"}
                      className={`
                        cursor-pointer transition-zen px-3 py-2 text-sm
                        ${isBlocked
                          ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                          : 'bg-background/50 hover:bg-primary/10 border-border'
                        }
                      `}
                      onClick={() => toggleDistraction(distraction)}
                    >
                      {isBlocked && <X className="w-3 h-3 mr-1" />}
                      {distraction}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={startFocusMode}
              disabled={blockedDistractions.size === 0}
              className="w-full bg-gradient-primary hover:shadow-glow transition-zen text-lg py-6"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Focus Mode
            </Button>
          </>
        )}

        <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Focus is saying NO to 1000 good things to say YES to the great ones.</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
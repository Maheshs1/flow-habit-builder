'use client'

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";
import { Play, Pause, SkipForward, Timer } from "lucide-react";

interface Activity {
  duration: number;
  title: string;
  subtitle: string;
  description: string;
  mantra: string;
  color: string;
  gradient: string;
  emoji: string;
}

const activities: Activity[] = [
  {
    duration: 2,
    title: "Quick Start",
    subtitle: "2-Minute Rule",
    description: "Just begin. The hardest part is starting. No pressure, just action.",
    mantra: "I am someone who starts immediately",
    color: "text-green-400",
    gradient: "from-green-500/20 via-emerald-500/10 to-green-500/20",
    emoji: "🚀"
  },
  {
    duration: 5,
    title: "Momentum Build",
    subtitle: "5-Minute Focus",
    description: "Feel the flow beginning. Your brain wants to continue once started.",
    mantra: "I am gaining unstoppable momentum",
    color: "text-blue-400",
    gradient: "from-blue-500/20 via-cyan-500/10 to-blue-500/20",
    emoji: "⚡"
  },
  {
    duration: 10,
    title: "Deep Engagement",
    subtitle: "10-Minute Flow",
    description: "Enter the zone. Distractions fade away. This is your natural state.",
    mantra: "I am fully immersed in my purpose",
    color: "text-purple-400",
    gradient: "from-purple-500/20 via-violet-500/10 to-purple-500/20",
    emoji: "🎯"
  },
  {
    duration: 30,
    title: "Identity Embodiment",
    subtitle: "30-Minute Mastery",
    description: "You ARE this person now. This is who you naturally are.",
    mantra: "This is simply who I am",
    color: "text-amber-400",
    gradient: "from-amber-500/20 via-orange-500/10 to-amber-500/20",
    emoji: "👑"
  }
];

interface ActivityFlowProps {
  identity: string;
  onFlowComplete: () => void;
}

export const ActivityFlow = ({ identity, onFlowComplete }: ActivityFlowProps) => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(activities[0].duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activity = activities[currentActivity];
  const totalTime = activity.duration * 60;
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;
  const overallProgress = ((currentActivity + (totalTime - timeRemaining) / totalTime) / activities.length) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !isCompleted) {
      handleActivityComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, isCompleted, isPaused]);

  const handleActivityComplete = () => {
    setIsCompleted(true);
    setIsActive(false);
    setIsPaused(false);

    // Trigger confetti with activity-specific colors
    const colors = currentActivity === 0 ? ['#22c55e', '#10b981'] :
      currentActivity === 1 ? ['#3b82f6', '#06b6d4'] :
        currentActivity === 2 ? ['#8b5cf6', '#a855f7'] :
          ['#f59e0b', '#f97316'];

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.2
    });

    setTimeout(() => {
      if (currentActivity < activities.length - 1) {
        setCurrentActivity(prev => prev + 1);
        setTimeRemaining(activities[currentActivity + 1].duration * 60);
        setIsCompleted(false);
      } else {
        onFlowComplete();
      }
    }, 3000);
  };

  const startActivity = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseActivity = () => {
    setIsPaused(true);
  };

  const resumeActivity = () => {
    setIsPaused(false);
  };

  const skipActivity = () => {
    handleActivityComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-zen flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <Card className={`p-8 m-0 bg-gradient-to-br ${activity.gradient} backdrop-blur-lg border-border/20 shadow-2xl`}>
          <div className="space-y-8">
            {/* Overall Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    Phase {currentActivity + 1} of {activities.length}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Overall Progress: {Math.round(overallProgress)}%
                  </span>
                </div>
                <div className="flex gap-2">
                  {activities.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${index < currentActivity ? 'bg-green-500' :
                        index === currentActivity ? 'bg-primary animate-pulse' :
                          'bg-muted'
                        }`}
                    />
                  ))}
                </div>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            {/* Activity Header */}
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-6xl animate-zen-pulse flex justify-center">
                  {activity.emoji}
                  <h1 className={`text-5xl font-light ${activity.color}`}>
                    {activity.title}
                  </h1>
                </div>
                <h2 className="text-2xl font-light text-muted-foreground">
                  {activity.subtitle}
                </h2>
              </div>

              <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Timer Display */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className={`text-8xl font-light ${activity.color} transition-all duration-300`}>
                  {formatTime(timeRemaining)}
                </div>

                <div className="max-w-lg mx-auto space-y-3">
                  <Progress value={progress} className="h-4" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Started</span>
                    <span>{activity.duration} minutes</span>
                  </div>
                </div>
              </div>

              {/* Identity Mantra */}
              <Card className="p-6 bg-background/30 backdrop-blur-sm border-border/30">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Active Mantra</span>
                  </div>
                  <p className="text-xl font-light text-foreground italic">
                    "{activity.mantra}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Repeat this as you work, {identity}
                  </p>
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isActive && !isCompleted && (
                <Button
                  onClick={startActivity}
                  size="lg"
                  className="px-8 py-6 text-lg gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start as {identity}
                </Button>
              )}

              {isActive && !isPaused && (
                <>
                  <Button
                    onClick={pauseActivity}
                    variant="outline"
                    size="lg"
                    className="px-6 py-6 text-lg gap-2"
                  >
                    <Pause className="w-5 h-5" />
                    Pause
                  </Button>
                  <Button
                    onClick={skipActivity}
                    variant="ghost"
                    size="lg"
                    className="px-6 py-6 text-lg gap-2"
                  >
                    <SkipForward className="w-5 h-5" />
                    Complete Early
                  </Button>
                </>
              )}

              {isActive && isPaused && (
                <Button
                  onClick={resumeActivity}
                  size="lg"
                  className="px-8 py-6 text-lg gap-2"
                >
                  <Play className="w-5 h-5" />
                  Resume Flow
                </Button>
              )}

              {isCompleted && (
                <div className="text-center space-y-4 animate-flow-in">
                  <div className="text-6xl animate-zen-pulse">✨</div>
                  <h3 className="text-2xl font-light text-foreground">
                    {currentActivity < activities.length - 1
                      ? "Phase Complete! Ascending to next level..."
                      : "Transformation Complete!"
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    {currentActivity < activities.length - 1
                      ? `Moving to ${activities[currentActivity + 1].title}...`
                      : "You have embodied your new identity."
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            {isActive && !isCompleted && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/20 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    {isPaused ? 'Paused' : 'Active Session'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Eye, Play, Pause, Plus, Volume2 } from "lucide-react";
import { useLoFiAudio } from "@/hooks/useLoFiAudio";

interface Reward {
  id: string;
  title: string;
  description: string;
  category: 'physical' | 'mental' | 'emotional' | 'social';
}

const defaultRewards: Reward[] = [
  {
    id: '1',
    title: 'Energy Boost',
    description: 'Feel the surge of natural energy flowing through your body',
    category: 'physical'
  },
  {
    id: '2',
    title: 'Mental Clarity',
    description: 'Experience crystal-clear thinking and sharp focus',
    category: 'mental'
  },
  {
    id: '3',
    title: 'Confidence Wave',
    description: 'Feel the warm glow of accomplishment and self-respect',
    category: 'emotional'
  },
  {
    id: '4',
    title: 'Progress Pride',
    description: 'Visualize your future self thanking you for this moment',
    category: 'social'
  }
];

export const RewardVisualization = () => {
  const [activeReward, setActiveReward] = useState<string | null>(null);
  const [customReward, setCustomReward] = useState("");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [customRewards, setCustomRewards] = useState<Reward[]>([]);
  const { startLoFi, stopLoFi } = useLoFiAudio();

  const addCustomReward = () => {
    if (customReward.trim()) {
      const reward: Reward = {
        id: Date.now().toString(),
        title: 'Custom Reward',
        description: customReward.trim(),
        category: 'emotional'
      };
      setCustomRewards(prev => [...prev, reward]);
      setCustomReward("");
    }
  };

  const startVisualization = (rewardId: string) => {
    const reward = allRewards.find(r => r.id === rewardId);
    if (!reward) return;

    setActiveReward(rewardId);
    setIsVisualizing(true);

    // Start Lo-Fi audio based on category
    startLoFi(reward.category);

    // Auto-stop after 30 seconds
    setTimeout(() => {
      setIsVisualizing(false);
      setActiveReward(null);
      stopLoFi();
    }, 30000);
  };

  const stopVisualization = () => {
    setIsVisualizing(false);
    setActiveReward(null);
    stopLoFi();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-red-100 text-red-800 border-red-200';
      case 'mental': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'emotional': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'social': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const allRewards = [...defaultRewards, ...customRewards];
  const activeRewardData = allRewards.find(r => r.id === activeReward);

  return (
    <Card className="p-6 w-screen h-screen bg-gradient-primary border-0 shadow-glow text-primary-foreground">
      <div className="space-y-6 w-full h-full">
        <div className="text-center space-y-2 whitespace-pre-line">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-2xl font-medium">Reward Visualization</h3>
          </div>
          <p className="text-primary-foreground/80 whitespace-pre-line">
            Feel the reward WHILE doing the activity, not after.
          </p>
        </div>

        {isVisualizing && activeRewardData ? (
          <div className="text-center space-y-6 animate-zen-pulse">
            <div className="text-6xl animate-glow">✨</div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/70">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm">Lo-Fi playing...</span>
            </div>
            <div className="space-y-3">
              <h4 className="text-2xl font-medium">{activeRewardData.title}</h4>
              <p className="text-lg whitespace-pre-line text-primary-foreground/90 leading-relaxed">
                {activeRewardData.description}
              </p>
              <Badge className={`${getCategoryColor(activeRewardData.category)} border`}>
                {activeRewardData.category}
              </Badge>
            </div>
            <Button
              onClick={stopVisualization}
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-zen"
            >
              <Pause className="w-4 h-4 mr-2" />
              Stop Visualization
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Choose a reward to visualize:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allRewards.map((reward) => (
                  <Button
                    key={reward.id}
                    onClick={() => startVisualization(reward.id)}
                    variant="outline"
                    className="h-auto p-4 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-zen text-left"
                  >
                    <div className="flex items-start gap-3 w-full">
                      <Play className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium">{reward.title}</h5>
                          <Badge className={`text-xs ${getCategoryColor(reward.category)} border`}>
                            {reward.category}
                          </Badge>
                        </div>
                        <p className="text-sm whitespace-pre-line text-primary-foreground/80 text-left">
                          {reward.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-medium">Add your own reward visualization:</h4>
              <div className="flex gap-2">
                <Textarea
                  value={customReward}
                  onChange={(e) => setCustomReward(e.target.value)}
                  placeholder="Describe how you want to feel while doing the activity..."
                  className="flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:ring-2 focus:ring-primary-foreground/50 transition-zen resize-none"
                  rows={2}
                />
                <Button
                  onClick={addCustomReward}
                  size="icon"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground transition-zen"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-primary-foreground/80 italic text-center">
            "Dopamine flows when you anticipate the reward, not when you receive it."
          </p>
        </div>
      </div>
    </Card>
  );
};
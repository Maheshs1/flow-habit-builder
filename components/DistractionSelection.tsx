'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Tv, Coffee, MessageCircle, Instagram, Youtube, ShoppingBag, Gamepad2 } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

interface Distraction {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: 'digital' | 'social' | 'consumption' | 'entertainment';
}

const distractions: Distraction[] = [
  {
    id: 'phone',
    name: 'Phone/Social Media',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Endless scrolling through feeds and notifications',
    category: 'digital'
  },
  {
    id: 'tv',
    name: 'TV/Streaming',
    icon: <Tv className="w-6 h-6" />,
    description: 'Binge-watching shows and movies',
    category: 'entertainment'
  },
  {
    id: 'snacking',
    name: 'Mindless Snacking',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Eating when not hungry, stress eating',
    category: 'consumption'
  },
  {
    id: 'messaging',
    name: 'Chatting/Texting',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Constant messaging and group chats',
    category: 'social'
  },
  {
    id: 'instagram',
    name: 'Instagram/TikTok',
    icon: <Instagram className="w-6 h-6" />,
    description: 'Short-form video addiction',
    category: 'digital'
  },
  {
    id: 'youtube',
    name: 'YouTube Rabbit Holes',
    icon: <Youtube className="w-6 h-6" />,
    description: 'Getting lost in recommended videos',
    category: 'entertainment'
  },
  {
    id: 'shopping',
    name: 'Online Shopping',
    icon: <ShoppingBag className="w-6 h-6" />,
    description: 'Browsing and impulse buying',
    category: 'consumption'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: <Gamepad2 className="w-6 h-6" />,
    description: 'Extended gaming sessions',
    category: 'entertainment'
  }
];

interface DistractionSelectionProps {
  identity: string;
  onComplete: (selectedDistractions: Distraction[]) => void;
}

export const DistractionSelection = ({ identity, onComplete }: DistractionSelectionProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Identify Your Distractions",
    "Understanding the Impact",
    "Commitment to Avoidance"
  ];

  const handleToggleDistraction = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({
        top: 0
      })
    } else {
      const selected = distractions.filter(d => selectedIds.has(d.id));
      // onComplete(selected);
      redirect(`/avoidanceStrategy?distractions=${selected.map(distraction => distraction.id).join(',')}`, RedirectType.push)
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const selectedCount = selectedIds.size;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'digital': return 'from-blue-500/20 to-cyan-500/20';
      case 'social': return 'from-green-500/20 to-emerald-500/20';
      case 'consumption': return 'from-purple-500/20 to-violet-500/20';
      case 'entertainment': return 'from-orange-500/20 to-amber-500/20';
      default: return 'from-gray-500/20 to-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-zen flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="p-8 bg-background/20 backdrop-blur-lg border-border/20">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <h1 className="text-4xl font-light text-foreground">
                {steps[currentStep]}
              </h1>

              {currentStep === 0 && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  As a {identity}, what pulls you away from your true path? Select your biggest distractions.
                </p>
              )}

              {currentStep === 1 && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  You've identified {selectedCount} distractions. These are the enemies of your {identity} identity.
                </p>
              )}

              {currentStep === 2 && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ready to eliminate these distractions and become the {identity} you're meant to be?
                </p>
              )}
            </div>

            {/* Content */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {distractions.map((distraction) => {
                  const isSelected = selectedIds.has(distraction.id);
                  return (
                    <Card
                      key={distraction.id}
                      className={`
                        p-6 cursor-pointer transition-all duration-300 hover:scale-105
                        bg-gradient-to-br ${getCategoryColor(distraction.category)}
                        ${isSelected ? 'ring-2 ring-primary shadow-glow' : 'hover:shadow-zen'}
                      `}
                      onClick={() => handleToggleDistraction(distraction.id)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="p-3 rounded-lg bg-primary/10">
                            {distraction.icon}
                          </div>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => { }}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-foreground">
                            {distraction.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {distraction.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {currentStep === 1 && selectedCount > 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {distractions.filter(d => selectedIds.has(d.id)).map((distraction) => (
                    <Card key={distraction.id} className="p-6 bg-destructive/10 border-destructive/20">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-destructive/20">
                          {distraction.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-foreground">{distraction.name}</h3>
                          <p className="text-sm text-muted-foreground">{distraction.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-muted/50">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-medium text-foreground">
                      These distractions are stealing your {identity} identity
                    </h3>
                    <p className="text-muted-foreground">
                      Every moment spent on these is a moment not spent becoming who you're meant to be.
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <Card className="p-8 bg-gradient-primary text-center">
                <div className="space-y-6">
                  <div className="text-6xl animate-zen-pulse">🎯</div>
                  <h3 className="text-3xl font-semibold text-white ">
                    Your commitment as a {identity}
                  </h3>
                  <p className="text-xl text-white opacity-70 max-w-2xl mx-auto">
                    "I choose my identity over instant gratification. I am stronger than my distractions."
                  </p>
                </div>
              </Card>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="px-12 py-6 text-lg"
                disabled={currentStep === 0 && selectedCount === 0}
              >
                {currentStep === 0 && selectedCount === 0 ? 'Select at least one distraction' :
                  currentStep < steps.length - 1 ? 'Continue' : 'Create Avoidance Plan'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
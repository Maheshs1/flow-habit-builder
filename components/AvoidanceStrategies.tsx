'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Shield, Target, Zap } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";


interface Distraction {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

interface AvoidanceStrategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
  timeToImplement: string;
  icon: React.ReactNode;
}

const getAvoidanceStrategy = (distractionId: string): AvoidanceStrategy => {

  const strategies: Record<string, AvoidanceStrategy> = {
    phone: {
      id: 'phone',
      title: 'Phone Freedom Protocol',
      description: 'Create physical and digital barriers to mindless phone usage',
      timeToImplement: '2 minutes',
      icon: <Shield className="w-5 h-5" />,
      steps: [
        'Place phone in another room or drawer',
        'Turn on Do Not Disturb mode',
        'Remove social media apps from home screen',
        'Set specific times for checking messages',
        'Use airplane mode during focus sessions'
      ]
    },
    tv: {
      id: 'tv',
      title: 'Screen Discipline System',
      description: 'Transform your entertainment consumption into intentional choices',
      timeToImplement: '3 minutes',
      icon: <Target className="w-5 h-5" />,
      steps: [
        'Hide the TV remote in inconvenient location',
        'Unplug streaming devices',
        'Set a specific viewing schedule',
        'Choose content beforehand, not while browsing',
        'Create a "no-screen" zone in your workspace'
      ]
    },
    snacking: {
      id: 'snacking',
      title: 'Mindful Consumption Reset',
      description: 'Replace mindless eating with intentional nourishment',
      timeToImplement: '5 minutes',
      icon: <Zap className="w-5 h-5" />,
      steps: [
        'Remove trigger foods from immediate reach',
        'Prepare healthy alternatives in advance',
        'Drink water before eating anything',
        'Set designated eating times',
        'Practice the 5-minute hunger check'
      ]
    },
    messaging: {
      id: 'messaging',
      title: 'Communication Boundaries',
      description: 'Control when and how you engage with messages',
      timeToImplement: '3 minutes',
      icon: <Shield className="w-5 h-5" />,
      steps: [
        'Turn off all message notifications',
        'Set specific times for checking messages',
        'Use auto-replies explaining your response time',
        'Leave non-essential group chats',
        'Put messaging apps in hard-to-reach folders'
      ]
    },
    instagram: {
      id: 'instagram',
      title: 'Social Media Detox',
      description: 'Break the infinite scroll addiction cycle',
      timeToImplement: '2 minutes',
      icon: <Target className="w-5 h-5" />,
      steps: [
        'Log out of all accounts',
        'Delete apps from phone completely',
        'Use website blockers on all devices',
        'Replace with productive alternatives',
        'Find an accountability partner'
      ]
    },
    youtube: {
      id: 'youtube',
      title: 'Intentional Learning',
      description: 'Transform random watching into purposeful education',
      timeToImplement: '4 minutes',
      icon: <Zap className="w-5 h-5" />,
      steps: [
        'Clear watch history and turn off recommendations',
        'Subscribe only to educational channels',
        'Set a specific learning goal before opening',
        'Use timer for maximum watch time',
        'Take notes while watching to stay engaged'
      ]
    },
    shopping: {
      id: 'shopping',
      title: 'Purchase Control System',
      description: 'Eliminate impulse buying and mindless browsing',
      timeToImplement: '3 minutes',
      icon: <Shield className="w-5 h-5" />,
      steps: [
        'Remove saved payment methods from browsers',
        'Uninstall shopping apps',
        'Create a 24-hour rule for all purchases',
        'Make a specific shopping list before browsing',
        'Block shopping websites during work hours'
      ]
    },
    gaming: {
      id: 'gaming',
      title: 'Gaming Discipline',
      description: 'Control gaming time and make it intentional',
      timeToImplement: '5 minutes',
      icon: <Target className="w-5 h-5" />,
      steps: [
        'Set specific gaming hours in advance',
        'Use parental controls or time limits',
        'Keep gaming devices in inconvenient locations',
        'Find offline hobbies to replace gaming time',
        'Join communities focused on productive activities'
      ]
    }
  };

  return strategies[distractionId] || strategies.phone;
};

interface AvoidanceStrategiesProps {
  identity: string;
  selectedDistractions: Distraction[];
  onComplete: () => void;
}

export const AvoidanceStrategies = ({ identity, selectedDistractions, onComplete }: AvoidanceStrategiesProps) => {
  const [completedStrategies, setCompletedStrategies] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const totalStrategies = selectedDistractions.length;
  const completedCount = completedStrategies.size;
  const progress = (completedCount / totalStrategies) * 100;

  const handleStrategyComplete = (strategyId: string) => {
    setCompletedStrategies(prev => new Set([...prev, strategyId]));
  };

  const handleContinue = () => {
    if (completedCount === totalStrategies) {
      redirect('/flow', RedirectType.push);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-zen md:p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-background/20 backdrop-blur-lg border-border/20">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Strategies: {completedCount} of {totalStrategies} complete</span>
                  <span>{Math.round(progress)}% Ready</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <h1 className="text-4xl font-light text-foreground">
                Your Avoidance Arsenal
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Implement these strategies now. Each one makes you stronger as a {identity}.
              </p>
            </div>

            {/* Strategies */}
            <div className="space-y-4">
              <Accordion type="multiple" className="space-y-4">
                {selectedDistractions.map((distraction) => {
                  const strategy = getAvoidanceStrategy(distraction.id);
                  const isCompleted = completedStrategies.has(strategy.id);

                  return (
                    <AccordionItem
                      key={strategy.id}
                      value={strategy.id}
                      className="border-0"
                    >
                      <Card className={`
                        transition-all duration-300
                        ${isCompleted ? 'bg-green-500/10 border-green-500/20' : 'bg-background/50 border-border/20'}
                      `}>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="flex items-center gap-4 w-full">
                            <div className={`
                              p-3 rounded-lg transition-colors
                              ${isCompleted ? 'bg-green-500/20' : 'bg-primary/10'}
                            `}>
                              {isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : strategy.icon}
                            </div>

                            <div className="flex-1 text-left">
                              <div className="flex items-center justify-between w-full">
                                <div>
                                  <h3 className="text-lg font-medium text-foreground">
                                    {strategy.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {strategy.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm text-muted-foreground">
                                    {strategy.timeToImplement}
                                  </span>
                                  {isCompleted && (
                                    <div className="text-green-600 font-medium text-sm">
                                      ✓ Complete
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4">
                            <div className="pl-4 border-l-2 border-primary/20">
                              <h4 className="font-medium text-foreground mb-3">
                                Implementation Steps:
                              </h4>
                              <div className="space-y-2">
                                {strategy.steps.map((step, index) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                      {index + 1}
                                    </span>
                                    <p className="text-sm text-muted-foreground">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {!isCompleted && (
                              <Button
                                onClick={() => handleStrategyComplete(strategy.id)}
                                className="w-full"
                                variant="outline"
                              >
                                Mark as Implemented
                              </Button>
                            )}
                          </div>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            {/* Completion Status */}
            {completedCount > 0 && (
              <Card className="p-6 bg-gradient-primary text-center">
                <div className="space-y-4">
                  <div className="text-4xl animate-zen-pulse">
                    {completedCount === totalStrategies ? '🛡️' : '⚡'}
                  </div>
                  <h3 className="text-2xl font-light text-foreground">
                    {completedCount === totalStrategies
                      ? `Your environment is optimized, ${identity}!`
                      : `${completedCount} strategies active`
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    {completedCount === totalStrategies
                      ? 'Your distractions are eliminated. You are ready for deep work.'
                      : `${totalStrategies - completedCount} more strategies to complete your defense system.`
                    }
                  </p>
                </div>
              </Card>
            )}

            {/* Continue Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="px-12 py-6 text-lg"
                disabled={completedCount !== totalStrategies}
              >
                {completedCount === totalStrategies
                  ? 'Begin 2-5-10-30 Flow'
                  : `Complete ${totalStrategies - completedCount} more strategies`
                }
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
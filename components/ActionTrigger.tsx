'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Target } from "lucide-react";

interface Action {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'instant' | 'timed' | 'completion';
}

const defaultActions: Action[] = [
  {
    id: 'meditation',
    title: 'Breathe & Center',
    description: 'No thinking. Just breathe.',
    duration: '2 min',
    type: 'timed'
  },
  {
    id: 'movement',
    title: 'Move Your Body',
    description: 'Any movement counts.',
    duration: '5 min',
    type: 'timed'
  },
  {
    id: 'read',
    title: 'Read One Page',
    description: 'Feed your mind.',
    duration: '3 min',
    type: 'completion'
  },
  {
    id: 'create',
    title: 'Create Something',
    description: 'Express yourself.',
    duration: '10 min',
    type: 'timed'
  }
];

interface ActionTriggerProps {
  identity: string;
  onStartFlow?: () => void;
}

export const ActionTrigger = ({ identity, onStartFlow }: ActionTriggerProps) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const handleActionStart = (actionId: string) => {
    setActiveAction(actionId);
    // Auto-complete after a moment to simulate the Zeigarnik effect
    setTimeout(() => {
      setCompletedActions(prev => new Set([...prev, actionId]));
      setActiveAction(null);
    }, 3000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'instant': return <Zap className="w-5 h-5" />;
      case 'timed': return <Clock className="w-5 h-5" />;
      case 'completion': return <Target className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-flow border-0 shadow-zen">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-medium text-foreground">
            What does a {identity} do right now?
          </h3>
          <p className="text-flow-foreground/80">
            No overthinking. Choose and act within 5 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultActions.map((action) => {
            const isActive = activeAction === action.id;
            const isCompleted = completedActions.has(action.id);

            return (
              <Button
                key={action.id}
                onClick={() => handleActionStart(action.id)}
                disabled={isActive}
                variant="outline"
                className={`
                  h-auto p-6 bg-background/50 backdrop-blur-sm border-0 
                  hover:bg-primary/10 hover:shadow-zen transition-zen text-left
                  ${isActive ? 'animate-glow bg-primary/20' : ''}
                  ${isCompleted ? 'bg-green-50 border-green-200' : ''}
                `}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                    {getIcon(action.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{action.title}</h4>
                      <span className="text-sm text-muted-foreground">{action.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                    {isActive && (
                      <div className="text-sm text-primary font-medium">In progress...</div>
                    )}
                    {isCompleted && (
                      <div className="text-sm text-green-600 font-medium">✓ Incomplete (return later)</div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {onStartFlow && (
          <Button
            size="lg"
            variant="outline"
            className="w-full py-6 text-lg font-medium bg-gradient-primary"
            onClick={onStartFlow}
          >
            Begin 2-5-10-30 Flow Sequence
          </Button>
        )}

        <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground italic text-center">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </p>
        </div>
      </div>
    </Card>
  );
};
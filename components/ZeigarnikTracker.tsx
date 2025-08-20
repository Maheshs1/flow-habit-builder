'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Plus, RotateCcw } from "lucide-react";

interface IncompleteTask {
  id: string;
  title: string;
  addedAt: Date;
  magnetism: number; // 1-5 scale of mental pull
}

export const ZeigarnikTracker = () => {
  const [incompleteTasks, setIncompleteTasks] = useState<IncompleteTask[]>([
    {
      id: '1',
      title: 'Chapter 3 of productivity book',
      addedAt: new Date(),
      magnetism: 4
    },
    {
      id: '2',
      title: 'Piano practice session',
      addedAt: new Date(),
      magnetism: 3
    }
  ]);
  const [newTask, setNewTask] = useState("");

  const addIncompleteTask = () => {
    if (newTask.trim()) {
      const task: IncompleteTask = {
        id: Date.now().toString(),
        title: newTask.trim(),
        addedAt: new Date(),
        magnetism: Math.floor(Math.random() * 3) + 3 // Random 3-5
      };
      setIncompleteTasks(prev => [...prev, task]);
      setNewTask("");
    }
  };

  const removeTask = (id: string) => {
    setIncompleteTasks(prev => prev.filter(task => task.id !== id));
  };

  const getMagnetismColor = (level: number) => {
    switch (level) {
      case 5: return "bg-red-500";
      case 4: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 2: return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getMagnetismText = (level: number) => {
    switch (level) {
      case 5: return "Extremely magnetic";
      case 4: return "Highly magnetic";
      case 3: return "Moderately magnetic";
      case 2: return "Somewhat magnetic";
      default: return "Low magnetism";
    }
  };

  return (
    <Card className="p-6 bg-gradient-flow border-0 shadow-zen">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-medium text-foreground">Mental Magnets</h3>
          </div>
          <p className="text-muted-foreground">
            Incomplete tasks that pull your mind back. Use the Zeigarnik effect to your advantage.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Leave something intentionally incomplete..."
              className="flex-1 border-0 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 transition-zen"
              onKeyPress={(e) => e.key === 'Enter' && addIncompleteTask()}
            />
            <Button
              onClick={addIncompleteTask}
              size="icon"
              className="bg-primary hover:bg-primary/80 transition-zen"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {incompleteTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-4 bg-background/50 rounded-lg backdrop-blur-sm hover:bg-background/70 transition-zen group"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getMagnetismColor(task.magnetism)} text-white border-0`}
                    >
                      {getMagnetismText(task.magnetism)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Added {task.addedAt.toLocaleDateString()} • Your brain wants to complete this
                  </p>
                </div>

                <Button
                  onClick={() => removeTask(task.id)}
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-zen hover:bg-destructive/10 hover:text-destructive"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground italic text-center">
            "The human brain is wired to seek completion. Use this as your advantage."
          </p>
        </div>
      </div>
    </Card>
  );
};
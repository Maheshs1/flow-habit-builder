'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, RedirectType } from "next/navigation";

interface IdentityAffirmationProps {
  onIdentitySet: (identity: string) => void;
}

export const IdentityAffirmation = ({ onIdentitySet }: IdentityAffirmationProps) => {
  const [identity, setIdentity] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (identity.trim()) {
      redirect(`/distractions?identity=${identity}`, RedirectType.push);
    }
    // if (identity.trim()) {
    //   setIsConfirmed(true);
    //   onIdentitySet(identity);
    // }
  };

  if (isConfirmed) {
    return (
      <Card className="p-8 bg-gradient-zen border-0 shadow-zen animate-flow-in">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4 animate-zen-pulse">✨</div>
          <h2 className="text-2xl font-medium text-foreground">
            You are a <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">{identity}</span>
          </h2>
          <p className="text-muted-foreground">
            Your environment is now designed to support this identity.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-zen border-0 shadow-zen">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-medium text-foreground">Who are you becoming?</h2>
          <p className="text-muted-foreground">
            Define your identity to create the right environment for habits to flow naturally.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <span className="text-lg text-muted-foreground">I am a</span>
            <Input
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              placeholder="runner, reader, meditator..."
              className="text-lg border-2 p-2 py-6 border-gray-300 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 transition-zen"
              onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
            />
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!identity.trim()}
            className="w-full bg-gradient-primary hover:shadow-glow transition-zen text-lg py-6"
          >
            Embody This Identity
          </Button>
        </div>
      </div>
    </Card>
  );
};
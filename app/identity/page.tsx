import zenHero from "@/zen-hero.jpg";
import { ActionTrigger } from '@/components/ActionTrigger'
import { ActivityFlow } from '@/components/ActivityFlow'
import { AvoidanceStrategies } from '@/components/AvoidanceStrategies'
import { DistractionSelection } from '@/components/DistractionSelection'
import { FlowingLoader } from '@/components/FlowingLoader'
import { FocusMode } from '@/components/FocusMode'
import { IdentityAffirmation } from '@/components/IdentityAffirmation'
import { RewardVisualization } from '@/components/RewardVisualization'
import { ZeigarnikTracker } from '@/components/ZeigarnikTracker'
import React from 'react'

const FocusModePage = () => {
  return (
    <div className="min-h-screen bg-gradient-zen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/zen-hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />

        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
          <div className="space-y-4 animate-flow-in">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-foreground">
              Flow
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Stop tracking habits. Start becoming the person who naturally does them.
            </p>
          </div>

          <div className="bg-background/20 backdrop-blur-lg rounded-2xl md:p-8 shadow-zen animate-flow-in border border-border/20">
            <IdentityAffirmation />
          </div>
        </div>
      </div>
      {/* <ZeigarnikTracker /> */}
      {/* <ActionTrigger /> */}
      {/* <FlowingLoader /> */}
      {/* <DistractionSelection /> */}
      {/* <AvoidanceStrategies  /> */}
      {/* <ActivityFlow /> */}
      {/* <FocusMode identity='Entrepreneur' /> */}
    </div>
  )
}

export default FocusModePage
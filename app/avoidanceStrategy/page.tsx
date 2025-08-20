import { AvoidanceStrategies } from '@/components/AvoidanceStrategies'
import React from 'react'
import distractionList from '@/distractions.json';

const AvoidanceStrategy = async ({ searchParams }) => {
  const { distractions } = await searchParams;

  const distractionStrategy = distractions.split(',').map(distraction => {
    return distractionList[distraction];
  })

  return (
    <AvoidanceStrategies selectedDistractions={distractionStrategy} />
  )
}

export default AvoidanceStrategy
import { DistractionSelection } from '@/components/DistractionSelection'
import React from 'react'

const Distractions = async ({ searchParams }) => {
  const { identity } = await searchParams;
  console.log({ identity })
  return (
    <DistractionSelection identity={identity} />
  )
}

export default Distractions
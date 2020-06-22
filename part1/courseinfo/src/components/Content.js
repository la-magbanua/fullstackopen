import React from 'react'
import { Part } from './Part'

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part name={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}

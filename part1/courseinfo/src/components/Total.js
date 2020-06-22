import React from 'react'

export const Total = ({ parts }) => {
  const total = parts.reduce((acc, { exercises }) => {
    return acc + exercises
  }, 0)

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

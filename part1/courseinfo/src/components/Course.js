import React from 'react'
import { Header } from './Header'
import { Content } from './Content'
import { Total } from './Total'

export const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  )
}

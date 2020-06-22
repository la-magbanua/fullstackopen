import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return (
      <div>
        <h2>Stats</h2>
        <p>No feedback yet</p>
      </div>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good * 100) / all

  return (
    <div>
      <h2>Stats</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={`${positive}%`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="App">
      <h2>Give feedback</h2>
      <Button text="good" handleClick={() => setGood(prev => prev + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(prev => prev + 1)} />
      <Button text="bad" handleClick={() => setBad(prev => prev + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

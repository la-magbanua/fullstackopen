import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => setError(null), 3000)
    },
  })

  useEffect(() => {
    if (data) {
      const token = data.login.value
      setToken(token)
      window.localStorage.setItem('token', token)
    }
  }, [data])

  if (!show) {
    return null
  }

  const handleSubmit = e => {
    e.preventDefault()
    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>

      {error && <div>{error}</div>}

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
      />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommended'} />
    </div>
  )
}

export default App

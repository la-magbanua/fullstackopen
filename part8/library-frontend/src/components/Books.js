import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = props => {
  const client = useApolloClient()
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getBooks = async () => {
    const variables = {}
    if (genre) {
      variables.genre = genre
    }

    const { data } = await client.query({
      query: ALL_BOOKS,
      variables,
    })

    setIsLoading(false)
    return data.allBooks
  }

  useEffect(() => {
    getBooks().then(books => {
      setBooks(books)
      if (!genre) {
        setGenres([...new Set(books.map(book => book.genres).flat())])
      }
    })
  }, [genre])

  if (!props.show) {
    return null
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button type="button" onClick={() => setGenre('')}>
          all
        </button>
      </div>
    </div>
  )
}

export default Books

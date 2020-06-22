import React, { useState, useEffect } from 'react'
import { useApolloClient, gql } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const ME_QUERY = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`

const Recommended = ({ show }) => {
  const client = useApolloClient()
  const [favGenre, setFavGenre] = useState(null)
  const [recommendedBooks, setRecommendedBooks] = useState([])

  const getUserFavGenre = async () => {
    const { data } = await client.query({
      query: ME_QUERY,
    })

    return data.me.favoriteGenre
  }

  useEffect(() => {
    getUserFavGenre().then(genre => {
      setFavGenre(genre)
      client
        .query({
          query: ALL_BOOKS,
          variables: { genre },
        })
        .then(({ data }) => {
          setRecommendedBooks(data.allBooks)
        })
    })
  }, [favGenre])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre patterns</p>
      <ul>
        {recommendedBooks.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Recommended

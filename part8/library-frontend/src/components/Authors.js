import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show }) => {
  const [bornValue, setBornValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update(cache, { data: { editAuthor } }) {
      const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS })
      console.log(editAuthor)
      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: allAuthors.map(author =>
            author.name === editAuthor.name ? editAuthor : author
          ),
        },
      })
    },
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const handleSubmit = e => {
    e.preventDefault()

    editAuthor({
      variables: {
        name: selectValue,
        born: bornValue,
      },
    })

    setSelectValue('')
    setBornValue('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <select
              value={selectValue}
              onChange={e => setSelectValue(e.target.value)}
            >
              {data.allAuthors.map(author => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="born">Born</label>
            <input
              value={bornValue}
              type="text"
              onChange={e => setBornValue(Number(e.target.value))}
            />
          </div>
          <div>
            <button type="submit">update author</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors

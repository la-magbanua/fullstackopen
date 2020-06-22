import React from 'react'

export const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="search phonebook"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  )
}

import React from 'react'

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
    />
  )
}

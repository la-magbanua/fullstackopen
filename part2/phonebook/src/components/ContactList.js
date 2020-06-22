import React from 'react'

export const ContactList = ({ searchTerm, people, handleDelete }) => {
  return (
    <div>
      {searchTerm
        ? people
            .filter(person =>
              person.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(person => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))
        : people.map(person => (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person.name, person.id)}>
                delete
              </button>
            </p>
          ))}
    </div>
  )
}

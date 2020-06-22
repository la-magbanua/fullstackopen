import React, { useState, useEffect } from 'react'

import { Search } from './components/Search'
import { ContactForm } from './components/ContactForm'
import { ContactList } from './components/ContactList'
import { Notification } from './components/Notification'

import {
  createContact,
  deleteContact,
  updateContact,
  getContacts,
} from './services/contacts'

const App = () => {
  const [people, setPeople] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notif, setNotif] = useState({ message: '', type: '' })

  const checkIfPersonExists = name =>
    people.find(person => person.name.toLowerCase() === name.toLowerCase())

  const handleSubmit = e => {
    e.preventDefault()

    const personExists = checkIfPersonExists(name)

    if (personExists) {
      if (
        window.confirm(
          `${name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        updateContact(personExists.id, { name, number })
          .then(returnedContact => {
            setPeople(
              people.map(person =>
                person.id !== personExists.id ? person : returnedContact
              )
            )
            setName('')
            setNumber('')
            setNotif({
              ...notif,
              message: `Successfully updated ${returnedContact.name}'s number`,
              type: 'success',
            })
            setTimeout(() => setNotif({ message: '', type: '' }), 3000)
          })
          .catch(error => {
            setNotif({
              message: error.response.data.error,
              type: 'error',
            })
            setTimeout(() => setNotif({ message: '', type: '' }), 3000)
          })
      }
      return
    }

    createContact({ name, number })
      .then(returnedContact => {
        setPeople([...people, returnedContact])
        setName('')
        setNumber('')

        setNotif({
          ...notif,
          message: `Added ${returnedContact.name}`,
          type: 'success',
        })
        setTimeout(() => setNotif({ message: '', type: '' }), 3000)
      })
      .catch(error => {
        setNotif({
          message: error.response.data.error,
          type: 'error',
        })
        setTimeout(() => setNotif({ message: '', type: '' }), 3000)
      })
  }

  const handleDelete = (contactName, contactId) => {
    if (window.confirm(`delete ${contactName}?`)) {
      deleteContact(contactId)
      const newPeeps = people.filter(person => person.id !== contactId)
      setPeople(newPeeps)
    }
  }

  useEffect(() => {
    getContacts().then(contacts => setPeople(contacts))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add new contact</h2>
      <ContactForm
        name={name}
        number={number}
        setName={setName}
        setNumber={setNumber}
        handleSubmit={handleSubmit}
      />
      <Notification message={notif.message} type={notif.type} />
      <h2>Contacts</h2>
      <ContactList
        searchTerm={searchTerm}
        people={people}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App

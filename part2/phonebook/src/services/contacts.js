import axios from 'axios'

const BASE_URL = `/api/persons`

const getContacts = async () => {
  const res = await axios.get(BASE_URL)
  const data = res.data
  return data
}

const createContact = contact => {
  const req = axios.post(BASE_URL, contact)
  return req.then(res => res.data)
}

const updateContact = (contactId, newContactDetails) => {
  const req = axios.put(`${BASE_URL}/${contactId}`, newContactDetails)
  return req.then(res => res.data)
}

const deleteContact = contactId => {
  const req = axios.delete(`${BASE_URL}/${contactId}`)
  return req.then(res => res.data)
}

export { getContacts, createContact, deleteContact, updateContact }

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Countries } from './components/Countries'
import { SearchBar } from './components/SearchBar'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(res => {
      const mappedCountries = res.data.map(country => ({
        ...country,
        showDetails: false,
      }))
      setCountries(mappedCountries)
    })
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const res = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

      if (res.length > 10) {
        return setError('Too many results, specify another filter')
      }

      if (res.length === 1) {
        axios
          .get(
            `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${res[0].name}`
          )
          .then(({ data }) => {
            res[0].weatherDetails = data
            return res[0]
          })
          .then(data => {
            setResults([...res])
            setError(null)
          })
      } else {
        setResults(res)
        setError(null)
      }
    } else {
      setResults([])
    }
  }, [searchQuery])

  const handleShow = async countryName => {
    let resultsCopy = [...results]
    const resultIndex = resultsCopy.findIndex(
      country => country.name === countryName
    )
    let item = { ...resultsCopy[resultIndex] }
    item.showDetails = !item.showDetails

    resultsCopy[resultIndex] = item
    setResults(resultsCopy)
  }

  return (
    <div>
      <div>
        Find countries{' '}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {error && <div>{error}</div>}
      </div>
      <Countries countries={results} handleShow={handleShow} />
    </div>
  )
}

export default App

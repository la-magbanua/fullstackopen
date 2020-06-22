import React from 'react'
import { Country } from './Country'

export const Countries = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.length === 1 ? (
        <div>
          <h2>{countries[0].name}</h2>
          <div>
            <p>capital {countries[0].capital}</p>
            <p>population {countries[0].population.toLocaleString()}</p>
          </div>
          <div>
            <h3>languages</h3>
            <ul>
              {countries[0].languages.map(lang => (
                <li key={lang.name}>{lang.name}</li>
              ))}
            </ul>
          </div>
          <img
            src={countries[0].flag}
            alt={`${countries[0].name} flag`}
            style={{ width: '100px', height: '100px' }}
          />
          <div>
            <h3>Weather in {countries[0].name}</h3>
            {Object.keys(countries[0].weatherDetails).length ? (
              <div>
                <img
                  src={countries[0].weatherDetails.current.weather_icons[0]}
                  alt={
                    countries[0].weatherDetails.current.weather_descriptions[0]
                  }
                />
                <p>
                  temperature:{' '}
                  {countries[0].weatherDetails.current.weather_descriptions[0]}
                </p>
              </div>
            ) : (
              <div>loading weather info...</div>
            )}
          </div>
        </div>
      ) : (
        countries.map(country => (
          <Country
            key={country.alpha3Code}
            country={country}
            handleShow={handleShow}
          />
        ))
      )}
    </div>
  )
}

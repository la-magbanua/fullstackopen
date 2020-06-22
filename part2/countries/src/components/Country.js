import React from 'react'

export const Country = ({ handleShow, country }) => {
  return (
    <div>
      <div>
        {country.name}{' '}
        <button onClick={() => handleShow(country.name)}>show</button>
      </div>
      {country.showDetails && (
        <div>
          <div>
            <h2>{country.name}</h2>
            <div>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
            </div>
            <div>
              <h3>languages</h3>
              <ul>
                {country.languages.map(lang => (
                  <li key={lang.name}>{lang.name}</li>
                ))}
              </ul>
            </div>
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

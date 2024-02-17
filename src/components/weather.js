import React, { useEffect } from 'react'
import { useState } from 'react'
import './weather.css'
import clear from "./assets/clear.png"
import cloud from "./assets/cloud.png"
import drizzle from "./assets/drizzle.png"
import humidity from "./assets/humidity.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import wind from "./assets/wind.png"

const Weather = () => {
    const [city, setCity] = useState('')
    const [query, setQuery] = useState ('')
    const [weatherData, setWeatherData] = useState([{}])
    

    const handleSubmit = (e) => {
      setQuery(city)
      setCity('')
    }

    function handleKey(e) {
      if (e.key === 'Enter') handleSubmit(e)
    }

    useEffect (() => {
      async function fetchData () {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=927672c5617de98d5f562e32ab2ba9d1&units=metric`)
        const json = await response.json()
        setWeatherData(json)
        console.log({json})
      } catch (error) {}
      }

      if (query !=='') {
        fetchData()
        
      }
    }, [query])
    

  return (
    <div className='container'>
      <div className="search-container">
        <input type="text"
        className='input-field'
        placeholder='Enter city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKey}
        />
        <button className='search-button' type='submit' onClick={() => handleSubmit()}>Search</button>
      </div>

    {typeof weatherData.main === 'undefined' ? (
    <></>
    ) : (
      <>
      <div className='weather-data'>
      <p>Location: {weatherData.name}</p>
      <div className="weather-image">
        <img src={cloud} alt=""/>
      </div>
      <p>Temperature: {Math.round(weatherData.main.temp)} °C</p>
      <p>{weatherData.weather[0].main}</p>
      <div className="weather-variables">
        <div className="container1">
        <div className="humidity">
        <div className="humidity-image">
        <img src={humidity} alt="" />
        <p>{weatherData.main.humidity}%</p>
        </div>
        </div>
        <div className="wind">
        <div className="wind-image">
        <img src={wind} alt="" />
        <p>{weatherData.wind.speed} m/s</p>
        </div>
        </div>
        </div>
        <div className="text-wrap">
        <p>Humidity</p>
        <p>Wind Speed</p>
        </div>
        </div>
      </div>
      </>
    )}

    </div>
  )
}

export default Weather

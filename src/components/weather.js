import React, { useEffect } from 'react'
import { useState } from 'react'
import './weather.css'
import humidity from './assets/icons/humidity.png'
import wind from './assets/icons/wind.png'
import Weathercard from './weathercard'



const Weather = () => {
    const [city, setCity] = useState('')
    const [query, setQuery] = useState ('Iasi')
    const [weatherData1, setWeatherData1] = useState([{}])
    /* const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState() */
    const [location, setLocation] = useState('')
    const [country, setCountry] = useState('')
    const [forecast, setForecast] = useState([])
    
    function getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=927672c5617de98d5f562e32ab2ba9d1`)
        .then(res => res.json()).then(data => {
          console.log(data)
          setQuery(data[0].name)
          setLocation(data[0].name)
          setCountry(data[0].country)
          })
      },
      error => {
        if (error === error.PERMISSION_DENIED) {
          alert('Denied! Geolocation must be granted in order to request data!')
        }
      })
    }
    

    const handleSubmit = () => {
      setQuery(city)
      setCity('')
    }

        function handleKey(e) {
      if (e.key === 'Enter') handleSubmit(e)
    }


    useEffect (() => {
     async function fetchData () {
      try {
        const response1 = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bbda70f2fbbc4dee8f1100517240503&q=${query}&days=6&lang=en&aqi=no&alerts=no`)
        const json1 = await response1.json()
        if (response1.status === 200) {
        setWeatherData1(json1)
        console.log({json1})
        setForecast(json1.forecast.forecastday)
        console.log(json1.forecast.forecastday)
      } else return (alert('Please, provide a valid city name!'))
        } catch (error) {}
      }

      if (query !== '') {
        fetchData()
      }
    }, [query])

    return (
    <div className="main-container">
      <div className="first-container">
        <div className="search-container">
        <input type="text"
        className='input-field'
        placeholder='Enter city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKey}
        />
        <button className='search-button' type='submit' onClick={() => handleSubmit()}>Search</button>
       <p>or</p>
        <button className='location-button' type='submit' onClick={getLocation}>Use current location</button>
        <div className="current-location-data">
          <p>Current Location: {location}</p>
          <p>Country: {country}</p>
        </div>
      </div>
        
        {typeof weatherData1.current === 'undefined' ? (
    <></>
    ) : (
      <>
      <div className="current-forecast">
      <div className='weather-data'>
      <p>Location: {weatherData1.location.name}</p>
      <div className="weather-image">
         <img src={weatherData1.current.condition.icon} alt="weather-icon"/>
      </div>
      <p>Temperature: {Math.round(weatherData1.current.temp_c)} °C</p>
      <p>{weatherData1.current.condition.text}</p>
      {/* <p>{Math.round(weatherData1.list[0].main.temp_min)}°C / {Math.round(weatherData1.list[0].main.temp_max)}°C</p> */}
        <div className="weather-variables">
        <div className="container1">
        <div className="humidity">
        <div className="humidity-image">
        <img src={humidity} alt="" />
        <p>{weatherData1.current.humidity}%</p>
        </div>
        </div>
        <div className="wind">
        <div className="wind-image">
        <img src={wind} alt="" />
        <p>{weatherData1.current.wind_kph} km/h</p>
        </div>
        </div>
        </div>
        <div className="text-wrap">
        <p>Humidity</p>
        <p>Wind Speed</p>
        </div>
        </div>
        
      </div>
      
      </div>
      </>
    )}
        </div>
        <section>
          <div className="five-days">
            <p>Five days forecast</p>
          </div>
        </section>
        <div className="second-container">
        {
        forecast.map((item) => (
        <Weathercard props = {item}/>
        ))
        }
        </div>
        </div>
      )
}

export default Weather

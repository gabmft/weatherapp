import React from 'react'
import weathericon from './weathericon'
import './weathercard.css'

const Weathercard = ({props}) => {
 /*  const now = props.date */
 /* const currentDate = new Date(now * 1000) */
  
    return (
        <div className='card-container'>
      <p>{props.date}</p>
      <p>{props.day.condition.text}</p>
      {<div className="weather-image">
        <div className="image-container">
        {<img src={(props.day.condition.icon)} alt="" />}
        </div>
        <div className="temperature">
          <p>Temperature:</p>
          <p>Min / Max: {Math.round(props.day.mintemp_c)} °C / {Math.round(props.day.maxtemp_c)} °C</p>
          <p></p>
        </div>
      </div>}
    </div>
  )
}

export default Weathercard

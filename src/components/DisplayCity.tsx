import React from 'react'
import City from '../interfaces/City'
import'./DisplayCity.css'

function DisplayCity(city: City) {
    return (
        <div className="panel">
            <div>
                <img src={city.weatherIcon} alt="" ></img>
            </div>
            {city.name} 
            <br/>
            Avg Tempreture: {city.temperature}&#176;
            <br/>
            Humidity: {city.humidity}
            <br/>
            WindSeed: {city.windSpeed} 
            <br/>
            Condition: {city.weatherCondition} 
        </div>
    )
}

export default DisplayCity

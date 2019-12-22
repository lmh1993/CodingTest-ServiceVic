import React, { Component } from 'react';
import axios from 'axios';
import City from '../interfaces/City';
import DisplayCity from './DisplayCity';


class CityList extends Component<{},{cityArray: City[]}> {
    cities: any[];
    onLoadCities: JSX.Element[];
    constructor(props: Readonly<{}>) {
        super(props)
        this.state = {
            cityArray: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/weatherdata')
            .then(res => {
                this.cities = res.data;
                for (var i = 0; i < this.cities.length; i++){
                    this.setState({
                        cityArray:  this.state.cityArray.concat({
                                        id: this.cities[i].id,
                                        name: this.cities[i].name,
                                        temperature: this.cities[i].main.temp,
                                        humidity: this.cities[i].main.humidity,
                                        weatherCondition: this.cities[i].weather[0].main,
                                        weatherIcon: this.cities[i].weather[0].icon,
                                        windSpeed: this.cities[i].wind.speed
                                    })
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        this.onLoadCities = this.state.cityArray
                            .map(city => <DisplayCity key={city.id}
                                                        id={city.id}
                                                        name={city.name} 
                                                        temperature={city.temperature}
                                                        humidity={city.humidity}
                                                        windSpeed={city.windSpeed}
                                                        weatherCondition={city.weatherCondition}
                                                        weatherIcon={city.weatherIcon} />)

        return (
            <div>
                {this.onLoadCities}
            </div>
        )
    }
}

export default CityList

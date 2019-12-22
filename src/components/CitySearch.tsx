import React, { Component } from 'react'
import SearchCity from '../interfaces/SearchCity';
import axios from 'axios';
import DisplayCity from './DisplayCity';

export class CitySearch extends Component<{}, SearchCity> {
    weatherRef : React.RefObject<HTMLInputElement>;
    clicked:boolean = false;
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            error: false,
            value: '',
            suggestions: [],
            city: {
                id: null
            }
        }
        this.weatherRef = React.createRef();
    }

    getSuggestions = () => {
        this.clicked = true;
        const inputValue = this.weatherRef.current.value.trim().toLowerCase();
        axios.post('http://localhost:8080/api/weatherdata', {searchstring: inputValue})
            .then(res => {
                const found = res.data.found;
                let city = found[0];
                this.setState({
                    error: false,
                    city: {
                        id: city.id,
                        name: city.name,
                        temperature: city.main.temp,
                        humidity: city.main.humidity,
                        weatherCondition: city.weather[0].main,
                        weatherIcon: city.weather[0].icon,
                        windSpeed: city.wind.speed
                    }
                })
            })
            .catch(err => {
                this.setState({error:true})
                console.log(err);
            })
    };

    giveSuggestions = (founds: Array<string>) => {
        this.setState({
            suggestions : founds 
        })
    }

    render() {
        const { error, city } = this.state;
        let resultMarkup;
        if (this.state.city.id === null) {
            resultMarkup = <p></p>
        } else {
            if(error && this.clicked === true) {
                resultMarkup = <p>City not found, please try again</p>
            } else {
                resultMarkup = (
                    <DisplayCity    key={city.id}
                                    id={city.id}
                                    name={city.name} 
                                    temperature={city.temperature}
                                    humidity={city.humidity}
                                    windSpeed={city.windSpeed}
                                    weatherCondition={city.weatherCondition}
                                    weatherIcon={city.weatherIcon} />)
                
            }
        }
        return (
            <div>
                <input type="text" ref={this.weatherRef}/>
                <button onClick={this.getSuggestions} className="my-button">Search</button>
                {resultMarkup}
            </div>
        )
    }
}

export default CitySearch

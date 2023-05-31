import React from 'react';
import './App.css';
import Form from './Components/Form';
import Weather from './Components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';

const Api_Key = '429736441cf3572838aa10530929f7cd';

export default class App extends React.Component {
	constructor() {
		super();
		//Setting the default state values to undefined. The temperature results will be based on the city and country that the user enters.
		this.state = {
			city: undefined,
			country: undefined,
			icon: undefined,
			main: undefined,
			celsius: undefined,
			temp_max: null,
			temp_min: null,
			description: '',
			error: false,
		};
		//Types of weather icons to represent the different types of weather.
		this.weatherIcon = {
			Thunderstorm: 'wi-thunderstorm',
			Drizzle: 'wi-sleet',
			Rain: 'wi-storm-showers',
			Snow: 'wi-snow',
			Atmosphere: 'wi-fog',
			Clear: 'wi-day-sunny',
			Clouds: 'wi-day-fog',
		};
	}

	//The weather icons will display according to the degree percentage results.
	//I've used a switch statement to alternate the icons accordingly by grabbing the specific rangeID of the weather icon.
	get_WeatherIcon(icons, rangeId) {
		switch (true) {
			case rangeId >= 200 && rangeId < 232:
				this.setState({ icon: icons.Thunderstorm });
				break;
			case rangeId >= 300 && rangeId <= 321:
				this.setState({ icon: icons.Drizzle });
				break;
			case rangeId >= 500 && rangeId <= 521:
				this.setState({ icon: icons.Rain });
				break;
			case rangeId >= 600 && rangeId <= 622:
				this.setState({ icon: icons.Snow });
				break;
			case rangeId >= 701 && rangeId <= 781:
				this.setState({ icon: icons.Atmosphere });
				break;
			case rangeId === 800:
				this.setState({ icon: icons.Clear });
				break;
			case rangeId >= 801 && rangeId <= 804:
				this.setState({ icon: icons.Clouds });
				break;
			default:
				this.setState({ icon: icons.Clouds });
		}
	}

	//Convert the temperature to get celsius results. We get the celsius value by deducting 273.15
	calCelsius(temp) {
		let cell = Math.floor(temp - 273.15);
		return cell;
	}

	getWeather = async e => {
		e.preventDefault();

		const country = e.target.elements.country.value;
		const city = e.target.elements.city.value;

		if (country && city) {
			//Below I'm fetching the API for the weather results.
			const api_call = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
			);

			//The below converts the data to JSON format.
			const response = await api_call.json();

			this.setState({
				city: `${response.name}, ${response.sys.country}`,
				country: response.sys.country,
				main: response.weather[0].main,
				celsius: this.calCelsius(response.main.temp),
				temp_max: this.calCelsius(response.main.temp_max),
				temp_min: this.calCelsius(response.main.temp_min),
				description: response.weather[0].description,
				error: false,
			});

			//Setting the icons to respond to appear according to the type of weather. When it's sunny the sunny icon will appear, when it's raining the rain icon will appear etc.
			this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

			console.log(response);
		} else {
			this.setState({
				error: true,
			});
		}
	};
	render() {
		return (
			//Grabbing the data from the weather component and loading all the contents to get weather results to appear on the page.
			<div className="App">
				<Form loadweather={this.getWeather} error={this.state.error} />
				<Weather
					cityname={this.state.city}
					weatherIcon={this.state.icon}
					temp_celsius={this.state.celsius}
					temp_max={this.state.temp_max}
					temp_min={this.state.temp_min}
					description={this.state.description}
				/>
			</div>
		);
	}
}

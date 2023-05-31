import React from 'react';
import '../App.css';

//Below is my weather component. It consists of the degree temperature results based on what city and country the user inputs.
//I've passed props to grab the relevant weather details (city and country)
const Weather = props => {
	return (
		<div className="container-weather">
			<div className="Card">
				{/*The below will reveal the city name that the user types out*/}
				<h1 className="text-white py-3">{props.cityname}</h1>
				<h5 className="py-4">
					{/*The below will reveal relevant weather icons based on the city's weather*/}
					<i className={`wi ${props.weatherIcon} display-1`} />
				</h5>

				{/*The below will display the temperature celcius of the mentioned city */}
				{props.temp_celsius ? (
					<h1 className="py-2">{props.temp_celsius}&deg;</h1>
				) : null}

				{/*Display the  max and min temperature results */}
				{maxminTemp(props.temp_min, props.temp_max)}

				{/*Short weather description */}
				<h4 className="py-3">
					{props.description.charAt(0).toUpperCase() +
						props.description.slice(1)}
				</h4>
			</div>
		</div>
	);
};

export default Weather;

function maxminTemp(min, max) {
	if (max && min) {
		return (
			<h3>
				<span className="px-4">{min}&deg;</span>
				<span className="px-4">{max}&deg;</span>
			</h3>
		);
	}
}

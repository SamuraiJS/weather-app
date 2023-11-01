const icon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp .value');
const visibility = document.querySelector('.value-visibility');
const humidity = document.querySelector('.value-humidity');
const description = document.querySelector('.description');

//En un futuro actualizar la api por la de here develovper

const key = 'a9ffa9a380e98e39cca2df99ca2981b5';

const weather = {};
const weatherCode = {
      "0": "Unknown",
      "10000": "Clear, Sunny",
      "11000": "Mostly Clear",
      "11010": "Partly Cloudy",
      "11020": "Mostly Cloudy",
      "10010": "Cloudy",
      "20000": "Fog",
      "21000": "Light Fog",
      "40000": "Drizzle",
      "40010": "Rain",
      "42000": "Light Rain",
      "42010": "Heavy Rain",
      "50000": "Snow",
      "50010": "Flurries",
      "51000": "Light Snow",
      "51010": "Heavy Snow",
      "60000": "Freezing Drizzle",
      "60010": "Freezing Rain",
      "62000": "Light Freezing Rain",
      "62010": "Heavy Freezing Rain",
      "70000": "Ice Pellets",
      "71010": "Heavy Ice Pellets",
      "71020": "Light Ice Pellets",
      "80000": "Thunderstorm"
    }

if('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	alert('Su navegador no soporta geolocation')
};

function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude
	getWeather(latitude, longitude);
};

function showError(err) {
	console.log(err)
};

function getWeather(lat, lon) {
	let api = `https://api.tomorrow.io/v4/weather/realtime?location=${lat}, ${lon}&apikey=GqfaO7IwGUh2UMWo1vvPH3pSI9JHpgqg`;

	const options = {method: 'GET', headers: {accept: 'application/json'}};
	
	fetch(api, options)
  		.then(response => response.json())
  		.then(response => {
  			console.log(response);
  			weather.temp= Math.floor(response.data.values.temperature);
  			weather.iconID = getImage(String(response.data.values.weatherCode) + '0');
  			weather.visibility = response.data.values.visibility;
  			weather.humidity = response.data.values.humidity;
  			weather.description = getDescription(String(response.data.values.weatherCode) + '0');
  		})
		.then(() => {
			displayWeather();
		})
		.catch(err => console.error(err));
}


function displayWeather() {
	temp.innerText = weather.temp;
	icon.innerHTML = `<img src="${weather.iconID}">`;
	description.innerText = weather.description
	humidity.innerText = weather.humidity;
	visibility.innerText = weather.visibility;
}

function getImage(id) {
	let codesAndDescription = Object.entries(weatherCode);
	const resultId = codesAndDescription.find( code => {
		if(code[0] === id) {
			return code
		}
	})
	let codeImg = resultId.join(' ').split(' ').join('_').toLowerCase();
	const url = `https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/V2_icons/large/png/${codeImg}_large.png`;
	return url;
}


function getDescription(id) {
	let codesAndDescription = Object.entries(weatherCode);
	const result = codesAndDescription.find( code => {
		if(code[0] === id) {
			return code
		}
	})
	const description = result[1];
	return description;
}

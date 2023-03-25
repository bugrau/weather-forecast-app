import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Box() {
  const [weather, setWeather] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default white color
  const [city, setCity] = useState('');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFFFF' // Default white color
  };

  const boxStyle = {
    width: '600px',
    height: '350px',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    color: 'white',
    textAlign: 'center',
    lineHeight: '200px',
    fontSize: '24px',
    backgroundColor: backgroundColor // Match the weather condition
  };

  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=46e129a4256a320a181a9c9d5ca84ac2`)
        .then(response => {
          setWeather(response.data);
          setBackgroundColor(getBackgroundColor(response.data.weather[0].main));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [city]);

  function getBackgroundColor(weatherCondition) {
    switch (weatherCondition) {
      case 'Clear':
        return '#87CEEB'; // Light blue for clear skies
      case 'Clouds':
        return '#696969'; // Grey for cloudy skies
      case 'Rain':
        return '#1E90FF'; // Blue for rain
      case 'Snow':
        return '#F5FFFA'; // White for snow
      default:
        return '#FFFFFF'; // Default white color
    }
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <div>
          Enter city:
          <input type="text" value={city} onChange={handleCityChange} />
        </div>
        {weather.weather ? weather.weather[0].main : 'Loading...'}
      </div>
    </div>
  );
}

export default Box;

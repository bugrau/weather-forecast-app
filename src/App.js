import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Box() {
  const [weather, setWeather] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: backgroundColor
  };

  const boxStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    color: 'white',
    textAlign: 'center',
    lineHeight: '200px',
    fontSize: '24px'
  };

  useEffect(() => {
    const fs = require('fs');

    const apiKey = fs.readFileSync('C:/Users/bugra/OneDrive/Desktop/my projects/apikey.txt', 'utf8').trim();
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data);
        setBackgroundColor(getBackgroundColor(response.data.weather[0].main));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

  return (
    <div style={containerStyle}>
      <div style={{ ...boxStyle, backgroundColor: backgroundColor }}>
        {weather.weather ? weather.weather[0].main : 'Loading...'}
      </div>
    </div>
  );
}

export default Box;

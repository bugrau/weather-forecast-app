import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Box() {
  const [weather, setWeather] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('');
  const [query, setQuery] = useState('51.4,5.6');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: backgroundColor
  };

  const boxStyle = {
    width: '600px',
    height: '350px',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    color: 'white',
    textAlign: 'center',
    lineHeight: '200px',
    fontSize: '24px'
  };

  useEffect(() => {
    const pk = "[mMsgbK8xsiUHVHMlwGW9u15lhJAQtdlB3SB_5GW-d-0]";
    const url = `https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=${query}&subscription-key=${pk}`;

    axios.get(url)
      .then(response => {
        setWeather(response.data);
        setBackgroundColor(getBackgroundColor(response.data.weather[0].main));
      })
      .catch(error => {
        console.log(error);
      });
  }, [query]);

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

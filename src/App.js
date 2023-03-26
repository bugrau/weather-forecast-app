import React, { useState, useEffect } from "react";
import axios from "axios";

function Box() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [time, setTime] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const boxStyle = {
    width: "600px",
    height: "350px",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "24px",
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=46e129a4256a320a181a9c9d5ca84ac2`
      )
      .then((response) => {
        setWeather(response.data.weather);
        setTemperature(response.data.main.temp);
        setTime(
          new Date(response.data.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setBackgroundImage(getBackgroundImage(response.data.weather));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  function getBackgroundImage(weather) {
    if (!weather || !weather[0]) {
      return "";
    }
    switch (weather[0].main) {
      case "Clear":
        return "https://i.imgur.com/7jGZL51.jpg"; // Clear skies image
      case "Clouds":
        return "https://i.imgur.com/ZOROuJ7.jpg"; // Cloudy skies image
      case "Rain":
        return "https://i.imgur.com/CrRVcEz.jpg"; // Rain image
      case "Snow":
        return "https://i.imgur.com/YlN1zX0.jpg"; // Snow image
      default:
        return "";
    }
  }

  return (
    <div style={containerStyle}>
      <div style={{ ...boxStyle, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <input
          type="text"
          placeholder="Enter your city"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "none" }}
        />
        <div>
          {weather.length > 0 ? weather[0].main : "Loading..."}
          <br />
          {Math.round(temperature - 273.15)}°C
        </div>
        <div>{time}</div>
      </div>
    </div>
  );
}

export default Box;

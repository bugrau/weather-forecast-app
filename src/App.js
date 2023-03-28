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
  
    const gifMap = {
      Clear: "https://media4.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e470teggiahh9kkpgwjpwccebsbp04sf1aecatx5pdy&rid=giphy.gif&ct=g", // Clear skies GIF
      Clouds: "https://media3.giphy.com/media/5HK4TiiBeLSZq/giphy.gif?cid=ecf05e47novsr6s2toa4pvj2ht9vydsye90w71t5ze2p8z44&rid=giphy.gif&ct=g", // Cloudy skies GIF
      Rain: "https://media4.giphy.com/media/dI3D3BWfDub0Q/giphy.gif?cid=ecf05e473x8i2fh4hwtrbpeuspiuqbh9993kkmnsdb8h1xwj&rid=giphy.gif&ct=g", // Rain GIF
      Snow: "https://media3.giphy.com/media/Xi2Xu0MejhsUo/giphy.mp4?cid=ecf05e47cnk0aztddtoh1ac9pwp932hhasaqukiafrj3kowr&rid=giphy.mp4&ct=g", // Snow GIF
      Thunderstorm: "https://media3.giphy.com/media/3oEjHB1EKuujDjYFWw/giphy.gif?cid=ecf05e473ok32sd03qo593ckhzzdwndtbhy6kyn9ya0qqbg6&rid=giphy.gif&ct=g", // Thunderstorm GIF
      default: "",
    };
  
    const weatherCondition = weather[0].main;
    const gifUrl = gifMap[weatherCondition] || gifMap.default;
    return gifUrl;
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

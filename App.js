import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/weather`, {
        params: { city },
      });
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>{weather.temperature}°C</p>
          <p>{weather.description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt={weather.description}
          />
        </div>
      )}
    </div>
  );
}

export default App;

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const WEATHER_API_KEY = "your_openweathermap_api_key";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Endpoint to fetch weather for a city
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric", // Get temperature in Celsius
      },
    });

    const { main, weather, name } = response.data;

    res.json({
      city: name,
      temperature: main.temp,
      description: weather[0].description,
      icon: weather[0].icon,
    });
  } catch (error) {
    if (error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

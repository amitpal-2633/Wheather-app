const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();

const PORT = 3000;
const API_KEY = process.env.API_KEY;
app.get("/", async (req, res) => {
  const address = encodeURIComponent(req.query.address);
  const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${address}&aqi=yes`;

  try {
    const response = await axios.get(URL);
    const data = response.data;
    const cityName = data.location?.name || "Unknown";
    const temperature = data.current?.temp_c || "N/A";

    const message = `
            City Name: ${cityName}<br>
            Temperature: ${temperature}&deg;C<br>
            <!-- Sunset Time is not available in this response -->
        `;

    res.send(message);
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Unable to fetch weather data.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});

const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

router.get('/history/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    console.log("HIT HISTORY ROUTE:", symbol);
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: API_KEY,
      },
    });

    
  console.log("API Response:", JSON.stringify(response.data, null, 2));


    const rawData = response.data["Time Series (Daily)"];
    if (!rawData) {
      return res.status(404).json({ error: "Invalid symbol or no data found." });
    }

    const data = Object.entries(rawData)
      .map(([date, values]) => ({
        date,
        close: parseFloat(values["4. close"]),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching historical data." });
  }
});

module.exports = router;

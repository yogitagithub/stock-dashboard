const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});


const stockRoutes = require('./routes/stocks');
app.use('/api', stockRoutes);

const axios = require('axios');
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const PORT = process.env.PORT || 5000;


const trackedSymbols = ["AAPL", "GOOGL", "MSFT"];

setInterval(async () => {
  for (let symbol of trackedSymbols) {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: API_KEY,
        },
      });

      const quote = response.data["Global Quote"];
      console.log(`GLOBAL_QUOTE response for ${symbol}:`, JSON.stringify(response.data, null, 2));
      if (quote) {
        io.emit("stockUpdate", {
          symbol: quote["01. symbol"],
          price: parseFloat(quote["05. price"]),
          change: parseFloat(quote["09. change"]),
          changePercent: quote["10. change percent"],
        });
      }




    } catch (err) {
      console.error(`Error fetching real-time data for ${symbol}:`, err.message);
    }
  }
}, 60000);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

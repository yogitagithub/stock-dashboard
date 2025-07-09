import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import StockList from "./components/stockList";
import StockChart from "./components/stockChart";
import { getHistoricalData } from "./services/api";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {


  const [stocks, setStocks] = useState([
  { symbol: "AAPL", price: 0, change: 0, changePercent: "0%" },
  { symbol: "GOOGL", price: 0, change: 0, changePercent: "0%" },
  { symbol: "MSFT", price: 0, change: 0, changePercent: "0%" },
]);

  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getHistoricalData(selectedSymbol).then((res) => setChartData(res.data));
  }, [selectedSymbol]);

 
  useEffect(() => {
  socket.on("stockUpdate", (update) => {
    console.log("Received stock update:", update);
    setStocks((prevStocks) => {
      const exists = prevStocks.find((s) => s.symbol === update.symbol);
      if (exists) {
        return prevStocks.map((s) =>
          s.symbol === update.symbol ? update : s
        );
      }
      return [...prevStocks, update];
    });
  });

  return () => socket.disconnect();
}, []);


  return (
    <div className="App">
      <h1>Real-Time Stock Market Dashboard</h1>
      <StockList stocks={stocks} />
      <div className="chart-section">
        <select
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
        >
          {stocks.map((s) => (
            <option key={s.symbol} value={s.symbol}>
              {s.symbol}
            </option>
          ))}
        </select>
        <StockChart data={chartData} symbol={selectedSymbol} />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "./stockList.css";

export default function StockList({ stocks }) {
  return (
    <div className="stock-list">
      {stocks.map((stock) => (
        <div
          key={stock.symbol}
          className={`stock-card ${stock.change >= 0 ? "positive" : "negative"}`}
        >
          <h3>{stock.symbol}</h3>
          <p>Price: ${stock.price.toFixed(2)}</p>
          <p>
            Change: {stock.change.toFixed(2)} ({stock.changePercent})
          </p>
        </div>
      ))}
    </div>
  );
}

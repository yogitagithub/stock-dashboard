import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function StockChart({ data, symbol }) {
  const chartData = {
    labels: data.map((point) => point.date),
    datasets: [
      {
        label: `${symbol} Closing Price`,
        data: data.map((point) => point.close),
        fill: false,
        borderColor: "#3e95cd",
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}

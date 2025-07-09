import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getHistoricalData = (symbol) =>
  axios.get(`${API_BASE}/history/${symbol}`);

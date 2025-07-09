const request = require('supertest');
const express = require('express');
const stocksRouter = require('../routes/stocks');
const axios = require('axios');
jest.mock('axios'); 

const app = express();
app.use('/api', stocksRouter);

describe('GET /api/history/:symbol', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return historical data for a valid symbol', async () => {
   
    axios.get.mockResolvedValue({
      data: {
        "Time Series (Daily)": {
          "2025-07-09": {
            "4. close": "150.00"
          },
          "2025-07-08": {
            "4. close": "148.00"
          }
        }
      }
    });

    const response = await request(app).get('/api/history/MSFT');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('date');
    expect(response.body[0]).toHaveProperty('close');
  });

  it('should return 404 for an invalid symbol', async () => {
  
    axios.get.mockResolvedValue({
      data: {}
    });

    const response = await request(app).get('/api/history/INVALIDSYMBOL123');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

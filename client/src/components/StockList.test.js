import React from 'react';
import { render, screen } from '@testing-library/react';
import StockList from './stockList';

describe('StockList Component', () => {
  const mockStocks = [
    { symbol: 'AAPL', price: 150, change: 2, changePercent: '1.5%' },
    { symbol: 'GOOGL', price: 2800, change: -5, changePercent: '-0.2%' },
  ];

  it('renders stock cards with correct data', () => {
    render(<StockList stocks={mockStocks} />);

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Price: $150.00')).toBeInTheDocument();
    expect(screen.getByText('Change: 2.00 (1.5%)')).toBeInTheDocument();

    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('Price: $2800.00')).toBeInTheDocument();
    expect(screen.getByText('Change: -5.00 (-0.2%)')).toBeInTheDocument();
  });
});

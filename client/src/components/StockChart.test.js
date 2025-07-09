import React from 'react';
import { render } from '@testing-library/react';
import StockChart from './stockChart';

describe('StockChart Component', () => {
  const mockData = [
    { date: '2025-01-01', close: 100 },
    { date: '2025-01-02', close: 105 },
  ];

  it('renders chart without crashing', () => {
    const { container } = render(<StockChart data={mockData} symbol="AAPL" />);
    expect(container).toBeInTheDocument();
  });
});

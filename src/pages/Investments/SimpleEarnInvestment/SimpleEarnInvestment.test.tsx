import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { SimpleEarnInvestment } from './SimpleEarnInvestment';


it('should render SimpleEarnInvestment component', () => {
  render(<SimpleEarnInvestment />);

  const title = screen.getByText('Simple Earn');
  expect(title).toBeDefined();
})
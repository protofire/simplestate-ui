import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { SimpleEarn } from './SimpleEarn'
import React from 'react';


it('should render SimpleEarnInvestment component', () => {
  render(<SimpleEarn />);

  const title = screen.getByText('Simple Earn');
  expect(title).toBeDefined();
})
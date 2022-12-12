import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { SimpleProjectInvestment } from './SimpleProjectInvestment';

it('should render SimpleProjectInvestment component', () => {
  render(<SimpleProjectInvestment />);

  const title = screen.getByText('Proyectos');
  expect(title).toBeDefined();
})
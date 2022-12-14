

import '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { NotificationMessage } from './NotificationMessage'

it('should render NotificationMessage component', () => {
  const projectName = 'project name';
  const investmentValue = 1234;
  render(<NotificationMessage {...{projectName, investmentValue} }/>);

  expect(screen.getByText(projectName)).toBeDefined();
  expect(screen.getByText(investmentValue.toString())).toBeDefined();
});

it('should allow redirection to investments', () => {
  const projectName = 'project name';
  const investmentValue = 1234;
  render(<NotificationMessage {...{projectName, investmentValue} }/>);

  const link = screen.getByRole('link');
  expect(link.getAttribute('href')).toBe('/investments');
});
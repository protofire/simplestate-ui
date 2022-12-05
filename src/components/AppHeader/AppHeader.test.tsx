import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { useMetamask } from '../../hooks/useMetamask';
import { AppHeader } from './AppHeader'

jest.mock('../../hooks/useMetamask', () => {
  return  {
    useMetamask: jest.fn(() => ({
      connect: jest.fn(), 
      connectDefault: jest.fn(), 
      accounts: jest.fn(), 
      network: jest.fn(), 
      sitchChainTo: jest.fn() 
    }))
  }
})

it('should render AppHeader component', () => {
  render(<AppHeader />);

  const button = screen.getByText('Conectar billetera');
  expect(button).toBeDefined();
})
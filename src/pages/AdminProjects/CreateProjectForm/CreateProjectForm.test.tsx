import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { CreateProjectForm } from './CreateProjectForm';

jest.mock('../../../hooks/useContract', () => {
  return {
    useContract: jest.fn(() => ({
      sign: jest.fn(),
    }))
  }
})

jest.mock('../../../hooks/useMetamask', () => {
  return {
    useMetamask: jest.fn(() => ({
      connect: jest.fn(), 
      connectDefault: jest.fn(), 
      accounts: jest.fn(), 
      network: jest.fn(),
      sitchChainTo: jest.fn() 
    }))
  }
})

it('should render CreateProjectForm component', () => {
  const closeFn = jest.fn();
  const onCreateFn = jest.fn();
  render(<CreateProjectForm close={closeFn} onCreate={onCreateFn}/>);

  const details = screen.getByText('Detalles del proyecto');
  expect(details).toBeDefined();
})
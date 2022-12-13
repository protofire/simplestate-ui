import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { mockProjects } from '../../../mock/projects'
import { ProjectDetail } from './ProjectDetail';

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

jest.mock('../../../hooks/useContract', () => {
  return {
    useContract: jest.fn(() => ({
      sign: jest.fn(),
    }))
  }
})

it('should render ProjectDetail component', () => {
  const project = mockProjects[0];

  render(<ProjectDetail project={project}/>);

  const name = screen.getByText(project.name);
  expect(name).toBeDefined();
})
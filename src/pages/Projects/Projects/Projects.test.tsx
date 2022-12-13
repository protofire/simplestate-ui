import '@testing-library/react'
import { render, screen, waitFor } from '@testing-library/react';
import { mockProjects } from '../../../mock/projects';
import { Projects } from './Projects';

jest.mock('../../../hooks/useContract', () => {
  return {
    useContract: jest.fn(() => ({
      contract: {
        functions: {
          size: () => new Promise(() => 1),
          projects: (i: number) => new Promise(() => mockProjects[0]) 
        }
      },
    }))
  }
})

it('should render Projects component', async () => {

  const projects = render(<Projects />);

  await waitFor(() => {
    expect(screen.queryByText(mockProjects[0].name)).toBeDefined();
  })
});
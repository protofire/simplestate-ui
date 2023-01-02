import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { AdminProjects } from './AdminProjects';
import { mockProjects } from '../../mock/projects';
import React from 'react';

jest.mock('../../hooks/useContract', () => {
  return {
    useContract: jest.fn(() => ({
      sign: jest.fn(),
      contract: {
        functions: {
          size: () => new Promise(() => 1),
          projects: (i: number) => new Promise(() => mockProjects[0])
        }
      }
    }))
  }
})

it('should render AdminProjects component', () => {

  render(<AdminProjects />);

  const createBtn = screen.getByText('Crear proyecto');
  expect(createBtn).toBeDefined();
})


import '@testing-library/react'
import { render, screen } from '@testing-library/react';
import { AppTabs } from './AppTabs';

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(() => (jest.fn())),
    useParams: jest.fn(() => ({
      tabValue: ''
    })),
    useLocation: jest.fn(() => ({
      pathname: '/projects',
    })),
  }
})

it('should render AppTabs component', () => {

})
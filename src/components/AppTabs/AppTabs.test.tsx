

import '@testing-library/react'

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
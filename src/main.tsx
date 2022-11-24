import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
)

// App.tsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import AppRoutes from './routes'
import client from './client'

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppRoutes />
      </Router>
    </ApolloProvider>
  )
}

export default App

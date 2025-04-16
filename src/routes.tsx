import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorPage } from './components/pages/ErrorPage'
import GoodBye from './components/pages/GoodBye'
import Hello3 from './components/pages/Hello3'
import Hello from './components/pages/Hello'
import Main from './components/pages/Main'
import Hello4 from './components/pages/Hello4'
import FormPage from './components/pages/FormPage'
import { CustomDevidedSchemaForm } from './components/pages/CustomDevidedSchemaForm'
import { CustomUniSchemaForm } from './components/pages/CustomUniSchemaForm'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hello" element={<Hello />} />
      <Route path="/hello3" element={<Hello3 />} />
      <Route path="/hello4" element={<Hello4 />} />
      <Route path="/goodbye" element={<GoodBye />} />
      <Route path="/formPage" element={<FormPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/success" element={<div>Success Page</div>} />
      <Route
        path="/customDevidedSchemaForm"
        element={<CustomDevidedSchemaForm />}
      />
      <Route path="/customUniSchemaForm" element={<CustomUniSchemaForm />} />
    </Routes>
  )
}

export default AppRoutes

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/auth.context.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

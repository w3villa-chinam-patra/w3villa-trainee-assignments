import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path='/*' element={
          <Provider store={store}>
            <div className='app-container relative sm:block'>
              <App />
              <Toaster />
            </div>
          </Provider>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

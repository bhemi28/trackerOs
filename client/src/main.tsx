import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/global.store.ts'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './layouts/Layout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import AppRoutes from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

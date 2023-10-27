import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Files from './components/Files.jsx'
import Share from './components/Share.jsx'
import Layout from './components/Layout.jsx'

const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: '',
              element: <App />
            },
            {
              path: '/files',
              element: <Files />
            },
            {
              path: '/share',
              element: <Share />
            },
          ],
        }
      ])
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider
    router={router}
    
    />
  </React.StrictMode>,
  
)

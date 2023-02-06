import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import UserProvider from './UserProvider'

import Layout from './Layout'
import Home from './Home'
import Form from './Form'
import Table from './Table'
import Product , { productLoader } from './Product'
import ProtectedPage from './ProtectedPage'
import { Provider } from 'react-redux'

import store from './store'

const router =  createBrowserRouter([
    { path: '/', element: <Layout />, children: [
        { path: '', element: <Home /> },
        { path: 'table', element: <Table /> },
        { path: 'form', element: 
            <ProtectedPage>
              <Form />
            </ProtectedPage> },
        { path: 'product/:dataId', element: <Product />, loader: productLoader },
    ]},
])

ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
       <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
        </Provider>
    
    
)

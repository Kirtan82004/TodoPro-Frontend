import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddTodo from './components/AddTodo.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Protected from './components/AuthLayout.jsx'
import Profile from './pages/Profile.jsx'
import SubTodo from './components/SubTodo.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/dashboard',
      element: <Protected authentication><Dashboard /></Protected>
    },
    {
      path: '/add-todo',
      element: <Protected><AddTodo /></Protected>
    },
    {
      path: '/login',
      element:<Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/profile',
      element: <Protected><Profile /></Protected>
    },
    {
      path: '/sub-todo/:id',
      element: <Protected><SubTodo /></Protected>
    },

  ]
}])





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

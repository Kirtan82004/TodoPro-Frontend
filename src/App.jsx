import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Header/Header.jsx'
import { getCurrentUser } from './services/user.services.js'
import { loginSuccess, logout } from './store/authSlice.js'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        if (!token) {
          setLoading(false)
          return
        }
        const userData = await getCurrentUser()
        dispatch(loginSuccess(userData))
      } catch (error) {
        dispatch(logout())
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

    </>
  )
}

export default App

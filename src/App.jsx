import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      // If user exist
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })

      .finally(() => setLoading(false)) // This will always run, whether user exist or not.
  }, [])


  return !loading ? (
    <div className='min-h-screen'>
      <div className='w-full bg-green-200'>
        <Header />
        {/* main is a symantic tag */}

        <main>
          {/* Here comes your components */}
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  ) : null
}

export default App

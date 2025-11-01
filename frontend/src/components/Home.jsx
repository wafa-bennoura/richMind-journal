import { Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { isAuthenticated } = useAuth()
  
  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  // Otherwise show landing page
  return <Landing />
}


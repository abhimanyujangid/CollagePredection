import { useAppSelector } from '@/hooks/reduxHook'
import LandingPage from './LandingPage'
import Dashboard from '@/page/Home/Dashboard'

const MainLayout = () => {
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
  return (
    <>
    {isAuthenticated ? (
      <Dashboard />
    ) : (
      <LandingPage
      />
    )}
    </>
  )
}

export default MainLayout
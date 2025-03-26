import { useAppSelector } from '@/hooks/reduxHook'
import StudentProfile from './StudentProfile'
import CollegeAdminProfile from './CollegeAdmin/CollegeAdminProfile'

const Profile = () => {
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

    
  return (
    <>
    {
      user?.role === 'STUDENT' ?  <StudentProfile /> :<CollegeAdminProfile /> 
   }
    </>
  )
}

export default Profile
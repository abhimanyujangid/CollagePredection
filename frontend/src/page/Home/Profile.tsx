import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import StudentProfile from './StudentProfile'
import CollegeAdminProfile from './CollegeAdmin/CollegeAdminProfile'
import { useEffect } from 'react'
import { getCollegeAdminProfileAction } from '@/store/auth/collegeAdminSlice'

const Profile = () => {
   const dispatch = useAppDispatch()
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
    console.log("User", user);

useEffect(() => {
  dispatch(getCollegeAdminProfileAction())

}, [dispatch])
    
  return (
    <>
    {
      user?.role === 'STUDENT' ?  <StudentProfile /> :<CollegeAdminProfile /> 
   }
    </>
  )
}

export default Profile
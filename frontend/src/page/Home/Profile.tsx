import { useAppSelector } from '@/hooks/reduxHook'
import React from 'react'
import StudentProfile from './StudentProfile'
import CollegeAdminProfile from './CollegeAdminProfile'

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
import NavBar from '@/components/navBar/NavBar'
import { dashboardLinks } from '@/constant/data'
import { useAppDispatch } from '@/hooks/reduxHook';
import { getCurrentUserAction } from '@/store/auth/authSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'

const Dashboard = () => {

 

  return (
    <div className='main-layout px-19'>
     <NavBar data={dashboardLinks} />
     <main className='main-content w-full py-5'>
      <Outlet />
     </main>
     </div>
  )
}

export default Dashboard
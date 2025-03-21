import NavBar from '@/components/navBar/NavBar'
import { dashboardLinks } from '@/constant/data'

const Dashboard = () => {
  return (
    <div className='main-layout px-19'>
     <NavBar data={dashboardLinks} />
     <main className='main-content w-full'>
     </main>
     </div>
  )
}

export default Dashboard
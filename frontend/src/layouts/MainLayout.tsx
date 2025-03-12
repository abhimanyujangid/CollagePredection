import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import NavFooter from '../components/NavFooter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../features/auth/authSlice';
import { useAuth } from '../hooks/useAuth';

export const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useAuth();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="bg-slate-200 w-screen h-screen text-black flex flex-col lg:flex-row">

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex md:none bg-white flex-col justify-between h-screen ">
        <Navbar />
        <NavFooter
          username={user?.user?.username || 'testUser'}
          email={user?.user?.email || 'test@gmail.com'}
          avatarUrl="https://avatar.iran.liara.run/public"
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto ">

        {/* Mobile Navbar */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Page Content for Desktop */}
        <div className='hidden lg:block overflow-hiden p-4'>
          <Outlet />
        </div>

        {/* Page Content for Small Screens */}
       <div className='lg:hidden p-10 w-full overflow-y-auto'>
        <Outlet/>
       </div>


        {/* Mobile Footer (Appears only on small screens) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
          <NavFooter
            username="John Doe"
            email="HwYV6@example.com"
            avatarUrl="https://avatar.iran.liara.run/public"
          />
        </div>

      </main>
    </div>
  );
};

import { ThemeToggle } from '@/components/theme-toggle';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="auth-layout flex items-center justify-center h-screen">
    <ThemeToggle/>
    <Outlet />
  </div>
);

export default AuthLayout;

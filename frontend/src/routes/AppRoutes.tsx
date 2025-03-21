import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '@/page/Auth/Login';
import Register from '@/page/Auth/Register';
import MainLayout from '@/layouts/MainLayout';
import { ROUTES } from './Route';
import LandingPage from '@/layouts/LandingPage';
import Dashboard from '@/page/Home/Dashboard';
import Recommendation from '@/page/Home/Recommendation';
import Profile from '@/page/Home/Profile';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.AUTH} element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path={ROUTES.LOGIN} element={<Login/>} />
        <Route path={ROUTES.REGISTER} element={<Register/>} />
      </Route>

      {/* LandingPage  */}
    <Route path={ROUTES.MANPAGE} element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path={ROUTES.DASHBOARD} element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} >
      <Route path='ai' element={<Recommendation/>} />
      <Route path={ROUTES.PROFILE} element={<Profile/>} />

      </Route>
    </Route>

      {/* Protected routes */}

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
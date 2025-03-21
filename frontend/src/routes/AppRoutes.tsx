import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '@/page/Auth/Login';
import Register from '@/page/Auth/Register';
import MainLayout from '@/layouts/MainLayout';
import { ROUTES } from './Route';

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
    <Route path={ROUTES.LANDINGPAGE} element={<MainLayout />}/>

      {/* Protected routes */}

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
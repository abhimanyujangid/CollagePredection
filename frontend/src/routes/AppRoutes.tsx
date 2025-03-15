import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '@/page/Auth/Login';
import Register from '@/page/Auth/Register';
import MainLayout from '@/layouts/MainLayout';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
      </Route>

      {/* LandingPage  */}
      <Route path="/" element={<MainLayout />}/>

      {/* Protected routes */}

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
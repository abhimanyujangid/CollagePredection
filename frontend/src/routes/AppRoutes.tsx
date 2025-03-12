import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
// import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
      </Route>

      {/* Protected routes */}
      <Route path="/" element={ <MainLayout />}  >
      <Route path="/">
      </Route> 

      
      </Route>
  
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
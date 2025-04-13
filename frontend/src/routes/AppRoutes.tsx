import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '@/page/Auth/Login';
import Register from '@/page/Auth/Register';
import MainLayout from '@/layouts/MainLayout';
import { ROUTES } from './Route';
import LandingPage from '@/layouts/LandingPage';
import Dashboard from '@/page/Home/Dashboard';
import Recommendation from '@/page/Home/Recommendation/Recommendation';
import Profile from '@/page/Home/Profile';
import AddCollege from '@/page/Home/CollegeAdmin/AddCollege';
import {AdminProfile} from '@/page/Home/CollegeAdmin/AdminProfile';
import ViewCollege from '@/page/Home/CollegeAdmin/ViewCollege';
import ProtectedRoutes from './ProtectedRoutes';
import Home from '@/page/Home/Home';
import AllCollege from '@/page/Home/AllCollege';
import EngineeringCollege from '@/page/Home/EngineeringCollege';
import MedicalCollege from '@/page/Home/MedicalCollege';
import ArtsCollege from '@/page/Home/ArtsCollege';
import CommerceCollege from '@/page/Home/CommerceCollege';
import LawCollege from '@/page/Home/LawCollege';

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
      <Route path="/dashboard" element={<Home />} >
        <Route index element={<AllCollege />} />
        <Route path='engineering' element={<EngineeringCollege />} />
        <Route path='medical' element={<MedicalCollege />} />
        <Route path='arts' element={<ArtsCollege />} />
        <Route path='commerce' element={<CommerceCollege />} />
        <Route path='law' element={<LawCollege/>} />
      </Route>
      <Route path='ai' element={<Recommendation/>} />
      <Route path={ROUTES.PROFILE} element={<Profile/>} >
        <Route index element={<AdminProfile/>} />
        <Route path='add-college' element={<AddCollege/>} />
        <Route path='college-details/:collegeId' element={<ViewCollege/>} />
      </Route>

      </Route>
    </Route>

      {/* Protected routes */}

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
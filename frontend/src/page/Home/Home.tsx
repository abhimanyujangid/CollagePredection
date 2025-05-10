import DashboardSidebar from '@/components/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { Users, Stethoscope, Palette, Building2, Scale, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHook';

export interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

const Home = () => {
  
  const [activeCategory, setActiveCategory] = useState<number>(1);
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

  const categories: Category[] = [
    { id: 1, name: 'All', icon: <Building2 className="w-5 h-5" />, path: '/dashboard' },
    { id: 2, name: 'Engineering Colleges', icon: <Users className="w-5 h-5" />, path: '/dashboard/engineering' },
    { id: 3, name: 'Medical Colleges', icon: <Stethoscope className="w-5 h-5" />, path: '/dashboard/medical' },
    { id: 4, name: 'Arts Colleges', icon: <Palette className="w-5 h-5" />, path: '/dashboard/arts' },
    { id: 5, name: 'Commerce Colleges', icon: <Building2 className="w-5 h-5" />, path: '/dashboard/commerce' },
    { id: 6, name: 'Law Colleges', icon: <Scale className="w-5 h-5" />, path: '/dashboard/law' },
    { id: 7, name: 'Other Colleges', icon: <MoreHorizontal className="w-5 h-5" />, path: '#' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

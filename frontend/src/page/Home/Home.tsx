import DashboardSidebar from '@/components/DashboardSidebar'
import { Outlet } from 'react-router-dom'
import { Users, Stethoscope, Palette, Building2, Scale, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}
const Home = () => {

  const [activeCategory, setActiveCategory] = useState<number>(1);

  const categories: Category[] = [
          { id: 1, name: 'All', icon:  <Building2 className="w-5 h-5" />, path: '/dashboard/all-colleges' },
          { id: 2, name: 'Engineering Colleges', icon: <Users className="w-5 h-5" />, path: '#' },
          { id: 3, name: 'Medical Colleges', icon: <Stethoscope className="w-5 h-5" />,  path: '#'},
          { id: 4, name: 'Arts Colleges', icon: <Palette className="w-5 h-5" />, path: '#' },
          { id: 5, name: 'Commerce Colleges', icon: <Building2 className="w-5 h-5" />,  path: '#' },
          { id: 6, name: 'Law Colleges', icon: <Scale className="w-5 h-5" />,  path: '#' },
          { id: 7, name: 'Other Colleges', icon: <MoreHorizontal className="w-5 h-5" />, path: '#'},
      ];

  return (
    <div className="flex p-3">
    <DashboardSidebar 
    categories={categories} 
    setActiveCategory={setActiveCategory} 
    activeCategory={activeCategory}
    />
    <div className="flex-1 p-4">
      <Outlet />
    </div>
    </div>
  )
}

export default Home
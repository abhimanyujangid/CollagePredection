import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Define the navigation items
const navigationItems = [
  {
    name: 'Profile',
    path: '/dashboard/profile',
    key: 'profile'
  },
  {
    name: 'Add College',
    path: '/dashboard/profile/add-college',
    key: 'add-college'
  },
  {
    name: 'List of Colleges',
    path: '/dashboard/profile/list-of-colleges',
    key: 'list-colleges'
  }
];

const CollegeAdminProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${isActiveRoute(item.path) 
                  ? 'border-primary text-primary ' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'}
              `}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className='grid grid-cols-1 gap-6 mt-6'>
        <Outlet />
      </div>
    </div>
  );
};

export default CollegeAdminProfile;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, User, Users } from 'lucide-react';

const NavigationBar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/matches', icon: Heart, label: 'Matches' },
    { path: '/recommendations', icon: Users, label: 'Discover' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 scale-105' 
                  : 'text-gray-500 hover:text-blue-600 hover:scale-105'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;

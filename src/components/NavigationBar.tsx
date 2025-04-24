
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, User, Search } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Discover', path: '/discover' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center px-4 z-10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-16 py-1 rounded-md",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5", isActive && "animate-scale-in")} />
            <span className="text-xs mt-1">{item.label}</span>
            {isActive && (
              <div className="h-1 w-6 bg-primary rounded-full mt-1" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;

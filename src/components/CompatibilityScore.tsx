
import React from 'react';
import { cn } from '@/lib/utils';

interface CompatibilityScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({ 
  score, 
  size = 'md' 
}) => {
  const getColorClass = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  return (
    <div className="relative">
      <div className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold relative z-10",
        getColorClass(),
        sizeClasses[size]
      )}>
        {score}%
      </div>
      <div className={cn(
        "absolute top-0 left-0 rounded-full opacity-30",
        getColorClass(),
        sizeClasses[size],
        "animate-pulse-ring"
      )} />
    </div>
  );
};

export default CompatibilityScore;

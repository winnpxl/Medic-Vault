import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  subValue?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export function StatCard({ title, value, subValue, icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="glass-card p-3 lg:p-4 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-2 lg:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] lg:text-xs text-gray-500 font-medium mb-1 truncate">{title}</p>
          <h4 className="text-2xl lg:text-3xl font-bold">{value}</h4>
        </div>
        <div className={iconColor}>
          <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
        </div>
      </div>
      {subValue && <p className="text-[10px] lg:text-xs text-gray-500 truncate">{subValue}</p>}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}

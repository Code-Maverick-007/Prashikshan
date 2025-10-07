import React from 'react';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-200"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color }}>
            {value}
          </div>
          <div className="text-gray-400 text-sm">{title}</div>
        </div>
      </div>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
};

export default StatCard;
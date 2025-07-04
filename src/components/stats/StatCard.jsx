import React from 'react';

const StatCard = ({ title, value, className = "" }) => {
  return (
    <div className={`bg-slate-700 rounded-2xl p-6 ${className}`}>
      <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;


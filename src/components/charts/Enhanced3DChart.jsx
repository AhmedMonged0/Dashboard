import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

const Enhanced3DChart = ({ title }) => {
  const isMobile = useIsMobile();
  
  const data = [
    { name: 'Jan', value: 400, color: '#f59e0b' },
    { name: 'Feb', value: 600, color: '#f59e0b' },
    { name: 'Mar', value: 800, color: '#f59e0b' },
    { name: 'Apr', value: 1200, color: '#f59e0b' },
    { name: 'May', value: 1400, color: '#f59e0b' },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl relative overflow-hidden ${
      isMobile ? 'p-4 h-80' : 'p-6 h-96'
    }`}>
      <h3 className={`text-white font-semibold mb-4 ${
        isMobile ? 'text-lg' : 'text-xl'
      }`}>{title}</h3>
      
      {/* Chart Container */}
      <div className={`relative flex items-end justify-center ${
        isMobile ? 'h-60 gap-2' : 'h-80 gap-4'
      }`}>
        {data.map((item, index) => {
          const height = isMobile ? (item.value / maxValue) * 120 : (item.value / maxValue) * 200;
          
          return (
            <div
              key={item.name}
              className="relative flex flex-col items-center"
            >
              {/* Simple Bar */}
              <div
                className={`bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg mb-2 transition-all duration-1000 ${
                  isMobile ? 'w-8' : 'w-12'
                }`}
                style={{ 
                  height: `${height}px`,
                  boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)'
                }}
              >
                {/* Value Display */}
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-bold ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  {item.value}
                </div>
              </div>

              {/* Label */}
              <span className={`text-slate-300 font-medium ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>


    </div>
  );
};

export default Enhanced3DChart;


import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const Enhanced3DDonut = ({ title }) => {
  const isMobile = useIsMobile();
  
  const data = [
    { name: 'Desktop', value: 60, color: '#f59e0b' },
    { name: 'Mobile', value: 25, color: '#475569' },
    { name: 'Tablet', value: 15, color: '#334155' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl relative overflow-hidden ${
      isMobile ? 'p-4 h-80' : 'p-6 h-96'
    }`}>
      <h3 className={`text-white font-semibold mb-4 ${
        isMobile ? 'text-lg' : 'text-xl'
      }`}>{title}</h3>
      
      {/* Simple Chart */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Simple Progress Bars */}
        <div className={`space-y-4 w-full ${isMobile ? 'max-w-xs' : 'max-w-sm'}`}>
          {data.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-slate-300 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {item.name}
                </span>
                <span className={`text-white font-bold ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {item.value}%
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-1000"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Enhanced3DDonut;


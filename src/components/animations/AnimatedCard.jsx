import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

const AnimatedCard = ({ title, value, index = 0, className = "" }) => {
  const isMobile = useIsMobile();
  
  return (
    <div
      className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl
                  shadow-lg hover:shadow-xl transition-shadow duration-200
                  border border-slate-600 hover:border-yellow-400/50 ${
                    isMobile ? 'p-4' : 'p-6'
                  } ${className}`}
    >
      <div>
        <h3 className={`text-slate-400 font-medium mb-2 ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>{title}</h3>
        <p 
          className={`text-white font-bold ${
            isMobile ? 'text-2xl' : 'text-3xl'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default AnimatedCard;


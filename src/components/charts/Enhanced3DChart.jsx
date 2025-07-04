import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Enhanced3DChart = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const data = [
    { name: 'Jan', value: 400, color: '#f59e0b' },
    { name: 'Feb', value: 600, color: '#f59e0b' },
    { name: 'Mar', value: 800, color: '#f59e0b' },
    { name: 'Apr', value: 1200, color: '#f59e0b' },
    { name: 'May', value: 1400, color: '#f59e0b' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 h-96 relative overflow-hidden">
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
      
      {/* 3D Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Chart Container */}
      <div className="relative h-80 flex items-end justify-center gap-4 perspective-1000">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 200;
          
          return (
            <motion.div
              key={item.name}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 50, rotateX: -45 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: 0, 
                rotateX: 0 
              }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Bar */}
              <motion.div
                className="relative mb-2"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main Bar */}
                <motion.div
                  className="w-12 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg relative"
                  style={{ 
                    height: `${height}px`,
                    boxShadow: `
                      0 0 20px rgba(245, 158, 11, 0.3),
                      inset 0 0 20px rgba(255, 255, 255, 0.1)
                    `
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: isVisible ? `${height}px` : 0 }}
                  transition={{ 
                    delay: index * 0.2 + 0.5,
                    duration: 1,
                    ease: "easeOut"
                  }}
                >
                  {/* 3D Top Face */}
                  <div 
                    className="absolute -top-2 left-0 w-12 h-4 bg-yellow-300 rounded-lg transform -skew-x-12 -skew-y-6"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
                    }}
                  />
                  
                  {/* 3D Side Face */}
                  <div 
                    className="absolute top-0 -right-2 w-4 bg-yellow-600 transform skew-y-12"
                    style={{ 
                      height: `${height}px`,
                      background: 'linear-gradient(45deg, #d97706, #92400e)'
                    }}
                  />

                  {/* Animated Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent to-yellow-300 opacity-0 rounded-t-lg"
                    animate={{ 
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />

                  {/* Value Display */}
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 1 }}
                  >
                    {item.value}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Label */}
              <motion.span 
                className="text-slate-300 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 1.2 }}
              >
                {item.name}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: '100%',
              opacity: 0
            }}
            animate={{ 
              y: '-10%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </div>

      {/* Interactive Controls Hint */}
      <motion.div
        className="absolute bottom-4 right-4 text-slate-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Hover to interact
      </motion.div>
    </div>
  );
};

export default Enhanced3DChart;


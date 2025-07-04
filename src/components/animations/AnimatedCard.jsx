import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ title, value, index = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 cursor-pointer
                  shadow-lg hover:shadow-2xl transition-shadow duration-300
                  border border-slate-600 hover:border-yellow-400/50 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
        <motion.p 
          className="text-white text-3xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: index * 0.1 + 0.5,
            type: "spring",
            stiffness: 200
          }}
        >
          {value}
        </motion.p>
      </motion.div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
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
              duration: 3,
              delay: i * 0.5 + index * 0.2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;


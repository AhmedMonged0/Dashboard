import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, User } from 'lucide-react';

const AnimatedHeader = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const title = "DASHBOARD";

  return (
    <motion.div 
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-6">
        <motion.h1 
          className="text-white text-4xl font-bold flex"
          style={{ perspective: '1000px' }}
        >
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.2,
                color: '#f59e0b',
                textShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
                transition: { duration: 0.2 }
              }}
              className="inline-block cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated subtitle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-slate-400 text-sm"
        >
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Real-time Analytics
          </motion.div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative"
        >
          <motion.input
            type="text"
            placeholder="Search..."
            className="bg-slate-700 text-white px-4 py-2 pl-10 rounded-lg border border-slate-600 focus:border-yellow-400 focus:outline-none transition-colors"
            whileFocus={{ scale: 1.05 }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
        </motion.div>

        {/* Notification bell */}
        <motion.button
          className="relative p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Bell className="text-white" size={20} />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity
            }}
          />
        </motion.button>

        {/* User profile */}
        <motion.button
          className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <User className="text-white" size={20} />
        </motion.button>

        {/* Menu button */}
        <motion.button
          className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <Menu className="text-white" size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnimatedHeader;

